import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { CardRole } from '../../../../helpers/id'
import { WerewolfGame } from '../game'
import { PlayerWerewolf } from '../player'
import { isRole } from './cards'
import values from 'ramda/es/values'

export const Sasquatch = Card({
  role: CardRole('sasquatch'),
  weight: -2,
  team: 'villagers',
  emoji: Emoji('😴'),
  cardCount: 1,
  description: `You are on the village team unless a day ends without someone dying. If that happens you switch to the werewolf team.`,
  hints: [
    `You always appear bad to the seer regardless of what team you are on.`,
    `When you switch teams you transform into a werewolf.`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  appearsBad: always(true),
  SetupRoleView: GenericSetupRoleView,
})

export function shouldAnnounceSasquatch(game: WerewolfGame): boolean {
  return !!values(game.players).find(
    p => isRole(p, Sasquatch.role) && p.sasquatchWakesUp === 'transforming'
  )
}

export function setSasquatchWakeUpState(
  player: PlayerWerewolf,
  game: WerewolfGame
): PlayerWerewolf['sasquatchWakesUp'] {
  if (!isRole(player, Sasquatch.role)) return false

  const state = player.sasquatchWakesUp
  const isChill = game.options.sasquatchIsChill

  if (state === 'transforming') return 'wolf'
  if (state === 'wolf') return 'wolf'
  if (isChill && game.day === 0) return false
  if (!game.killedAtDay.length) return 'transforming'

  return state
}
