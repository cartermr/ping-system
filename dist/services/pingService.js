"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_net_1 = require("node:net");
const database_1 = require("../database/database");
const accountID = process.argv[2];
const ping = (port, address) => new Promise((resolve, reject) => {
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
const runPingService = () => {
    setTimeout(async () => {
        let isAlive = false;
        const devices = await (0, database_1.getDevices)(accountID);
        for (const device of devices) {
            isAlive = await ping(device.port, device.address);
            console.log(`Account: ${accountID} - Device: ${device.host} is alive? ${isAlive}`);
        }
        runPingService();
    }, 5000);
};
if (accountID && accountID !== '') {
    runPingService();
}
