import { Player, PlayerId } from '../../../interfaces/player'
import { Role, Weapon, Evidence } from './game'
import { EvidenceId, WeaponId } from '../../../helpers/id'

export interface PlayerMurder extends Player {
  ready: boolean
  role: Role

  hasGuessed?: { player: PlayerId; weapon: WeaponId; evidence: EvidenceId }

  weapons: Weapon[]
  markedWeapons: WeaponId[]

  evidence: Evidence[]
  markedEvidences: EvidenceId[]

  murderItems?: {
    evidence: Evidence
    weapon: Weapon
  }
}

export function isGuessCorrect(
  player: PlayerMurder,
  weapon: WeaponId,
  evidence: EvidenceId
): boolean {
  return (
    !!player.murderItems &&
    player.murderItems.evidence.id === evidence &&
    player.murderItems.weapon.id === weapon
  )
}
