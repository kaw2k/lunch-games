import * as React from 'react'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import values from 'ramda/es/values'
import { SecretHitlerGameContext } from '../../../helpers/contexts'
import { Asset } from '../../components/asset'
import { Icon } from '../../components/icon'

interface Props {
  disableButton?: boolean
  button: string
  onDone: () => void
}

export const ViewRole: React.SFC<Props> = ({
  button,
  onDone,
  disableButton,
}) => {
  const { game, player } = React.useContext(SecretHitlerGameContext)

  const otherFascists = values(game.players).filter(
    p => p.role.party === 'fascist' && p.id !== player.id
  )
  return (
    <Layout padded>
      <h2>YOUR SECRET ROLE</h2>
      <Asset
        className="card"
        asset={
          player.role.isHitler
            ? 'cardHitler'
            : player.role.party === 'fascist'
            ? 'cardFascist'
            : 'cardLiberal'
        }
      />

      {player.role.party === 'fascist' &&
        ((player.role.isHitler && otherFascists.length === 1) ||
          !player.role.isHitler) && (
          <React.Fragment>
            <h4 className="allies">
              <Icon icon="fascist" />
              Your Allies
            </h4>
            {(!player.role.isHitler || otherFascists.length === 1) &&
              otherFascists.map(p => (
                <Profile
                  key={p.id}
                  text={p.name || p.id}
                  subtext={p.role.isHitler ? 'Hitler' : 'Fascist'}
                  image={p.profileImg}
                />
              ))}
          </React.Fragment>
        )}

      <ActionRow fixed>
        <Button disabled={disableButton} padded onClick={onDone} color="green">
          {button}
        </Button>
      </ActionRow>

      <style jsx>{`
        h2 {
          text-align: center;
        }

        :global(.card) {
          max-width: 50%;
          margin: 0 auto;
          display: block;
        }

        .allies {
          display: flex;
          align-items: center;
          margin-top: 2em;
        }
      `}</style>
    </Layout>
  )
}
