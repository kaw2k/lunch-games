import * as React from 'react'
import cx from 'classnames'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { WerewolfGameContext } from '../../../helpers/contexts'
import { IconButton, Icon, Typography } from '@material-ui/core'
import { useCommonStyles } from '../../../helpers/commonStyles'
import { ActionRow } from '../../../components/actionRow'

interface Props {}

enum View {
  menu,
  game,
}

export const GameContainer: React.SFC<Props> = ({ children }) => {
  const classes = useCommonStyles()
  const { endGame } = React.useContext(WerewolfGameContext)
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

        <ActionRow fixed>
          <Button color="black" onClick={() => setView(View.game)}>
            cancel
          </Button>
        </ActionRow>
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
          <IconButton onClick={() => setView(View.menu)}>
            <Icon>more_vert</Icon>
          </IconButton>
        </div>
      </div>
      {children}
    </Layout>
  )
}
