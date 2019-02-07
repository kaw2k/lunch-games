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

      <Typography className={classes.padded}>
        Two teams: Liberals and Fascists. Hitler is on the Fascist team but does
        not know the identity of the Fascists (unless you’re playing in a
        smaller game with 5 or 6 peeople). One player is randomly selected to be
        the first President.
      </Typography>

      <Typography className={classes.padded}>
        Liberals win if they play 5 Liberal cards OR kill Hitler.
      </Typography>

      <Typography className={classes.padded}>
        Fascists win if they play 6 Fascist cards OR elect Hitler as Chancellor
        after 3 Fascists cards.
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Turns
      </Typography>
      <Typography>
        At the start of your turn as President, you nominate a Chancellor. This
        person must not have been the previous President or Chancellor. Everyone
        votes on whether you and your Chancellor should enact policies. If the
        vote passes, proceed to Policy Enactment. If the vote fails, the Chaos
        Counter increases and the Presidency passes to the person on your left
        (see: Chaos Counter).
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Policy Enactment
      </Typography>
      <Typography>
        The President gets 3 cards, and chooses 2 to pass to the Chancellor. The
        Chancellor then plays 1 of the 2 cards. No reactions (emotions or words)
        can be made until after the card is played.
      </Typography>

      <Typography className={classes.padded} variant="h2">
        Chaos Counter
      </Typography>
      <Typography>
        Every time a vote for President/Chancellor fails, the chaos counter
        increases. If the chaos counter hits 3, the top policy is immediately
        played (no powers associated with the policy are activated). The chaos
        counter then resets, and all plays are eligible for office again. tried
        to make it concise
      </Typography>

      <ActionRow className={classes.padded} fixed>
        <Button color="green" onClick={done}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
