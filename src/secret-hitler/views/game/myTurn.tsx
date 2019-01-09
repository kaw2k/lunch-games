import * as React from 'react'
import { PreviousGovernment } from '../../interfaces/game'
import { PlayerSecretHitler } from '../../interfaces/player'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import values from 'ramda/es/values'
import { SecretHitlerGameContext } from '../../../helpers/contexts'

interface Props {
  cancel: () => void
  proceed: (government: PreviousGovernment | null) => void
}

export const MyTurn: React.SFC<Props> = ({ cancel, proceed }) => {
  const { player, game } = React.useContext(SecretHitlerGameContext)
  const [chancellor, setChancellor] = React.useState<PlayerSecretHitler | null>(
    null
  )

  return (
    <Layout>
      <h1>Choose your chancellor</h1>

      {values(game.players)
        .filter(p => p.living && p.id !== player.id)
        .map(p => (
          <Profile
            key={p.id}
            text={p.name}
            image={p.profileImg}
            onClick={() => setChancellor(p)}
            selected={!!(chancellor && p.id === chancellor.id)}
            disabled={
              !!game.previousGovernment &&
              (game.previousGovernment.president.id === p.id ||
                game.previousGovernment.chancellor.id === p.id)
            }
          />
        ))}

      <ActionRow>
        <Button padded onClick={cancel}>
          cancel
        </Button>
        <Button padded disabled={!chancellor} onClick={() => proceed(null)}>
          rejected
        </Button>
        <Button
          padded
          disabled={!chancellor}
          onClick={() =>
            proceed({
              president: player,
              chancellor: chancellor as PlayerSecretHitler,
            })
          }>
          goes
        </Button>
      </ActionRow>
    </Layout>
  )
}
