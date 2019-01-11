import * as React from 'react'
import { Layout } from '../../../../components/layout'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Profile } from '../../../../components/profile'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'

export const InspectCards: React.SFC<{}> = () => {
  const [viewCards, setViewCards] = React.useState<boolean>(false)
  const { game, updateGame } = React.useContext(SecretHitlerGameContext)

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
          <Profile key={i} text={c} color={c === 'fascist' ? 'red' : 'blue'} />
        ))}

        <ActionRow>
          <Button padded onClick={() => updateGame({ performPower: null })}>
            done
          </Button>
        </ActionRow>
      </Layout>
    )
  }
}
