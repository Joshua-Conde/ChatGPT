import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyByXHSCIcaBKxYaa3MVOZN7AwIQTTxW1sQ',
  authDomain: 'my-chatgpt-aa1d7.firebaseapp.com',
  projectId: 'my-chatgpt-aa1d7',
  storageBucket: 'my-chatgpt-aa1d7.appspot.com',
  messagingSenderId: '123967002777',
  appId: '1:123967002777:web:1f52c9498b85667baa8008',
}

const app = getApps()?.length ? getApp() : initializeApp(firebaseConfig)
const database = getFirestore(app)

export { database }
