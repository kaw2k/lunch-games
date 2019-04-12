import * as React from 'react'
import { Button } from '../../../../../components/button'
import { Layout } from '../../../../../components/layout'
import { ActionRow } from '../../../../../components/actionRow'
import { RoomContext } from '../../../../../helpers/contexts'
import { ChooseGame } from '../../../../../components/chooseGame'
import { Typography } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { WerewolfRules } from '../../rules'
import '../../../helpers/gameEngine'
import { isModerator } from '../../../helpers/isModerator'
import { playerName } from '../../../../../components/playerName'
import { isSpectator } from '../../../../../helpers/isSpectator'
import { Grid } from '../../../../../components/grid'
import { PlayerCard } from '../../../../../components/card/player'

interface Props {
  lobby: WerewolfLobby
  toggleModerator: () => void
  toggleSpectator: () => void
}

enum View {
  rules,
  lobby,
}

export const WerewolfPlayerLobby: React.SFC<Props> = ({
  lobby,
  toggleModerator,
  toggleSpectator,
}) => {
  const { kickPlayer, leaveRoom, player } = React.useContext(RoomContext)
  const [view, setView] = React.useState(View.lobby)

  if (view === View.rules) {
    return (
      <Layout padded>
        <WerewolfRules done={() => setView(View.lobby)} />
      </Layout>
    )
  }

  return (
    <Layout padded>
      {lobby.victoryMessage && (
        <Typography variant="h2" gutterBottom align="center">
          {lobby.victoryMessage}
        </Typography>
      )}

      <div>
        <Typography variant="h2">Lobby: {lobby.id}</Typography>
        <Typography component="em">
          The game needs at least 5 players and one moderator to start
        </Typography>
      </div>

      <ChooseGame />

      <Grid>
        {lobby.lobbyPlayers.map(p => (
          <PlayerCard
            key={p.id}
            player={p}
            badge={
              isModerator(p, lobby)
                ? 'school'
                : isSpectator(p, lobby)
                ? 'search'
                : false
            }
            onClick={() =>
              confirm(`Do you want to kick ${playerName(p)}`) && kickPlayer(p)
            }
          />
        ))}
      </Grid>

      <ActionRow fixed>
        {!isModerator(player, lobby) && (
          <Button onClick={leaveRoom}>leave</Button>
        )}

        {!isModerator(player, lobby) && (
          <Button onClick={toggleSpectator}>
            {isSpectator(player, lobby) ? 'Stop Spectating' : 'Spectate'}
          </Button>
        )}

        <Button onClick={toggleModerator}>
          {isModerator(player, lobby) ? 'Stop Moderating' : 'Moderate'}
        </Button>
      </ActionRow>
    </Layout>
  )
}
