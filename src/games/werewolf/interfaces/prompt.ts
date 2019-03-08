import { FC } from 'react'
import { Actions } from './actions'
import { Roles } from './card/cards'
import { PlayerId } from '../../../interfaces/player'
import { ArtifactState } from './artifact/artifacts'
import { Id } from '../../../helpers/id'

export type Prompts =
  | {
      id: Id
      type: 'by role'
      player: PlayerId | null | undefined
      role: Roles
    }
  | {
      id: Id
      type: 'by name'
      player: PlayerId
      role: Roles
    }
  | {
      id: Id
      type: 'by team'
      players: PlayerId[]
      role: Roles
    }
  | {
      id: Id
      type: 'by artifact'
      player: PlayerId
      artifact: ArtifactState
    }
  | {
      id: Id
      type: 'by message'
      player?: PlayerId
      message: string
    }

export interface PromptViewProps {
  done: (actions: Actions[]) => void
  prompt: Prompts
}

export type PromptView = FC<PromptViewProps>
