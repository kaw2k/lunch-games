import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { NightViewProps } from '../../nightViewInterfaces'
import { bless } from '../../../interfaces/actions'
import { NightViewBase } from '../../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '..'
import { Emoji } from '../../emoji'
import { NightMessageOrder } from '../../nightMessage'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../../components/night/noNightActionView'

const title = 'Priest, wake up! Bless someone.'
const description = `They will be protected until they are attacked the first time. You can't bless another person until your first blessing goes away.`

const NightView: React.SFC<NightViewProps> = ({ done, ...props }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const player =
    (props.type === 'by role' || props.type === 'by name') && props.player

  if (!player || typeof player !== 'object') {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  const canBlessAgain = !values(game.players).find(
    p => p.isBlessed === player.id
  )

  return (
    <NightViewBase {...props} title={title} done={done} role="priest">
      {!canBlessAgain && (
        <>
          <Typography gutterBottom component="em">
            {description}
          </Typography>
          <Typography component="em">
            Your previous target is still blessed, nothing to do.
          </Typography>
          <ActionRow fixed>
            <Button color="green" onClick={() => done([])}>
              continue
            </Button>
          </ActionRow>
        </>
      )}

      {canBlessAgain && (
        <>
          <ChoosePlayers
            description={description}
            columns={2}
            doneText="protect"
            onDone={([target]) => {
              done([bless({ target, source: player.id })])
            }}
            players={values(game.players).filter(p => p.alive)}>
            {props => <WerewolfProfile {...props} />}
          </ChoosePlayers>
        </>
      )}
    </NightViewBase>
  )
}

export const Priest = Card({
  role: 'priest',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('🙏'),
  cardCount: 1,
  description: `You bless a player each night. You can't bless a different player until that person is targeted.`,
  hints: [
    `Bless yourself first, then try to protect a good person with powers after you are targeted.`,
    `Sometimes it can be useful to let the team know who you protected AFTER they have been attacked, it will help the team know who is good.`,
  ],
  image: require('./priest.png'),
  profile: require('./priest-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  isActive: always(true),
  appearsBad: always(false),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
