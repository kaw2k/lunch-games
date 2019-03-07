import { BloodOfTheDiseased } from './bloodOfTheDiseased'
import { ScepterOfRebirth } from './scepterOfRebirth'
import { SkimmerOfTheCursed } from './skimmerOfTheCursed'
import { OnyxOfDestruction } from './onyxOfDestruction'
import { OrbOfSpeculation } from './orbOfSpeculation'
import { Artifact } from '.'
import { ShroudOfShame } from './shroudOfShame'
import { MirrorOfTheDoppleganger } from './mirrorOfTheDoppleganger'
import { BreathOfTheOldMan } from './breathOfTheOldMan'
import { ShieldOfTheBodyguard } from './shieldOfTheBodyguard'
import { PlayerId } from '../../../../interfaces/player'

export interface ArtifactState {
  type: Artifacts
  performedMorningAction: boolean
  state: any
  linked?: null | PlayerId // If a player copies your artifact, give them an active artifact when your is played
  activated: 'unplayed' | 'playing' | 'played'
}
export function ArtifactState(type: Artifacts): ArtifactState {
  return {
    type,
    activated: 'unplayed',
    performedMorningAction: false,
    state: null,
  }
}

export const Artifacts = [
  BloodOfTheDiseased,
  ScepterOfRebirth,
  SkimmerOfTheCursed,
  OnyxOfDestruction,
  OrbOfSpeculation,
  ShroudOfShame,
  MirrorOfTheDoppleganger,
  BreathOfTheOldMan,
  ShieldOfTheBodyguard,
]
export type Artifacts = (typeof Artifacts)[0]['type']

export function getArtifact(type: Artifacts): Artifact<Artifacts> {
  return Artifacts.find(artifact => artifact.type === type) as Artifact<
    Artifacts
  >
}
