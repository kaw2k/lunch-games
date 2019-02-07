import * as React from 'react'
import { Button } from '../../../../components/button'
import { Profile } from '../../../../components/profile'
import values from 'ramda/es/values'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'
import { Asset } from '../../components/asset'
import { SHIcon } from '../../components/icon'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { makeStyles } from '@material-ui/styles'

interface Props {
  disableButton?: boolean
  button: string
  onDone: () => void
}

const useStyles = makeStyles({
  card: {
    maxWidth: '75%',
    margin: '0 auto 1em',
  },
})

export const ViewRole: React.SFC<Props> = ({
  button,
  onDone,
  disableButton,
}) => {
  const classes = useStyles()
  const { game, player } = React.useContext(SecretHitlerGameContext)

  const otherFascists = values(game.players).filter(
    p => p.role.party === 'fascist' && p.id !== player.id
  )
  return (
    <>
      <Typography gutterBottom variant="h2" align="center">
        YOUR SECRET ROLE
      </Typography>
      <Asset
        className={classes.card}
        asset={
          player.role.isHitler
            ? 'cardHitler'
            : player.role.party === 'fascist'
            ? 'cardFascist'
            : 'cardLiberal'
        }
      />

      {player.role.party === 'fascist' &&
        ((player.role.isHitler && otherFascists.length === 1) ||
          !player.role.isHitler) && (
          <React.Fragment>
            <Typography gutterBottom variant="h2">
              <SHIcon icon="fascist" padRight />
              Your Allies
            </Typography>
            {(!player.role.isHitler || otherFascists.length === 1) &&
              otherFascists.map(p => (
                <Profile
                  key={p.id}
                  text={p.name || p.id}
                  subtext={p.role.isHitler ? 'Hitler' : 'Fascist'}
                  image={p.profileImg}
                />
              ))}
          </React.Fragment>
        )}

      <ActionRow fixed>
        <Button color="green" disabled={disableButton} onClick={onDone}>
          {button}
        </Button>
      </ActionRow>
    </>
  )
}
