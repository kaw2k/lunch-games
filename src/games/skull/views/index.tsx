import * as React from 'react'
import { Room } from '../../../interfaces/room'
import { RoomContext, SkullGameContext } from '../../../helpers/contexts'
import { GameView } from './game'
import { GameContainer } from '../components/gameContainer'
import { Skull, makeGame } from '../interfaces/game'
import { LobbySkull } from './lobby'
import values from 'ramda/es/values'
import {
  isBadSeatingChart,
  WaitingSeatingSkull,
  MakeSeatingSkull,
  BadSeatingSkull,
} from './seatingChart'

export const isSkull = (room: Room): room is Skull =>
  room.type === 'skull-game' || room.type === 'skull-lobby'

export const SkullView: React.SFC<{ room: Skull }> = ({ room }) => {
  const { player, updatePlayer, updateRoom } = React.useContext(RoomContext)

  // Game screens
  if (room.type === 'skull-lobby') {
    return (
      <LobbySkull lobby={room} startGame={() => updateRoom(makeGame(room))} />
    )
  }

  const currentPlayer = room.players[player.id]

  if (!currentPlayer) {
    return <div>spectating...</div>
  }

  const hasError = isBadSeatingChart(room)
  const allReady = values(room.players).reduce<boolean>(
    (m, p) => m && !!p.playerOnLeft,
    true
  )

  return (
    <SkullGameContext.Provider
      value={{
        updateGame: updateRoom,
        game: room,
        player: currentPlayer,
        updateGamePlayer: updatePlayer,
        endGame: () => {
          updateRoom({
            ...room,
            type: 'skull-lobby',
          })
        },
      }}>
      <GameContainer>
        {!allReady && !currentPlayer.playerOnLeft && <MakeSeatingSkull />}
        {!allReady && currentPlayer.playerOnLeft && <WaitingSeatingSkull />}
        {allReady && hasError && <BadSeatingSkull />}
        {allReady && !hasError && <GameView />}
      </GameContainer>
    </SkullGameContext.Provider>
  )
}
