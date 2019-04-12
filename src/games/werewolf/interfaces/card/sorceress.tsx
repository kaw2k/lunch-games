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
import { isRole } from './cards'
import { PromptView } from '../prompt'
import { playerName } from '../../../../components/playerName'
import { CardRole } from '../../../../helpers/id'
import { Seer } from './seer'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const title = 'Sorceress, wake up!'
const description = 'Inspect someone, I will tell you if they are the seer.'

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
        doneText="inspect"
        onDone={([target]) => {
          const isSeer = isRole(target, Seer.role)

          alert(
            isSeer
              ? `${playerName(target)} is the seer`
              : `${playerName(target)} is not the seer`
          )
          done([])
        }}
        players={values(game.players).filter(p => p.alive)}
      />
    </NightViewBase>
  )
}

export const Sorceress = Card({
  role: CardRole('sorceress'),
  weight: -3,
  team: 'werewolves allies',
  emoji: Emoji('🧙‍♀️'),
  cardCount: 1,
  description: `You're on the Werewolf team but appear as a villager. You don't know who anyone on the Werewolf team is. Each night, you can pick someone and you're told if they're the Seer.`,
  hints: [
    `After the first or second night, try coming out as the Seer and claiming someone else is bad. The real Seer may come out to contradict you.`,
    `Your job is to help the Werewolves find the seer. Try acting very suspicious to draw the attention away from the Werewolves.`,
  ],
  image: require('../../static/sorceress.png'),
  profile: require('../../static/sorceress-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  randomlySelectable: true,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
