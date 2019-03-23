import { WerewolfGame } from '../interfaces/game'
import { getWerewolves } from './isWerewolf'
import { getCard, Roles } from '../interfaces/card/cards'
import { getGameRoles } from './getGameRoles'
import { getPlayerByRole } from './getPlayersByRole'
import { Prompts, ByTeam, ByMessage } from '../interfaces/prompt'
import { Id } from '../../../helpers/id'
import { Werewolf } from '../interfaces/card/werewolf'
import { shouldAnnounceSasquatch } from '../interfaces/card/sasquatch'
import { NightMessageOrder } from '../interfaces/nightMessage'
import { assertNever } from '../../../helpers/assertNever'
import { values, sortBy } from 'ramda'

export function makeNightPrompts(game: WerewolfGame): Prompts[] {
  let prompts: Prompts[] = []

  // Check for sasquatch
  // ----------------------------
  if (shouldAnnounceSasquatch(game)) {
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

  prompts = prompts.filter(prompt => {
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

  prompts = sortBy(prompt => {
    if (prompt.type === 'by message') return NightMessageOrder.none
    if (prompt.type === 'by artifact') return NightMessageOrder.none
    if (prompt.type === 'by team') return NightMessageOrder.werewolf
    if (prompt.type === 'by role') return getCard(prompt.role).night!.order
    if (prompt.type === 'by name') return NightMessageOrder.last

    return assertNever(prompt)
  }, prompts)

  return prompts
}
