import * as React from 'react'
import { SkullGameContext } from '../../../helpers/contexts'
import { PlayerCard } from '../../../components/card/player'
import { SkullGame } from '../interfaces/game'
import { Choose } from '../../../components/choose'
import { values, uniq } from 'ramda'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'
import { clone } from '../../../helpers/clone'
import { FullScreenNotice } from '../../../components/fullScreenNotice'

export const MakeSeatingSkull: React.SFC = () => {
  const { player, game, updateGamePlayer } = React.useContext(SkullGameContext)
  const otherPlayers = values(game.players).filter(p => p.id !== player.id)

  return (
    <Choose
      title="Who is on your left?"
      description="Before the game starts, who is on your left?"
      items={otherPlayers}
      doneText="Done"
      renderItem={({ item, ...props }) => (
        <PlayerCard key={item.id} player={item} {...props} />
      )}
      onDone={([playerOnLeft]) => {
        updateGamePlayer({
          ...player,
          playerOnLeft: playerOnLeft.id,
        })
      }}
    />
  )
}

export const WaitingSeatingSkull: React.SFC = () => {
  return <FullScreenNotice>Waiting for game to start...</FullScreenNotice>
}

export const BadSeatingSkull: React.SFC = () => {
  const { updateGame, game } = React.useContext(SkullGameContext)

  let nextGame = clone(game)
  values(nextGame.players).forEach(p => (p.playerOnLeft = null as any))

  return (
    <>
      <Typography variant="h2">Whoops... </Typography>
      <Typography>
        Looks like the seating chart is messed up, please try again!
      </Typography>
      <ActionRow fixed>
        <Button
          color="green"
          onClick={() => {
            updateGame(nextGame)
          }}>
          Start Over
        </Button>
      </ActionRow>
    </>
  )
}

export function isBadSeatingChart(game: SkullGame): boolean {
  const players = values(game.players)

  let player = players[0]
  let visitedPlayers = [player]
  let i = 0

  while (i < players.length + 1) {
    if (!player) return false

    player = game.players[player.playerOnLeft]
    visitedPlayers = visitedPlayers.concat(player)
    i++
  }

  return uniq(visitedPlayers.map(p => p.id)).length !== players.length
}
