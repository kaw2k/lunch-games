import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { Profile } from '../../../../../components/profile'
import { makeStyles } from '@material-ui/styles'
import sortBy from 'ramda/es/sortBy'
import { count } from '../../../../../helpers/count'
import { RoomContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { Cards, Roles, getCard } from '../../../interfaces/card/cards'
import { groupBy, toPairs } from 'ramda'

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

const cards = toPairs(groupBy(card => card.team, Cards))

export const WerewolfModeratorLobbyRoles: React.SFC<Props> = ({ lobby }) => {
  const classes = useStyles()
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

      <div>
        {cards.map(([team, cardsInTeam]) => (
          <div key={team}>
            <Typography variant="h2" gutterBottom>
              {team}
            </Typography>
            <div className={classes.profiles}>
              {sortBy(card => -1 * card.weight, cardsInTeam).map(card => (
                <Profile
                  key={card.role}
                  className={
                    count(lobby.werewolfRoles, r => r === card.role) ? '' : classes.dim
                  }
                  text={card.role}
                  image={card.profile}
                  alignItems="flex-start"
                  subtext={`Weight: ${card.weight}, Count: ${count(
                    lobby.werewolfRoles,
                    r => r === card.role
                  )}`}
                  onClick={() => addOrRemoveRole(card.role)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
