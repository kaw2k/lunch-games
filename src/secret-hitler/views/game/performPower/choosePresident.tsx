import * as React from 'react'
import { Layout } from '../../../../components/layout'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'

export const ChoosePresident: React.SFC<{}> = () => {
  const { updateGame } = React.useContext(SecretHitlerGameContext)

  return (
    <Layout>
      <h1>Choose who you would like to be president</h1>
      <ActionRow>
        <Button padded onClick={() => updateGame({ performPower: null })}>
          done
        </Button>
      </ActionRow>
    </Layout>
  )
}
