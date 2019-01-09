import * as React from 'react'
import { BoardEffects } from '../../interfaces/game'
import { Layout } from '../../../components/layout'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { PlayerSecretHitler } from '../../interfaces/player'
import { Profile } from '../../../components/profile'
import values from 'ramda/es/values'
import { RoomContext, SecretHitlerGameContext } from '../../../helpers/contexts'

interface Props {
  power: BoardEffects
}

export const PerformPower: React.SFC<Props> = ({ power }) => {
  const [viewCards, setViewCards] = React.useState<boolean>(false)
  const { updatePlayer } = React.useContext(RoomContext)
  const { game, updateGame, endGame } = React.useContext(
    SecretHitlerGameContext
  )
  const done = () => updateGame({ performPower: null })

  if (power === 'kill') {
    return (
      <ChoosePlayer
        title="Who do you want to kill?"
        doneText="kill"
        done={async p => {
          if (p.role.isHitler) {
            endGame(
              'liberal',
              `${p.name} was killed and is hitler, liberals win!`
            )
          } else {
            updatePlayer({ ...p, living: false })
            updateGame({ performPower: null })
          }
        }}
      />
    )
  }

  if (power === 'choose president') {
    return (
      <Layout>
        <h1>Choose who you would like to be president</h1>
        <ActionRow>
          <Button padded onClick={done}>
            done
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (power === 'inspect role') {
    return (
      <ChoosePlayer
        title="Who would you like to inspect?"
        doneText="inspect"
        done={p => {
          alert(p.role.party)
          done()
        }}
      />
    )
  }

  if (power === 'inspect cards') {
    if (!viewCards) {
      return (
        <Layout>
          <h1>Ready to view the top three cards of the deck?</h1>

          <ActionRow>
            <Button padded onClick={() => setViewCards(true)}>
              ready
            </Button>
          </ActionRow>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <h1>Here are the next three cards from top to bottom:</h1>

          {game.remainingCards.slice(0, 3).map((c, i) => (
            <Profile
              key={i}
              text={c}
              color={c === 'fascist' ? 'red' : 'blue'}
            />
          ))}

          <ActionRow>
            <Button padded onClick={done}>
              done
            </Button>
          </ActionRow>
        </Layout>
      )
    }
  }

  return null
}

const ChoosePlayer: React.SFC<{
  title: string
  doneText: string
  done: (player: PlayerSecretHitler) => void
}> = ({ done, title, doneText }) => {
  const { player, game } = React.useContext(SecretHitlerGameContext)
  const [target, setTarget] = React.useState<PlayerSecretHitler | null>(null)

  return (
    <Layout>
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
