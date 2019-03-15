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
import { ApprenticeSeer } from './apprenticeSeer'
import { PlayerWerewolf } from '../player'
import { Doppleganger } from './doppleganger'
import { Lycan } from './lycan'
import { Diseased } from './diseased'
import { Hunter } from './hunter'
import { Direwolf } from './direwolf'
import { FruitBrute } from './fruitBrute'
import { Huntress } from './huntress'
import { WolfCub } from './wolfCub'
import { Witch } from './witch'
import { Mason } from './mason'
import { Sasquatch } from './sasquatch'
import { WerewolfGame } from '../game'
import { values } from 'ramda'
import { PrivateInvestigator } from './privateInvestigator'
import { Pacifist } from './pacifist'
import { VillageIdiot } from './villageIdiot'
import { Prince } from './prince'
import { WolfMan } from './wolfMan'
import { Insomniac } from './insomniac'
import { Sorceress } from './sorceress'
import { Revealer } from './revealer'
import { FangFace } from './fangFace'
import { Leprechaun } from './leprechaun'

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
  ApprenticeSeer,
  Doppleganger,
  Lycan,
  Diseased,
  Hunter,
  Direwolf,
  FruitBrute,
  Huntress,
  WolfCub,
  Witch,
  Mason,
  Sasquatch,
  PrivateInvestigator,
  Pacifist,
  VillageIdiot,
  WolfMan,
  Prince,
  Insomniac,
  Sorceress,
  Revealer,
  FangFace,
  Leprechaun,
]

export const Roles = Cards.map(role => role.role)
export type Roles = Unpack<typeof Roles>

export const getCard = <Role extends Roles>(role: Role): Card<Role> =>
  Cards.find(r => r.role === role) as Card<Role>

export function isRole(player: PlayerWerewolf, role: Roles): boolean {
  return player.role === role || player.secondaryRole === role
}

export function hasRole(role: Roles, game: WerewolfGame): boolean {
  return !!values(game.players).find(p => p.alive && isRole(p, role))
}
