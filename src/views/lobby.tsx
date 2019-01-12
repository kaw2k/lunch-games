import * as React from 'react'
import { Lobby } from '../interfaces/room'
import { Layout } from '../components/layout'
import { Profile } from '../components/profile'
import { ActionRow } from '../components/actionRow'
import { Button } from '../components/button'
import { RoomContext } from '../helpers/contexts'
import { ChooseGame } from '../components/chooseGame'

interface Props {
  lobby: Lobby
}

export const LobbyGeneral: React.SFC<Props> = ({ lobby }) => {
  const { kickPlayer, leaveRoom } = React.useContext(RoomContext)

  return (
    <Layout padded>
      <div>
        <h2>Lobby: {lobby.id}</h2>
        <em>Please select a game type to get started</em>
      </div>

      <ChooseGame />

      {lobby.lobbyPlayers.map(p => (
        <Profile
          key={p.id}
          text={p.name}
          image={p.profileImg}
          onClick={() => kickPlayer(p)}
        />
      ))}

      <ActionRow>
        <Button padded onClick={leaveRoom}>
          leave
        </Button>
      </ActionRow>
    </Layout>
  )
}
