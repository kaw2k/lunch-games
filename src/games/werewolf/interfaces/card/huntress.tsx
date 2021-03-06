import * as React from 'react'
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
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

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
  const hasUsedPower = !!player.state[Huntress.role]

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
        <ChooseWerewolfPlayer
          doneText="kill"
          players={values(game.players).filter(
            p => p.alive && p.id !== player.id
          )}
          cancelText="no thx"
          onCancel={() => done([])}
          onDone={([target]) => {
            done([
              linkKill({ target: target.id }),
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
          }}
        />
      )}
    </NightViewBase>
  )
}

export const Huntress = Card({
  role: CardRole('huntress'),
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
  canFrankensteinAbsorbIt: true,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.killing,
  },
})
