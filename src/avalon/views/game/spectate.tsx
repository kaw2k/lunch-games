import * as React from 'react'
import { Board } from '../../components/board'
import { AvalonGame } from '../../interfaces/game'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { EndGame } from './endGame'
import values from 'ramda/es/values'
import { Profile } from '../../../components/profile'
import { AvalonGameContext } from '../../../helpers/contexts'

interface Props {
  game: AvalonGame
  endGame: AvalonGameContext['endGame']
}

enum View {
  board,
  roles,
  endGame,
}

export const Spectate: React.SFC<Props> = ({ game, endGame }) => {
  const [view, setView] = React.useState<View>(View.board)

  if (view === View.endGame) {
    return <EndGame cancel={() => setView(View.board)} endGame={endGame} />
  }

  if (view === View.roles) {
    return (
      <Layout padded>
        {values(game.players).map(p => (
          <Profile
            key={p.id}
            image={p.profileImg}
            text={p.name || p.id}
            subtext={p.role}
          />
        ))}

        <ActionRow>
          <Button onClick={() => setView(View.board)} padded>
            cancel
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
          <Button onClick={() => setView(View.endGame)} padded>
            end game
          </Button>
          <Button confirm onClick={() => setView(View.roles)} padded>
            view roles
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  return <div>spectating...</div>
}
