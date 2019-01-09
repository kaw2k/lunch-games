import * as React from 'react'
import { shuffle } from '../../helpers/shuffle'
import { Cards } from '../helpers/cards'
import { assignRoles } from '../helpers/assignRoles'
import { PlayerSecretHitler } from '../interfaces/player'
import { ViewRole } from './viewRole'
import { Error } from '../../components/error'
import { SecretHitler } from '../interfaces/game'
import { Room } from '../../interfaces/room'
import { addLeaderBoard } from '../../apis/leaderBoard'
import { GameView } from './game'
import { RoomContext, SecretHitlerGameContext } from '../../helpers/contexts'
import values from 'ramda/es/values'
import { LobbyView } from './lobby'

interface Props {}

export const isSecretHitler = (room: Room): room is SecretHitler =>
  room.type === 'secret-hitler-game' || room.type === 'secret-hitler-lobby'

export const SecretHitlerView: React.SFC<Props> = ({}) => {
  const {
    room,
    player,
    leaveRoom,
    setRoom,
    updateRoom,
    kickPlayer,
    updatePlayer,
  } = React.useContext(RoomContext)

  // Game screens
  if (room.type === 'secret-hitler-lobby')
    return (
      <LobbyView
        lobby={room}
        player={player}
        leave={leaveRoom}
        kickPlayer={kickPlayer}
        startGame={players => {
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
            message: `${shuffle(players)[0].name} goes first`,
          })
        }}
      />
    )

  if (room.type === 'secret-hitler-game') {
    const allReady = values(room.players).reduce(
      (memo, p) => memo && p.ready,
      true
    )
    const currentPlayer = values(room.players).find(
      p => p.id === player.id
    ) as PlayerSecretHitler

    if (!allReady) {
      return (
        <ViewRole
          player={currentPlayer}
          game={room}
          endGame={() => {
            setRoom({
              id: room.id,
              type: 'secret-hitler-lobby',
              lobbyPlayers: room.lobbyPlayers,
              victoryMessage: null,
            })
          }}
          ready={() => updatePlayer({ ...currentPlayer, ready: true })}
        />
      )
    } else {
      return (
        <SecretHitlerGameContext.Provider
          value={{
            game: room,
            player: currentPlayer,
            updateGame: updateRoom,
            endGame: (party, message) => {
              setRoom({
                id: room.id,
                type: 'secret-hitler-lobby',
                lobbyPlayers: room.lobbyPlayers || [],
                victoryMessage: message || null,
              })

              if (party) {
                addLeaderBoard({
                  date: Date.now(),
                  gameType: 'secret hitler',
                  winners: values(room.players)
                    .filter(p => p.role.party === message)
                    .map(p => ({
                      id: p.id,
                      role: p.role.isHitler ? 'hitler' : p.role.party,
                    })),
                  losers: values(room.players)
                    .filter(p => p.role.party !== message)
                    .map(p => ({
                      id: p.id,
                      role: p.role.isHitler ? 'hitler' : p.role.party,
                    })),
                })
              }
            },
          }}>
          <GameView />
        </SecretHitlerGameContext.Provider>
      )
    }
  }

  return <Error />
}
