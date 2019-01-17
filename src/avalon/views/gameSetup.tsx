import * as React from 'react'
import values from 'ramda/es/values'
import { AvalonGame } from '../interfaces/game'
import { PlayerAvalon } from '../interfaces/player'
import { Layout } from '../../components/layout'
import { ActionRow } from '../../components/actionRow'
import { Button } from '../../components/button'
import { Profile } from '../../components/profile'
import { getParty } from '../helpers/getParty'
import { shuffle } from '../../helpers/shuffle'
import { count } from '../../helpers/count'

interface Props {
  game: AvalonGame
  player: PlayerAvalon
  ready: () => void
  endGame: () => void
}

export const GameSetup: React.SFC<Props> = ({
  player,
  game,
  ready,
  endGame,
}) => {
  const [showRole, setShowRole] = React.useState(false)

  if (player.ready) {
    return (
      <Layout padded>
        <h1>Waiting for game to start...</h1>
        <ActionRow>
          <Button padded confirm onClick={endGame}>
            end game
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (!showRole) {
    return (
      <Layout padded>
        <h1 className="title">Ready to see your role?</h1>
        <ActionRow>
          <Button padded confirm onClick={endGame}>
            end game
          </Button>
          <Button padded onClick={() => setShowRole(true)}>
            show role
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  const otherBaddies = values(game.players).filter(
    p => p.id !== player.id && getParty(p.role) === 'bad'
  )

  const actions = (
    <ActionRow>
      <Button padded confirm onClick={endGame}>
        end game
      </Button>
      {!player.ready && (
        <Button padded onClick={ready}>
          ready
        </Button>
      )}
    </ActionRow>
  )

  if (player.role === 'good') {
    return (
      <Layout padded>
        <h1>You are a generic good person</h1>
        {actions}
      </Layout>
    )
  }

  if (player.role === 'merlin') {
    const hasMordred = game.roles.find(r => r === 'mordred')
    const numBad = count(game.players, p => p.party === 'bad')

    return (
      <Layout padded>
        <h1>
          You are a Merlin, here are the bad people, there are {numBad}.{' '}
          {hasMordred && 'Mordred is invisible to you.'}
        </h1>
        {otherBaddies
          .filter(p => p.role !== 'mordred')
          .map(p => (
            <Profile text={p.name || p.id} key={p.id} image={p.profileImg} />
          ))}
        {actions}
      </Layout>
    )
  }

  if (player.role === 'percival') {
    const people = shuffle(
      values(game.players).filter(
        p => p.role === 'merlin' || p.role === 'morgana'
      )
    )
    return (
      <Layout padded>
        <h1>
          You are a Percivile, one of these players is Morgana and the other is
          Merlin
        </h1>
        {people.map(p => (
          <Profile text={p.name || p.id} key={p.id} image={p.profileImg} />
        ))}
        {actions}
      </Layout>
    )
  }

  return (
    <Layout padded>
      <h1>You are {player.role}</h1>
      {otherBaddies.map(p => (
        <Profile
          key={p.id}
          text={p.name || p.id}
          subtext={p.role}
          image={p.profileImg}
        />
      ))}
      {actions}
    </Layout>
  )
}
