import * as React from 'react'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'
import { Button } from '../../components/button'
import { SecretHitlerGameContext } from '../../helpers/contexts'
import { GREY } from '../../helpers/colors'
import { ViewRole } from '../views/game/viewRole'
import { Icon } from './icon'

interface Props {}

enum View {
  menu,
  role,
  game,
}

export const GameContainer: React.SFC<Props> = ({ children }) => {
  const { endGame } = React.useContext(SecretHitlerGameContext)
  const [view, setView] = React.useState(View.game)

  if (view === View.menu) {
    return (
      <Layout padded>
        <h2>End the game, who won?</h2>

        <ActionRow>
          <Button
            padded
            color="red"
            onClick={() => {
              endGame('fascist', 'The bad team won!')
            }}>
            bad
          </Button>
          <Button
            color="blue"
            padded
            onClick={() => {
              endGame('liberal', 'The good team won!')
            }}>
            good
          </Button>
          <Button
            padded
            onClick={() => {
              endGame()
            }}>
            no one
          </Button>
        </ActionRow>

        <h2>Forget your role?</h2>
        <ActionRow>
          <Button
            padded
            confirm="make sure no one is looking"
            onClick={() => setView(View.role)}>
            view your role
          </Button>
        </ActionRow>

        <ActionRow fixed>
          <Button padded onClick={() => setView(View.game)}>
            cancel
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (view === View.role) {
    return <ViewRole button="done" onDone={() => setView(View.game)} />
  }

  return (
    <div>
      <div className="row">
        <div>
          <h1>Secret Hitler</h1>
          <h2>A LunchGames App</h2>
        </div>

        <button onClick={() => setView(View.menu)}>
          <Icon icon="menu" />
        </button>
      </div>
      {children}
      <style jsx>{`
        .row {
          padding: 1em;
          display: flex;
        }

        button {
          border: none;
          background: transparent;
          margin-left: auto;
          width: 2em;
          height: 2em;
          cursor: pointer;
        }

        img {
          width: 100%;
          height: 100%;
        }

        h2 {
          font-size: 0.5em;
          color: ${GREY};
          font-weight: 400;
        }
      `}</style>
    </div>
  )
}
