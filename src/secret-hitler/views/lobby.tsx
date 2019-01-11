import * as React from 'react'
import { Player } from '../../interfaces/player'
import { Button } from '../../components/button'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'
import { Profile } from '../../components/profile'
import { RoomContext } from '../../helpers/contexts'
import { SecretHitlerLobby } from '../interfaces/game'
import { ChooseGame } from '../../components/chooseGame'

interface Props {
  lobby: SecretHitlerLobby
  startGame: (players: Player[]) => void
}

export const LobbySecretHitler: React.SFC<Props> = ({ startGame, lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <Layout>
      {lobby.victoryMessage && <h1>{lobby.victoryMessage}</h1>}

      <div>
        <h2>Lobby: {lobby.id}</h2>
        <em>
          You need between 5 and 10 players to play. Click on someone to remove
          them from the game.
        </em>
      </div>

      <ChooseGame />

      {lobby.lobbyPlayers.map(p => (
        <Profile
          key={p.id}
          text={p.name}
          image={p.profileImg}
          onClick={() => kickPlayer(p)}
        />
      ))}

      <ActionRow>
        <Button padded onClick={leaveRoom}>
          leave
        </Button>
        <Button
          padded
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
