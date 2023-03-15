import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore, DocumentData } from 'firebase-admin/firestore'
import firebaseKey from '../ping-system-cf114-firebase-adminsdk-b4s63-f8dd6b51a2.json'

export type Account = DocumentData & {
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    id: string
}

export type Device = DocumentData & {
    host: string,
    address: string,
    port: number,
    status: string,
    id: string
}

initializeApp({ credential: cert(firebaseKey as ServiceAccount) })

export const db = getFirestore()

export const getAccounts = async (): Promise<Account[]> => (await db.collection('accounts').get()).docs.map( doc => ({ ...doc.data(), id: doc.id })) as Account[]

export const getDevices = async (accountID: string): Promise<Device[]> => (await db.collection('accounts').doc(accountID).collection('devices').get()).docs.map( doc => ({ ...doc.data(), id: doc.id }) ) as Device[]