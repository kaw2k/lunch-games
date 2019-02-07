import * as React from 'react'
import cx from 'classnames'
import { SecretHitlerGame } from '../interfaces/game'
import { Card } from './card'
import { getBoardEffect } from '../helpers/getBoardEffect'
import { Button } from '../../../components/button'
import { count } from '../../../helpers/count'
import { SHIcon } from './icon'
import { useCommonStyles } from '../../../helpers/commonStyles'
import {
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ResponsiveDialog } from '../../../components/responsiveDialog'

const useRowStyles = makeStyles({
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
})

const Row: React.SFC<{}> = ({ children }) => {
  const classes = useRowStyles()
  return <div className={classes.row}>{children}</div>
}

const Info: React.SFC<{ title: string }> = ({ title, children }) => (
  <div className="root">
    <Typography variant="h3">{title}</Typography>
    <Typography>{children}</Typography>
  </div>
)

const useStyles = makeStyles({
  cardButton: {
    padding: 0,
    border: 'none',
    background: 'transparent',
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',

    flex: '1 0 auto',
  },
  card: {
    width: `${100 / 6}%`,
  },
})

export const Board: React.SFC<{ game: SecretHitlerGame }> = ({ game }) => {
  const classes = { ...useCommonStyles(), ...useStyles() }

  const [isDialogVisible, toggleDialog] = React.useState(false)
  const [selectedEffect, showEffect] = React.useState<number | null>(null)

  const numFascistCards = count(game.playedCards, x => x === 'fascist')
  const numLiberalCards = count(game.playedCards, x => x === 'liberal')

  const numFascists = count(game.players, x => x.role.party === 'fascist') - 1
  const numLiberals = count(game.players, x => x.role.party === 'liberal')

  return (
    <>
      <div>
        <div className={classes.row}>
          <Typography gutterBottom variant="h2" className={classes.title}>
            <SHIcon icon="fascist" padRight />
            Fascists:
          </Typography>
          {numFascistCards >= 3 && (
            <Typography
              className={classes.pullRight}
              color="error"
              align="right">
              If Hitler is chancellor, Fascists win.
            </Typography>
          )}
        </div>
        <div className={classes.row}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <button
              className={cx(classes.cardButton, classes.card)}
              key={`fascist-${
                i <= numFascistCards ? 'card' : 'placeholder'
              }-${i}`}
              onClick={() => {
                showEffect(i)
                toggleDialog(true)
              }}>
              <Card
                played={i <= numFascistCards}
                party="fascist"
                type={
                  i > numFascistCards ? getBoardEffect(game.players, i) : null
                }
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Typography gutterBottom variant="h2" className={classes.title}>
          <SHIcon icon="liberal" padRight />
          Liberals:
        </Typography>
        <div className={classes.row}>
          {[1, 2, 3, 4, 5].map(i => (
            <Card
              key={`liberal-${
                i <= numLiberalCards ? 'card' : 'placeholder'
              }-${i}`}
              className={classes.card}
              played={i <= numLiberalCards}
              party="liberal"
            />
          ))}
        </div>
      </div>

      <Row>
        <Info title="Liberals">{numLiberals}</Info>
        <Info title="Fascists">{numFascists}</Info>
        <Info title="Hitler">1</Info>
      </Row>

      <Row>
        <Info title="Chaos">{game.chaos} of 3</Info>
        <Info title="Cards">{game.remainingCards.length}</Info>
      </Row>

      {/* Turn Explanation Dialog */}
      <ResponsiveDialog
        open={isDialogVisible}
        onClose={() => toggleDialog(false)}>
        <DialogTitle>
          <Typography variant="h2">On this turn...</Typography>
        </DialogTitle>

        {selectedEffect !== null && (
          <DialogContent>
            {selectedEffect !== 6 &&
              !getBoardEffect(game.players, selectedEffect) && (
                <Typography>
                  If a fascist is played on this turn, no special effect
                  happens.
                </Typography>
              )}
            {selectedEffect === 6 &&
              !getBoardEffect(game.players, selectedEffect) && (
                <Typography>
                  The government proceeds as normal, however if after the
                  president passes the cards to the chancellor, and they both
                  agree to veto, then no card is played and it is as if the
                  government didn't happen.
                </Typography>
              )}
            {getBoardEffect(game.players, selectedEffect) === 'kill' && (
              <Typography>
                If a fascist is played, the president for that government gets
                to kill someone. If hitler is killed the liberals win.
              </Typography>
            )}
            {getBoardEffect(game.players, selectedEffect) ===
              'choose president' && (
              <Typography>
                If a fascist is played, the president for that government gets
                to choose the next president. After that next government, play
                resumes as normal with original play order.
              </Typography>
            )}
            {getBoardEffect(game.players, selectedEffect) ===
              'inspect cards' && (
              <Typography>
                If a fascist is played, the president for that government gets
                to inspect the next three cards in order. They may choose to
                disclose what they see if they wish (or even lie about it).
              </Typography>
            )}
            {getBoardEffect(game.players, selectedEffect) ===
              'inspect role' && (
              <Typography>
                If a fascist is played, the president for that government gets
                to inspect another players party membership. They will not know
                if someone is hitler or not, only if they are liberal or
                fascist. They may choose to disclose what they see if they wish
                (or even lie about it).
              </Typography>
            )}
          </DialogContent>
        )}

        <DialogActions>
          <Button color="green" onClick={() => toggleDialog(false)}>
            close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    </>
  )
}
