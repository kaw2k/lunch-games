import * as React from 'react'
import cx from 'classnames'
import { SecretHitlerGame, Party } from '../interfaces/game'
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
import { playerName } from '../../../components/playerName'
import { SecretHitlerGameContext } from '../../../helpers/contexts'

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
  const [selected, setSelected] = React.useState<{
    type: Party
    index: number
  } | null>(null)

  const numFascistCards = count(game.playedCards, x => x.card === 'fascist')
  const numLiberalCards = count(game.playedCards, x => x.card === 'liberal')

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
                setSelected({ index: i, type: 'fascist' })
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
            <button
              className={cx(classes.cardButton, classes.card)}
              key={`fascist-${
                i <= numFascistCards ? 'card' : 'placeholder'
              }-${i}`}
              onClick={() => {
                setSelected({ index: i, type: 'liberal' })
                toggleDialog(true)
              }}>
              <Card
                key={`liberal-${
                  i <= numLiberalCards ? 'card' : 'placeholder'
                }-${i}`}
                played={i <= numLiberalCards}
                party="liberal"
              />
            </button>
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
      <TurnDialog
        index={selected && selected.index}
        party={selected && selected.type}
        open={isDialogVisible}
        onClose={() => setSelected(null)}
      />
    </>
  )
}

const TurnDialog: React.SFC<{
  open: boolean
  onClose: () => void
  party: Party | null
  index: number | null
}> = ({ open, onClose, party, index }) => {
  const { game } = React.useContext(SecretHitlerGameContext)

  if (index === null || party === null) return null

  const cards =
    party === 'liberal'
      ? game.playedCards.filter(c => c.card === 'liberal')
      : game.playedCards.filter(c => c.card === 'fascist')

  const turn = cards[index - 1]

  if (turn) {
    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography variant="h2">On this turn...</Typography>
        </DialogTitle>

        <DialogContent>
          <Typography gutterBottom>A {turn.card} was played</Typography>

          {!turn.government && (
            <Typography>This card was played by chaos.</Typography>
          )}

          {turn.government && (
            <Typography>
              <div>
                The president was {playerName(turn.government!.president)}
              </div>
              <div>
                The chancellor was {playerName(turn.government!.chancellor)}
              </div>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="green" onClick={onClose}>
            close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  if (party === 'liberal') {
    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography variant="h2">
            Nothing special happens for liberals...
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button color="green" onClick={onClose}>
            close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h2">On this turn...</Typography>
      </DialogTitle>

      <DialogContent>
        {index !== 6 && !getBoardEffect(game.players, index) && (
          <Typography>
            If a fascist is played on this turn, no special effect happens.
          </Typography>
        )}
        {index === 6 && !getBoardEffect(game.players, index) && (
          <Typography>
            The government proceeds as normal, however if after the president
            passes the cards to the chancellor, and they both agree to veto,
            then no card is played and it is as if the government didn't happen.
          </Typography>
        )}
        {getBoardEffect(game.players, index) === 'kill' && (
          <Typography>
            If a fascist is played, the president for that government gets to
            kill someone. If hitler is killed the liberals win.
          </Typography>
        )}
        {getBoardEffect(game.players, index) === 'choose president' && (
          <Typography>
            If a fascist is played, the president for that government gets to
            choose the next president. After that next government, play resumes
            as normal with original play order.
          </Typography>
        )}
        {getBoardEffect(game.players, index) === 'inspect cards' && (
          <Typography>
            If a fascist is played, the president for that government gets to
            inspect the next three cards in order. They may choose to disclose
            what they see if they wish (or even lie about it).
          </Typography>
        )}
        {getBoardEffect(game.players, index) === 'inspect role' && (
          <Typography>
            If a fascist is played, the president for that government gets to
            inspect another players party membership. They will not know if
            someone is hitler or not, only if they are liberal or fascist. They
            may choose to disclose what they see if they wish (or even lie about
            it).
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button color="green" onClick={onClose}>
          close
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}
