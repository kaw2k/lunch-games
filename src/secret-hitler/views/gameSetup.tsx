import * as React from 'react'
import { Button } from '../../components/button'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'
import { GREY } from '../../helpers/colors'
import { SecretHitlerGameContext } from '../../helpers/contexts'
import { ViewRole } from './game/viewRole'

interface Props {
  ready: () => void
}

export const GameSetup: React.SFC<Props> = ({ ready }) => {
  const { player } = React.useContext(SecretHitlerGameContext)
  const [showRole, setShowRole] = React.useState(false)

  if (player.ready) {
    return (
      <Layout padded>
        <h2>Waiting for game to start</h2>
        <style jsx>{`
          h2 {
            text-align: center;
            color: ${GREY};
            margin-top: 50%;
            animation: spin 6s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Layout>
    )
  }

  if (!showRole) {
    return (
      <Layout padded>
        <h2 className="title">Ready to see your role?</h2>
        <ActionRow fixed>
          <Button padded onClick={() => setShowRole(true)} color="green">
            show role
          </Button>
        </ActionRow>

        <style jsx>{`
          h2 {
            text-align: center;
          }
        `}</style>
      </Layout>
    )
  }

  return <ViewRole button="ready" onDone={ready} disableButton={player.ready} />
}
