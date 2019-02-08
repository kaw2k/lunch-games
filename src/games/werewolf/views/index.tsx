import * as React from 'react'
import values from 'ramda/es/values'
import { GameSetup } from './gameSetup'
import { Werewolf } from '../interfaces/game'
import { Room } from '../../../interfaces/room'
import { GameView } from './game'
import { RoomContext, WerewolfGameContext } from '../../../helpers/contexts'
import { WerewolfLobbyView } from './lobby'
import { Spectate } from './game/spectate'
import { GameContainer } from '../components/gameContainer'
import { PlayerWerewolf } from '../interfaces/player'

export const isWerewolf = (room: Room): room is Werewolf =>
  room.type === 'werewolf-game' || room.type === 'werewolf-lobby'

export const WerewolfView: React.SFC<{ room: Werewolf }> = ({ room }) => {
  const { player, setRoom, updateRoom } = React.useContext(RoomContext)
  const { updatePlayer } = React.useContext(RoomContext)

  // Game screens
  if (room.type === 'werewolf-lobby') {
    return (
      <WerewolfLobbyView lobby={room} startGame={players => alert('lol')} />
    )
  }

  const currentPlayer = room.players[player.id]
  const allReady = values(room.players).reduce(
    (memo, p) => memo && p.ready,
    true
  )

  if (!currentPlayer) {
    return <Spectate game={room} />
  }

  return (
    <WerewolfGameContext.Provider
      value={{
        updateGamePlayer: updatePlayer,
        game: room,
        player: currentPlayer,
        updateGame: updateRoom,
        endGame: (party, message) => {
          setRoom({
            id: room.id,
            type: 'werewolf-lobby',
            lobbyPlayers: room.lobbyPlayers || [],
            victoryMessage: message || null,
            artifacts: [],
            roles: [],
            options: {
              boogymanOP: false,
              ghost: false,
              killCult: false,
              noFlip: false,
              timeLimit: 120,
            },
          })
        },
      }}>
      <GameContainer>
        {allReady && <GameView />}
        {!allReady && (
          <GameSetup
            ready={() =>
              updatePlayer({
                ...currentPlayer,
                ready: true,
              } as PlayerWerewolf)
            }
          />
        )}
      </GameContainer>
    </WerewolfGameContext.Provider>
  )
}
