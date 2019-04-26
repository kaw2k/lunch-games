import * as React from 'react'
import cx from 'classnames'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { SecretHitlerGameContext } from '../../../helpers/contexts'
import { ViewRole } from '../views/game/viewRole'
import { IconButton, Icon, Typography } from '@material-ui/core'
import { useCommonStyles } from '../../../helpers/commonStyles'
import { ActionRow } from '../../../components/actionRow'
import { Rules } from './rules'

interface Props {}

enum View {
  menu,
  role,
  game,
  rules,
}

export const GameContainer: React.SFC<Props> = ({ children }) => {
  const classes = useCommonStyles()
  const { endGame } = React.useContext(SecretHitlerGameContext)
  const [view, setView] = React.useState(View.game)

  if (view === View.menu) {
    return (
      <Layout padded>
        <Typography gutterBottom variant="h2">
          End the game, who won?
        </Typography>
        <ActionRow>
          <Button
            color="red"
            onClick={() => {
              endGame('fascist', 'The bad team won!')
            }}>
            bad
          </Button>
          <Button
            color="teal"
            onClick={() => {
              endGame('liberal', 'The good team won!')
            }}>
            good
          </Button>
          <Button
            onClick={() => {
              endGame()
            }}>
            no one
          </Button>
        </ActionRow>

        <Typography gutterBottom variant="h2">
          Forget your role?
        </Typography>
        <Button
          confirm="make sure no one is looking"
          onClick={() => setView(View.role)}>
          view your role
        </Button>

        <Typography gutterBottom variant="h2">
          Rules
        </Typography>
        <Button onClick={() => setView(View.rules)}>rules</Button>

        <ActionRow fixed>
          <Button color="black" onClick={() => setView(View.game)}>
            cancel
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (view === View.rules) {
    return (
      <Layout padded>
        <Rules done={() => setView(View.game)} />
      </Layout>
    )
  }

  if (view === View.role) {
    return (
      <Layout padded>
        <ViewRole button="done" onDone={() => setView(View.game)} />
      </Layout>
    )
  }

  return (
    <Layout padded>
      <div className={cx(classes.row)}>
        <div>
          <Typography variant="h1">Secret Hitler</Typography>
          <Typography color="textSecondary" variant="h4">
            A LunchGames App
          </Typography>
        </div>

        <div className={classes.pullRight}>
          <IconButton
            className={classes.raise}
            onClick={() => setView(View.menu)}>
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </div>
      {children}
    </Layout>
  )
}
