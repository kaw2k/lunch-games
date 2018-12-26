import * as React from 'react'
import { Party, Government } from '../../interfaces/game'
import { Button } from '../../components/button'
import remove from 'ramda/es/remove'
import { GameContext } from '../../helpers/contexts'
import { Layout } from '../../components/layout'
import { Card } from '../../components/card'
import { ActionRow } from '../../components/actionRow'
import { Grid } from '../../components/grid'

interface Props {
  discard: (card: Party, remaining: Party[], veto?: boolean | null) => void
  government: Government
}

export const SelectCards: React.SFC<Props> = ({ government, discard }) => {
  const { player, game } = React.useContext(GameContext)
  const [cardIndex, setCardIndex] = React.useState<number | null>(null)
  const fascists = game.playedCards.filter(c => c === 'fascist').length

  if (player.id === government.president.id && government.cards.length !== 3) {
    return (
      <Layout>
        <h1>Waiting for {government.chancellor.name} to play</h1>
      </Layout>
    )
  }

  if (player.id === government.chancellor.id && government.cards.length !== 2) {
    return (
      <Layout>
        <h1>Waiting for {government.president.name} to play</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>Which card would you like to discard?</h1>

      <Grid flow="horizontal" justify="center">
        {government.cards.map((card, i) => (
          <Button
            onClick={() => setCardIndex(i)}
            key={i}
            style={{ border: i === cardIndex ? '1px dashed black' : 'none' }}>
            <Card card={card} />
          </Button>
        ))}
      </Grid>

      <ActionRow>
        {fascists === 5 && (
          <Button
            disabled={cardIndex === null}
            onClick={() => {
              if (cardIndex === null) return

              discard(
                government.cards[cardIndex],
                remove(cardIndex, 1, government.cards),
                true
              )
            }}>
            veto
          </Button>
        )}
        <Button
          disabled={cardIndex === null}
          onClick={() => {
            if (cardIndex === null) return

            discard(
              government.cards[cardIndex],
              remove(cardIndex, 1, government.cards)
            )
          }}>
          discard
        </Button>
      </ActionRow>
    </Layout>
  )
}
