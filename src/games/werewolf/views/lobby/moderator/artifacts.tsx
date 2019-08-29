import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography } from '@material-ui/core'
import { WerewolfLobby, WerewolfResults } from '../../../interfaces/game'
import { Profile } from '../../../../../components/profile'
import { count } from '../../../../../helpers/count'
import { RoomContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { makeStyles } from '@material-ui/styles'
import { Artifacts } from '../../../interfaces/artifact/artifacts'
import groupBy from 'ramda/es/groupBy'
import { toPairs, sortBy } from 'ramda'

interface Props {
  lobby: WerewolfLobby | WerewolfResults
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
  // const  updateRoom: ((room: Partial<WerewolfLobby>) => void) = React.useContext(RoomContext).updateRoom
  const { updateRoom } = React.useContext(RoomContext)

  function addOrRemoveArtifact(type: Artifacts): void {
    const numberOfArtifactInDeck = count(
      lobby.werewolfArtifacts,
      r => r === type
    )

    if (numberOfArtifactInDeck) {
      updateRoom({
        werewolfArtifacts: lobby.werewolfArtifacts.filter(r => r !== type),
      })
    } else {
      updateRoom({
        werewolfArtifacts: lobby.werewolfArtifacts.concat(type),
      })
    }
  }

  function reset() {
    updateRoom({
      werewolfArtifacts: [],
    })
  }

  return (
    <Layout padded>
      <Button onClick={reset}>Reset</Button>
      {toPairs(groupBy(a => a.category, Artifacts)).map(
        ([group, artifacts]) => (
          <div key={group}>
            <Typography gutterBottom variant="h2">
              {group}
            </Typography>
            {sortBy(a => a.title, artifacts).map(artifact => (
              <Profile
                key={artifact.type}
                text={artifact.title}
                alignItems="flex-start"
                className={
                  count(lobby.werewolfArtifacts, a => a === artifact.type)
                    ? ''
                    : classes.dim
                }
                subtext={artifact.description}
                onClick={() => addOrRemoveArtifact(artifact.type)}
              />
            ))}
          </div>
        )
      )}
    </Layout>
  )
}
