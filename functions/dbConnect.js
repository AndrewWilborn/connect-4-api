import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import creds from './creds.js';

// conencts us to our firebase Project
initializeApp({
    credential: cert(creds)
})

export default getFirestore()