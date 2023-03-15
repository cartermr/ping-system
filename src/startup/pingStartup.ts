import { db, getAccounts, Account } from '../database/database'
import { PingService } from '../services/PingService'

interface ActivePings {
    [key: string]: PingService
  }

export const pingStartup = async (activePingServices: ActivePings) => {

    // let accounts: Account[] = await getAccounts()

    // for (const account of accounts) {

    //     if (account.active) {

    //         await staggerStart()

    //         activePingServices[account.id] = new PingService(account.id)
    //         activePingServices[account.id].start()
    //     }
    // }

    db.collection('accounts').onSnapshot(snapshot => {

        snapshot.docChanges().forEach(docSnapshot => {

            let docID: string = docSnapshot.doc.id
            let account: Account = docSnapshot.doc.data() as Account

            if ( activePingServices[docID] && !account.active ) {

                activePingServices[docID].stop()

                delete activePingServices[docID]
            }

            if ( !activePingServices[docID] && account.active ) {

                activePingServices[docID] = new PingService(docID)
                activePingServices[docID].start()
            }
        })
    })
}

const staggerStart = () => new Promise(resolve => setTimeout(resolve, 500))