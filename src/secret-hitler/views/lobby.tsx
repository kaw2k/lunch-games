import * as React from 'react'
import { Player, PlayerId } from '../../interfaces/player'
import { Lobby } from '../../interfaces/room'
import { Button } from '../../components/button'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'
import { Profile } from '../../components/profile'

interface Props {
  lobby: Lobby
  player: Player
  leave: () => void
  kickPlayer: (id: PlayerId) => void
  startGame: (players: Player[]) => void
}

export const LobbyView: React.SFC<Props> = ({
  player,
  startGame,
  lobby,
  leave,
  kickPlayer,
}) => {
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

      {lobby.lobbyPlayers.map(p => (
        <Profile
          key={p.id}
          text={p.name}
          image={p.profileImg}
          onClick={() => kickPlayer(p.id)}
        />
      ))}

      <ActionRow>
        <Button padded onClick={leave}>
          leave
        </Button>
        {lobby.lobbyPlayers.length > 4 && lobby.lobbyPlayers.length < 11 && (
          <Button padded onClick={() => startGame(lobby.lobbyPlayers)}>
            start game
          </Button>
        )}
      </ActionRow>
    </Layout>
  )
}
