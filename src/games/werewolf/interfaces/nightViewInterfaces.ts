import { PlayerWerewolf } from './player'
import { Actions } from './actions'
import { Roles } from './card/cards'

interface ByRole {
  type: 'by role'
  player: PlayerWerewolf | null | undefined
  role: Roles
}

interface ByName {
  type: 'by name'
  player: PlayerWerewolf
  role: Roles
}

interface ByTeam {
  type: 'by team'
  players: PlayerWerewolf[]
  role: Roles
}

export type NightPrompt = ByTeam | ByRole | ByName

interface NightViewPropsBase {
  done: (actions: Actions[]) => void
}

export type NightViewProps = NightViewPropsBase & NightPrompt
