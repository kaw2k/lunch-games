import { WerewolfGame } from '../interfaces/game'
import values from 'ramda/es/values'
import { isWerewolf } from './isWerewolf'
import { getCard, Roles } from '../interfaces/card/cards'
import { getGameRoles } from './getGameRoles'
import { getPlayerByRole } from './getPlayersByRole'
import { Prompts } from '../interfaces/prompt'

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
        player: p.id,
        role: p.secondaryRole as Roles,
      })),

    // All the night roles that are not team based
    ...getGameRoles(game)
      .filter(role => getCard(role).night)
      .sort((a, b) => getCard(a).night!.order - getCard(b).night!.order)
      .map<Prompts>(role => {
        if (role === 'werewolf') {
          return {
            type: 'by team',
            players: getWerewolves(game),
            role: 'werewolf',
          }
        }

        const p = getPlayerByRole(role, game)
        return {
          type: 'by role',
          player: p && p.id,
          role: role,
        }
      }),
  ]
}
