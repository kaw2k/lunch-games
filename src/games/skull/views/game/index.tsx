import * as React from 'react'
import { SkullGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { Typography } from '@material-ui/core'
import {
  PlayerSkull,
  Bidding,
  Resolution,
  Discard,
  numPlayedCards,
  everyonePlayed,
  getNextPlayer,
  SkullCardId,
  SkullCard,
  startBidding,
  SkullLobby,
} from '../../interfaces/game'
import { playerName } from '../../../../components/playerName'
import { assertNever } from '../../../../helpers/assertNever'
import { Choose, Props as ChooseProps } from '../../../../components/choose'
import { Card } from '../../components/card'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import range from 'ramda/es/range'
import { Selectable } from '../../../../components/card/selectable'
import { clone } from '../../../../helpers/clone'
import { count } from '../../../../helpers/count'
import { PlayerId } from '../../../../interfaces/player'
import { shuffle } from '../../../../helpers/shuffle'
import { makeStyles } from '@material-ui/styles'
import { PlayerCard } from '../../../../components/card/player'

const ChooseSkullCard: React.SFC<Partial<ChooseProps<SkullCard>>> = props => {
  return (
    <Choose
      title="Choose a card"
      doneText="choose card"
      items={[]}
      renderItem={props => (
        <Card
          key={props.item.id}
          card={props.item}
          onClick={props.onClick}
          selected={props.selected}
        />
      )}
      {...props}
    />
  )
}

const usePlayerStyles = makeStyles({
  row: {
    display: 'flex',
    // alignItems: 'center',
    marginBottom: '1em',

    '& > * + * ': {
      marginLeft: '1em',
    },
  },
  data: {
    textAlign: 'center',
  },
  profile: {
    width: '20%',
  },
  title: {
    fontWeight: 'bold',
  },
})

const Player: React.SFC<{ player: PlayerSkull }> = ({ player }) => {
  const classes = usePlayerStyles()
  const numCards = player.cards.length + player.playedCards.length

  return (
    <div className={classes.row}>
      <PlayerCard player={player} className={classes.profile} />

      <div className={classes.data}>
        <Typography className={classes.title}>Cards Played</Typography>
        <Typography>{player.playedCards.length}</Typography>
      </div>

      <div className={classes.data}>
        <Typography className={classes.title}>Cards Remaining</Typography>
        <Typography>{numCards} of 4</Typography>
      </div>

      <div className={classes.data}>
        <Typography className={classes.title}>Points</Typography>
        <Typography>{player.correctGuess ? 1 : 0} of 2</Typography>
      </div>
    </div>
  )
}

// const useBoardStyles = makeStyles({})

const Board: React.SFC = ({}) => {
  // const classes = useBoardStyles()
  const { player, game } = React.useContext(SkullGameContext)
  const otherPlayers = values(game.players).filter(p => p.id !== player.id)

  return (
    <>
      <Player player={player} />

      {otherPlayers.map(p => (
        <Player player={p} />
      ))}
    </>
  )
}

export const GameView: React.SFC<{}> = ({}) => {
  const { game } = React.useContext(SkullGameContext)

  if (game.state.type === 'round-bidding') {
    return <BiddingView state={game.state} />
  }

  if (game.state.type === 'round-resolution') {
    return <ResolutionView state={game.state} />
  }

  if (game.state.type === 'round-discard') {
    return <DiscardView state={game.state} />
  }

  return assertNever(game.state)
}

enum BidChoice {
  bid,
  play,
  undecided,
}
const BiddingView: React.SFC<{ state: Bidding }> = ({ state }) => {
  const { player, updateGamePlayer, game, updateGame } = React.useContext(
    SkullGameContext
  )
  const [bidChoice, setBidChoice] = React.useState<BidChoice>(
    BidChoice.undecided
  )
  const canStillBid = !state.bid
  const isMyTurn = state.activePlayer === player.id
  const hasPlayedCard = !!player.playedCards.length

  function play(card: SkullCard) {
    let nextGame = clone(game)

    nextGame.players[player.id] = {
      ...player,
      cards: player.cards.filter(c => c.id !== card.id),
      playedCards: player.playedCards.concat(card),
    }

    nextGame.state = {
      ...state,
      activePlayer: getNextPlayer(game, player).id,
    }

    updateGame(nextGame)
  }

  function bid(wager: 'pass' | number) {
    let nextGame = clone(game)

    if (wager === 'pass') {
      // Mark ourselves as done
      nextGame.players[player.id].pass = true
      const biddersLeft = count(nextGame.players, p => !p.pass)

      if (biddersLeft === 1) {
        // We are done with bidding, move to resolution
        nextGame.state = {
          type: 'round-resolution',
          bid: state.bid,
          flippedCards: 0,
          highestBidPlayer: state.highestBidPlayer,
          messages: [],
        } as Resolution
      } else {
        // We have bidders left, move to the next person
        nextGame.state = {
          ...state,
          activePlayer: getNextPlayer(nextGame, player, p => !p.pass).id,
        } as Bidding
      }
    } else {
      const totalCardsPlayed = values(nextGame.players).reduce<number>(
        (m, p) => m + p.playedCards.length,
        0
      )

      if (totalCardsPlayed === wager) {
        nextGame.state = {
          type: 'round-resolution',
          bid: wager,
          flippedCards: 0,
          highestBidPlayer: player.id,
          messages: [],
        } as Resolution
      } else {
        // We bid, update our state
        nextGame.state = {
          type: 'round-bidding',
          activePlayer: getNextPlayer(nextGame, player, p => !p.pass).id,
          bid: wager,
          highestBidPlayer: player.id,
        } as Bidding
      }
    }

    updateGame(nextGame)
  }

  if (!hasPlayedCard) {
    return (
      <ChooseSkullCard
        title="What card do you want to play"
        description={`${playerName(state.activePlayer, game)} goes first`}
        doneText="play card"
        onDone={([card]) =>
          updateGamePlayer({
            ...player,
            playedCards: [card],
            cards: player.cards.filter(c => c.id !== card.id),
          })
        }
        items={player.cards}
      />
    )
  }

  if (!everyonePlayed(game)) {
    return (
      <>
        <Typography variant="h2">Waiting on others to bid...</Typography>
        <Board />
      </>
    )
  }

  if (isMyTurn) {
    if (bidChoice === BidChoice.bid || !canStillBid) {
      return (
        <Choose
          items={range(state.bid + 1, numPlayedCards(game) + 1)}
          renderItem={({ item, ...props }) => (
            <Selectable {...props} key={item}>
              <Typography>{item}</Typography>
            </Selectable>
          )}
          doneText="bid"
          onDone={([wager]) => bid(wager)}
          cancelText={canStillBid ? 'cancel' : 'pass'}
          onCancel={() => {
            if (canStillBid) {
              setBidChoice(BidChoice.undecided)
            } else {
              bid('pass')
            }
          }}
        />
      )
    }

    if (bidChoice === BidChoice.undecided) {
      return (
        <>
          <Typography>Would you like to play a card or bid?</Typography>

          <ActionRow fixed>
            <Button onClick={() => setBidChoice(BidChoice.play)}>play</Button>
            <Button onClick={() => setBidChoice(BidChoice.bid)}>bid</Button>
          </ActionRow>
        </>
      )
    }

    if (bidChoice === BidChoice.play) {
      return (
        <ChooseSkullCard
          title="What card do you want to play"
          doneText="play card"
          cancelText="back"
          onCancel={() => setBidChoice(BidChoice.undecided)}
          onDone={([card]) => play(card)}
          items={player.cards}
        />
      )
    }
  }

  return <Board />
}

const ResolutionView: React.SFC<{ state: Resolution }> = ({ state }) => {
  const { player, game, updateGame } = React.useContext(SkullGameContext)

  const isHighestBidder = state.highestBidPlayer === player.id

  function success() {
    let nextGame = clone(game)

    if (nextGame.players[player.id].correctGuess) {
      const lobby: SkullLobby = {
        ...nextGame,
        type: 'skull-lobby',
        victoryMessage: `${playerName(player)} wins!`,
        spectators: [],
      }

      nextGame = lobby as any
    } else {
      nextGame.players[player.id].correctGuess = true
      nextGame = startBidding(nextGame, player.id)
    }

    updateGame(nextGame)
  }

  function discard() {
    let nextGame = clone(game)

    if (!state.next || state.next === 'next round') return

    const discard: Discard = {
      type: 'round-discard',
      activePlayer: state.next,
      highestBidPlayer: player.id,
    }

    nextGame.state = discard

    updateGame(nextGame)
  }

  function flip(pid: PlayerId) {
    let nextGame = clone(game)

    const target = nextGame.players[pid]
    const [card] = target.playedCards.slice(-1)

    nextGame.players[pid] = {
      ...target,
      playedCards: target.playedCards.slice(0, -1),
      cards: target.cards.concat(target.playedCards.slice(-1)),
    }

    nextGame.state = {
      ...state,
      messages: state.messages.concat(
        `${playerName(pid, game)}'s card was a ${card.type}`
      ),
    }

    if (card.type === 'skull') {
      nextGame.state.next = pid
    }

    if (card.type === 'flower') {
      nextGame.state.flippedCards = nextGame.state.flippedCards + 1
    }

    if (nextGame.state.flippedCards === nextGame.state.bid) {
      nextGame.state.next = 'next round'
    }

    updateGame(nextGame)
  }

  if (isHighestBidder) {
    if (state.next) {
      if (state.next === 'next round') {
        return (
          <>
            <Typography variant="h2">You found all your flowers!</Typography>
            <ActionRow fixed>
              <Button color="green" onClick={success}>
                Start next round
              </Button>
            </ActionRow>
          </>
        )
      } else {
        return (
          <>
            <Typography variant="h2">You found a skull</Typography>
            <ActionRow fixed>
              <Button onClick={discard} color="red">
                Womp Womp
              </Button>
            </ActionRow>
          </>
        )
      }
    }

    return (
      <>
        <Typography gutterBottom variant="h2">
          You won the bid!
        </Typography>
        {state.messages.map((m, i) => (
          <Typography gutterBottom variant="h3" key={i}>
            {m}
          </Typography>
        ))}

        <Typography>
          You need to find {state.bid} flowers without any skulls
        </Typography>

        {!!player.playedCards.length && (
          <>
            <ActionRow fixed>
              <Button color="green" onClick={() => flip(player.id)}>
                Flip your top card (1 of {player.playedCards.length})
              </Button>
            </ActionRow>
          </>
        )}

        {!player.playedCards.length && <Board />}
      </>
    )
  } else {
    return (
      <>
        <Typography gutterBottom variant="h2">
          {playerName(state.highestBidPlayer, game)} won the bid!
        </Typography>
        {state.messages.map((m, i) => (
          <Typography gutterBottom variant="h3" key={i}>
            {m}
          </Typography>
        ))}

        <Typography>
          They need to find {state.bid} flowers without any skulls
        </Typography>

        {!game.players[state.highestBidPlayer].playedCards.length && (
          <>
            <ActionRow fixed>
              <Button confirm color="green" onClick={() => flip(player.id)}>
                Flip your top card (1 of {player.playedCards.length})
              </Button>
            </ActionRow>
          </>
        )}
      </>
    )
  }
}

const DiscardView: React.SFC<{ state: Discard }> = ({ state }) => {
  const { player, game, updateGame } = React.useContext(SkullGameContext)

  const isActive = state.activePlayer === player.id
  const isBidder = state.highestBidPlayer === player.id
  const isSelfInflicted = isActive && isBidder

  function discard(pid: PlayerId, cid: SkullCardId) {
    let nextGame = clone(game)

    nextGame.players[pid].cards = nextGame.players[pid].cards.filter(
      c => c.id !== cid
    )

    nextGame = startBidding(nextGame, pid)

    updateGame(nextGame)
  }

  if (isSelfInflicted) {
    return (
      <ChooseSkullCard
        items={game.players[state.highestBidPlayer].cards}
        description="This card will be gone the rest of the game. When all your cards are discarded, you are out of the game."
        title="Choose a card to discard"
        doneText="discard"
        onDone={([card]) => {
          discard(state.highestBidPlayer, card.id)
        }}
      />
    )
  }

  if (isActive) {
    return (
      <ChooseSkullCard
        items={shuffle(game.players[state.highestBidPlayer].cards)}
        title={`Choose a card to discard from ${playerName(
          state.highestBidPlayer,
          game
        )}`}
        renderItem={({ item, ...props }) => (
          <Selectable {...props} key={item.id}>
            ⁉️
          </Selectable>
        )}
        description="This card will be gone the rest of the game. When all their cards are discarded, they are out of the game."
        doneText="discard"
        onDone={([card]) => {
          discard(state.highestBidPlayer, card.id)
        }}
      />
    )
  }

  if (isBidder) {
    return (
      <>
        <Typography gutterBottom variant="h2">
          Lol, get rekt!
        </Typography>
        <Typography>
          {playerName(state.activePlayer, game)} is discarding one of your cards
        </Typography>
      </>
    )
  }

  return (
    <>
      <Typography gutterBottom variant="h2">
        Please wait...
      </Typography>
      <Typography>
        {playerName(state.activePlayer, game)} is discarding one of{' '}
        {playerName(state.highestBidPlayer, game)} cards
      </Typography>
    </>
  )
}
