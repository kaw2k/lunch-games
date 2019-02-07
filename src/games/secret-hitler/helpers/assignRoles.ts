import { shuffle } from '../../../helpers/shuffle'
import { PlayerSecretHitler } from '../interfaces/player'
import { PlayerHash } from '../interfaces/game'
import { Player } from '../../../interfaces/player'

export function assignRoles(players: Player[]): PlayerHash {
  const [hitler, ...rest] = shuffle(players)
  const numFascists = players.length <= 6 ? 1 : players.length <= 8 ? 2 : 3
  return shuffle<PlayerSecretHitler>([
    {
      ...hitler,
      living: true,
      ready: false,
      role: {
        isHitler: true,
        party: 'fascist',
      },
    },
    ...rest.slice(0, numFascists).map<PlayerSecretHitler>(player => ({
      ...player,
      living: true,
      ready: false,
      role: {
        isHitler: false,
        party: 'fascist',
      },
    })),
    ...rest.slice(numFascists).map<PlayerSecretHitler>(player => ({
      ...player,
      living: true,
      ready: false,
      role: {
        isHitler: false,
        party: 'liberal',
      },
    })),
  ]).reduce((hash, player) => ({ ...hash, [player.id]: player }), {})
}
