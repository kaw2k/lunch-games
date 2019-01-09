import * as React from 'react'
import * as local from '../helpers/localstorage'
import { database } from '../helpers/firebase'
import { Loading } from '../interfaces/loading'
import { PlayerId, Player } from '../interfaces/player'
import { useDocument } from 'react-firebase-hooks/firestore'
import { getPlayer } from '../apis/player'

export function useAuthState(): Loading<{
  data: Player | null
  signIn: (name: PlayerId) => void
  signOut: () => void
  setProfileImg: (file: any) => void
  setPlayer: (player: Player) => void
}> {
  const [pid, setPid] = React.useState<PlayerId | null>(local.localUserId.get())
  const [loadingUser, setLoadingUser] = React.useState<boolean>(false)
  const { value, loading, error } = useDocument(
    database.players.doc(pid || 'none')
  )
  const player = value ? (value.data() as Player) || null : null

  async function signIn(name: PlayerId) {
    setLoadingUser(true)
    const player = await getPlayer(name)

    if (!player) {
      await setPlayer({
        id: name,
        name,
        profileImg: null,
      })
    }

    setPid(name)
    local.localUserId.set(name)
    setLoadingUser(false)
  }

  function setPlayer(player: Player) {
    return database.players.doc(player.id).set(player)
  }

  function signOut() {
    setPid(null)
    local.localUserId.set(null)
  }

  function setProfileImg(file: any) {
    if (!pid) return

    database
      .profileImg(pid)
      .put(file)
      .then(async () => {
        if (player) {
          setPlayer({
            ...player,
            profileImg: await database.profileImg(pid).getDownloadURL(),
          })
        }
      })
  }

  if (loading || loadingUser) return { loading: true }
  if (error) return { loading: false, error: true }

  return {
    loading: false,
    error: false,
    data: player,
    signOut,
    signIn,
    setProfileImg,
    setPlayer,
  }
}
