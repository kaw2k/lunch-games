import { Player, PlayerId } from '../../interfaces/player'
import { Artifact } from './artifact'
import { Roles } from './role'

export interface PlayerWerewolf extends Player {
  ready: boolean
  alive: boolean
  role: Roles
  // Sometimes a player can gain a secondary role.
  // If that is the case they wake up by name
  secondaryRole: Roles | null
  artifact: Artifact | null

  // Role specifics
  inCult: PlayerId | null
  isGuarded: boolean
  isBlessed: boolean
}
