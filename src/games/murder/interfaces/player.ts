import { Player } from '../../../interfaces/player'
import { Role, Party } from './game'

export interface PlayerMurder extends Player {
  ready: boolean
  role: Role
  party: Party
}
