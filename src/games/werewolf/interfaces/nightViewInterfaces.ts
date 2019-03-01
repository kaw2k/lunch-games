import { Actions } from './actions'
import { Roles } from './card/cards'
import { PlayerId } from '../../../interfaces/player'

interface ByRole {
  type: 'by role'
  player: PlayerId | null | undefined
  role: Roles
}

interface ByName {
  type: 'by name'
  player: PlayerId
  role: Roles
}

interface ByTeam {
  type: 'by team'
  players: PlayerId[]
  role: Roles
}

export type NightPrompt = ByTeam | ByRole | ByName

interface NightViewPropsBase {
  done: (actions: Actions[]) => void
}

export type NightViewProps = NightViewPropsBase & NightPrompt
