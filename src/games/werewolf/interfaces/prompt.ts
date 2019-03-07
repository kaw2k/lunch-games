import { FC } from 'react'
import { Actions } from './actions'
import { Roles } from './card/cards'
import { PlayerId } from '../../../interfaces/player'
import { ArtifactState } from './artifact/artifacts'

export type Prompts =
  | {
      type: 'by role'
      player: PlayerId | null | undefined
      role: Roles
    }
  | {
      type: 'by name'
      player: PlayerId
      role: Roles
    }
  | {
      type: 'by team'
      players: PlayerId[]
      role: Roles
    }
  | {
      type: 'by artifact'
      player: PlayerId
      artifact: ArtifactState
    }
  | {
      type: 'by message'
      player?: PlayerId
      message: string
    }

export interface PromptViewProps {
  done: (actions: Actions[]) => void
  prompt: Prompts
}

export type PromptView = FC<PromptViewProps>
