import * as React from 'react'
import values from 'ramda/es/values'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Profile } from '../../../../components/profile'
import { getParty } from '../../helpers/getParty'
import { shuffle } from '../../../../helpers/shuffle'
import { count } from '../../../../helpers/count'
import { AvalonGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'

interface Props {
  disableButton?: boolean
  button: string
  onDone: () => void
}

export const ViewRole: React.SFC<Props> = ({
  button,
  onDone,
  disableButton,
}) => {
  const { game, player } = React.useContext(AvalonGameContext)

  const otherBaddies = values(game.players).filter(
    p => p.id !== player.id && getParty(p.role) === 'bad'
  )

  const actions = (
    <ActionRow fixed>
      <Button color="green" disabled={disableButton} onClick={onDone}>
        {button}
      </Button>
    </ActionRow>
  )

  if (player.role === 'good') {
    return (
      <>
        <Typography gutterBottom align="center" variant="h1">
          You are a generic good person
        </Typography>
        {actions}
      </>
    )
  }

  if (player.role === 'merlin') {
    const hasMordred = game.roles.find(r => r === 'mordred')
    const numBad = count(game.players, p => p.party === 'bad')

    return (
      <>
        <Typography gutterBottom align="center" variant="h1">
          You are a Merlin, here are the bad people, there are {numBad}.{' '}
          {hasMordred && 'Mordred is invisible to you.'}
        </Typography>
        <div>
          {otherBaddies
            .filter(p => p.role !== 'mordred')
            .map(p => (
              <Profile text={p.name || p.id} key={p.id} image={p.profileImg} />
            ))}
        </div>
        {actions}
      </>
    )
  }

  if (player.role === 'percival') {
    const people = shuffle(
      values(game.players).filter(
        p => p.role === 'merlin' || p.role === 'morgana'
      )
    )
    return (
      <>
        <Typography gutterBottom align="center" variant="h1">
          You are a Percivile, one of these players is Morgana and the other is
          Merlin
        </Typography>
        <div>
          {people.map(p => (
            <Profile text={p.name || p.id} key={p.id} image={p.profileImg} />
          ))}
        </div>
        {actions}
      </>
    )
  }

  return (
    <>
      <Typography gutterBottom align="center" variant="h1">
        You are {player.role}
      </Typography>

      <Typography variant="h2" gutterBottom>
        Allies:
      </Typography>
      <div>
        {otherBaddies.map(p => (
          <Profile
            key={p.id}
            text={p.name || p.id}
            subtext={p.role}
            image={p.profileImg}
          />
        ))}
      </div>
      {actions}
    </>
  )
}
