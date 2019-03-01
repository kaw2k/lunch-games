import { BloodOfTheDiseased } from './bloodOfTheDiseased'
import { ScepterOfRebirth } from './scepterOfRebirth'
import { SkimmerOfTheCursed } from './skimmerOfTheCursed'
import { OnyxOfDestruction } from './onyxOfDestruction'
import { OrbOfSpeculation } from './orbOfSpeculation'
import { Artifact } from '.'
import { ShroudOfShame } from './shroudOfShame'
import { MirrorOfTheDoppleganger } from './mirrorOfTheDoppleganger'

export interface ArtifactState {
  type: Artifacts
  activated: boolean
  performedMorningAction: boolean
  state: any
}
export function ArtifactState(type: Artifacts): ArtifactState {
  return {
    type,
    activated: false,
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
]
export type Artifacts = (typeof Artifacts)[0]['type']

export function getArtifact(type: Artifacts): Artifact<Artifacts> {
  return Artifacts.find(artifact => artifact.type === type) as Artifact<
    Artifacts
  >
}
