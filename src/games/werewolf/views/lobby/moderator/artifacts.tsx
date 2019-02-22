import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { Profile } from '../../../../../components/profile'
import { count } from '../../../../../helpers/count'
import { RoomContext } from '../../../../../helpers/contexts'
import { getWeight } from '../../../helpers/getWeight'
import { Button } from '../../../../../components/button'
import { makeStyles } from '@material-ui/styles'
import { Artifacts } from '../../../interfaces/artifact'

interface Props {
  lobby: WerewolfLobby
}

const useStyles = makeStyles({
  dim: {
    opacity: 0.25,
  },
})

export const WerewolfModeratorLobbyArtifacts: React.SFC<Props> = ({
  lobby,
}) => {
  const classes = useStyles()
  const { updateRoom } = React.useContext(RoomContext)

  function addOrRemoveArtifact(type: Artifacts): void {
    const numberOfArtifactInDeck = count(lobby.artifacts, r => r === type)

    if (numberOfArtifactInDeck) {
      updateRoom({
        artifacts: lobby.artifacts.filter(r => r !== type),
      })
    } else {
      updateRoom({
        artifacts: lobby.artifacts.concat(type),
      })
    }
  }

  function reset() {
    updateRoom({
      roles: [],
    })
  }

  return (
    <Layout padded>
      <Typography variant="h2">Roles: {getWeight(lobby.roles)}</Typography>
      <Button onClick={reset}>Reset</Button>
      {Artifacts.map(artifact => (
        <Profile
          key={artifact.state.type}
          text={artifact.state.title}
          alignItems="flex-start"
          className={
            count(lobby.artifacts, a => a === artifact.type) ? '' : classes.dim
          }
          subtext={artifact.state.description}
          onClick={() => addOrRemoveArtifact(artifact.type)}
        />
      ))}
    </Layout>
  )
}
