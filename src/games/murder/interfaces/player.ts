import { Player } from '../../../interfaces/player'
import { Role } from './game'

export interface PlayerMurder extends Player {
  ready: boolean
  role: Role
  selectedCards?: {
    evidence: number
    weapon: number
  }
}
