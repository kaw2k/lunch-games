import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { RoomContext } from '../../../../../helpers/contexts'
import { ChooseGame } from '../../../../../components/chooseGame'
import {
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Icon,
  Badge,
} from '@material-ui/core'
import { WerewolfLobby, WerewolfResults } from '../../../interfaces/game'
import { WerewolfRules } from '../../rules'
import '../../../helpers/gameEngine'
import { isModerator } from '../../../helpers/isModerator'
import { playerName } from '../../../../../components/playerName'
import { isSpectator } from '../../../../../helpers/isSpectator'
import { Grid } from '../../../../../components/grid'
import { PlayerCard } from '../../../../../components/card/player'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { Profile } from '../../../../../components/profile'
import { values } from 'ramda'

interface Props {
  lobby: WerewolfLobby | WerewolfResults
  toggleModerator: () => void
  toggleSpectator: () => void
}

enum View {
  rules,
  lobby,
  results,
  spectate,
  moderate,
  leave,
}

export const WerewolfPlayerLobby: React.SFC<Props> = ({
  lobby,
  toggleModerator,
  toggleSpectator,
}) => {
  const classes = useCommonStyles()
  const { leaveRoom } = React.useContext(RoomContext)
  const [view, setView] = React.useState(
    lobby.type === 'werewolf-results' ? View.results : View.lobby
  )

  return (
    <Layout padded hasTabs>
      {view === View.results && lobby.type === 'werewolf-results' && (
        <Results lobby={lobby} />
      )}
      {(view === View.lobby ||
        (view === View.results && lobby.type !== 'werewolf-results')) && (
        <PlayerView lobby={lobby} />
      )}
      {view === View.rules && (
        <WerewolfRules done={() => setView(View.lobby)} />
      )}

      <BottomNavigation
        className={classes.nav}
        value={view}
        showLabels
        onChange={(e, val) => {
          if (val === View.spectate) {
          } else if (val === View.moderate) {
            toggleModerator()
          } else if (val === View.spectate) {
            toggleSpectator()
          } else if (val === View.leave) {
            leaveRoom()
          } else {
            setView(val)
          }
        }}>
        {lobby.type === 'werewolf-results' && (
          <BottomNavigationAction
            label="Results"
            value={View.results}
            icon={<Icon>star</Icon>}
          />
        )}

        <BottomNavigationAction
          label="Lobby"
          value={View.lobby}
          icon={
            <Badge
              badgeContent={
                lobby.lobbyPlayers.filter(
                  p => !isModerator(p, lobby) && !isSpectator(p, lobby)
                ).length
              }>
              <Icon>group</Icon>
            </Badge>
          }
        />

        <BottomNavigationAction
          label="Rules"
          value={View.rules}
          icon={<Icon>description</Icon>}
        />

        <BottomNavigationAction
          label="Moderate"
          value={View.moderate}
          icon={<Icon>speaker_notes</Icon>}
        />

        {/* <BottomNavigationAction
          label="Spectate"
          value={View.spectate}
          icon={
            <Icon color={isSpectator(player, lobby) ? 'secondary' : 'default'}>
              remove_red_eye
            </Icon>
          }
        /> */}

        <BottomNavigationAction
          label="Leave"
          value={View.leave}
          icon={<Icon>exit_to_app</Icon>}
        />
      </BottomNavigation>
    </Layout>
  )
}

export const PlayerView: React.SFC<{
  lobby: WerewolfLobby | WerewolfResults
}> = ({ lobby }) => {
  const { kickPlayer } = React.useContext(RoomContext)

  return (
    <>
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
    </>
  )
}

const Results: React.SFC<{
  lobby: WerewolfResults
}> = ({ lobby }) => (
  <>
    <Typography gutterBottom align="center" variant="h2">
      {lobby.victoryMessage}
    </Typography>

    {values(lobby.players).map(p => (
      <Profile image={p.profileImg} text={playerName(p)} subtext={p.role} />
    ))}
  </>
)
