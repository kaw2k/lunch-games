import * as React from 'react'
import { PlayerGame } from '../interfaces/player'
import { Game } from '../interfaces/game'
import { Button } from '../components/button'
import { Layout } from '../components/layout'
import { ActionRow } from '../components/actionRow'
import { PlayerProfile } from '../components/playerProfile'

interface Props {
  game: Game
  player: PlayerGame
  ready: () => void
  endGame: () => void
}

export const ViewRole: React.SFC<Props> = ({
  player,
  game,
  ready,
  endGame,
}) => {
  const [showRole, setShowRole] = React.useState(false)

  if (player.ready) {
    return (
      <Layout>
        <h1>Waiting for game to start...</h1>
        <ActionRow>
          <Button confirm onClick={endGame}>
            end game
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (!showRole) {
    return (
      <Layout>
        <h1 className="title">Ready to see your role?</h1>
        <ActionRow>
          <Button confirm onClick={endGame}>
            end game
          </Button>
          <Button onClick={() => setShowRole(true)}>show role</Button>
        </ActionRow>
      </Layout>
    )
  }

  const otherFascists = game.players.filter(
    p => p.role.party === 'fascist' && p.id !== player.id
  )

  return (
    <Layout>
      {player.role.party === 'liberal' && <h1>You are a liberal</h1>}

      {player.role.party === 'fascist' && (
        <div>
          <h1>You are {player.role.isHitler ? 'hitler' : 'fascist'}</h1>
          {(!player.role.isHitler || otherFascists.length === 1) &&
            otherFascists.map(p => (
              <PlayerProfile
                className="profile"
                key={p.id}
                player={p}
                subtext={p.role.isHitler ? 'hitler' : 'fascist'}
              />
            ))}
        </div>
      )}

      <ActionRow>
        <Button confirm onClick={endGame}>
          end game
        </Button>
        <Button onClick={() => setShowRole(false)}>hide role</Button>
        {!player.ready && <Button onClick={ready}>ready</Button>}
      </ActionRow>

      <style jsx>{`
        :global(.profile) {
          margin-top: 1em;
        }
      `}</style>
    </Layout>
  )
}
