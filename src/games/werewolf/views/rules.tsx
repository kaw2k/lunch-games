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

export const WerewolfRules: React.SFC<Props> = ({ done }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h1" align="center" gutterBottom>
        Rules
      </Typography>

      <ActionRow className={classes.padded} fixed>
        <Button color="green" onClick={done}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
