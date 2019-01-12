import * as React from 'react'
import { Button } from '../components/button'
import { Layout } from '../components/layout'
import { ActionRow } from '../components/actionRow'
import { PlayerId } from '../interfaces/player'
import { Input } from '../components/input'

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
      <h1 className="title">Secret Hitler</h1>

      <Input
        id="player-input-id"
        label="Player Name"
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
        onSubmit={preLogin}
      />

      <ActionRow>
        <Button padded onClick={preLogin}>
          login
        </Button>
      </ActionRow>
    </Layout>
  )
}
