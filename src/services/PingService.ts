import { Socket } from 'node:net'
import { db, Device } from '../database/database'
import { Socket as WebSocket} from 'socket.io'

export class PingService {
    private _accountID: string = ''
    private runService: boolean = false
    private _webSocket: WebSocket | undefined
    private _devices: Device[] = []

    constructor(accountID: string) {
        this._accountID = accountID
        this.initiateDeviceWatch()
    }

    get accountID() {
        return this._accountID
    }

    get webSocket() {
        return this._webSocket
    }

    private initiateDeviceWatch() {
        db.collection('accounts').doc(this._accountID).collection('devices').onSnapshot(devicesSnapshot => {
            this._devices = devicesSnapshot.docs.map( doc => ({ ...doc.data(), id: doc.id })) as Device[]
        })
    }

    async ping(port: number, address: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
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
    }

    async run() {
        if (this.runService) {
            setTimeout(async () => {
                let isAlive: boolean = false
    
                const updateBatch = db.batch()
    
                for (const device of this._devices) {
    
                    isAlive = await this.ping(device.port, device.address)

                    device.status = isAlive ? 'Active' : 'Down'

                    let deviceDocRef = db.collection('accounts').doc(this._accountID).collection('devices').doc(device.id)
                    updateBatch.update(deviceDocRef, { status: isAlive ? 'Active' : 'Down' })
    
                    console.log(`Account: ${this._accountID} - Device: ${device.host} is alive? ${isAlive} | ${new Date().toLocaleTimeString()}\n`)
                }

                updateBatch.commit()

                if (this._webSocket) {
                    this._webSocket.emit('deviceUpdate', this._devices)
                }
    
                this.run()
            }, 3000)
        } else {
            return
        }
    }

    start() {
        this.runService = true
        this.run()
    }

    stop() { this.runService = false }

    attachWebSocket(webSocket: WebSocket) {
        this._webSocket = webSocket

        this._webSocket.on('disconnect', () => {
            console.log('Killing Websocket')

            delete this._webSocket
        })
    }
}