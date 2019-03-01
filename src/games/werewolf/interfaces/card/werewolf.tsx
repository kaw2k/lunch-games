import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values, all } from 'ramda'
import { NightViewProps } from '../nightViewInterfaces'
import { werewolfKill } from '../actions'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupWerewolfRoleView } from '../../components/setupRole/genericWerewolfViewRole'
import { PlayerWerewolf } from '../player'
import contains from 'ramda/es/contains'
import { isWerewolf } from '../../helpers/isWerewolf'
import { PlayerId } from '../../../../interfaces/player'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { WerewolfGame } from '../game'

const title = 'Werewolves, wake up and kill people'

function getVotesForPlayer(
  target: PlayerWerewolf,
  players: PlayerId[],
  game: WerewolfGame
): number {
  const votes = players
    .map(pid => game.players[pid])
    .reduce(
      (memo, p) => memo + (contains(target.id, p.state.werewolf || []) ? 1 : 0),
      0
    )

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
          done(targets.map(target => werewolfKill({ target })))
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
    updateGamePlayer({
      ...player,
      state: {
        ...player.state,
        werewolf: [],
      },
    })
  }, [])

  if (props.type !== 'by team') return null

  // Figure out of all the wolves are ready
  const wolves = values(game.players).filter(
    p => p.alive && isWerewolf(p, game)
  )
  const firstVote = (wolves[0] && wolves[0].state.werewolf) || []
  function compare(ids: PlayerId[]) {
    return JSON.stringify(ids.sort()) === JSON.stringify(firstVote.sort())
  }
  const disabled =
    firstVote.length !== game.numberOfPeopleToKill ||
    !all(p => compare(p.state.werewolf || []), wolves)

  return (
    <NightViewBase done={done} {...props} title={title}>
      <ChoosePlayers
        doneText="kill"
        columns={2}
        disabled={disabled}
        onChange={players => {
          updateGamePlayer({
            ...player,
            state: {
              ...player.state,
              werewolf: players,
            },
          })
        }}
        onDone={targets => {
          done(targets.map(target => werewolfKill({ target })))
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

export const Werewolf = Card({
  role: 'werewolf',
  team: 'werewolves',
  description: `You are a werewolf, Kill everyone who's not a werewolf.`,
  hints: [
    'Never say you are bad.',
    'Claiming lycan works sometimes if the lycan is in the game.',
    'If a handful of people are eliminated already, try claiming seer or apprentice seer.',
  ],
  weight: -6,
  cardCount: 3,
  appearsBad: always(true),
  emoji: Emoji('🐺'),
  image: require('../../static/werewolf.png'),
  profile: require('../../static/werewolf-profile.png'),
  isActive: always(true),
  SetupRoleView: GenericSetupWerewolfRoleView,
  night: {
    title,
    ModeratorView: NightModerator,
    PlayerView: NightPlayer,
    order: NightMessageOrder.werewolf,
  },
})
