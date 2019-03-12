import * as React from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Icon,
  Typography,
} from '@material-ui/core'
import { WerewolfPlayerDayOverview } from './overview'
import { WerewolfPlayerDayArtifact } from './artifact'
import { WerewolfPlayerDayRole } from './role'
import { makeStyles } from '@material-ui/styles'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { useTimer } from '../../../../../../hooks/useTimer'

interface Props {}

enum View {
  role,
  artifact,
  overview,
}

const useStyles = makeStyles({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  root: {
    paddingBottom: '56px',
    '& > *:not(:last-child)': {
      marginBottom: '1em',
    },
  },
})

export const WerewolfPlayerDay: React.SFC<Props> = ({}) => {
  const { player, game } = React.useContext(WerewolfGameContext)
  const [view, setView] = React.useState(View.overview)
  const classes = useStyles()
  const time = useTimer(game.timer || Date.now(), game.options.dayTimeLimit)

  return (
    <div className={classes.root}>
      {!!game.options.dayTimeLimit && (
        <Typography variant="h2">{time.message}</Typography>
      )}

      {view === View.overview && <WerewolfPlayerDayOverview />}
      {view === View.artifact && <WerewolfPlayerDayArtifact player={player} />}
      {view === View.role && <WerewolfPlayerDayRole />}

      <BottomNavigation
        className={classes.nav}
        value={view}
        onChange={(event, newValue) =>
          newValue !== View.role && setView(newValue)
        }
        showLabels>
        <BottomNavigationAction
          value={View.overview}
          label="overview"
          icon={<Icon>group</Icon>}
        />
        <BottomNavigationAction
          onClick={() => {
            if (confirm('Make sure no one is looking...')) {
              setView(View.role)
            }
          }}
          value={View.role}
          label="role"
          icon={<Icon>face</Icon>}
        />
        <BottomNavigationAction
          value={View.artifact}
          label="artifact"
          icon={<Icon>book</Icon>}
        />
      </BottomNavigation>
    </div>
  )
}
