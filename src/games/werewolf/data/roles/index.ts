import { Bodyguard } from './bodyguard'
import { CultLeader } from './cultleader'
import { Cursed } from './cursed'
import { Mayor } from './mayor'
import { Priest } from './priest'
import { Tanner } from './tanner'
import { Villager } from './villager'
import { Werewolf } from './werewolf'
import { Card } from '../../interfaces/card'
import { VAWolf } from './vaWolf'

export const AllCards = [
  Bodyguard,
  CultLeader,
  Cursed,
  Mayor,
  Priest,
  Tanner,
  Villager,
  Werewolf,
  VAWolf,
]

export type Roles = (typeof AllCards)[0]['role']
export const Roles = AllCards.map(role => role.role)

export const getCard = <Role extends Roles>(role: Role): Card<Role> =>
  AllCards.find(r => r.role === role) as Card<Role>
