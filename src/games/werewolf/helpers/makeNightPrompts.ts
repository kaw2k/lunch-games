import { WerewolfGame } from '../interfaces/game'
import values from 'ramda/es/values'
import { isWerewolf, doesFangFaceWakeUp } from './isWerewolf'
import { getCard, Roles, hasRole } from '../interfaces/card/cards'
import { getGameRoles } from './getGameRoles'
import { getPlayerByRole } from './getPlayersByRole'
import { Prompts, ByTeam, ByMessage } from '../interfaces/prompt'
import { Id } from '../../../helpers/id'

function getWerewolves(game: WerewolfGame) {
  return values(game.players)
    .filter(p => isWerewolf(p, game) && doesFangFaceWakeUp(p, game))
    .map(p => p.id)
}

export function makeNightPrompts(game: WerewolfGame): Prompts[] {
  let prompts: Prompts[] = []

  // Check for sasquatch
  // ----------------------------
  if (hasRole('sasquatch', game) && !game.killedAtDay.length) {
    const sasquatchPrompt: ByMessage = {
      id: Id(),
      type: 'by message',
      message: `No one died today, sasquatch has transformed into a werewolf`,
    }
    prompts = prompts.concat(sasquatchPrompt)
  }

  // Check for secondary roles
  // ----------------------------
  prompts = prompts.concat(
    values(game.players)
      .filter(p => p.alive && p.secondaryRole)
      .map<Prompts>(p => ({
        type: 'by name',
        id: Id(),
        player: p.id,
        role: p.secondaryRole as Roles,
      }))
  )

  // Check for primary roles
  // ----------------------------
  prompts = prompts.concat(
    getGameRoles(game)
      .filter(role => getCard(role).night && role !== 'werewolf')
      .sort((a, b) => getCard(a).night!.order - getCard(b).night!.order)
      .map<Prompts>(role => {
        const p = getPlayerByRole(role, game)
        return {
          type: 'by role',
          id: Id(),
          player: p && p.id,
          role: role,
        }
      })
  )

  // Add any teams
  // ----------------------------
  const teams: ByTeam[] = [
    {
      id: Id(),
      type: 'by team',
      players: getWerewolves(game),
      role: 'werewolf',
    },
  ]
  prompts = prompts.concat(teams)

  return prompts.filter(prompt => {
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
