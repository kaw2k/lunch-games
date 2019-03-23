import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'

export interface Artifact<Type extends ArtifactType> {
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

export const Artifact = <Type extends ArtifactType>(
  artifact: Artifact<Type>
): Artifact<Type> => artifact
