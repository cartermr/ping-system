"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingService = void 0;
const node_net_1 = require("node:net");
const database_1 = require("../database/database");
class PingService {
    _accountID = '';
    runService = false;
    constructor(accountID) {
        this._accountID = accountID;
    }
    get accountID() {
        return this._accountID;
    }
    async ping(port, address) {
        return new Promise((resolve, reject) => {
            let status = false;
            const tcpSocket = new node_net_1.Socket();
            tcpSocket.setTimeout(1000);
            tcpSocket.connect(port, address);
            tcpSocket.on('connect', () => (status = true, tcpSocket.destroy()));
            tcpSocket.on('timeout', () => (status = false, tcpSocket.destroy()));
            tcpSocket.on('error', (error) => {
                if (error.message.includes('ECONNREFUSED')) {
                    status = true;
                    tcpSocket.destroy();
                }
                else {
                    status = false;
                    tcpSocket.destroy();
                }
            });
            tcpSocket.on('close', () => resolve(status));
        });
    }
    async run() {
        if (this.runService) {
            setTimeout(async () => {
                let isAlive = false;
                const devices = await (0, database_1.getDevices)(this.accountID);
                for (const device of devices) {
                    isAlive = await this.ping(device.port, device.address);
                    console.log(`Account: ${this.accountID} - Device: ${device.host} is alive? ${isAlive} | ${new Date().toLocaleTimeString()}\n`);
                }
                this.run();
            }, 60000);
        }
        else {
            return;
        }
    }
    start() {
        this.runService = true;
        this.run();
    }
    stop() { this.runService = false; }
}
exports.PingService = PingService;
