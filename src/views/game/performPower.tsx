import * as React from 'react'
import { PlayerGame } from '../../interfaces/player'
import { BoardEffects, Party } from '../../interfaces/game'
import { Button } from '../../components/button'
import { GameContext } from '../../helpers/contexts'
import { updatePlayer } from '../../helpers/game'
import { Layout } from '../../components/layout'
import { PlayerProfile } from '../../components/playerProfile'
import { Grid } from '../../components/grid'
import { ActionRow } from '../../components/actionRow'
import { Card } from '../../components/card'

interface Props {
  power: BoardEffects
}

export const PerformPower: React.SFC<Props> = ({ power }) => {
  const { game, updateGame, endGame } = React.useContext(GameContext)
  const done = () => updateGame({ performPower: null })

  if (power === 'kill') {
    return (
      <ChoosePlayer
        title="Who do you want to kill?"
        done={async p => {
          if (p.role.isHitler) {
            const party: Party = 'liberal'
            endGame(party)
          } else {
            updateGame({
              ...updatePlayer(game, p.id, { living: false }),
              performPower: null,
            })
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
          <Button onClick={done}>done</Button>
        </ActionRow>
      </Layout>
    )
  }

  if (power === 'inspect role') {
    return (
      <ChoosePlayer
        title="Who would you like to inspect?"
        done={p => {
          alert(p.role.party)
          done()
        }}
      />
    )
  }

  if (power === 'inspect cards') {
    return (
      <Layout>
        <h1>Here are the next three cards from top to bottom:</h1>

        <Grid flow="horizontal" justify="around">
          {game.remainingCards.slice(0, 3).map((c, i) => (
            <Card key={i} card={c} />
          ))}
        </Grid>

        <ActionRow>
          <Button onClick={done}>done</Button>
        </ActionRow>
      </Layout>
    )
  }

  return null
}

const ChoosePlayer: React.SFC<{
  title: string
  done: (player: PlayerGame) => void
}> = ({ done, title }) => {
  const { game, player } = React.useContext(GameContext)
  const [target, setTarget] = React.useState<PlayerGame | null>(null)

  return (
    <Layout>
      <h1>{title}</h1>

      <Grid flow="vertical">
        {game.players
          .filter(p => p.living && p.id !== player.id)
          .map(p => (
            <Button onClick={() => setTarget(p)} key={p.id}>
              <PlayerProfile player={p} highlight={!!(target === p)} />
            </Button>
          ))}
      </Grid>

      <ActionRow>
        <Button
          disabled={!target}
          onClick={() => {
            if (target) done(target)
          }}>
          done
        </Button>
      </ActionRow>
    </Layout>
  )
}
