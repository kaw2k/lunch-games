import * as React from 'react'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { SecretHitlerGameContext } from '../../../../../helpers/contexts'
import { Typography } from '@material-ui/core'

export const ChoosePresident: React.SFC<{}> = () => {
  const { updateGame } = React.useContext(SecretHitlerGameContext)

  return (
    <>
      <Typography variant="h2">
        Choose who you would like to be president
      </Typography>
      <ActionRow fixed>
        <Button
          color="green"
          onClick={() => updateGame({ performPower: null })}>
          done
        </Button>
      </ActionRow>
    </>
  )
}
