import { Artifact } from './artifact'
import { Roles } from './role'
import { Player, PlayerId } from '../../../interfaces/player'

export interface PlayerWerewolf extends Player {
  ready: boolean
  alive: boolean
  role: Roles
  // Sometimes a player can gain a secondary role.
  // If that is the case they wake up by name
  secondaryRole: Roles | null
  artifact: Artifact | null

  // Role specifics
  inCult: PlayerId[]
  isGuarded: boolean
  isBlessed: boolean
}
