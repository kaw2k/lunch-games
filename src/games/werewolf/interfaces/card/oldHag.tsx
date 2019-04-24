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

const nightTitle = `Old Hag, wake up!`
const description = `Choose a player who must leave the room at dawn. They may not be lynched that day.`

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
        doneText="banish"
        players={values(game.players).filter(p => p.alive)}
        onDone={([target]) => {
          done([
            showPrompts({
              prompts: [
                ByMessage({
                  message: `${playerName(
                    target
                  )} has been banished, leave the room. You can come in again at night.`,
                }),
              ],
            }),
          ])
        }}
      />
    </NightViewBase>
  )
}

export const OldHag = Card({
  role: CardRole('old hag'),
  weight: 1,
  team: 'villagers',
  emoji: Emoji('👵'),
  cardCount: 1,
  description: `Each night, choose a player who must leave the room during the next day. That player cannot be voted on to be eliminated.`,
  hints: [],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/old-hag.png'),
  profile: require('../../static/old-hag-profile.png'),
  randomlySelectable: true,
  appearsBad: always(false),
  night: {
    title: nightTitle,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.misc,
  },
})
