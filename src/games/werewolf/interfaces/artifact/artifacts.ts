import { BloodOfTheDiseased } from './bloodOfTheDiseased'
import { ScepterOfRebirth } from './scepterOfRebirth'
import { SkimmerOfTheCursed } from './skimmerOfTheCursed'
import { OnyxOfDestruction } from './onyxOfDestruction'
import { OrbOfSpeculation } from './orbOfSpeculation'
import { Artifact } from '.'

export interface ArtifactState {
  type: Artifacts
  activated: boolean
  state: any
}
export function ArtifactState(type: Artifacts): ArtifactState {
  return {
    type,
    activated: false,
    state: null,
  }
}

export const Artifacts = [
  BloodOfTheDiseased,
  ScepterOfRebirth,
  SkimmerOfTheCursed,
  OnyxOfDestruction,
  OrbOfSpeculation,
]
export type Artifacts = (typeof Artifacts)[0]['type']

export function getArtifact(type: Artifacts): Artifact<Artifacts> {
  return Artifacts.find(artifact => artifact.type === type) as Artifact<
    Artifacts
  >
}
