// import * as React from 'react'
// import { Player } from '../interfaces/player'
// import { Loading } from '../interfaces/loading'
// import { useDocument } from 'react-firebase-hooks/firestore'
// import { Room, RoomId } from '../interfaces/room'
// import {
//   SecretHitler,
//   makeSecretHitlerLobby,
// } from '../secret-hitler/interfaces/game'
// import { getRoom, setRoom } from '../apis/room'
// import { uniqBy } from 'ramda'
// import * as local from '../helpers/localstorage'
// import { database } from '../helpers/firebase'

// type RoomType = 'secret-hitler'
// type RoomTypeResult<T extends RoomType> = T extends 'secret-hitler'
//   ? SecretHitler
//   : never

// export function useRoom(
//   defaultRoomType: RoomType,
//   player: Player | null
// ): Loading<{
//   data: Room | null
//   updateRoom: (room: Room) => void
//   joinRoom: (id: RoomId) => void
//   leaveRoom: () => void
// }> {
//   const [roomId, setRoomId] = React.useState(local.roomId.get())

//   const doc = database.rooms.doc(roomId || 'null')
//   const { value, error, loading } = useDocument(doc)
//   const room = value ? (value.data() as Room) || null : null

//   React.useEffect(
//     () => {
//       // The game doesn't exist, nor does the lobby. Create it.
//       if (!room && !loading && !error && roomId && player) {
//         if (defaultRoomType === 'secret-hitler') {
//           database.rooms.doc(roomId).set(makeSecretHitlerLobby(roomId, player))
//         }
//       }

//       // If we are not part of the lobby, kick us out
//       if (
//         room &&
//         player &&
//         !room.lobbyPlayers.find(p => p.id === (player as Player).id)
//       ) {
//         leaveRoom()
//       }
//     },
//     [loading, room && room.lobbyPlayers.length]
//   )

//   async function joinRoom(id: RoomId) {
//     if (!player) return

//     let room = await getRoom(id)

//     if (!room) {
//       if (defaultRoomType === 'secret-hitler')
//         room = makeSecretHitlerLobby(id, player)
//     }

//     await setRoom({
//       ...room,
//       lobbyPlayers: uniqBy(p => p.id, room.lobbyPlayers.concat(player)),
//     })

//     local.roomId.set(id)
//     setRoomId(id)
//   }

//   async function leaveRoom() {
//     if (roomId && player) {
//       const room = await getRoom(roomId)
//       if (room) {
//         setRoom({
//           ...room,
//           lobbyPlayers: room.lobbyPlayers.filter(
//             p => p.id !== (player as Player).id
//           ),
//         })
//       }
//     }

//     local.roomId.set(null)
//     setRoomId(null)
//   }

//   function updateRoom(props: Room) {
//     doc.set(props)
//   }

//   if (loading) return { loading: true }
//   if (error) return { loading: false, error: true }

//   return {
//     loading: false,
//     error: false,
//     data: room,
//     joinRoom,
//     leaveRoom,
//     updateRoom,
//   }
// }
