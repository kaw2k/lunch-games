import * as React from 'react'
import { Lobby } from '../interfaces/room'
import { Layout } from '../components/layout'
import { Profile } from '../components/profile'
import { ActionRow } from '../components/actionRow'
import { Button } from '../components/button'
import { RoomContext } from '../helpers/contexts'
import { ChooseGame } from '../components/chooseGame'
import { Typography } from '@material-ui/core'

interface Props {
  lobby: Lobby
}

export const LobbyGeneral: React.SFC<Props> = ({ lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <Layout padded>
      <div>
        <Typography variant="h2">Lobby: {lobby.id}</Typography>
        <Typography component="em">
          Please select a game type to get started
        </Typography>
      </div>

      <ChooseGame />

      {lobby.lobbyPlayers.map(p => (
        <Profile
          key={p.id}
          text={p.name || p.id}
          image={p.profileImg}
          onClick={() => kickPlayer(p)}
        />
      ))}

      <ActionRow fixed>
        <Button onClick={leaveRoom}>leave</Button>
      </ActionRow>
    </Layout>
  )
}
