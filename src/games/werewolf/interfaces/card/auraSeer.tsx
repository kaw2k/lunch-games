import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { isRole } from './cards'
import { PromptView } from '../prompt'
import { playerName } from '../../../../components/playerName'
import { CardRole } from '../../../../helpers/id'
import { Werewolf } from './werewolf'
import { Villager } from './villager'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const title = 'Aura Seer, wake up!'
const description =
  'Inspect someone, I will tell you if they are not a regular Villager or Werewolf.'

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      <ChooseWerewolfPlayer
        description={description}
        doneText="inspect"
        players={values(game.players).filter(p => p.alive)}
        onDone={([target]) => {
          const isWerewolf = isRole(target, Werewolf.role)
          const isVillager = isRole(target, Villager.role)

          alert(
            !(isWerewolf || isVillager)
              ? `${playerName(target)} is special`
              : `${playerName(target)} is not special`
          )
          done([])
        }}
      />
    </NightViewBase>
  )
}

export const AuraSeer = Card({
  role: CardRole('aura seer'),
  weight: 3,
  team: 'villagers',
  emoji: Emoji('😇'),
  cardCount: 1,
  description: `Each night, you pick a player and are told if they are not a Werewolf or Villager.`,
  hints: [
    `This role is only useful if there are a good number of non-special roles in the game.`,
    `Special wolves such as Big Bad Wolf etc. are all NOT Werewolf roles`,
  ],
  image: require('../../static/aura-seer.png'),
  profile: require('../../static/aura-seer-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  randomlySelectable: true,
  canFrankensteinAbsorbIt: true,
  appearsBad: always(false),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
