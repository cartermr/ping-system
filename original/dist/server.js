"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database/database");
// import { fork, ChildProcess } from "node:child_process";
const pingClass_1 = require("./services/pingClass");
let activePingServices = {};
const run = async () => {
    let accounts = await (0, database_1.getAccounts)();
    // db.collection('accounts').onSnapshot(snapshot => {
    //   snapshot.docChanges().forEach(docSnapshot => {
    //     let docID: string = docSnapshot.doc.id
    //     let data: Account = docSnapshot.doc.data() as Account
    //     if (activePingServices[docID] && !data.active) {
    //       // activePingServices[docID].kill()
    //       activePingServices[docID].stop()
    //       delete activePingServices[docID]
    //       console.log(`Account: ${docID} - Ping Service Ending`)
    //     }
    //     if (!activePingServices[docID] && data.active) {
    //       // activePingServices[docID] = fork('./src/services/pingService', [ docID ])
    //       // activePingServices[docID] = fork('./dist/services/pingService.js', [ docID ])
    //       activePingServices[docID] = new PingService(docID)
    //       activePingServices[docID].start()
    //       console.log(`Account: ${docID} - Ping Service Starting`)
    //     }
    //   })
    // })
    // accounts.forEach(account => {
    //   if (account.active) {
    // activePingServices[account.id] = fork('./src/services/pingService', [ account.id ])
    // activePingServices[account.id] = fork('./dist/services/pingService.js', [ account.id ])
    //     activePingServices[account.id] = new PingService(account.id)
    //     activePingServices[account.id].start()
    //   }
    // })
    console.log('Service Startup ===========================');
    for (const account of accounts) {
        if (account.active) {
            await staggerStart();
            console.log(`Account: ${account.id}, Host: ${account.acctNumber} - Is Starting`);
            activePingServices[account.id] = new pingClass_1.PingService(account.id);
            activePingServices[account.id].start();
        }
    }
    console.log('Service Startup Completed ================\n\n');
    // activePingServices[accounts[0].id] = new PingService(accounts[0].id)
    // activePingServices[accounts[0].id].start()
};
const staggerStart = () => new Promise(resolve => setTimeout(resolve, 500));
run();
// runSeed()
