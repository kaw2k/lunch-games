import { PlayerWerewolf } from '../player'
import { WerewolfGame } from '../game'
import { Actions } from '../actions'
import { BloodOfTheDiseased } from './bloodOfTheDiseased'
import { SkimmerOfTheCursed } from './skimmerOfTheCursed'
import { ScepterOfRebirth } from './scepterOfRebirth'
import { OnyxOfDestruction } from './onyxOfDestruction'
import { OrbOfSpeculation } from './orbOfSpeculation'

// ===========================
// Types and Constructors
// ===========================
export interface Artifact<Type extends string> {
  type: Type
  action: null | UpdateFn
  setup: null | UpdateFn
  morningAction: null | UpdateFn
  postDeathAction: null | UpdateFnWithAction
  title: string
  description: string
  infinite: boolean
}

// The state stored in the user object
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

type UpdateFn = (
  artifactState: ArtifactState,
  player: PlayerWerewolf,
  game: WerewolfGame
) => WerewolfGame

type UpdateFnWithAction = (
  artifactState: ArtifactState,
  killType: Actions,
  player: PlayerWerewolf,
  game: WerewolfGame
) => WerewolfGame

export const Artifact = <Type extends string>(
  artifact: Artifact<Type>
): Artifact<Type> => artifact

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
