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

const NightView: React.SFC<NightViewProps> = ({ player, done, callByName }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const canBlessAgain = !values(game.players).find(
    p => p.isBlessed === player.id
  )
  const title = 'Priest, wake up! Bless someone.'
  const description = `They will be protected until they are attacked the first time. You can't bless another person until your first blessing goes away.`

  return (
    <NightViewBase title={title} done={done} player={player} role="priest">
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

export const NightPlayerView = NightView
export const NightModeratorView = NightView
