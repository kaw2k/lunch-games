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
import { assertNever } from '../../../../helpers/assertNever'
import { PlayerMurder } from '../../interfaces/player'
import { Button } from '../../../../components/button'
import { playerName } from '../../../../components/playerName'
import { PlayerCard } from '../../../../components/card/player'
import { Grid } from '../../../../components/grid'

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
      {view === View.guess && <Guess />}

      <Tabs
        value={view}
        showLabels
        onChange={(e, val) => {
          if (val === View.roles) {
            alert('Make sure no one is looking')
          }

          setView(val)
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
        <strong>Round:</strong> {game.round} of 3
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

type GuessState = { type: 'players' } | { type: 'cards'; player: PlayerMurder }

const Guess: React.SFC<{}> = ({}) => {
  const { player, game } = React.useContext(MurderGameContext)
  const [state, setState] = React.useState<GuessState>({ type: 'players' })

  if (player.hasGuessed) {
    return (
      <>
        <Typography variant="h2">Nope</Typography>
        <Typography>You have already made your guess.</Typography>
      </>
    )
  }

  if (state.type === 'players') {
    const otherPlayers = values(game.players).filter(
      p => p.role !== 'forensic scientist' && p.id !== player.id
    )

    return (
      <>
        <Typography variant="h2">Who Done It?</Typography>
        <Typography gutterBottom>
          Which player is the murderer? Once you make a guess there is no going
          back.
        </Typography>

        <Grid>
          {otherPlayers.map(p => (
            <PlayerCard
              player={p}
              onClick={() => setState({ type: 'cards', player: p })}
            />
          ))}
        </Grid>
      </>
    )
  }

  if (state.type === 'cards') {
    return (
      <>
        <Button fullWidth onClick={() => setState({ type: 'players' })}>
          back
        </Button>
        <Typography variant="h2">{playerName(state.player)}'s cards</Typography>
        <Typography gutterBottom>
          You must select the correct weapon and evidence. If either are wrong
          the game continues.
        </Typography>

        <Button
          fullWidth
          disabled
          color="green"
          onClick={() => setState({ type: 'players' })}>
          guess
        </Button>
      </>
    )
  }

  return assertNever(state)
}
