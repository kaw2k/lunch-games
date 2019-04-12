import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { WerewolfLobby } from '../../../interfaces/game'
import sortBy from 'ramda/es/sortBy'
import { count } from '../../../../../helpers/count'
import { RoomContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { Cards, Roles, getCard } from '../../../interfaces/card/cards'
import { Grid } from '../../../../../components/grid'
import { Card } from '../../../../../components/card'

interface Props {
  lobby: WerewolfLobby
}

const cards = sortBy(card => -1 * card.weight, Cards)

export const WerewolfModeratorLobbyRoles: React.SFC<Props> = ({ lobby }) => {
  const { updateRoom } = React.useContext(RoomContext)

  function addOrRemoveRole(role: Roles): void {
    const card = getCard(role)
    const numberOfCardInDeck = count(lobby.werewolfRoles, r => r === role)

    if (numberOfCardInDeck + 1 > card.cardCount) {
      updateRoom({
        werewolfRoles: lobby.werewolfRoles.filter(r => r !== role),
      })
    } else {
      updateRoom({
        werewolfRoles: lobby.werewolfRoles.concat(role),
      })
    }
  }

  function reset() {
    updateRoom({
      werewolfRoles: [],
    })
  }

  return (
    <Layout padded>
      <Button onClick={reset}>Reset</Button>

      <Grid>
        {cards.map(card => (
          <Card
            key={card.role}
            selected={count(lobby.werewolfRoles, r => r === card.role)}
            dim={!count(lobby.werewolfRoles, r => r === card.role)}
            badge={card.weight}
            text={card.role}
            onClick={() => addOrRemoveRole(card.role)}
          />
        ))}
      </Grid>
    </Layout>
  )
}
