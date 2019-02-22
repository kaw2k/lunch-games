import { Player, PlayerId } from '../../../interfaces/player'
import { ArtifactState } from './artifact'
import { Roles } from './card'

export interface PlayerWerewolf extends Player {
  ready: boolean
  alive: boolean
  role: Roles
  // Sometimes a player can gain a secondary role.
  // If that is the case they wake up by name
  secondaryRole: Roles | null
  artifacts: ArtifactState[]

  // If I die, these people die too
  linkedTo: PlayerId[]

  // Role specifics
  inCult: PlayerId[]
  isGuarded: boolean
  isBlessed: false | PlayerId | 'attacked'
}