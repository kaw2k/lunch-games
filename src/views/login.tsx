import * as React from 'react'
import { Layout } from '../components/layout'
import { Input } from '../components/input'
import { Button, Typography } from '@material-ui/core'
import { PlayerId } from '../interfaces/player'
import { ActionRow } from '../components/actionRow'

interface Props {
  login: (name: PlayerId) => void
}

export const Login: React.SFC<Props> = ({ login }) => {
  const [name, setName] = React.useState<PlayerId>('' as PlayerId)

  function preLogin() {
    const cleanedName = name.trim().toLowerCase()
    if (cleanedName.length) {
      login(cleanedName as PlayerId)
    }
  }

  return (
    <Layout padded>
      <Typography variant="h4">Login</Typography>

      <Input
        id="player-input-id"
        label="Player Name"
        value={name}
        onChange={e => setName(e.target.value as PlayerId)}
        autoFocus
        onSubmit={preLogin}
      />

      <ActionRow>
        <Button
          size="large"
          color="primary"
          variant="contained"
          fullWidth
          onClick={preLogin}>
          login
        </Button>
      </ActionRow>
    </Layout>
  )
}
