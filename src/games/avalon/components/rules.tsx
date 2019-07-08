import * as React from 'react'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { makeStyles } from '@material-ui/styles'

interface Props {
  done: () => void
}

const useStyles = makeStyles({
  padded: {
    marginTop: '1em',
  },
})

export const Rules: React.SFC<Props> = ({ done }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h1" align="center" gutterBottom>
        Rules
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Overview
      </Typography>

      <Typography className={classes.padded}>
        Two teams: Loyal Servants of Arther (Good) and Evil ways of Mordred (Evil). Merlin knows who are all bad people except Morder.
        One player is randomly selected to be a Quest leader to select a team for the Quest.
      </Typography>

      <Typography className={classes.padded}>
        Good wins the game by successfully completing three Quests.
      </Typography>

      <Typography className={classes.padded}>
        Evil wins if three Quests end in failure.
        If Good successfully completing three Quests, Evil can also win by assassinating Merlin at game's end
        Lastly, if a Quest cannot be undertaken (Chaos couter hits 5) then Evil wins.
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Turns
      </Typography>
      <Typography>
        At the start of your turn as Quest leader, you choose a Quest team. This 
        team will go on the Quest. Everyone votes on whether your chosen 
        Quest team should go on the Quest. If the vote passes, 
        proceed with the Quest. If the vote fails, the Chaos Counter 
        increases and the Quest leader honor passes to the person on your left
        (see: Chaos Counter).
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Quest
      </Typography>

      <Typography>
        Each member of the Quest gets 2 cards, Fail and Pass. If anyone on 
        the Quest chooses to the Fail card then the Quest fails. 
        Any 3 fails or passes lead to the end of the game.
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Chaos Counter
      </Typography>

      <Typography>
        Every time a Quest team is voted down and does not go, the chaos counter is
        increases. If the chaos counter hits 5 then the Evil wins.
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Lady of The Lake
      </Typography>
      
      <Typography>
        If Lady of The Lake is in play then player to the right of the 1st Quest leader 
        is to claim it. After 2nd Quest, player that claimed Lady of The Lake can inspect 
        other players to see if they are Good or Evil. The player that was inspected now 
        is possesion of the Lady of The Lake and can inspected someone after next Quest.
        Lady of The Lake is destroyed after person that already claimed her is inspected.
      </Typography>

      <ActionRow className={classes.padded} fixed>
        <Button color="green" onClick={done}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
