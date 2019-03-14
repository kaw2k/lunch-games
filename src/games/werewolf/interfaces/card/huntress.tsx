import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { linkKill, updatePlayer } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView } from '../prompt'

const title =
  'Huntress, wake up! Once per game you may point at someone to kill them.'

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  const player = game.players[playerId]
  const hasUsedPower = !!player.state.huntress

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      {hasUsedPower && (
        <>
          <Typography component="em">
            The huntress has already killed someone
          </Typography>
          <ActionRow fixed>
            <Button color="green" onClick={() => done([])}>
              continue
            </Button>
          </ActionRow>
        </>
      )}

      {!hasUsedPower && (
        <>
          <ChoosePlayers
            columns={2}
            doneText="kill"
            removePlayer={player}
            players={values(game.players).filter(p => p.alive)}
            onDone={([target]) => {
              done([
                linkKill({ target }),
                updatePlayer({
                  target: player.id,
                  updates: {
                    state: {
                      ...player.state,
                      huntress: true,
                    },
                  },
                }),
              ])
            }}>
            {props => <WerewolfProfile key={props.player.id} {...props} />}
          </ChoosePlayers>
        </>
      )}
    </NightViewBase>
  )
}

export const Huntress = Card({
  role: 'huntress',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('🏹️'),
  cardCount: 1,
  description: `You may eliminate a player at night once per game`,
  hints: [
    `Don't wait too long to use your special. The longer you wait the more likely you are to die.`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  randomlySelectable: true,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.killing,
  },
})
