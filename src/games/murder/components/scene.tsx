import * as React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { MurderGameContext } from '../../../helpers/contexts'
import { Scene } from '../interfaces/game'
import { makeStyles } from '@material-ui/styles'
import { Button } from '../../../components/button'

const useStyles = makeStyles({
  root: { flex: '0 0 auto' },
  buttons: { display: 'flex', flexFlow: 'column' },
})

export const SceneView: React.SFC<{
  scene: Scene
  allowHintSelect?: boolean
}> = ({ scene, allowHintSelect }) => {
  const { updateGame, game } = React.useContext(MurderGameContext)
  const classes = useStyles()

  const hasSelected = typeof scene.selected === 'number'

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" align="center">
          {scene.title}
        </Typography>
        <div className={classes.buttons}>
          {scene.hints.map((hint, i) => (
            <Button
              disabled={hasSelected || !allowHintSelect}
              confirm
              key={i}
              onClick={
                !hasSelected && allowHintSelect
                  ? () => {
                      updateGame({
                        scenes: game.scenes.map(s =>
                          s.id === scene.id ? { ...s, selected: i } : s
                        ),
                      })
                    }
                  : undefined
              }
              color={i === scene.selected ? 'green' : undefined}>
              {hint}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
