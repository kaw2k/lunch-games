import { FC } from 'react'
import { Actions } from './actions'
import { Roles } from './card/cards'
import { PlayerId } from '../../../interfaces/player'
import { ArtifactState } from './artifact/artifacts'
import { Id } from '../../../helpers/id'

export interface ByRole {
  id: Id
  type: 'by role'
  player: PlayerId | null | undefined
  role: Roles
}
export interface ByName {
  id: Id
  type: 'by name'
  player: PlayerId
  role: Roles
}

export interface ByTeam {
  id: Id
  type: 'by team'
  players: PlayerId[]
  role: Roles
}

export interface ByArtifact {
  id: Id
  type: 'by artifact'
  player: PlayerId
  artifact: ArtifactState
}

export interface ByMessage {
  id: Id
  type: 'by message'
  player?: PlayerId
  message: string
}

export type Prompts = ByRole | ByName | ByTeam | ByMessage | ByArtifact

export interface PromptViewProps<P = Prompts> {
  done: (actions: Actions[]) => void
  prompt: P
}

export type PromptView<P = Prompts> = FC<PromptViewProps<P>>
