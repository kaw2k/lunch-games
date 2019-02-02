import { Player } from '../../interfaces/player'
import { Hash } from '../../interfaces/hash'
import { RoomId } from '../../interfaces/room'
import { Roles } from './role'
import { PlayerWerewolf } from './player'

// ==========================
// Game
// ==========================
export interface WerewolfGame {
  type: 'werewolf-game'
  id: RoomId

  initialRoles: Roles[]

  lobbyPlayers: Player[]
  players: Hash<PlayerWerewolf>

  message?: string

  options: {
    timeLimit: number
    boogymanOP: boolean
    noFlip: boolean
    ghost: boolean
    killCult: boolean
  }
}
