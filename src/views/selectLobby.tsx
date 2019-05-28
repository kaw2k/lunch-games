import * as React from 'react'
import { Player } from '../interfaces/player'
import { Input } from '../components/input'
import { RoomId } from '../interfaces/room'
import { Button } from '../components/button'
import { Layout } from '../components/layout'
import { Profile } from '../components/profile'
import { makeStyles } from '@material-ui/styles'
import { Tabs, Tab } from '@material-ui/core'
import { ActionRow } from '../components/actionRow'

interface Props {
  player: Player
  joinLobby: (lobbyId: RoomId) => void
  logOut: () => void
  roomIds: RoomId[]
  setProfileImg: (file: any) => void
  setPlayer: (player: Player) => void
}

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
})

enum View {
  create,
  join,
  player,
}

export const SelectLobby: React.SFC<Props> = ({
  player,
  joinLobby,
  logOut,
  roomIds,
  setProfileImg,
  setPlayer,
}) => {
  const classes = useStyles()
  const [rid, setRid] = React.useState<RoomId>('' as RoomId)
  const [view, setView] = React.useState<View>(View.join)

  function join() {
    if (rid.trim() && rid.trim() !== 'null') {
      joinLobby(rid.trim().toLowerCase() as RoomId)
    }
  }

  return (
    <Layout padded>
      <Tabs
        value={view}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, val) => setView(val)}>
        <Tab label="Join Lobby" value={View.join} />
        <Tab label="Create Lobby" value={View.create} />
        <Tab label="Profile Setup" value={View.player} />
      </Tabs>

      {view === View.join && (
        <>
          {roomIds.map(id => (
            <ActionRow>
              <Button onClick={() => joinLobby(id)}>{id}</Button>
            </ActionRow>
          ))}
        </>
      )}

      {view === View.create && (
        <>
          <Input
            label="lobby"
            onChange={e => setRid(e.target.value as RoomId)}
            onSubmit={join}
          />
          <ActionRow fixed>
            <Button color="green" onClick={join}>
              create lobby
            </Button>
          </ActionRow>
        </>
      )}
      {view === View.player && (
        <>
          <Profile
            className="player"
            text={player.name || player.id}
            image={player.profileImg}
          />

          <Input
            label="player name"
            type="text"
            value={player.name || ''}
            onChange={e => {
              setPlayer({
                ...player,
                name: e.target.value,
              })
            }}
          />

          {/* Upload a profile picture */}
          <input
            accept="image/*"
            className={classes.input}
            id="upload"
            type="file"
            onChange={e => {
              if (e && e.target && e.target.files && e.target.files.length) {
                setProfileImg(e.target.files[0])
              }
            }}
          />

          <ActionRow fixed>
            <Button color="red" onClick={logOut}>
              log out
            </Button>

            <label htmlFor="upload" style={{ width: '100%' }}>
              <Button color="green" component="span">
                picture
              </Button>
            </label>
          </ActionRow>
        </>
      )}
    </Layout>
  )
}
