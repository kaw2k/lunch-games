import * as React from 'react'
import { always, contains, values, all } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { count } from '../../../../helpers/count'
import { isWerewolf } from '../../helpers/isWerewolf'
import { NightMessageOrder } from '../nightMessage'
import { NightViewProps } from '../nightViewInterfaces'
import { PlayerWerewolf } from '../player'
import { PlayerId } from '../../../../interfaces/player'
import { WerewolfGame } from '../game'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { chewksKill } from '../actions'

const title = 'Chewks, wake up and kill someone.'
const description =
  'If they are a werewolf, they die. If no more werewolves are alive, you can kill anyone.'

function getVotesForPlayer(
  target: PlayerWerewolf,
  players: PlayerId[],
  game: WerewolfGame
): number {
  const votes = players
    .map(pid => game.players[pid])
    .reduce((memo, p) => memo + (contains(target.id, p.state || []) ? 1 : 0), 0)

  return votes
}

const NightModerator: React.SFC<NightViewProps> = ({ done, ...props }) => {
  const { game } = React.useContext(WerewolfGameContext)

  if (props.type !== 'by team') return null

  return (
    <NightViewBase done={done} {...props} title={title}>
      <ChoosePlayers
        doneText="kill"
        columns={2}
        onDone={targets => {
          done(targets.map(target => chewksKill({ target })))
        }}
        players={values(game.players).filter(p => p.alive)}>
        {profileProps => (
          <WerewolfProfile
            {...profileProps}
            key={profileProps.player.id}
            profileText={getVotesForPlayer(
              profileProps.player,
              props.players,
              game
            )}
          />
        )}
      </ChoosePlayers>
    </NightViewBase>
  )
}

const NightPlayer: React.SFC<NightViewProps> = ({ done, ...props }) => {
  const { game, updateGamePlayer, player } = React.useContext(
    WerewolfGameContext
  )

  React.useEffect(() => {
    updateGamePlayer({ ...player, state: [] })
  }, [])

  if (props.type !== 'by team') return null

  // Figure out of all the wolves are ready
  const wolves = values(game.players).filter(
    p => p.alive && isWerewolf(p, game)
  )
  const firstVote = (wolves[0] && wolves[0].state) || []
  function compare(ids: PlayerId[]) {
    return JSON.stringify(ids.sort()) === JSON.stringify(firstVote.sort())
  }
  const disabled =
    firstVote.length !== game.numberOfPeopleToKill ||
    !all(p => compare(p.state || []), wolves)

  return (
    <NightViewBase done={done} {...props} title={title}>
      <ChoosePlayers
        doneText="kill"
        columns={2}
        disabled={disabled}
        onChange={players => {
          updateGamePlayer({
            ...player,
            state: players,
          })
        }}
        onDone={targets => {
          done(targets.map(target => chewksKill({ target })))
        }}
        players={values(game.players).filter(p => p.alive)}>
        {profileProps => (
          <WerewolfProfile
            {...profileProps}
            key={profileProps.player.id}
            profileText={getVotesForPlayer(
              profileProps.player,
              props.players,
              game
            )}
          />
        )}
      </ChoosePlayers>
    </NightViewBase>
  )
}

export const Mayor = Card({
  role: 'chewks',
  weight: 4,
  team: 'chewks',
  emoji: Emoji('💆‍♂️'),
  cardCount: 1,
  description: `You win if you're the last one left. You get to choose a player to kill each night. You can only kill werewolves to start, but after they're all eliminated you can then target others.`,
  hints: [
    `You appear as a villager to the Seer until all the werewolves are dead. Try to get inspected early in the game to prove your innocence.`,
    `Later in the game you can claim Seer as you should be figuring out who is good and bad.`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/chewks.png'),
  profile: require('../../static/chewks-profile.png'),
  isActive: always(true),
  appearsBad: (player, game) => {
    const wolves = count(game.players, p => isWerewolf(p, game))
    return wolves ? false : true
  },
  night: {
    title,
    description,
    ModeratorView: NightModerator,
    PlayerView: NightPlayer,
    order: NightMessageOrder.killing,
  },

  // nightMessage: `chewks, wake up and choose someone. if they are a werewolf they will die. if they are a villager and no other werewolves are alive, they also die.`,
})
