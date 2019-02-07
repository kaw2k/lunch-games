import * as React from 'react'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { SecretHitlerGameContext } from '../../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { Card } from '../../../components/card'
import { useCommonStyles } from '../../../../../helpers/commonStyles'

export const InspectCards: React.SFC<{}> = () => {
  const [viewCards, setViewCards] = React.useState<boolean>(false)
  const { game, updateGame } = React.useContext(SecretHitlerGameContext)
  const classes = useCommonStyles()

  if (!viewCards) {
    return (
      <>
        <Typography variant="h2">
          Ready to view the top three cards of the deck?
        </Typography>

        <ActionRow fixed>
          <Button color="green" onClick={() => setViewCards(true)}>
            ready
          </Button>
        </ActionRow>
      </>
    )
  } else {
    return (
      <>
        <Typography gutterBottom variant="h2">
          Here are the next three cards from top to bottom:
        </Typography>

        <div className={classes.row}>
          {game.remainingCards.slice(0, 3).map((c, i) => (
            <Card key={i} party={c} played />
          ))}
        </div>

        <ActionRow fixed>
          <Button
            color="green"
            onClick={() => updateGame({ performPower: null })}>
            done
          </Button>
        </ActionRow>
      </>
    )
  }
}
