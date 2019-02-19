import * as React from 'react'
import { Layout } from '../../../../../components/layout'
import { Typography, Checkbox } from '@material-ui/core'
import { WerewolfLobby } from '../../../interfaces/game'
import { RoomContext } from '../../../../../helpers/contexts'
import { Input } from '../../../../../components/input'

interface Props {
  lobby: WerewolfLobby
}

export const WerewolfModeratorLobbyOptions: React.SFC<Props> = ({ lobby }) => {
  const { updateRoom } = React.useContext(RoomContext)

  return (
    <Layout padded>
      <Typography variant="h2">Options</Typography>

      <Input
        id="timeLimit"
        label="Time Limit"
        value={lobby.options.timeLimit}
        type="tel"
        onChange={e =>
          updateRoom({
            options: {
              ...lobby.options,
              timeLimit: parseInt(e.target.value.replace(/\D/g, '') || '0', 10),
            },
          })
        }
      />

      <label htmlFor="noFlip">
        <Typography component="span" inline>
          No flip:
        </Typography>
        <Checkbox
          id="noFlip"
          type="checkbox"
          checked={lobby.options.noFlip}
          onChange={e => {
            updateRoom({
              options: {
                ...lobby.options,
                noFlip: e.target.checked,
              },
            })
          }}
        />
      </label>

      <label htmlFor="killCult">
        <Typography component="span" inline>
          Cult dies with the cult leader:
        </Typography>
        <Checkbox
          id="killCult"
          type="checkbox"
          checked={lobby.options.killCult}
          onChange={e => {
            updateRoom({
              options: {
                ...lobby.options,
                killCult: e.target.checked,
              },
            })
          }}
        />
      </label>

      <label htmlFor="cursedArtifactAlwaysActive">
        <Typography component="span" inline>
          Cursed artifact always active:
        </Typography>
        <Checkbox
          id="cursedArtifactAlwaysActive"
          type="checkbox"
          checked={lobby.options.cursedArtifactAlwaysActive}
          onChange={e => {
            updateRoom({
              options: {
                ...lobby.options,
                cursedArtifactAlwaysActive: e.target.checked,
              },
            })
          }}
        />
      </label>
    </Layout>
  )
}
