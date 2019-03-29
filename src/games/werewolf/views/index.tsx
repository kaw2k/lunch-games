import * as React from 'react'
import { Werewolf, WerewolfLobby } from '../interfaces/game'
import { Room } from '../../../interfaces/room'
import { WerewolfPlayerGame } from './game/player'
import { RoomContext, WerewolfGameContext } from '../../../helpers/contexts'
import { WerewolfPlayerLobby } from './lobby/player'
import { WerewolfSpectateGame } from './game/spectate'
import { GameContainer } from '../components/gameContainer'
import { isModerator } from '../helpers/isModerator'
import { makeGame } from '../helpers/makeGame'
import { WerewolfModeratorGame } from './game/moderate'
import { WerewolfPlayerSetup } from './setup/player'
import { WerewolfModeratorSetup } from './setup/moderator'
import { WerewolfModeratorLobby } from './lobby/moderator'
import { addAction, addDelayedAction } from '../helpers/addAction'
import { runActions } from '../helpers/gameEngine'
import { PlayerWerewolf } from '../interfaces/player'

export const isWerewolf = (room: Room): room is Werewolf =>
  room.type === 'werewolf-game' || room.type === 'werewolf-lobby'

export const WerewolfView: React.SFC<{ room: Werewolf }> = ({ room }) => {
  const { player, setRoom, updateRoom } = React.useContext(RoomContext)
  const { updatePlayer } = React.useContext(RoomContext)

  function toggleProperty(
    key: keyof Pick<WerewolfLobby, 'spectators' | 'werewolfModerators'>
  ) {
    if (room.type === 'werewolf-game') return

    if (room[key].find(pid => pid === player.id)) {
      setRoom({
        ...room,
        [key]: room[key].filter(pid => pid !== player.id),
      })
    } else {
      setRoom({
        ...room,
        [key]: room[key].concat(player.id),
      })
    }
  }

  // Game screens
  if (room.type === 'werewolf-lobby') {
    if (isModerator(player, room)) {
      return (
        <WerewolfModeratorLobby
          lobby={room}
          startGame={roles => setRoom(makeGame(roles, room))}
          toggleModerator={() => toggleProperty('werewolfModerators')}
          toggleSpectator={() => toggleProperty('spectators')}
        />
      )
    } else {
      return (
        <WerewolfPlayerLobby
          lobby={room}
          toggleSpectator={() => toggleProperty('spectators')}
          toggleModerator={() => toggleProperty('werewolfModerators')}
        />
      )
    }
  }

  const currentPlayer = room.players[player.id]

  if (!currentPlayer && !isModerator(player, room)) {
    return (
      <WerewolfGameContext.Provider
        value={{
          game: room,
          player: player as PlayerWerewolf,
          updateGamePlayer: () => {},
          updateGame: () => {},
          runActions: () => {},
          addAction: () => {},
          addDelayedAction: () => {},
          endGame: (party, message) => {
            setRoom({
              id: room.id,
              type: 'werewolf-lobby',
              lobbyPlayers: room.lobbyPlayers || [],
              spectators: [],
              victoryMessage: message || null,
              werewolfArtifacts: room.initialArtifacts,
              werewolfModerators: room.moderators,
              werewolfOptions: room.options,
              werewolfRoles: room.initialRoles,
            })
          },
        }}>
        <WerewolfSpectateGame />
      </WerewolfGameContext.Provider>
    )
  }

  return (
    <WerewolfGameContext.Provider
      value={{
        updateGamePlayer: updatePlayer,
        game: room,
        player: currentPlayer || player,
        updateGame: updateRoom,
        runActions: actions => updateRoom(runActions(room, actions)),
        addAction: action => addAction(action, room),
        addDelayedAction: action => addDelayedAction(action, room),
        endGame: (party, message) => {
          setRoom({
            id: room.id,
            type: 'werewolf-lobby',
            lobbyPlayers: room.lobbyPlayers || [],
            victoryMessage: message || null,
            spectators: [],
            werewolfArtifacts: room.initialArtifacts,
            werewolfModerators: room.moderators,
            werewolfOptions: room.options,
            werewolfRoles: room.initialRoles,
          })
        },
      }}>
      <GameContainer>
        {isModerator(player, room) &&
          (!room.ready ? (
            <WerewolfModeratorSetup />
          ) : (
            <WerewolfModeratorGame />
          ))}

        {!isModerator(player, room) &&
          (!room.ready ? <WerewolfPlayerSetup /> : <WerewolfPlayerGame />)}
      </GameContainer>
    </WerewolfGameContext.Provider>
  )
}
