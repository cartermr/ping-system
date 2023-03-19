"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevices = exports.getAccounts = exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const ping_system_cf114_firebase_adminsdk_b4s63_f8dd6b51a2_json_1 = __importDefault(require("../ping-system-cf114-firebase-adminsdk-b4s63-f8dd6b51a2.json"));
// export let accounts: Account[] = []
(0, app_1.initializeApp)({ credential: (0, app_1.cert)(ping_system_cf114_firebase_adminsdk_b4s63_f8dd6b51a2_json_1.default) });
exports.db = (0, firestore_1.getFirestore)();
const getAccounts = async () => (await exports.db.collection('accounts').orderBy('acctNumber', 'desc').get()).docs.map(doc => ({ ...doc.data(), id: doc.id }));
exports.getAccounts = getAccounts;
const getDevices = async (accountID) => (await exports.db.collection('accounts').doc(accountID).collection('devices').get()).docs.map(doc => doc.data());
exports.getDevices = getDevices;
// getAccounts()
