import * as React from 'react'
import { Button } from '../../../components/button'
import { Layout } from '../../../components/layout'
import { SecretHitlerGameContext } from '../../../helpers/contexts'
import { ViewRole } from './game/viewRole'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../components/actionRow'

interface Props {
  ready: () => void
}

// const useStyles = makeStyles({
//   spin: {
//     textAlign: 'center',
//     'margin-top': '50%',
//     animation: 'spin 6s linear infinite',

//     '@keyframes spin': {
//       from: {
//         transform: 'rotate(0deg)',
//       },
//       to: {
//         transform: 'rotate(360deg)',
//       },
//     },
//   },
// })

export const GameSetup: React.SFC<Props> = ({ ready }) => {
  const { player } = React.useContext(SecretHitlerGameContext)
  const [showRole, setShowRole] = React.useState(false)

  if (player.ready) {
    return (
      <Layout padded>
        <Typography variant="h2" align="center">
          WAITING FOR GAME TO START
        </Typography>
      </Layout>
    )
  }

  if (!showRole) {
    return (
      <>
        <Typography gutterBottom variant="h2" align="center">
          READY TO SEE YOUR ROLE?
        </Typography>

        <ActionRow fixed>
          <Button color="green" onClick={() => setShowRole(true)}>
            show role
          </Button>
        </ActionRow>
      </>
    )
  }

  return <ViewRole button="ready" onDone={ready} disableButton={player.ready} />
}
