import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { NightViewProps } from '../../interfaces/nightViewInterfaces'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { getCard } from '../../interfaces/card/cards'
import { NoNightActionView } from './noNightActionView'

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
  const { game } = React.useContext(WerewolfGameContext)

  const card = getCard(role)
  const hasNightAction = !!card.night

  if (props.type === 'by name') {
    const isActive = card.isActive(props.player, game)

    if (!isActive || !hasNightAction) {
      return <NoNightActionView done={() => done([])} data={props.player} />
    } else {
      return (
        <>
          <Typography variant="h2">
            {props.player.name || props.player.id}, wake up! Do the thing!
          </Typography>
          {children}
        </>
      )
    }
  }

  if (props.type === 'by role') {
    if (!props.player || !props.player.alive) {
      return <NoNightActionView done={() => done([])} data={title} />
    } else {
      return (
        <>
          <Typography variant="h2">{title}</Typography>
          {children}
        </>
      )
    }
  }

  if (props.type === 'by team') {
    if (!props.players.length) {
      return <NoNightActionView done={() => done([])} data={title} />
    } else {
      return (
        <>
          <Typography variant="h2">{title}</Typography>
          {children}
        </>
      )
    }
  }

  return (
    <>
      <Typography variant="h2">
        Hmmm something went wrong with this role
      </Typography>
      <ActionRow fixed>
        <Button color="red" onClick={() => done([])}>
          continue
        </Button>
      </ActionRow>
    </>
  )
}
