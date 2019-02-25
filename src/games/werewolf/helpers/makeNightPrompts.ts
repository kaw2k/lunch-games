import { WerewolfGame } from '../interfaces/game'
import values from 'ramda/es/values'
import { isWerewolf } from './isWerewolf'
import { getCard, Roles } from '../interfaces/card/cards'
import { getGameRoles } from './getGameRoles'
import { getPlayerByRole } from './getPlayersByRole'
import { NightPrompt } from '../interfaces/nightViewInterfaces'

function getWerewolves(game: WerewolfGame) {
  return values(game.players).filter(p => isWerewolf(p, game))
}

export function makeNightPrompts(game: WerewolfGame): NightPrompt[] {
  return [
    // Players with secondary roles
    ...values(game.players)
      .filter(p => p.alive && p.secondaryRole)
      .map<NightPrompt>(p => ({
        type: 'by name',
        player: p,
        role: p.secondaryRole as Roles,
      })),

    // All the night roles that are not team based
    ...getGameRoles(game)
      .filter(role => getCard(role).night)
      .sort((a, b) => getCard(a).night!.order - getCard(b).night!.order)
      .map<NightPrompt>(role => {
        if (role === 'werewolf') {
          return {
            type: 'by team',
            players: getWerewolves(game),
            role: 'werewolf',
          }
        }

        return {
          type: 'by role',
          player: getPlayerByRole(role, game),
          role: role,
        }
      }),
  ]
}
