import * as React from 'react'
import { Button } from '../../../../../components/button'
import { Layout } from '../../../../../components/layout'
import { ActionRow } from '../../../../../components/actionRow'
import { Profile } from '../../../../../components/profile'
import { RoomContext } from '../../../../../helpers/contexts'
import { ChooseGame } from '../../../../../components/chooseGame'
import { Typography } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { WerewolfRules } from '../../rules'
import '../../../helpers/gameEngine'
import { isModerator } from '../../../helpers/isModerator'

interface Props {
  lobby: WerewolfLobby
  toggleModerator: () => void
}

enum View {
  rules,
  lobby,
}

export const WerewolfPlayerLobby: React.SFC<Props> = ({
  lobby,
  toggleModerator,
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

      {lobby.lobbyPlayers.map(p => (
        <Profile
          key={p.id}
          text={p.name || p.id}
          subtext={isModerator(p, lobby) ? 'moderator' : ''}
          image={p.profileImg}
          onClick={() => kickPlayer(p)}
        />
      ))}

      <ActionRow fixed>
        <Button onClick={toggleModerator}>
          {isModerator(player, lobby) ? 'Stop Moderating' : 'Moderate'}
        </Button>
      </ActionRow>

      <ActionRow>
        <Button onClick={leaveRoom}>leave</Button>
        <Button onClick={() => setView(View.rules)}>Rules</Button>
      </ActionRow>
    </Layout>
  )
}