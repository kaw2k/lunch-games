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
import { playerName } from '../../../../components/playerName'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const title = 'Mystic Seer, wake up! Inspect someone!'

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
        doneText="inspect"
        players={values(game.players).filter(p => p.alive)}
        onDone={([target]) => {
          alert(
            `${playerName(target)} is a ${target.role} ${target.secondaryRole ||
              ''}`
          )
          done([])
        }}
      />
    </NightViewBase>
  )
}

export const MysticSeer = Card({
  role: CardRole('mystic seer'),
  weight: 9,
  team: 'villagers',
  emoji: Emoji('🔮'),
  cardCount: 1,
  description: `Each night, point to a player and learn their exact role`,
  hints: [
    `If the tanner is in the game, you want to make sure the villagers don't vote to eliminate the tanner`,
    `If the bodyguard is in the game, it is typically safe to come out earlier and ask to be protected.`,
    `If there is no way for you to be protected, you may want to wait until you find more than one werewolf.`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  randomlySelectable: true,
  canFrankensteinAbsorbIt: true,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
