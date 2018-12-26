import * as React from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { Player, PlayerId } from '../interfaces/player'
import { useDocument } from 'react-firebase-hooks/firestore'
import { RoomId, Room, Lobby } from '../interfaces/game'
import { Loading } from '../interfaces/loading'
import * as local from '../helpers/localstorage'
import uniqBy from 'ramda/es/uniqBy'
import { GameResult } from '../interfaces/leaderboard'

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
db.settings({ timestampsInSnapshots: true })

export const database = {
  players: db.collection('players'),
  rooms: db.collection('rooms'),
  leaderboard: db.collection('leaderboard'),
}

// ==============
// HELPERS
// ==============
function getPlayer(pid: PlayerId) {
  return database.players
    .doc(pid)
    .get()
    .then(playerSnapshot => {
      const player = playerSnapshot.data()
      if (player) {
        return player as Player
      } else {
        return null
      }
    })
}

function getRoom(rid: RoomId) {
  return database.rooms
    .doc(rid)
    .get()
    .then(roomSnapshot => {
      const room = roomSnapshot.data()
      if (room) {
        return room as Room
      } else {
        return null
      }
    })
}

function setRoom(room: Room) {
  return database.rooms.doc(room.id).set(room)
}

export function addLeaderboard(game: GameResult) {
  database.leaderboard.add(game)
}

// We are using re-direct to auth users. Have this always execute
// to validate users coming from OAUTH
firebase
  .auth()
  .getRedirectResult()
  .then(async res => {
    if (res.user) {
      const player = await getPlayer(res.user.uid as PlayerId)

      if (!player) {
        const newPlayer: Player = {
          id: res.user.uid as PlayerId,
          name: res.user.displayName,
          profileImg: res.user.photoURL,
        }
        database.players.doc(res.user.uid).set(newPlayer)
      }
    }
  })

export function useAuthState(): Loading<{
  data: Player | null
  signIn: (name: PlayerId) => void
  signOut: () => void
  setProfileImg: (file: any) => void
  setPlayer: (player: Player) => void
}> {
  const [pid, setPid] = React.useState<PlayerId | null>(local.localUserId.get())
  const [loadingUser, setLoadingUser] = React.useState<boolean>(false)
  const { value, loading, error } = useDocument(
    database.players.doc(pid || 'none')
  )
  const player = value ? (value.data() as Player) || null : null

  async function signIn(name: PlayerId) {
    setLoadingUser(true)
    const player = await getPlayer(name)

    if (!player) {
      await setPlayer({
        id: name,
        name,
        profileImg: null,
      })
    }

    setPid(name)
    local.localUserId.set(name)
    setLoadingUser(false)
  }

  function setPlayer(player: Player) {
    return database.players.doc(player.id).set(player)
  }

  function signOut() {
    setPid(null)
    local.localUserId.set(null)
  }

  function setProfileImg(file: any) {
    storage
      .ref(`profile-images/${pid}`)
      .put(file)
      .then(async () => {
        if (player) {
          setPlayer({
            ...player,
            profileImg: await storage
              .ref(`profile-images/${pid}`)
              .getDownloadURL(),
          })
        }
      })
  }

  if (loading || loadingUser) return { loading: true }
  if (error) return { loading: false, error: true }

  return {
    loading: false,
    error: false,
    data: player,
    signOut,
    signIn,
    setProfileImg,
    setPlayer,
  }
}

// export function useAuthState(): Loading<{
//   data: Player | null
//   signIn: () => void
//   signOut: () => void
// }> {
//   const [pid, setPid] = React.useState<PlayerId | null>(null)
//   const { value, loading, error } = useDocument(
//     database.players.doc(pid || 'none')
//   )
//   const player = value ? (value.data() as Player) || null : null

//   React.useEffect(() => {
//     firebase.auth().onAuthStateChanged(async user => {
//       try {
//         if (!user) throw null
//         setPid(user.uid as PlayerId)
//       } catch {
//         setPid(null)
//       }
//     })
//   }, [])

//   function signIn() {
//     firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
//   }

//   function signOut() {
//     setPid(null)
//     firebase.auth().signOut()
//   }

//   if (loading) return { loading: true }
//   if (error) return { loading: false, error: true }

//   return { loading: false, error: false, data: player, signOut, signIn }
// }

// ==============
// HELPERS - GAME
// ==============
export function useRoom(
  player: Player | null
): Loading<{
  data: Room | null
  updateRoom: (room: Room) => void
  joinRoom: (id: RoomId) => void
  leaveRoom: () => void
}> {
  const [roomId, setRoomId] = React.useState(local.roomId.get())

  const doc = database.rooms.doc(roomId || 'null')
  const { value, error, loading } = useDocument(doc)
  const room = value ? (value.data() as Room) || null : null

  React.useEffect(
    () => {
      // The game doesn't exist, nor does the lobby. Create it.
      if (!room && !loading && !error && roomId && player) {
        const lobby: Lobby = {
          type: 'lobby',
          id: roomId,
          lobbyPlayers: [player],
        }
        database.rooms.doc(roomId).set(lobby)
      }

      // If we are not part of the lobby, kick us out
      if (
        room &&
        player &&
        !room.lobbyPlayers.find(p => p.id === (player as Player).id)
      ) {
        leaveRoom()
      }
    },
    [loading, room && room.lobbyPlayers.length]
  )

  async function joinRoom(id: RoomId) {
    if (!player) return

    const room = (await getRoom(id)) || {
      type: 'lobby',
      id: id,
      lobbyPlayers: [],
    }

    await setRoom({
      ...room,
      lobbyPlayers: uniqBy(p => p.id, room.lobbyPlayers.concat(player)),
    })

    local.roomId.set(id)
    setRoomId(id)
  }

  async function leaveRoom() {
    if (roomId && player) {
      const room = await getRoom(roomId)
      if (room) {
        setRoom({
          ...room,
          lobbyPlayers: room.lobbyPlayers.filter(
            p => p.id !== (player as Player).id
          ),
        })
      }
    }

    local.roomId.set(null)
    setRoomId(null)
  }

  function updateRoom(props: Room) {
    doc.set(props)
  }

  if (loading) return { loading: true }
  if (error) return { loading: false, error: true }

  return {
    loading: false,
    error: false,
    data: room,
    joinRoom,
    leaveRoom,
    updateRoom,
  }
}
