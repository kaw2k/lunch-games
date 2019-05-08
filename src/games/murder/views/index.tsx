import * as React from 'react'
import values from 'ramda/es/values'
import { Room } from '../../../interfaces/room'
import { LobbyMurder } from './lobby'
import { RoomContext, MurderGameContext } from '../../../helpers/contexts'
import { GameView } from './game'
import { GameContainer } from '../components/gameContainer'
import { Murder } from '../interfaces/game'
import { makeGame } from '../helpers/makeGame'
import { GameSetup } from './gameSetup'

export const isMurder = (room: Room): room is Murder =>
  room.type === 'murder-game' || room.type === 'murder-lobby'

export const MurderView: React.SFC<{ room: Murder }> = ({ room }) => {
  const { player, updatePlayer, updateRoom } = React.useContext(RoomContext)

  // Game screens
  if (room.type === 'murder-lobby') {
    return (
      <LobbyMurder lobby={room} startGame={() => updateRoom(makeGame(room))} />
    )
  }

  const currentPlayer = room.players[player.id]
  const allReady = values(room.players).reduce(
    (memo, p) => memo && p.ready,
    true
  )

  if (!currentPlayer) {
    return <div>spectating...</div>
  }

  return (
    <MurderGameContext.Provider
      value={{
        updateGame: updateRoom,
        game: room,
        player: currentPlayer,
        updateGamePlayer: updatePlayer,
        endGame: (party, message) => {
          updateRoom({
            ...room,
            type: 'murder-lobby',
          })
        },
      }}>
      <GameContainer>
        {allReady && <GameView />}
        {!allReady && <GameSetup />}
      </GameContainer>
    </MurderGameContext.Provider>
  )
}
