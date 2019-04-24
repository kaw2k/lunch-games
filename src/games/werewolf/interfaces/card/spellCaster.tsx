import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { showPrompts } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView, ByMessage } from '../prompt'
import { playerName } from '../../../../components/playerName'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const nightTitle = `Spell Caster, wake up!`
const description = `Choose a player, they may not speak the following day`

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId)
    return <NoNightActionView done={() => done([])} data={nightTitle} />

  return (
    <NightViewBase done={done} title={nightTitle} prompt={prompt}>
      <ChooseWerewolfPlayer
        description={description}
        doneText="silence"
        players={values(game.players).filter(p => p.alive)}
        onDone={([target]) => {
          done([
            showPrompts({
              prompts: [
                ByMessage({
                  message: `${playerName(
                    target
                  )} has been silenced, they may not speak today.`,
                }),
              ],
            }),
          ])
        }}
      />
    </NightViewBase>
  )
}

export const SpellCaster = Card({
  role: CardRole('spell caster'),
  weight: 1,
  team: 'villagers',
  emoji: Emoji('🧝‍♀️'),
  cardCount: 1,
  description: `Every night you get to silence someone. That person can't speak the following day.`,
  hints: [`Have fun with it!`],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/spell-caster.png'),
  profile: require('../../static/spell-caster-profile.png'),
  randomlySelectable: true,
  appearsBad: always(false),
  night: {
    title: nightTitle,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.misc,
  },
})
