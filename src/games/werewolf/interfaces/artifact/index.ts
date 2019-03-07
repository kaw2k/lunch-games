import { ArtifactState } from './artifacts'
import { SFC } from 'react'
import { PlayerWerewolf } from '../player'
import { PromptView } from '../prompt'

export type ArtifactViewComponent = SFC<{
  artifactState: ArtifactState
  back: () => void
  player: PlayerWerewolf
}>

export interface Artifact<Type extends string> {
  type: Type
  title: string
  description: string
  infinite: boolean
  ActivateView?: ArtifactViewComponent
  MorningView?: ArtifactViewComponent
  OnDeathView?: PromptView
}

export const Artifact = <Type extends string>(
  artifact: Artifact<Type>
): Artifact<Type> => artifact
