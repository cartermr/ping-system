"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = void 0;
const database_1 = require("../database/database");
let testAcct = {
    active: true,
    acctNumber: 'host-1'
};
let testDevice = {
    host: 'host-1',
    address: '192.168.1.1',
    port: 80
};
const runSeed = async () => {
    for (let index = 0; index < 50; index++) {
        testAcct.acctNumber = `host-${index}`;
        testDevice.host = `host-${index}`;
        let newDocRef = await database_1.db.collection('accounts').add(testAcct);
        await newDocRef.collection('devices').add(testDevice);
    }
};
exports.runSeed = runSeed;
