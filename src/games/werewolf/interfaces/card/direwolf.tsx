import * as React from 'react'
import { always, values } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { Actions, linkPlayer } from '../actions'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ViewRole } from '../../components/viewRole/role'
import { ViewAllies } from '../../components/viewRole/allies'
import { isWerewolf } from '../../helpers/isWerewolf'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const SetupRoleView: React.SFC<{
  ready: (actions: Actions[]) => void
}> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ViewRole role={player.role} />
      <ViewAllies
        showRole
        allies={values(game.players).filter(
          p => p.id !== player.id && isWerewolf(p, game)
        )}
      />

      <ChooseWerewolfPlayer
        title="Choose your link"
        description="When this person dies, so do you. You probably don't wan to choose another werewolf."
        players={values(game.players).filter(p => p.id !== player.id)}
        doneText="ready"
        onDone={([target]) =>
          ready([linkPlayer({ target: player.id, source: target.id })])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}

export const Direwolf = Card({
  role: CardRole('direwolf'),
  weight: -4,
  team: 'werewolves',
  emoji: Emoji('🐩'),
  cardCount: 1,
  description: `You're a Werewolf and wake up with them. The first night, you get to pick someone, and you die if they die.`,
  hints: [`Don't pick another werewolf`],
  image: require('../../static/direwolf.png'),
  profile: require('../../static/direwolf-profile.png'),
  appearsBad: always(true),
  SetupRoleView,
})
