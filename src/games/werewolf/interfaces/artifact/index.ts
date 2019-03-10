import { PromptView, ByArtifact } from '../prompt'

export interface Artifact<Type extends string> {
  type: Type
  title: string
  description: string
  infinite: boolean
  category:
    | 'Inspection'
    | 'Killing'
    | 'Imitate Role'
    | 'Chaos'
    | 'Misc'
    | 'Rebirth'
    | 'Target Other Artifacts'
  ActivateView?: PromptView<ByArtifact>
  MorningView?: PromptView<ByArtifact>
  OnDeathView?: PromptView
}

export const Artifact = <Type extends string>(
  artifact: Artifact<Type>
): Artifact<Type> => artifact
