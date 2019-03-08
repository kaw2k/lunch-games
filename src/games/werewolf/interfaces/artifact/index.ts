import { PromptView } from '../prompt'
import { ArtifactViewComponent } from './artifacts'

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
