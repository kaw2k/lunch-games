import { PlayerWerewolf } from './player'
import { Actions } from './actions'

export interface NightViewProps {
  player: PlayerWerewolf
  callByName?: boolean
  done: (actions: Actions[]) => void
}
