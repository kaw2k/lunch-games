import * as React from 'react'
import { Icon, BottomNavigationAction, Typography } from '@material-ui/core'
import { Tabs } from '../../../../components/tabs'
import { MurderGameContext } from '../../../../helpers/contexts'
import { SceneView } from '../../components/scene'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { values } from 'ramda'
import { PlayerCards } from '../../components/playerCards'
import { Layout } from '../../../../components/layout'
import uniq from 'ramda/es/uniq'
import { ViewScientist } from '../../components/viewRole'
import { count } from '../../../../helpers/count'

enum View {
  players,
  hints,
  options,
  roles, // For moderator
  guess, // For player
}

export const GameView: React.SFC<{}> = ({}) => {
  const { player } = React.useContext(MurderGameContext)
  const [view, setView] = React.useState(View.players)

  return (
    <Layout hasTabs>
      {view === View.players && <Players />}
      {view === View.hints && <Hints />}
      {view === View.options && <Info />}
      {view === View.roles && <Roles />}

      <Tabs
        value={view}
        showLabels
        onChange={(e, val) => {
          if (val === View.guess) {
          } else {
            if (val === View.roles) {
              alert('Make sure no one is looking')
            }

            setView(val)
          }
        }}>
        <BottomNavigationAction
          label="Players"
          value={View.players}
          icon={<Icon>group</Icon>}
        />

        <BottomNavigationAction
          label="Hints"
          value={View.hints}
          icon={<Icon>book</Icon>}
        />

        <BottomNavigationAction
          label="Info"
          value={View.options}
          icon={<Icon>info</Icon>}
        />

        {player.role === 'forensic scientist' && (
          <BottomNavigationAction
            label="Roles"
            value={View.roles}
            icon={<Icon>face</Icon>}
          />
        )}

        {player.role !== 'forensic scientist' && (
          <BottomNavigationAction
            label="Guess"
            value={View.guess}
            icon={<Icon>contact_support</Icon>}
          />
        )}
      </Tabs>
    </Layout>
  )
}

const Players: React.SFC<{}> = ({}) => {
  const { player, game } = React.useContext(MurderGameContext)

  const otherPlayers = values(game.players).filter(
    p => p.role !== 'forensic scientist' && p.id !== player.id
  )

  return (
    <>
      {player.role !== 'forensic scientist' && <PlayerCards player={player} />}

      {otherPlayers.map(p => (
        <PlayerCards player={p} />
      ))}
    </>
  )
}

const Hints: React.SFC<{}> = ({}) => {
  const { player, game } = React.useContext(MurderGameContext)
  const classes = useCommonStyles()

  return (
    <>
      {player.role === 'forensic scientist' && (
        <Typography>
          These are your hints, if you click on an option it will lock it in.
          Once you have chosen an option on a hint, there is no going back.
        </Typography>
      )}
      <div className={classes.shelf}>
        {game.scenes.map(scene => (
          <SceneView
            scene={scene}
            key={scene.id}
            allowHintSelect={player.role === 'forensic scientist'}
          />
        ))}
      </div>
    </>
  )
}

const Info: React.SFC<{}> = ({}) => {
  const { game } = React.useContext(MurderGameContext)

  const roles = values(game.players).map(p => p.role)
  const uniqRoles = uniq(roles)
    .map(role => {
      return `${count(roles, r => r === role)} ${role}`
    })
    .join(', ')

  return (
    <>
      <Typography>
        <strong>Round:</strong> {game.round}
      </Typography>
      <Typography>
        <strong>Roles:</strong> {uniqRoles}
      </Typography>
    </>
  )
}

const Roles: React.SFC<{}> = ({}) => {
  return <ViewScientist />
}
