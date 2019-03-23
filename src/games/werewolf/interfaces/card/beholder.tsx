import * as React from 'react'
import { always, values } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { isRole } from './cards'
import { Actions } from '../actions'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ViewRole } from '../../components/viewRole/role'
import { ViewAllies } from '../../components/viewRole/allies'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { PlayerWerewolf } from '../player'
import { CardRole } from '../../../../helpers/id'
import { Seer } from './seer'
import { MysticSeer } from './mysticSeer'
import { ApprenticeSeer } from './apprenticeSeer'

interface Props {
  ready: (actions: Actions[]) => void
}

export const SetupRoleView: React.SFC<Props> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  let players: PlayerWerewolf[] = []

  const seer = values(game.players).find(p => isRole(p, Seer.role))
  if (seer) players = players.concat(seer)

  const mysticSeer = values(game.players).find(p => isRole(p, MysticSeer.role))
  if (game.options.beholderSeesAllSeers && mysticSeer)
    players = players.concat(mysticSeer)

  const apprenticeSeer = values(game.players).find(p =>
    isRole(p, ApprenticeSeer.role)
  )
  if (game.options.beholderSeesAllSeers && apprenticeSeer)
    players = players.concat(apprenticeSeer)

  return (
    <>
      <ViewRole role={player.role} />
      <ViewAllies showRole allies={players} />

      <ActionRow fixed>
        <Button onClick={() => ready([])} color="green">
          ready
        </Button>
      </ActionRow>
    </>
  )
}

export const Beholder = Card({
  role: CardRole('beholder'),
  weight: 2,
  team: 'villagers',
  emoji: Emoji('👁'),
  cardCount: 1,
  description: `The first night you find out who the seer is`,
  hints: [
    `You want to take cues from the seer and second whoever they do.`,
    `Don't out who the seer is.`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  appearsBad: always(false),
  SetupRoleView: SetupRoleView,
})
