import { PlayerWerewolf } from './player'
import { Actions } from './actions'

export interface NightViewProps {
  player: PlayerWerewolf
  callByName?: boolean
  done: (actions: Actions[]) => void
}

export function secondaryNightMessage(player: PlayerWerewolf): string {
  return `${player.name || player.id}, wake up! Do the thing!`
}
