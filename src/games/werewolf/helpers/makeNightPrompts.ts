import { WerewolfGame } from '../interfaces/game'
import values from 'ramda/es/values'
import { isWerewolf } from './isWerewolf'
import { getCard, Roles } from '../interfaces/card/cards'
import { getGameRoles } from './getGameRoles'
import { getPlayerByRole } from './getPlayersByRole'
import { Prompts } from '../interfaces/prompt'
import { Id } from '../../../helpers/id'

function getWerewolves(game: WerewolfGame) {
  return values(game.players)
    .filter(p => isWerewolf(p, game))
    .map(p => p.id)
}

export function makeNightPrompts(game: WerewolfGame): Prompts[] {
  return [
    // Players with secondary roles
    ...values(game.players)
      .filter(p => p.alive && p.secondaryRole)
      .map<Prompts>(p => ({
        type: 'by name',
        id: Id(),
        player: p.id,
        role: p.secondaryRole as Roles,
      })),

    ...getGameRoles(game)
      .filter(role => getCard(role).night)
      .sort((a, b) => getCard(a).night!.order - getCard(b).night!.order)
      .map<Prompts>(role => {
        if (role === 'werewolf') {
          return {
            id: Id(),
            type: 'by team',
            players: getWerewolves(game),
            role: 'werewolf',
          }
        }

        const p = getPlayerByRole(role, game)
        return {
          type: 'by role',
          id: Id(),
          player: p && p.id,
          role: role,
        }
      }),
  ].filter(prompt => {
    if (game.options.noFlip) return true

    if (
      prompt.type === 'by role' &&
      (!prompt.player || !game.players[prompt.player].alive)
    ) {
      return false
    }

    if (
      prompt.type === 'by name' &&
      (!prompt.player || !game.players[prompt.player].alive)
    ) {
      return false
    }

    if (prompt.type === 'by team') {
      return !!prompt.players.find(player => game.players[player].alive)
    }

    return true
  })
}
