import { PromptView, ByArtifact, PromptViewProps } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { PlayerId } from '../../../../interfaces/player'
import { WerewolfGame } from '../game'

// =======================================
// BASE TYPE
// =======================================
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
  // If you require user input...
  ActivateView?: PromptView<ByArtifact>
  // If you don't need a full component but just to do some stuff...
  ActivateCallback?: (
    props: PromptViewProps<ByArtifact> & { game: WerewolfGame }
  ) => void
  MorningView?: PromptView<ByArtifact>
  OnDeathView?: PromptView
}

export const Artifact = <Type extends ArtifactType>(
  artifact: Artifact<Type>
): Artifact<Type> => artifact

// =======================================
// STATE
// =======================================
export interface ArtifactState {
  type: ArtifactType
  state: any
  linked?: null | PlayerId // If a player copies your artifact, give them an active artifact when your is played
  activated: 'unplayed' | 'playing' | 'played'
}
export function ArtifactState(
  type: ArtifactType,
  state: Partial<ArtifactState> = {}
): ArtifactState {
  return {
    type,
    activated: 'unplayed',
    state: null,
    ...state,
  }
}
