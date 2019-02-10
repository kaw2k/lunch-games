import * as React from 'react'
import { Layout } from '../components/layout'
import { Input } from '../components/input'
import { PlayerId } from '../interfaces/player'
import { ActionRow } from '../components/actionRow'
import { Button } from '../components/button'

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
      <Input
        id="player-input-id"
        label="Player Name"
        value={name}
        onChange={e => setName(e.target.value as PlayerId)}
        autoFocus
        onSubmit={preLogin}
      />

      <ActionRow>
        <Button size="large" color="blue" onClick={preLogin}>
          login
        </Button>
      </ActionRow>
    </Layout>
  )
}
