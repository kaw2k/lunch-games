import * as React from 'react'
import cx from 'classnames'
import { IconButton, Icon, Typography } from '@material-ui/core'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { useCommonStyles } from '../../../helpers/commonStyles'
import { ActionRow } from '../../../components/actionRow'
import { SkullGameContext } from '../../../helpers/contexts'

interface Props {}

enum View {
  menu,
  game,
}

export const GameContainer: React.SFC<Props> = ({ children }) => {
  const classes = useCommonStyles()
  const { endGame } = React.useContext(SkullGameContext)
  const [view, setView] = React.useState(View.game)

  if (view === View.menu) {
    return (
      <Layout padded>
        <Button confirm onClick={() => endGame()}>
          End Game
        </Button>

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
          <Typography variant="h1">Skull</Typography>
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
