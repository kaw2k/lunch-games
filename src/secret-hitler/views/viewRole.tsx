import * as React from 'react'
import { PlayerSecretHitler } from '../interfaces/player'
import { SecretHitlerGame } from '../interfaces/game'
import { Button } from '../../components/button'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'
import { Profile } from '../../components/profile'
import values from 'ramda/es/values'

interface Props {
  game: SecretHitlerGame
  player: PlayerSecretHitler
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
      <Layout padded>
        <h1>Waiting for game to start...</h1>
        <ActionRow>
          <Button padded confirm onClick={endGame}>
            end game
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (!showRole) {
    return (
      <Layout padded>
        <h1 className="title">Ready to see your role?</h1>
        <ActionRow>
          <Button padded confirm onClick={endGame}>
            end game
          </Button>
          <Button padded onClick={() => setShowRole(true)}>
            show role
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  const otherFascists = values(game.players).filter(
    p => p.role.party === 'fascist' && p.id !== player.id
  )

  return (
    <Layout padded>
      {player.role.party === 'liberal' && <h1>You are a liberal</h1>}

      {player.role.party === 'fascist' && (
        <React.Fragment>
          <h1>You are {player.role.isHitler ? 'hitler' : 'fascist'}</h1>
          {(!player.role.isHitler || otherFascists.length === 1) &&
            otherFascists.map(p => (
              <Profile
                key={p.id}
                text={p.name}
                subtext={p.role.isHitler ? 'hitler' : 'fascist'}
                image={p.profileImg}
              />
            ))}
        </React.Fragment>
      )}

      <ActionRow>
        <Button padded confirm onClick={endGame}>
          end game
        </Button>
        {!player.ready && (
          <Button padded onClick={ready}>
            ready
          </Button>
        )}
      </ActionRow>
    </Layout>
  )
}
