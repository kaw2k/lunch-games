import { Bodyguard } from './bodyguard'
import { CultLeader } from './cultleader'
import { Cursed } from './cursed'
import { Mayor } from './mayor'
import { Priest } from './priest'
import { Tanner } from './tanner'
import { Villager } from './villager'
import { Werewolf } from './werewolf'
import { VAWolf } from './vaWolf'
import { MadBomber } from './madBomber'
import { Unpack } from '../../../../helpers/unpack'
import { Card } from '.'
import { Chewks } from './chewks'
import { Seer } from './seer'

export const Cards = [
  Bodyguard,
  CultLeader,
  Cursed,
  Mayor,
  Priest,
  Tanner,
  Villager,
  Werewolf,
  VAWolf,
  MadBomber,
  Chewks,
  Seer,
]

export const Roles = Cards.map(role => role.role)
export type Roles = Unpack<typeof Roles>

export const getCard = <Role extends Roles>(role: Role): Card<Role> =>
  Cards.find(r => r.role === role) as Card<Role>
