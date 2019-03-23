import { WerewolfGame } from '../interfaces/game'
import values from 'ramda/es/values'
import { isWerewolf, doesFangFaceWakeUp } from './isWerewolf'
import { getCard, Roles, hasRole, isRole } from '../interfaces/card/cards'
import { getGameRoles } from './getGameRoles'
import { getPlayerByRole } from './getPlayersByRole'
import { Prompts, ByTeam, ByMessage } from '../interfaces/prompt'
import { Id } from '../../../helpers/id'
import { Werewolf } from '../interfaces/card/werewolf'
import { FangFace } from '../interfaces/card/fangFace'
import { Sasquatch } from '../interfaces/card/sasquatch'

function getWerewolves(game: WerewolfGame) {
  return values(game.players)
    .filter(p => {
      return (
        (isRole(p, FangFace.role) && doesFangFaceWakeUp(p, game)) ||
        (!isRole(p, FangFace.role) && isWerewolf(p, game))
      )
    })
    .map(p => p.id)
}

export function makeNightPrompts(game: WerewolfGame): Prompts[] {
  let prompts: Prompts[] = []

  // Check for sasquatch
  // ----------------------------
  if (hasRole(Sasquatch.role, game) && !game.killedAtDay.length) {
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
      role: Werewolf.role,
    },
  ]
  prompts = prompts.concat(teams)

  return prompts
    .filter(prompt => {
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
    .sort((a, b) => {
      if (a.type === 'by message' || b.type === 'by message') return 0
      if (a.type === 'by artifact' || b.type === 'by artifact') return 0
      if (a.type === 'by name' || b.type === 'by name') return 1

      return getCard(a.role).night!.order - getCard(b.role).night!.order
    })
}
