import { Player } from '../../../interfaces/player'
import { RoomId, Lobby } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { PlayerMurder } from './player'
import { Omit } from '@material-ui/core'

export type Party = 'good' | 'bad'
export type Role =
  | 'murderer'
  | 'investigator'
  | 'witness'
  | 'accomplice'
  | 'forensic scientist'

export interface MurderLobby extends Omit<Lobby, 'type'> {
  type: 'murder-lobby'
  murderRoles: Role[]
}

export interface MurderGame {
  type: 'murder-game'
  id: RoomId

  message: null | string

  lobbyPlayers: Player[]
  players: Hash<PlayerMurder>
}

export type Murder = MurderGame | MurderLobby
