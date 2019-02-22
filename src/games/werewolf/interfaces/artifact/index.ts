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
export interface Artifact<Type extends string = string> {
  type: Type
  state: ArtifactState<Type>
  actions: ArtifactActions
}

// The state stored in the user object
export interface ArtifactState<Type extends string = string> {
  type: Type
  title: string
  description: string
  infinite: boolean
  activated: boolean
  morningAction: string | null
  state: any
}

// We can't store functions in firebase so separate their
// helper methods into individual chunks
export interface ArtifactActions {
  action: null | UpdateFn
  setup: null | UpdateFn
  morningAction: null | UpdateFn
  postDeathAction: null | UpdateFnWithAction
}

type UpdateFn = (
  artifactState: ArtifactState<any>,
  player: PlayerWerewolf,
  game: WerewolfGame
) => WerewolfGame

type UpdateFnWithAction = (
  artifactState: ArtifactState<any>,
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
