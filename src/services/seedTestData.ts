import { db } from '../database/database'

let testAcct = {
    active: true,
    acctNumber: 'host-1'
}

let testDevice = {
    host: 'host-1',
    address: '192.168.1.1',
    port: 80
}

export const runSeed = async () => {
    for (let index = 0; index < 50; index++) {
        testAcct.acctNumber = `host-${index}`

        testDevice.host = `host-${index}`
        
        let newDocRef = await db.collection('accounts').add(testAcct)

        await newDocRef.collection('devices').add(testDevice)
    }
}

