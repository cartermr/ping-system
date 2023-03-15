import { Socket } from 'node:net'
import { getDevices, Device } from '../database/database'

const accountID: string = process.argv[2]

const ping = (port: number, address: string): Promise<boolean> => new Promise((resolve, reject) => {
    let status: boolean = false

    const tcpSocket: Socket = new Socket()
    tcpSocket.setTimeout(1000)

    tcpSocket.connect(port, address)

    tcpSocket.on('connect', () => (status = true, tcpSocket.destroy()))

    tcpSocket.on('timeout', () => (status = false, tcpSocket.destroy()))

    tcpSocket.on('error', (error: Error) => {

        if (error.message.includes('ECONNREFUSED')) {
            status = true
            tcpSocket.destroy()
        } else {
            status = false
            tcpSocket.destroy()
        }
    })

    tcpSocket.on('close', () => resolve(status))
})

const runPingService = () => {
    setTimeout(async () => {
        let isAlive: boolean = false

        const devices: Device[] = await getDevices(accountID)

        for (const device of devices) {

            isAlive = await ping(device.port, device.address)

            console.log(`Account: ${accountID} - Device: ${device.host} is alive? ${isAlive}`)
        }

        runPingService()
    }, 5000)
}

if (accountID && accountID !== '') {
    runPingService()
}