import * as React from 'react'
import { Werewolf } from '../interfaces/game'
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

export const isWerewolf = (room: Room): room is Werewolf =>
  room.type === 'werewolf-game' || room.type === 'werewolf-lobby'

export const WerewolfView: React.SFC<{ room: Werewolf }> = ({ room }) => {
  const { player, setRoom, updateRoom } = React.useContext(RoomContext)
  const { updatePlayer } = React.useContext(RoomContext)

  function toggleModerator() {
    if (room.moderators.find(pid => pid === player.id)) {
      setRoom({
        ...room,
        moderators: room.moderators.filter(pid => pid !== player.id),
      })
    } else {
      setRoom({
        ...room,
        moderators: room.moderators.concat(player.id),
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
          toggleModerator={toggleModerator}
        />
      )
    } else {
      return (
        <WerewolfPlayerLobby lobby={room} toggleModerator={toggleModerator} />
      )
    }
  }

  const currentPlayer = room.players[player.id]

  if (!currentPlayer && !isModerator(player, room)) {
    return <WerewolfSpectateGame game={room} />
  }

  return (
    <WerewolfGameContext.Provider
      value={{
        updateGamePlayer: updatePlayer,
        game: room,
        player: currentPlayer || player,
        updateGame: updateRoom,
        addAction: action => addAction(action, room),
        addDelayedAction: action => addDelayedAction(action, room),
        endGame: (party, message) => {
          setRoom({
            id: room.id,
            type: 'werewolf-lobby',
            lobbyPlayers: room.lobbyPlayers || [],
            victoryMessage: message || null,
            artifacts: room.initialArtifacts,
            moderators: room.moderators,
            options: room.options,
            roles: room.initialRoles,
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
