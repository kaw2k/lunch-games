import { Player } from '../interfaces/player'
import { Lobby } from '../interfaces/room'
import { Omit } from '@material-ui/core'

export function isSpectator<Game extends Omit<Lobby, 'type'>>(
  player: Player,
  game: Game
): boolean {
  return !!game.spectators.find(pid => pid === player.id)
}
