import { CosmosClient, Container } from '@azure/cosmos'
import { Socket } from 'node:net'

const cosmosClient = new CosmosClient(process.env.COSMOS_CONNECTION_STRING as string)

const devicesContainer: Container = cosmosClient.database('ping-system').container('devices')

interface DeviceRow {
    id: string,
    hostName: string,
    hostAddress: string,
    hostPort: number,
    hostStatus: string,
    notifyEmail: boolean,
    emailAddresses: string[],
    notifyText: boolean,
    phoneNumbers: string[]
}


const getDevices = async (): Promise<DeviceRow[]> => (await devicesContainer.items.query<DeviceRow>('SELECT devices.id, devices.hostName, devices.hostAddress, devices.hostPort, devices.hostStatus FROM devices').fetchAll())?.resources

const ping = (port: number, address: string): Promise<boolean> => new Promise((resolve, reject) => {

    let status: boolean = false

    const tcpSocket = new Socket()

    tcpSocket.setTimeout(1000)

    tcpSocket.connect(port, address)

    tcpSocket.on('connect', () => (status = true, tcpSocket.destroy()))

    tcpSocket.on('timeout', () => (status = false, tcpSocket.destroy()))

    tcpSocket.on('error', (error: Error) => {

        if (error.message.includes('ECONNREFUSED')) {
            status = true
            tcpSocket.destroy()
        } else {
            tcpSocket.destroy()
            reject(error)
        }

    })

    tcpSocket.on('close', () => resolve(status))
})

export const runPingService = () => {

    setTimeout(async () => {
        let isAlive = false

        const devices: DeviceRow[] = await getDevices()

        for (const device of devices) {

            isAlive = await ping(device.hostPort, device.hostAddress)

            await devicesContainer.item(device.id, device.id).patch<DeviceRow>({
                operations: [
                    { op: 'set', path: '/hostStatus', value: isAlive ? 'Active' : 'Down' },
                    { op: 'set', path: '/update', value: new Date().toLocaleString() }
                ]
            })
        }

        runPingService()

    }, 5000)

}