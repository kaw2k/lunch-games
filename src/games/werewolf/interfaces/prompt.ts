import { FC } from 'react'
import { Actions } from './actions'
import { Roles } from './card/cards'
import { PlayerId } from '../../../interfaces/player'
import { ArtifactState } from './artifact'
import { Id } from '../../../helpers/id'

export interface ByRole {
  id: Id
  type: 'by role'
  player: PlayerId | null | undefined
  role: Roles
}
export function ByRole(props: Pick<ByRole, 'player' | 'role'>): ByRole {
  return {
    type: 'by role',
    id: Id(),
    ...props,
  }
}

export interface ByName {
  id: Id
  type: 'by name'
  player: PlayerId
  role: Roles
}
export function ByName(props: Pick<ByName, 'player' | 'role'>): ByName {
  return {
    type: 'by name',
    id: Id(),
    ...props,
  }
}

export interface ByTeam {
  id: Id
  type: 'by team'
  players: PlayerId[]
  role: Roles
}
export function ByTeam(props: Pick<ByTeam, 'players' | 'role'>): ByTeam {
  return {
    type: 'by team',
    id: Id(),
    ...props,
  }
}

export interface ByArtifact {
  id: Id
  type: 'by artifact'
  player: PlayerId
  artifact: ArtifactState
}
export function ByArtifact(
  props: Pick<ByArtifact, 'player' | 'artifact'>
): ByArtifact {
  return {
    type: 'by artifact',
    id: Id(),
    ...props,
  }
}

export interface ByMessage {
  id: Id
  type: 'by message'
  player?: PlayerId
  message: string
  secret?: boolean
}
export function ByMessage(
  props: Pick<ByMessage, 'player' | 'message' | 'secret'>
): ByMessage {
  return {
    type: 'by message',
    id: Id(),
    ...props,
  }
}

export type Prompts = ByRole | ByName | ByTeam | ByMessage | ByArtifact

export interface PromptViewProps<P = Prompts> {
  done: (actions: Actions[]) => void
  prompt: P
}

export type PromptView<P = Prompts> = FC<PromptViewProps<P>>
