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
} from '@material-ui/core'
import { playerName } from '../../../components/playerName'
import { PlayerCard } from '../../../components/card/player'
import { Grid } from '../../../components/grid'
import { Tabs } from '../../../components/tabs'

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

export const LobbyMurder: React.SFC<Props> = ({ startGame, lobby }) => {
  const [view, setView] = React.useState(View.lobby)

  return (
    <Layout padded hasTabs>
      {lobby.victoryMessage && (
        <Typography variant="h2">{lobby.victoryMessage}</Typography>
      )}

      <Typography variant="h2">Lobby: {lobby.id}</Typography>

      {view === View.lobby && <Players lobby={lobby} />}
      {view === View.rules && <Rules lobby={lobby} />}

      <Tabs
        value={view}
        showLabels
        onChange={(e, val) => {
          if (val === View.start) {
            return startGame()
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
          label="Rules"
          value={View.rules}
          icon={<Icon>book</Icon>}
        />

        <BottomNavigationAction
          label="Start"
          value={View.start}
          icon={<Icon>play_arrow</Icon>}
        />
      </Tabs>
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
        You need between 5 and 12 players to play. Click on someone to remove
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

const Rules: React.SFC<{
  lobby: MurderLobby
}> = ({ lobby }) => {
  return (
    <>
      <Typography gutterBottom variant="h2">
        Rules
      </Typography>

      <Typography variant="h3">Forensic Scientist:</Typography>
      <Typography gutterBottom>
        The forensic scientist knows who is bad and what murder weapon / key
        evidence is chosen. Their job is to help guide the investigators to the
        murderer by only using the clues given to them without speaking or
        otherwise non-verbally indicating.{' '}
      </Typography>

      <Typography variant="h3">Investigator:</Typography>
      <Typography gutterBottom>
        The investigators job is to decipher the clues from the forensic
        scientist, identify the murder and point exactly what murder weapon was
        used as well as the key evidence was left. If they don't figure out
        these three things, they lose.{' '}
      </Typography>

      <Typography variant="h3">Murderer:</Typography>
      <Typography>
        The murder chooses a murder weapon and a key piece of evidence. The
        forensic scientist knows these things and tries to help the
        investigators. See what everyone else has and try to pick items that
        blend in with the rest. Your job is to get away with murder.{' '}
      </Typography>

      <Typography variant="h3">Accomplice:</Typography>
      <Typography>
        THe accomplice knows who the murderer is and what items they chose. Your
        job is to miss-interpret the clues from the forensic scientist and lead
        the investigators away from the murderer. You win if the murderer isn't
        found.{' '}
      </Typography>

      <Typography variant="h3">Witness:</Typography>
      <Typography>
        The witness knows who the murderer and accomplice are, but not who
        exactly the murderer is. You want to help guide the investigators to the
        murderer. If the investigators catch the murderer, but the murderer
        identifies the witness, the murderer wins.{' '}
      </Typography>
    </>
  )
}
