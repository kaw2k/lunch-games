import * as React from 'react'
import { Lobby } from '../interfaces/room'
import { Layout } from '../components/layout'
import { ActionRow } from '../components/actionRow'
import { Button } from '../components/button'
import { RoomContext } from '../helpers/contexts'
import { ChooseGame } from '../components/chooseGame'
import { Typography} from '@material-ui/core'
import { playerName } from '../components/playerName'
import {Grid} from '../components/grid'
import {PlayerCard} from '../components/card/player'

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

      <Grid>
        {lobby.lobbyPlayers.map(p => (
          <PlayerCard
            key={p.id}
            player={p}
            onClick={() =>
              confirm(`Do you want to kick ${playerName(p)}`) && kickPlayer(p)
            }
          />
        ))}
      </Grid>

      <ActionRow fixed>
        <Button onClick={leaveRoom}>leave</Button>
      </ActionRow>
    </Layout>
  )
}
