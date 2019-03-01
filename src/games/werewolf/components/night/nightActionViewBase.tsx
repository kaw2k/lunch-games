import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { NightViewProps } from '../../interfaces/nightViewInterfaces'
import { Typography } from '@material-ui/core'
import { getCard } from '../../interfaces/card/cards'
import { NoNightActionView } from './noNightActionView'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { isModerator } from '../../helpers/isModerator'
import { actionToString } from '../../interfaces/actions'

type Props = NightViewProps & {
  title: string
}

export const NightViewBase: React.SFC<Props> = ({
  done,
  title,
  role,
  children,
  ...props
}) => {
  const { game, player } = React.useContext(WerewolfGameContext)

  const card = getCard(role)
  const hasNightAction = !!card.night
  if (!game.night || game.night.type === 'pre-day') return null
  const night = game.night

  if (
    (props.type === 'by name' &&
      (!card.isActive(game.players[props.player], game) || !hasNightAction)) ||
    (props.type === 'by role' &&
      (!props.player || !game.players[props.player].alive)) ||
    (props.type === 'by team' && !props.players.length)
  ) {
    return (
      <NoNightActionView
        done={() => done([])}
        data={props.type === 'by name' ? props.player : title}
      />
    )
  }

  if (!!night.playerReady && isModerator(player, game)) {
    return (
      <>
        <Typography gutterBottom variant="h2">
          The player(s) have made a decision
        </Typography>

        {night.playerActions
          .filter(x => x)
          .map((action, i) => (
            <Typography key={i}>{actionToString(action)}</Typography>
          ))}

        <ActionRow fixed>
          <Button onClick={() => done(night.playerActions)} color="green">
            accept
          </Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <Typography gutterBottom variant="h2">
        {props.type === 'by name' &&
          `${game.players[props.player] ||
            props.player}, wake up! Do the thing!`}

        {(props.type === 'by role' || props.type === 'by team') && title}
      </Typography>

      {children}
    </>
  )
}
