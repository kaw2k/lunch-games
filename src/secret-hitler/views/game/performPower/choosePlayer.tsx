import * as React from 'react'
import { PlayerSecretHitler } from '../../../interfaces/player'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'
import { Layout } from '../../../../components/layout'
import { Profile } from '../../../../components/profile'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import values from 'ramda/es/values'

export const ChoosePlayer: React.SFC<{
  title: string
  doneText: string
  done: (player: PlayerSecretHitler) => void
}> = ({ done, title, doneText }) => {
  const { player, game } = React.useContext(SecretHitlerGameContext)
  const [target, setTarget] = React.useState<PlayerSecretHitler | null>(null)

  return (
    <Layout padded>
      <h1>{title}</h1>

      {values(game.players)
        .filter(p => p.living && p.id !== player.id)
        .map(p => (
          <Profile
            key={p.id}
            text={p.name}
            image={p.profileImg}
            selected={!!(target === p)}
            onClick={() => setTarget(p)}
          />
        ))}

      <ActionRow>
        <Button
          padded
          disabled={!target}
          onClick={() => {
            if (target) done(target)
          }}>
          {doneText}
        </Button>
      </ActionRow>
    </Layout>
  )
}
