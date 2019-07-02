import * as React from 'react'
import { Layout } from '../../../../components/layout'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { SkullGameContext } from '../../../../helpers/contexts'

interface Props {
  cancel: () => void
  endGame: SkullGameContext['endGame']
}

export const EndGame: React.SFC<Props> = ({ cancel, endGame }) => {
  return (
    <Layout padded>
      <Button confirm onClick={() => endGame()}>
        End Game
      </Button>

      <ActionRow>
        <Button onClick={cancel}>cancel</Button>
      </ActionRow>
    </Layout>
  )
}
