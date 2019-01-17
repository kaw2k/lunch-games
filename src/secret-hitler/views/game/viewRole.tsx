import * as React from 'react'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import values from 'ramda/es/values'
import { SecretHitlerGameContext } from '../../../helpers/contexts'

interface Props {
  cancel: () => void
}

export const ViewRole: React.SFC<Props> = ({ cancel }) => {
  const { game, player } = React.useContext(SecretHitlerGameContext)

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
                text={p.name || p.id}
                subtext={p.role.isHitler ? 'hitler' : 'fascist'}
                image={p.profileImg}
              />
            ))}
        </React.Fragment>
      )}

      <ActionRow>
        <Button padded onClick={cancel}>
          back
        </Button>
      </ActionRow>
    </Layout>
  )
}
