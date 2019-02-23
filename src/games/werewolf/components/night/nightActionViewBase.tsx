import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { NightViewProps } from '../../interfaces/nightViewInterfaces'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Roles, getCard } from '../../interfaces/card/cards'

interface Props extends NightViewProps {
  title: string
  role: Roles
}

export const NightViewBase: React.SFC<Props> = ({
  done,
  player,
  callByName,
  title,
  role,
  children,
}) => {
  const { game } = React.useContext(WerewolfGameContext)

  const card = getCard(role)
  const isActive = card.isActive(player, game)
  const hasNightAction = !!card.NightModeratorView

  if (player.alive && callByName && (!isActive || !hasNightAction)) {
    return (
      <>
        <Typography variant="h2">
          {player.name || player.id}, wake up! Do the thing!
        </Typography>
        {!isActive && (
          <Typography component="em">This role is not active</Typography>
        )}
        {!hasNightAction && (
          <Typography component="em">This role has no night action</Typography>
        )}
        <ActionRow fixed>
          <Button onClick={() => done([])} color="green">
            next
          </Button>
        </ActionRow>
      </>
    )
  }

  if (player.alive && callByName) {
    return (
      <>
        <Typography variant="h2">
          {player.name || player.id}, wake up! Do the thing!
        </Typography>
        {children}
      </>
    )
  }

  if (!player.alive) {
    return (
      <>
        <Typography variant="h2">{title}</Typography>
        <Typography component="em">This player is dead</Typography>
        <ActionRow fixed>
          <Button onClick={() => done([])} color="green">
            next
          </Button>
        </ActionRow>
      </>
    )
  }

  if (!isActive) {
    return (
      <>
        <Typography variant="h2">{title}</Typography>
        <Typography component="em">This role is not active yet</Typography>
        <ActionRow fixed>
          <Button onClick={() => done([])} color="green">
            next
          </Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      {children}
    </>
  )
}
