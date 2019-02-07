import * as React from 'react'
import { Board } from '../../components/board'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { SecretHitlerGame } from '../../interfaces/game'
import values from 'ramda/es/values'
import { Profile } from '../../../../components/profile'
import { Typography } from '@material-ui/core'

interface Props {
  game: SecretHitlerGame
  endGame: () => void
}

enum View {
  roles,
  board,
}

export const Spectate: React.SFC<Props> = ({ game, endGame }) => {
  const [view, setView] = React.useState<View>(View.board)

  if (view === View.roles) {
    return (
      <>
        {values(game.players).map(p => (
          <Profile
            key={p.id}
            text={p.name || p.id}
            subtext={p.role.isHitler ? 'hitler' : p.role.party}
          />
        ))}

        <ActionRow fixed>
          <Button onClick={() => setView(View.board)}>board</Button>
        </ActionRow>
      </>
    )
  }

  if (view === View.board) {
    return (
      <>
        {game.message && <Typography variant="h2">{game.message}</Typography>}
        <Board game={game} />

        <ActionRow fixed>
          <Button confirm onClick={() => setView(View.roles)}>
            view roles
          </Button>
        </ActionRow>
      </>
    )
  }

  return <div>spectating...</div>
}
