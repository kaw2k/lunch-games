import * as React from 'react'
import { PlayerGame } from '../../interfaces/player'
import { PreviousGovernment } from '../../interfaces/game'
import { Button } from '../../components/button'
import { GameContext } from '../../helpers/contexts'
import { Layout } from '../../components/layout'
import { Grid } from '../../components/grid'
import { PlayerProfile } from '../../components/playerProfile'
import { ActionRow } from '../../components/actionRow'

interface Props {
  cancel: () => void
  proceed: (government: PreviousGovernment | null) => void
}

export const MyTurn: React.SFC<Props> = ({ cancel, proceed }) => {
  const { player, game } = React.useContext(GameContext)
  const [chancellor, setChancellor] = React.useState<PlayerGame | null>(null)

  return (
    <Layout>
      <h1>Choose your chancellor</h1>

      <Grid flow="vertical">
        {game.players
          .filter(p => p.living && p.id !== player.id)
          .map(p => (
            <Button
              key={p.id}
              disabled={
                !!game.previousGovernment &&
                (game.previousGovernment.president.id === p.id ||
                  game.previousGovernment.chancellor.id === p.id)
              }
              onClick={() => setChancellor(p)}>
              <PlayerProfile
                player={p}
                highlight={!!(chancellor && p.id === chancellor.id)}
              />
            </Button>
          ))}
      </Grid>

      <ActionRow>
        <Button onClick={cancel}>cancel</Button>
        <Button disabled={!chancellor} onClick={() => proceed(null)}>
          rejected
        </Button>
        <Button
          disabled={!chancellor}
          onClick={() =>
            proceed({
              president: player,
              chancellor: chancellor as PlayerGame,
            })
          }>
          goes
        </Button>
      </ActionRow>
    </Layout>
  )
}
