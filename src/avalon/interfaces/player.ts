import { Player } from '../../interfaces/player'
import { Role, Party } from './game'

export interface PlayerAvalon extends Player {
  ready: boolean
  role: Role
  party: Party
  missionVote: null | Party
  ladyOfTheLake: boolean
}
