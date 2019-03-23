import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography, Checkbox } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { RoomContext } from '../../../../../helpers/contexts'
import { Input } from '../../../../../components/input'
import { makeStyles } from '@material-ui/styles'

interface Props {
  lobby: WerewolfLobby
}

const useStyles = makeStyles({
  label: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: '.5em',
  },
  input: {
    width: '55px',
    marginRight: '1em',
    flex: '0 0 auto',
  },
  section: {
    marginTop: '2em',
    marginBottom: '.5em',
  },
})

export const WerewolfModeratorLobbyOptions: React.SFC<Props> = ({ lobby }) => {
  const classes = useStyles()

  return (
    <Layout padded>
      <Typography variant="h2">General Settings</Typography>

      <Value
        option="dayTimeLimit"
        title="Day Time Limit"
        description="How long the day takes, this will be displayed to the moderator and users. Setting this to 0 means there is no time limit."
        lobby={lobby}
      />

      <Value
        option="nightTimeLimit"
        title="Night Time Limit"
        description="How long each turn at night takes. Setting this to 0 means there is no time limit."
        lobby={lobby}
      />

      <Option
        title="No Flip"
        option="noFlip"
        description="When a player dies, their role is not revealed. This means all roles (regardless of if there is a living player) are woken up at night. "
        lobby={lobby}
      />

      <Option
        title="Protection For All"
        option="protectWolves"
        description="Protections and blessings will prevent chewks from killing werewolves."
        lobby={lobby}
      />

      <Typography className={classes.section} variant="h2">
        Role Settings
      </Typography>

      <Option
        title="Kill Cult"
        option="killCult"
        description="When the cult leader dies, their cult dies with them."
        lobby={lobby}
      />

      <Option
        title="Small Explosions"
        option="madBomberOnlyKillsAdjacent"
        description="When the mad bomber dies, only the people physically to their left and right die (without gaps)."
        lobby={lobby}
      />

      <Option
        title="Behold The Seers"
        option="beholderSeesAllSeers"
        description="The beholder normally only sees the seer. If this is enabled, the beholder also sees the apprentice seer and the mystic seer."
        lobby={lobby}
      />

      <Option
        title="Sasquatch Is Chill"
        option="sasquatchIsChill"
        description="Sasquatch will not transform the first night if no one dies during the day."
        lobby={lobby}
      />

      <Option
        title="Lucky Leprechaun"
        option="luckyLeprechaun"
        description="The leprechaun can divert the werewolves from attacking themselves once."
        lobby={lobby}
      />


      <Typography className={classes.section} variant="h2">
        Artifact Settings
      </Typography>

      <Option
        title="Always Cursed"
        option="cursedArtifactAlwaysActive"
        description="The cursed artifact does not need to be played, the user is cursed by default."
        lobby={lobby}
      />

      <Option
        title="Always Wolfish"
        option="werewolfArtifactAlwaysActive"
        description="The claw of the werewolf artifact does not need to be played, the user is a werewolf and their normal role by default."
        lobby={lobby}
      />
    </Layout>
  )
}

const Option: React.SFC<{
  option: keyof WerewolfLobby['options']
  title: string
  description: string
  lobby: WerewolfLobby
}> = ({ option, title, lobby, description }) => {
  const { updateRoom } = React.useContext(RoomContext)
  const classes = useStyles()

  return (
    <label className={classes.label} htmlFor={option}>
      <Checkbox
        id={option}
        type="checkbox"
        checked={!!lobby.options[option]}
        onChange={e => {
          updateRoom({
            options: {
              ...lobby.options,
              [option]: e.target.checked,
            },
          })
        }}
      />
      <div className={classes.text}>
        <Typography gutterBottom className={classes.title} variant="h4">
          {title}
        </Typography>
        <Typography component="span" inline>
          {description}
        </Typography>
      </div>
    </label>
  )
}

const Value: React.SFC<{
  option: keyof WerewolfLobby['options']
  title: string
  description: string
  lobby: WerewolfLobby
}> = ({ option, title, lobby, description }) => {
  const { updateRoom } = React.useContext(RoomContext)
  const classes = useStyles()

  return (
    <label className={classes.label} htmlFor={option}>
      <Input
        id={option}
        value={lobby.options[option]}
        type="tel"
        className={classes.input}
        onChange={e =>
          updateRoom({
            options: {
              ...lobby.options,
              [option]: parseInt(e.target.value.replace(/\D/g, '') || '0', 10),
            },
          })
        }
      />
      <div className={classes.text}>
        <Typography gutterBottom className={classes.title} variant="h4">
          {title}
        </Typography>
        <Typography component="span" inline>
          {description}
        </Typography>
      </div>
    </label>
  )
}
