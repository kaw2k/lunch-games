import * as React from 'react'
import { Layout } from '../../../components/layout'
import { Board } from '../../components/board'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { SecretHitlerGame } from '../../interfaces/game'
import values from 'ramda/es/values'
import { Profile } from '../../../components/profile'

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
      <Layout padded>
        {values(game.players).map(p => (
          <Profile
            key={p.id}
            text={p.name || p.id}
            subtext={p.role.isHitler ? 'hitler' : p.role.party}
          />
        ))}

        <ActionRow>
          <Button padded onClick={() => setView(View.board)}>
            board
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (view === View.board) {
    return (
      <Layout padded>
        {game.message && <h1>{game.message}</h1>}
        <Board game={game} />

        <ActionRow>
          <Button padded confirm onClick={() => setView(View.roles)}>
            view roles
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  return <div>spectating...</div>
}
