import dotenv from 'dotenv'
import firebase from 'firebase'

dotenv.config()

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`
}
const initTestApp = (namespace) =>
  firebase.initializeApp(config, namespace)


export default initTestApp
