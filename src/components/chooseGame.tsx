import * as React from 'react'
import { SecretHitlerLobby } from '../games/secret-hitler/interfaces/game'
import { AvalonLobby } from '../games/avalon/interfaces/game'
import { RoomContext } from '../helpers/contexts'
import { Lobby, Room } from '../interfaces/room'
import { WerewolfLobby } from '../games/werewolf/interfaces/game'
import { Omit } from '@material-ui/core'
import mergeDeepLeft from 'ramda/es/mergeDeepLeft'
import { MurderLobby } from '../games/murder/interfaces/game'

type LobbyType<T extends Room['type']> = T extends 'lobby'
  ? Lobby
  : T extends 'secret-hitler-lobby'
  ? SecretHitlerLobby
  : T extends 'avalon-lobby'
  ? AvalonLobby
  : T extends 'werewolf-lobby'
  ? WerewolfLobby
  : T extends 'murder-lobby'
  ? MurderLobby
  : never

export const ChooseGame: React.SFC<{}> = () => {
  const { updateRoom: _updateRoom, room } = React.useContext(RoomContext)

  function updateRoom<T extends Room['type']>(
    type: T,
    props: Omit<LobbyType<T>, keyof Lobby>
  ) {
    _updateRoom({ ...mergeDeepLeft(room, props), type } as Room)
  }

  const lobby: Lobby['type'] = 'lobby'
  const secretHitler: SecretHitlerLobby['type'] = 'secret-hitler-lobby'
  const avalon: AvalonLobby['type'] = 'avalon-lobby'
  const werewolf: WerewolfLobby['type'] = 'werewolf-lobby'
  const murder: MurderLobby['type'] = 'murder-lobby'

  return (
    <div>
      <select
        value={room.type}
        onChange={e => {
          const game = e.target.value as Room['type']

          if (game === lobby || game === secretHitler) {
            updateRoom(game, {})
          } else if (game === avalon) {
            updateRoom('avalon-lobby', {
              avalonLadyOfTheLake: false,
              avalonExcalibur: false,
              avalonRoles: [],
            })
          } else if (game === werewolf) {
            updateRoom('werewolf-lobby', {
              werewolfArtifacts: [],
              werewolfRoles: [],
              werewolfModerators: [],
              werewolfOptions: {
                boogymanOP: false,
                ghost: false,
                killCult: true,
                noFlip: true,
                moderatorOnly: false,
                dayTimeLimit: 120,
                beholderSeesAllSeers: false,
                nightTimeLimit: 0,
                cursedArtifactAlwaysActive: false,
                werewolfArtifactAlwaysActive: false,
                madBomberOnlyKillsAdjacent: true,
                sasquatchIsChill: true,
                protectWolves: false,
                luckyLeprechaun: false,
              },
            })
          } else if (game === murder) {
            updateRoom('murder-lobby', {
              murderRoles: [],
            })
          }
        }}>
        <option value={lobby}>Select a game</option>
        <option value={avalon}>Avalon</option>
        <option value={secretHitler}>Secret Hitler</option>
        <option value={werewolf}>Werewolf</option>
        <option value={murder}>Murder</option>
      </select>
    </div>
  )
}
