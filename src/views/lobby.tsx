import * as React from 'react'
import { Player, PlayerId } from '../interfaces/player'
import { Lobby } from '../interfaces/game'
import { Button } from '../components/button'
import { Layout } from '../components/layout'
import { ActionRow } from '../components/actionRow'
import { PlayerProfile } from '../components/playerProfile'
import { Grid } from '../components/grid'

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
      {lobby.victoryMessage && <h1>{lobby.victoryMessage}s win!</h1>}

      <div>
        <h2>Lobby: {lobby.id}</h2>
        <em>
          You need between 5 and 10 players to play. Click on someone to remove
          them from the game.
        </em>
      </div>

      <Grid flow="vertical">
        {lobby.lobbyPlayers.map(p => (
          <Button onClick={() => kickPlayer(p.id)} key={p.id}>
            <PlayerProfile player={p} />
          </Button>
        ))}
      </Grid>

      <ActionRow>
        <Button onClick={leave}>leave</Button>
        {lobby.lobbyPlayers.length > 4 && lobby.lobbyPlayers.length < 11 && (
          <Button onClick={() => startGame(lobby.lobbyPlayers)}>
            start game
          </Button>
        )}
      </ActionRow>

      <style jsx>{`
        h1 {
          text-align: center;
        }
      `}</style>
    </Layout>
  )
}
