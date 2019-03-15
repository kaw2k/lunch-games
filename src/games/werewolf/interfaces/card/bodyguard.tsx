import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { guard } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { PromptView } from '../prompt'

const nightTitle =
  'Bodyguard, wake up! Protect someone, they will not die tonight.'

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <NightViewBase prompt={prompt} done={done} title={nightTitle}>
        <ChoosePlayers
          doneText="protect"
          columns={2}
          onDone={([target]) => {
            done([guard({ target })])
          }}
          players={values(game.players).filter(p => p.alive)}>
          {props => <WerewolfProfile key={props.player.id} {...props} />}
        </ChoosePlayers>
      </NightViewBase>
    </>
  )
}

export const Bodyguard = Card({
  role: 'bodyguard',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('👮‍♀️'),
  cardCount: 1,
  description: `Each night, choose a player who cannot be killed that night.`,
  hints: [
    `Pick yourself to start, if the Seer reveals themselves, start picking them, unless the werewolves know you're the body guard, then protect yourself.`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/bodyguard.png'),
  profile: require('../../static/bodyguard-profile.png'),
  appearsBad: always(false),
  randomlySelectable: true,
  canFrankensteinAbsorbIt: true,
  night: {
    title: nightTitle,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
