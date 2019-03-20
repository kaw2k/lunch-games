import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { eatBrains, showPrompts } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView, ByMessage } from '../prompt'
import { playerName } from '../../../../components/playerName'
import { Id } from '../../../../helpers/id'

const nightTitle = `Zombie, wake up!`
const description = `You may eat someones brains, they will no longer be able to vote.`

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId)
    return <NoNightActionView done={() => done([])} data={nightTitle} />

  const player = game.players[playerId]

  return (
    <>
      <NightViewBase done={done} title={nightTitle} prompt={prompt}>
        <ChoosePlayers
          removePlayer={player}
          description={description}
          doneText="eat their brains"
          onDone={([target]) => {
            done([
              eatBrains({ target }),
              showPrompts({
                prompts: [
                  ByMessage({
                    message: `${playerName(
                      target,
                      game
                    )} has had their brains eaten. They may no longer vote.`,
                  }),
                ],
              }),
            ])
          }}
          players={values(game.players).filter(p => !p.areBrainsEaten)}>
          {props => <WerewolfProfile key={props.player.id} {...props} />}
        </ChoosePlayers>
      </NightViewBase>
    </>
  )
}

export const Zombie = Card({
  role: 'zombie',
  weight: -3,
  team: 'zombie',
  emoji: Emoji('🧟‍♂️'),
  cardCount: 1,
  description: `Each night, pick a player and eat their brains. That player may no longer vote. If all players have no brains, you win.`,
  hints: [],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  randomlySelectable: false,
  appearsBad: always(false),
  night: {
    title: nightTitle,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.misc,
  },
})
