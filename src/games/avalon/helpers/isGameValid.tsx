import * as React from 'react'
import { Role } from '../interfaces/game'
import { count } from '../../../helpers/count'
import { getParty } from './getParty'
import { Typography } from '@material-ui/core'

export function isGameValid(numPlayers: number, roles: Role[]): boolean {
  const numBad = count(roles, role => getParty(role) === 'bad')

  const numGood = count(roles, role => getParty(role) === 'good')
  const hasEnoughGood = numBad + numGood === numPlayers

  if (numPlayers <= 6 && numBad === 2 && hasEnoughGood) return true
  if (numPlayers <= 9 && numBad === 3 && hasEnoughGood) return true
  if (numPlayers <= 10 && numBad === 4 && hasEnoughGood) return true

  return false
}

export function helpText(numPlayers: number): React.ReactNode {
  if (numPlayers === 5) {
    return (
      <Typography>
        You need <strong>3</strong> good players and <strong>2</strong> bad
        players. For 5 player games, try:
        <div>
          <strong>1)</strong> Merlin and Assassin
        </div>
        <div>
          <strong>2)</strong> No special roles, but add lady of the lake
        </div>
      </Typography>
    )
  }

  if (numPlayers === 6) {
    return (
      <Typography>
        You need <strong>4</strong> good players and <strong>2</strong> bad
        players. For 6 player games, try:
        <div>
          <strong>1)</strong> Merlin and Assassin
        </div>
      </Typography>
    )
  }

  if (numPlayers === 7) {
    return (
      <Typography>
        You need <strong>4</strong> good players and <strong>3</strong> bad
        players. 7 Player games tend to favor the bad team, consider adding Lady
        of the lake. Try:
        <div>
          <strong>1)</strong> Lady of the lake, Merlin, Assassin, Morgana, and
          Percival
        </div>
        <div>
          <strong>2)</strong> Lady of the lake, Merlin, Assassin, Morgana,
          Percival, Mordred <em>(Only if the good team is crushing it)</em>
        </div>
      </Typography>
    )
  }

  if (numPlayers === 8) {
    return (
      <Typography>
        You need <strong>5</strong> good players and <strong>3</strong> bad
        players.
      </Typography>
    )
  }

  if (numPlayers === 9) {
    return (
      <Typography>
        You need <strong>6</strong> good players and <strong>3</strong> bad
        players.
      </Typography>
    )
  }

  if (numPlayers === 10) {
    return (
      <Typography>
        You need <strong>6</strong> good players and <strong>4</strong> bad
        players.
      </Typography>
    )
  }

  return (
    <Typography>
      You need between 5 and 10 players to start the game.
    </Typography>
  )
}
