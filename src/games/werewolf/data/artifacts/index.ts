import { Artifact } from '../../interfaces/artifact'
import { BloodOfTheDiseased } from './bloodOfTheDiseased'
import { SkimmerOfTheCursed } from './skimmerOfTheCursed'
import { ScepterOfRebirth } from './scepterOfRebirth'

export const AllArtifacts = [
  BloodOfTheDiseased,
  ScepterOfRebirth,
  SkimmerOfTheCursed,
]
export type AllArtifacts = (typeof AllArtifacts)[0]['type']

export function getArtifact(type: AllArtifacts): Artifact<AllArtifacts> {
  return AllArtifacts.find(artifact => artifact.type === type) as Artifact<
    AllArtifacts
  >
}
