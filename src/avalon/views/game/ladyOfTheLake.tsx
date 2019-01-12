import * as React from 'react'
import values from 'ramda/es/values'
import { AvalonGameContext } from '../../../helpers/contexts'
import { Layout } from '../../../components/layout'
import { Profile } from '../../../components/profile'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { PlayerAvalon } from '../../interfaces/player'
import { PlayerId } from '../../../interfaces/player'

export const LadyOfTheLake: React.SFC<{
  done: (id: PlayerAvalon) => void
}> = ({ done }) => {
  const { player, game } = React.useContext(AvalonGameContext)
  const [selectedPlayer, selectPlayer] = React.useState<PlayerId | null>(null)

  return (
    <Layout padded>
      <h1>
        Choose who you want to inspect, they will get lady of the lake after you
      </h1>

      {values(game.players)
        .filter(p => p.id !== player.id)
        .map(p => (
          <Profile
            key={p.id}
            text={p.name}
            image={p.profileImg}
            selected={!!(p.id === selectedPlayer)}
            onClick={() => selectPlayer(p.id)}
          />
        ))}

      <ActionRow>
        <Button
          padded
          disabled={!selectedPlayer}
          onClick={() => {
            if (selectedPlayer) {
              done(game.players[selectedPlayer])
            }
          }}>
          inspect
        </Button>
      </ActionRow>
    </Layout>
  )
}
