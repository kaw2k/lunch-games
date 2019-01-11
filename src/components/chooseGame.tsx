import * as React from 'react'
import { SecretHitlerLobby } from '../secret-hitler/interfaces/game'
import { AvalonLobby } from '../avalon/interfaces/game'
import { RoomContext } from '../helpers/contexts'

export const ChooseGame: React.SFC<{}> = () => {
  const { setRoom, room } = React.useContext(RoomContext)

  const secretHitler: SecretHitlerLobby['type'] = 'secret-hitler-lobby'
  const avalon: AvalonLobby['type'] = 'avalon-lobby'

  return (
    <div>
      <select
        value={room.type}
        onChange={e => {
          const game = e.target.value
          if (!game) {
            setRoom({
              type: 'lobby',
              lobbyPlayers: room.lobbyPlayers,
              id: room.id,
            })
          } else if (game === secretHitler) {
            setRoom({
              type: 'secret-hitler-lobby',
              lobbyPlayers: room.lobbyPlayers,
              id: room.id,
            })
          } else if (game === avalon) {
          }
        }}>
        <option value="">Select a game</option>
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
