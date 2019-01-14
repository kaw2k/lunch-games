import * as React from 'react'
import { AvalonGame } from '../interfaces/game'
import { Card } from './card'
import { ActionRow } from '../../components/actionRow'
import { Layout } from '../../components/layout'
import { count } from '../../helpers/count'
import { getBoardEffect } from '../helpers/getBoardEffect'

const Row: React.SFC<{}> = ({ children }) => (
  <div className="root">
    {children}

    <style jsx>{`
      .root {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .info > :global(*) {
        margin-right: 1em;
      }
    `}</style>
  </div>
)

const Info: React.SFC<{ title: string }> = ({ title, children }) => (
  <div className="root">
    <h3>{title}</h3>
    {children}

    <style jsx>{`
      .root {
        text-align: center;
      }
    `}</style>
  </div>
)

export const Board: React.SFC<{ game: AvalonGame }> = ({ game }) => {
  const numGood = count(game.players, p => p.party === 'good')
  const numBad = count(game.players, p => p.party === 'bad')

  const effects = [0, 1, 2, 3, 4].map(i => getBoardEffect(game.players, i))

  return (
    <Layout padded>
      <div>
        <h3>Board:</h3>
        <ActionRow>
          {effects.map(({ fail, people }, i) => (
            <Card
              key={i}
              fails={fail}
              players={people}
              background={
                !game.missionResults[i]
                  ? null
                  : game.missionResults[i] === 'bad'
                  ? 'red'
                  : 'blue'
              }
            />
          ))}
        </ActionRow>
      </div>

      <Row>
        <Info title="Chaos">{game.chaos} of 5</Info>
        <Info title="Good">{numGood}</Info>
        <Info title="Bad">{numBad}</Info>
      </Row>
    </Layout>
  )
}
