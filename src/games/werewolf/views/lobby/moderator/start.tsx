import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import sortBy from 'ramda/es/sortBy'
import { count } from '../../../../../helpers/count'
import { getWeight } from '../../../helpers/getWeight'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { uniq } from 'ramda'
import { Roles, getCard } from '../../../interfaces/card/cards'
import { isModerator } from '../../../helpers/isModerator'
import { isSpectator } from '../../../../../helpers/isSpectator'
import { Grid } from '../../../../../components/grid'
import { Card } from '../../../../../components/card'

interface Props {
  lobby: WerewolfLobby
  startGame: (roles: Roles[]) => void
}

export const WerewolfModeratorLobbyStart: React.SFC<Props> = ({
  lobby,
  startGame,
}) => {
  const [roles, setRoles] = React.useState(lobby.werewolfRoles)

  function addOrRemoveRole(role: Roles): void {
    const numberOfCardInGame = count(roles, r => r === role)
    const numberOfCardInDeck = count(lobby.werewolfRoles, r => r === role)

    if (numberOfCardInGame + 1 > numberOfCardInDeck) {
      setRoles(roles.filter(r => r !== role))
    } else {
      setRoles(roles.concat(role))
    }
  }

  const cards = uniq(
    sortBy(card => -1 * card.weight, lobby.werewolfRoles.map(getCard))
  )
  const weight = getWeight(roles)
  const numberOfPlayers = lobby.lobbyPlayers.filter(
    p => !isModerator(p, lobby) && !isSpectator(p, lobby)
  ).length
  const numberOfCardsInGame = roles.length

  return (
    <Layout padded>
      <div>
        <Typography variant="h2">Start Game: {weight}</Typography>
        <Typography component="em">
          {numberOfCardsInGame !== numberOfPlayers
            ? `
            There are ${numberOfCardsInGame} cards in the game and ${numberOfPlayers} players, they must be equal. The extra cards will not be disclosed to the players so werewolves can hide.`
            : `All is balanced, as the universe should be.`}
        </Typography>
      </div>

      <Grid>
        {cards.map(card => {
          const numCard = count(roles, r => r === card.role)
          return (
            <Card
              key={card.role}
              text={card.role}
              dim={!numCard}
              selected={numCard}
              onClick={() => addOrRemoveRole(card.role)}
            />
          )
        })}
      </Grid>

      <ActionRow>
        <Button
          color="green"
          onClick={() => startGame(roles)}
          disabled={numberOfCardsInGame !== numberOfPlayers}>
          Start Game
        </Button>
      </ActionRow>
    </Layout>
  )
}
