import * as firebase from 'firebase'
import 'firebase/firestore'
import { PlayerId } from '../interfaces/player'
import { Opaque } from '../interfaces/opaque'

// ==============
// FIREBASE SETUP
// ==============
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  })
}

// ==============
// DATABASE
// ==============
const db = firebase.firestore()
const storage = firebase.storage()

export const database = {
  players: db.collection('players'),
  rooms: db.collection('rooms'),
  leaderBoard: db.collection('leaderBoard'),
  profileImg: (pid: PlayerId) => storage.ref(`profile-images/${pid}`),
}

export type FieldValue<T> = Opaque<'field value', T>

export const firebaseArrayAdd = <T>(...item: T[]) =>
  (firebase.firestore.FieldValue.arrayUnion(...item) as any) as FieldValue<T>

export const firebaseArrayRemove = <T>(item: T) =>
  (firebase.firestore.FieldValue.arrayRemove(item) as any) as FieldValue<T>
