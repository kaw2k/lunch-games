import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { ViewRoleContainer } from '../viewRoleContainer'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { useSelectState } from '../../../../../hooks/useSelectState'
import { PlayerId } from '../../../../../interfaces/player'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { Typography } from '@material-ui/core'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { getActionCreator } from '../../../interfaces/actions'

interface Props {
  ready: (actions: any[]) => void
}

export const VAWolfSetup: React.SFC<Props> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)
  const count = 1
  const [selected, updateSelected] = useSelectState<PlayerId>([], count)
  const classes = useCommonStyles()

  return (
    <ViewRoleContainer player={player}>
      <Typography variant="h1">Setup your role</Typography>
      <Typography gutterBottom>
        When VA Wolf dies, the person you choose dies as well.
      </Typography>
      <div className={classes.twoColumns}>
        {values(game.players)
          .filter(p => p.id !== player.id)
          .map(p => (
            <WerewolfProfile
              selected={contains(p.id, selected)}
              key={p.id}
              player={p}
              onClick={() => updateSelected(p.id)}
            />
          ))}
      </div>

      <ActionRow fixed>
        <Button
          disabled={selected.length !== count}
          onClick={() =>
            ready([getActionCreator('link player')(selected[0], player.id)])
          }
          color={selected.length !== count ? 'red' : 'green'}>
          ready
        </Button>
      </ActionRow>
    </ViewRoleContainer>
  )
}
