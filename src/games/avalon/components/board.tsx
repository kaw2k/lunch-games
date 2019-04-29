import * as React from 'react'
import { AvalonGame, MissionResult } from '../interfaces/game'
import { Card } from './card'
import { ActionRow } from '../../../components/actionRow'
import { count } from '../../../helpers/count'
import { getBoardEffect } from '../helpers/getBoardEffect'
import {
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ResponsiveDialog } from '../../../components/responsiveDialog'
import { playerName } from '../../../components/playerName'
import { Button } from '../../../components/button'
import { useCommonStyles } from '../../../helpers/commonStyles'

const useStyles = makeStyles({
  row: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  rowItem: {
    textAlign: 'center',
  },
})

const Row: React.SFC<{}> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.row}>{children}</div>
}

const Info: React.SFC<{ title: string }> = ({ title, children }) => {
  const classes = useStyles()
  return (
    <div className={classes.rowItem}>
      <Typography variant="h3">{title}</Typography>
      <Typography>{children}</Typography>
    </div>
  )
}

export const Board: React.SFC<{ game: AvalonGame }> = ({ game }) => {
  const classes = useCommonStyles()
  const numGood = count(game.players, p => p.party === 'good')
  const numBad = count(game.players, p => p.party === 'bad')

  const effects = [0, 1, 2, 3, 4].map(i => getBoardEffect(game.players, i))

  const [isDialogVisible, setIsDialogVisible] = React.useState(false)
  const [selected, setSelected] = React.useState<MissionResult | null>(null)

  return (
    <>
      <div>
        <ActionRow>
          {effects.map(({ fail, people }, i) => (
            <button
              key={i}
              className={classes.buttonReset}
              onClick={() => {
                if (game.missionResults[i]) {
                  setSelected(game.missionResults[i])
                  setIsDialogVisible(true)
                }
              }}>
              <Card
                fails={fail}
                players={people}
                background={
                  !game.missionResults[i]
                    ? null
                    : game.missionResults[i].card === 'bad'
                    ? 'red'
                    : 'blue'
                }
              />
            </button>
          ))}
        </ActionRow>
      </div>

      <Row>
        <Info title="Chaos">{game.chaos} of 5</Info>
        <Info title="Good">{numGood}</Info>
        <Info title="Bad">{numBad}</Info>
      </Row>

      <ResponsiveDialog
        open={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}>
        <DialogTitle>
          <Typography variant="h2">On this turn...</Typography>
        </DialogTitle>

        {selected && (
          <DialogContent>
            <Typography>
              <div>
                <strong>{playerName(selected.mission.owner, game)}</strong> sent
                the following people on this mission:
              </div>
              {selected.mission.players.map(p => (
                <div key={p}>
                  - <em>{playerName(p, game)}</em>
                </div>
              ))}
              <div>
                The mission{' '}
                <strong>
                  {' '}
                  {selected.card === 'good' ? 'passed' : 'failed'}{' '}
                </strong>{' '}
                with {selected.votes.good} passes and {selected.votes.bad}{' '}
                fails.{' '}
              </div>{' '}
            </Typography>
          </DialogContent>
        )}

        <DialogActions>
          <Button color="green" onClick={() => setIsDialogVisible(false)}>
            close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    </>
  )
}
