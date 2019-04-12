import * as React from 'react'
import {
  PlayerCard,
  Props as PlayerCardProps,
} from '../../../components/card/player'
import { Omit } from 'ramda'
import { PlayerWerewolf } from '../interfaces/player'

interface Props extends Omit<PlayerCardProps, 'player'> {
  player: PlayerWerewolf
  showRole?: boolean
  showLiving?: boolean
}

export const WerewolfPlayerCard: React.SFC<Props> = ({
  player,
  showRole,
  showLiving,
  ...props
}) => {
  return (
    <PlayerCard player={player} dim={showLiving && !player.alive} {...props} />
  )
}

// image={
//   showRole || (!game.options.noFlip && !player.alive)
//     ? getCard(player.role).profile
//     : player.profileImg
// }

// subtext={
//   <>
//     {showRole && (
//       <Typography>
//         {player.role}
//         {player.secondaryRole && ` / ${player.secondaryRole}`}
//         {isRole(player, Sasquatch.role) &&
//           (player.sasquatchWakesUp ? ` (werewolf)` : ` (villager)`)}
//       </Typography>
//     )}
//     {showReady && (
//       <Typography>{player.ready ? 'ready' : 'not ready'}</Typography>
//     )}
//   </>
// }
