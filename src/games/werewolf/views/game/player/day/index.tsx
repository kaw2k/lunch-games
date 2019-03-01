import * as React from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Icon,
} from '@material-ui/core'
import { WerewolfPlayerDayOverview } from './overview'
import { WerewolfPlayerDayArtifact } from './artifact'
import { WerewolfPlayerDayRole } from './role'
import { makeStyles } from '@material-ui/styles'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'

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
  },
})

export const WerewolfPlayerDay: React.SFC<Props> = ({}) => {
  const { player } = React.useContext(WerewolfGameContext)
  const [view, setView] = React.useState(View.overview)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {view === View.overview && <WerewolfPlayerDayOverview />}
      {view === View.artifact && <WerewolfPlayerDayArtifact player={player} />}
      {view === View.role && <WerewolfPlayerDayRole />}

      <BottomNavigation
        className={classes.nav}
        value={view}
        onChange={(event, newValue) => setView(newValue)}
        showLabels>
        <BottomNavigationAction
          value={View.overview}
          label="overview"
          icon={<Icon>group</Icon>}
        />
        <BottomNavigationAction
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
