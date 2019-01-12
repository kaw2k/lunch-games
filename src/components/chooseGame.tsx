import * as React from 'react'
import { SecretHitlerLobby } from '../secret-hitler/interfaces/game'
import { AvalonLobby } from '../avalon/interfaces/game'
import { RoomContext } from '../helpers/contexts'
import { Lobby, Room } from '../interfaces/room'

export const ChooseGame: React.SFC<{}> = () => {
  const { setRoom, room } = React.useContext(RoomContext)

  const lobby: Lobby['type'] = 'lobby'
  const secretHitler: SecretHitlerLobby['type'] = 'secret-hitler-lobby'
  const avalon: AvalonLobby['type'] = 'avalon-lobby'

  return (
    <div>
      <select
        value={room.type}
        onChange={e => {
          const game = e.target.value as Room['type']

          if (game === lobby) {
            const newLobby: Lobby = {
              type: game,
              lobbyPlayers: room.lobbyPlayers,
              id: room.id,
            }
            setRoom(newLobby)
          } else if (game === secretHitler) {
            const newLobby: SecretHitlerLobby = {
              type: game,
              lobbyPlayers: room.lobbyPlayers,
              id: room.id,
            }
            setRoom(newLobby)
          } else if (game === avalon) {
            const newLobby: AvalonLobby = {
              id: room.id,
              lobbyPlayers: room.lobbyPlayers,
              type: game,
              victoryMessage: null,
              ladyOfTheLake: false,
              roles: [],
            }
            setRoom(newLobby)
          }
        }}>
        <option value={lobby}>Select a game</option>
        <option value={secretHitler}>Secret Hitler</option>
        <option value={avalon}>Avalon</option>
      </select>

      <style jsx>{`
        select {
          display: block;
          width: 100%;
          padding: 1em;
          font-size: inherit;
        }
      `}</style>
    </div>
  )
}
