import * as React from 'react'
import { Player } from '../interfaces/player'
import { Input } from '../components/input'
import { RoomId } from '../interfaces/room'
import { Button } from '../components/button'
import { ActionRow } from '../components/actionRow'
import { Layout } from '../components/layout'
import { Profile } from '../components/profile'

interface Props {
  player: Player
  joinLobby: (lobbyId: RoomId) => void
  logOut: () => void
  setProfileImg: (file: any) => void
  setPlayer: (player: Player) => void
}

export const SelectLobby: React.SFC<Props> = ({
  player,
  joinLobby,
  logOut,
  setProfileImg,
  setPlayer,
}) => {
  const [rid, setRid] = React.useState<RoomId>('' as RoomId)

  function join() {
    if (rid.trim() && rid.trim() !== 'null') {
      joinLobby(rid.trim().toLowerCase() as RoomId)
    }
  }

  return (
    <Layout>
      <h1>join lobby:</h1>
      <Input
        label="lobby:"
        id="lobby-id"
        onChange={e => setRid(e.target.value)}
        onSubmit={join}
        autoFocus
      />

      <ActionRow>
        <Button padded onClick={join}>
          join lobby
        </Button>
      </ActionRow>

      <h1>profile setup:</h1>
      <Profile
        className="player"
        text={player.name}
        image={player.profileImg}
      />

      <Input
        id="nickname"
        label="player name:"
        type="text"
        value={player.name}
        onChange={e => {
          setPlayer({
            ...player,
            name: e.target.value,
          })
        }}
      />

      <Input
        id="profile-img"
        label="profile image:"
        type="file"
        onChange={e => setProfileImg(e.target.files[0])}
      />

      <ActionRow>
        <Button padded onClick={logOut}>
          log out
        </Button>
      </ActionRow>

      <style jsx>{`
        .player {
          margin-bottom: 1em;
        }
      `}</style>
    </Layout>
  )
}
