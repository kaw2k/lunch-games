import * as React from 'react'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { RoomContext } from '../../../helpers/contexts'
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
import { SkullLobby } from '../interfaces/game'

interface Props {
  lobby: SkullLobby
  startGame: () => void
}

enum View {
  lobby,
  rules,
  start,
}

export const LobbySkull: React.SFC<Props> = ({ startGame, lobby }) => {
  const [view, setView] = React.useState(View.lobby)
  const isValid =
    lobby.lobbyPlayers.length >= 2 && lobby.lobbyPlayers.length <= 12

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
          if (val === View.start && isValid) {
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
          icon={<Icon color={isValid ? 'default' : 'error'}>play_arrow</Icon>}
        />
      </Tabs>
    </Layout>
  )
}

const Players: React.SFC<{
  lobby: SkullLobby
}> = ({ lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <>
      <Typography component="em">
        You need between 2 and 12 players to play. Click on someone to remove
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

const Rules: React.SFC<{ lobby: SkullLobby }> = ({ lobby }) => {
  return (
    <>
      <Typography gutterBottom variant="h2">
        Rules
      </Typography>

      <Typography gutterBottom>
        Skull is a bidding game where each player bids on how many flowers they
        can find without flipping over a skull.
      </Typography>

      <Typography gutterBottom variant="h2">
        Playing
      </Typography>
      <Typography gutterBottom>
        Everyone starts by playing a card. Starting with one person, they can
        choose to play an additional card or start bidding. Once bidding has
        started, no new cards can be played. You take turns until everyone has
        successively bid higher, or passed.
      </Typography>

      <Typography gutterBottom variant="h2">
        Resolution
      </Typography>
      <Typography gutterBottom>
        The person with the highest bid then flips over all of their cards, if
        they had a skull, they imidatly go to discarding. They continue flipping
        over cards until they flip over flowers equal to the bid they wagered,
        or they encounter a skull. If they get the numbers of flowers needed,
        they get a point.
      </Typography>

      <Typography gutterBottom variant="h2">
        Discarding
      </Typography>
      <Typography gutterBottom>
        If the bidder encounters a skull from their own cards, they get to
        choose which card to discard.
      </Typography>
      <Typography gutterBottom>
        If the bidder encounters a skull from another player, that player gets
        to discard one of the bidders cards without knowing what it was.
      </Typography>

      <Typography gutterBottom>
        Once a card has been discarded, it is out of the game forever. If all
        your cards have been discarded, you are out of the game.
      </Typography>

      <Typography gutterBottom variant="h2">
        Winning
      </Typography>
      <Typography gutterBottom>
        The game ends when someone gets to 2 points or everyone has been
        eliminated except one person.
      </Typography>
    </>
  )
}
