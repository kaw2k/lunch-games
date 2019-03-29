import * as React from 'react'
import values from 'ramda/es/values'
import { shuffle } from '../../../helpers/shuffle'
import { Cards } from '../helpers/cards'
import { assignRoles } from '../helpers/assignRoles'
import { PlayerSecretHitler } from '../interfaces/player'
import { GameSetup } from './gameSetup'
import { SecretHitler } from '../interfaces/game'
import { Room } from '../../../interfaces/room'
import { addLeaderBoard } from '../../../apis/leaderBoard'
import { GameView } from './game'
import { RoomContext, SecretHitlerGameContext } from '../../../helpers/contexts'
import { LobbySecretHitler } from './lobby'
import { Spectate } from './game/spectate'
import { GameContainer } from '../components/gameContainer'

export const isSecretHitler = (room: Room): room is SecretHitler =>
  room.type === 'secret-hitler-game' || room.type === 'secret-hitler-lobby'

export const SecretHitlerView: React.SFC<{ room: SecretHitler }> = ({
  room,
}) => {
  const { player, setRoom, updateRoom } = React.useContext(RoomContext)
  const { updatePlayer } = React.useContext(RoomContext)

  // Game screens
  if (room.type === 'secret-hitler-lobby') {
    return (
      <LobbySecretHitler
        lobby={room}
        startGame={players => {
          const first = shuffle(players)[0]
          const firstPlayer = first.name || first.id
          setRoom({
            type: 'secret-hitler-game',
            id: room.id,
            lobbyPlayers: room.lobbyPlayers,
            playedCards: [],
            remainingCards: shuffle(Cards),
            discardedCards: [],
            players: assignRoles(players),
            chaos: 0,
            previousGovernment: null,
            government: null,
            performPower: null,
            message: `${firstPlayer} goes first`,
          })
        }}
      />
    )
  }

  const currentPlayer = room.players[player.id]
  const allReady = values(room.players).reduce(
    (memo, p) => memo && p.ready,
    true
  )

  if (!currentPlayer) {
    return (
      <Spectate
        game={room}
        endGame={() => {
          setRoom({
            id: room.id,
            type: 'secret-hitler-lobby',
            spectators: [],
            lobbyPlayers: room.lobbyPlayers,
            victoryMessage: null,
          })
        }}
      />
    )
  }

  return (
    <SecretHitlerGameContext.Provider
      value={{
        updateGamePlayer: updatePlayer,
        game: room,
        player: currentPlayer,
        updateGame: updateRoom,
        endGame: (party, message) => {
          setRoom({
            id: room.id,
            type: 'secret-hitler-lobby',
            spectators: [],
            lobbyPlayers: room.lobbyPlayers || [],
            victoryMessage: message || null,
          })

          if (party && room.type === 'secret-hitler-game') {
            addLeaderBoard({
              date: Date.now(),
              gameType: 'secret-hitler-game',
              lobby: room.id,
              winners: values(room.players)
                .filter(p => p.role.party === party)
                .map(p => ({
                  id: p.id,
                  role: p.role.isHitler ? 'hitler' : p.role.party,
                })),
              losers: values(room.players)
                .filter(p => p.role.party !== party)
                .map(p => ({
                  id: p.id,
                  role: p.role.isHitler ? 'hitler' : p.role.party,
                })),
            })
          }
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
              } as PlayerSecretHitler)
            }
          />
        )}
      </GameContainer>
    </SecretHitlerGameContext.Provider>
  )
}
