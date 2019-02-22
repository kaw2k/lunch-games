import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { Profile } from '../../../../../components/profile'
import { makeStyles } from '@material-ui/styles'
import sortBy from 'ramda/es/sortBy'
import { count } from '../../../../../helpers/count'
import { getWeight } from '../../../helpers/getWeight'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { uniq } from 'ramda'
import { Roles, getCard } from '../../../interfaces/card'

interface Props {
  lobby: WerewolfLobby
  startGame: (roles: Roles[]) => void
}

const useStyles = makeStyles({
  profiles: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '50%',
    },
  },
})

export const WerewolfModeratorLobbyStart: React.SFC<Props> = ({
  lobby,
  startGame,
}) => {
  const classes = useStyles()
  const [roles, setRoles] = React.useState(lobby.roles)

  function addOrRemoveRole(role: Roles): void {
    const numberOfCardInGame = count(roles, r => r === role)
    const numberOfCardInDeck = count(lobby.roles, r => r === role)

    if (numberOfCardInGame + 1 > numberOfCardInDeck) {
      setRoles(roles.filter(r => r !== role))
    } else {
      setRoles(roles.concat(role))
    }
  }

  const cards = uniq(sortBy(card => -1 * card.weight, lobby.roles.map(getCard)))
  const weight = getWeight(roles)
  const numberOfPlayers = lobby.lobbyPlayers.filter(
    p => !lobby.moderators.find(pid => pid === p.id)
  ).length
  const numberOfCardsInGame = roles.length

  return (
    <Layout padded>
      <div>
        <Typography variant="h2">Start Game: {weight}</Typography>
        <Typography component="em">
          {numberOfCardsInGame !== numberOfPlayers
            ? `
            There are ${numberOfCardsInGame} cards in the game and ${numberOfPlayers} players, they must be equal. `
            : `All is balanced, as the universe should be.`}
        </Typography>
      </div>

      <div className={classes.profiles}>
        {cards.map(card => (
          <Profile
            key={card.role}
            text={card.role}
            image={card.profile}
            alignItems="flex-start"
            subtext={`Weight: ${card.weight}, Count: ${count(
              roles,
              r => r === card.role
            )}`}
            onClick={() => addOrRemoveRole(card.role)}
          />
        ))}
      </div>

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
