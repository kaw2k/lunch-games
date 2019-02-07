import * as React from 'react'
import { ActionRow } from './actionRow'
import { Button } from './button'
import * as local from '../helpers/localstorage'
import { Typography } from '@material-ui/core'

export const Error = () => (
  <>
    <Typography gutterBottom align="center" variant="h1">
      Something went wrong...
    </Typography>
    <ActionRow fixed>
      <Button
        color="red"
        onClick={() => {
          local.localUserId.set(null)
          local.roomId.set(null)
          location.reload()
        }}>
        help me!
      </Button>
    </ActionRow>
  </>
)
