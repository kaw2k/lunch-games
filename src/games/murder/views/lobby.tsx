import * as React from 'react'
import { Player } from '../../../interfaces/player'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { RoomContext } from '../../../helpers/contexts'
import { MurderLobby } from '../interfaces/game'
import { ChooseGame } from '../../../components/chooseGame'
import {
  Typography,
  BottomNavigationAction,
  Badge,
  Icon,
  BottomNavigation,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { playerName } from '../../../components/playerName'
import { PlayerCard } from '../../../components/card/player'
import { Grid } from '../../../components/grid'

interface Props {
  lobby: MurderLobby
  startGame: (players: Player[]) => void
}

enum View {
  lobby,
  roles,
  rules,
  start,
}

const useStyles = makeStyles({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  },
  root: {
    marginBottom: '56px',
  },
})

export const LobbyMurder: React.SFC<Props> = ({ startGame, lobby }) => {
  const classes = useStyles()
  const [view, setView] = React.useState(View.lobby)

  return (
    <Layout padded className={classes.root}>
      {lobby.victoryMessage && (
        <Typography variant="h2">{lobby.victoryMessage}</Typography>
      )}

      <Typography variant="h2">Lobby: {lobby.id}</Typography>

      {view === View.lobby && <Players lobby={lobby} />}

      <BottomNavigation
        className={classes.nav}
        value={view}
        showLabels
        onChange={(e, val) => {
          if (val === View.start) {
            return alert(`The game is not supported yet`)
          } else {
            setView(val)
          }
        }}>
        <BottomNavigationAction
          label="Lobby"
          value={View.lobby}
          icon={
            <Badge badgeContent={lobby.lobbyPlayers.length}>
              <Icon>group</Icon>
            </Badge>
          }
        />

        <BottomNavigationAction
          label="Start"
          value={View.start}
          icon={<Icon>play_arrow</Icon>}
        />
      </BottomNavigation>
    </Layout>
  )
}

const Players: React.SFC<{
  lobby: MurderLobby
}> = ({ lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <>
      <Typography component="em">
        You need between 5 and 10 players to play. Click on someone to remove
        them from the game.
      </Typography>

      <ChooseGame />

      <Grid>
        {lobby.lobbyPlayers.map(p => (
          <PlayerCard
            key={p.id}
            player={p}
            onClick={() =>
              confirm(`Do you want to kick ${playerName(p)}`) && kickPlayer(p)
            }
          />
        ))}
      </Grid>

      <ActionRow>
        <Button onClick={leaveRoom}>leave</Button>
      </ActionRow>
    </>
  )
}
