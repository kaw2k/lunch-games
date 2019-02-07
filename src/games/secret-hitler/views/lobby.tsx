import * as React from 'react'
import { Player } from '../../../interfaces/player'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import { RoomContext } from '../../../helpers/contexts'
import { SecretHitlerLobby } from '../interfaces/game'
import { ChooseGame } from '../../../components/chooseGame'
import { Typography } from '@material-ui/core'
import { Rules } from '../components/rules'

interface Props {
  lobby: SecretHitlerLobby
  startGame: (players: Player[]) => void
}

enum View {
  rules,
  lobby,
}

export const LobbySecretHitler: React.SFC<Props> = ({ startGame, lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)
  const [view, setView] = React.useState(View.lobby)

  if (view === View.rules) {
    return (
      <Layout padded>
        <Rules done={() => setView(View.lobby)} />
      </Layout>
    )
  }

  return (
    <Layout padded>
      {lobby.victoryMessage && (
        <Typography variant="h2" gutterBottom align="center">
          {lobby.victoryMessage}
        </Typography>
      )}

      <div>
        <Typography variant="h2">Lobby: {lobby.id}</Typography>
        <Typography component="em">
          You need between 5 and 10 players to play. Click on someone to remove
          them from the game.
        </Typography>
      </div>

      <ChooseGame />

      {lobby.lobbyPlayers.map(p => (
        <Profile
          key={p.id}
          text={p.name || p.id}
          image={p.profileImg}
          onClick={() => kickPlayer(p)}
        />
      ))}

      <ActionRow fixed>
        <Button onClick={() => setView(View.rules)}>Rules</Button>
      </ActionRow>

      <ActionRow>
        <Button onClick={leaveRoom}>leave</Button>
        <Button
          color="green"
          onClick={() => startGame(lobby.lobbyPlayers)}
          disabled={
            lobby.lobbyPlayers.length < 5 || lobby.lobbyPlayers.length > 10
          }>
          start game
        </Button>
      </ActionRow>
    </Layout>
  )
}
