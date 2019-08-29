import * as React from 'react'
import { Player, PlayerId } from '../interfaces/player'
import { Typography } from '@material-ui/core'
import { WerewolfGame } from '../games/werewolf/interfaces/game'
import { Hash } from '../interfaces/hash'

interface Props {
  player: Player
  bold?: boolean
}

export const PlayerName: React.SFC<Props> = ({ player, bold }) => {
  return (
    <Typography variant={bold ? 'h5' : undefined} display="inline">
      {playerName(player)}
    </Typography>
  )
}

export function playerName(player: Player): string
export function playerName(
  player: PlayerId,
  game: { players: Hash<Player> }
): string
export function playerName(
  player: Player | PlayerId,
  game?: { players: Hash<Player> }
): string {
  if (game) {
    const p = player as PlayerId
    return game.players[p].name || game.players[p].id
  }

  if (typeof player === 'object') {
    const p = player as Player
    return p.name || p.id
  }

  return player
}

export function playerNameList(players: Player[]): string
export function playerNameList(players: PlayerId[], game: WerewolfGame): string
export function playerNameList(
  players: Player[] | PlayerId[],
  game?: WerewolfGame
): string {
  let names: string[] = []

  if (game) {
    names = (players as PlayerId[]).map(id => playerName(id, game))
  } else {
    names = (players as Player[]).map(playerName)
  }

  if (!names.length) {
    return ''
  } else if (names.length === 1) {
    return names[0]
  } else if (names.length === 2) {
    return `${names[0]} and ${names[1]}`
  } else {
    return names
      .slice(0, -1)
      .join(', ')
      .concat(`and ${names[names.length - 1]}`)
  }
}
