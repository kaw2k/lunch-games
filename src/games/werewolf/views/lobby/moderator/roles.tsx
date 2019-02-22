import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { Profile } from '../../../../../components/profile'
import { makeStyles } from '@material-ui/styles'
import sortBy from 'ramda/es/sortBy'
import { count } from '../../../../../helpers/count'
import { RoomContext } from '../../../../../helpers/contexts'
import { getWeight } from '../../../helpers/getWeight'
import { Button } from '../../../../../components/button'
import { AllCards, Roles, getCard } from '../../../interfaces/card'

interface Props {
  lobby: WerewolfLobby
}

const useStyles = makeStyles({
  profiles: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '50%',
    },
  },
  dim: {
    opacity: 0.25,
  },
})
const cards = sortBy(card => -1 * card.weight, AllCards)

export const WerewolfModeratorLobbyRoles: React.SFC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const { updateRoom } = React.useContext(RoomContext)

  function addOrRemoveRole(role: Roles): void {
    const card = getCard(role)
    const numberOfCardInDeck = count(lobby.roles, r => r === role)

    if (numberOfCardInDeck + 1 > card.cardCount) {
      updateRoom({
        roles: lobby.roles.filter(r => r !== role),
      })
    } else {
      updateRoom({
        roles: lobby.roles.concat(role),
      })
    }
  }

  function reset() {
    updateRoom({
      roles: [],
    })
  }

  return (
    <Layout padded>
      <Typography variant="h2">Roles: {getWeight(lobby.roles)}</Typography>
      <Button onClick={reset}>Reset</Button>
      <div className={classes.profiles}>
        {cards.map(card => (
          <Profile
            key={card.role}
            className={
              count(lobby.roles, r => r === card.role) ? '' : classes.dim
            }
            text={card.role}
            image={card.profile}
            alignItems="flex-start"
            subtext={`Weight: ${card.weight}, Count: ${count(
              lobby.roles,
              r => r === card.role
            )}`}
            onClick={() => addOrRemoveRole(card.role)}
          />
        ))}
      </div>
    </Layout>
  )
}
