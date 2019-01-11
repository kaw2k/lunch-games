import { Player } from '../../interfaces/player'
import { RoleAvalon } from './game'

export interface PlayerAvalon extends Player {
  ready: boolean
  role: RoleAvalon
  ladyOfTheLake: boolean
}
