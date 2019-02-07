import { Role } from './game'
import { Player } from '../../../interfaces/player'

export interface PlayerSecretHitler extends Player {
  living: boolean
  role: Role
  ready: boolean
}
