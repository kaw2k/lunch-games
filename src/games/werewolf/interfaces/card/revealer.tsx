import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView } from '../prompt'
import { isWerewolf } from '../../helpers/isWerewolf'
import { linkKill } from '../actions'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'
import { isRole } from './cards'
import { Zombie } from './zombie'
import { Chewks } from './chewks'

const title = 'Revealer, wake up! Inspect someone!'
const description = `You may point at someone, if they are a wolf they die, otherwise you die.`

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      <ChooseWerewolfPlayer
        description={description}
        cancelText="no thanx"
        onCancel={() => done([])}
        doneText="kill"
        onDone={([target]) => {
          const wolvesRemain = values(game.players).find(
            p => p.alive && isWerewolf(p, game)
          )

          const isWolf = isWerewolf(target, game)
          const isZombie = isRole(target, Zombie.role)
          const isChewks = isRole(target, Chewks.role)

          const canKill = isWolf || (isChewks && !wolvesRemain) || isZombie

          done([
            canKill
              ? linkKill({ target: target.id })
              : linkKill({ target: playerId }),
          ])
        }}
        players={values(game.players).filter(p => p.alive)}
      />
    </NightViewBase>
  )
}

export const Revealer = Card({
  role: CardRole('revealer'),
  weight: 4,
  team: 'villagers',
  emoji: Emoji('✨️'),
  cardCount: 1,
  description: `Each night you may point to a player. If that player is a werewolf, they die, if not, you die.`,
  hints: [
    `Wait until you are pretty sure someone is suspicious.`,
    `You may only kill chewks if all werewolves are dead`,
    `You can also kill vampires, the boogyman, and the zombie at any time`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  randomlySelectable: true,
  appearsBad: always(false),
  canFrankensteinAbsorbIt: true,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
