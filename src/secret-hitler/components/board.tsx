import * as React from 'react'
import { SecretHitlerGame } from '../interfaces/game'
import { Card } from './card'
import { getBoardEffect } from '../helpers/getBoardEffect'
import { Button } from '../../components/button'
import { ActionRow } from '../../components/actionRow'
import { Layout } from '../../components/layout'
import { count } from '../../helpers/count'

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

export const Board: React.SFC<{ game: SecretHitlerGame }> = ({ game }) => {
  const [selectedEffect, showEffect] = React.useState<number | null>(null)

  const numFascistCards = count(game.playedCards, x => x === 'fascist')
  const numLiberalCards = count(game.playedCards, x => x === 'liberal')

  const numFascists = count(game.players, x => x.role.party === 'fascist') - 1
  const numLiberals = count(game.players, x => x.role.party === 'liberal')

  return (
    <Layout>
      <div>
        <h3>Fascists:</h3>
        <ActionRow>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Button
              style={{ flex: '1 1' }}
              key={`fascist-${
                i <= numFascistCards ? 'card' : 'placeholder'
              }-${i}`}
              onClick={() => showEffect(i)}>
              <Card
                background={i <= numFascistCards ? 'red' : null}
                type={
                  i > numFascistCards ? getBoardEffect(game.players, i) : null
                }
              />
            </Button>
          ))}
        </ActionRow>
      </div>

      {selectedEffect !== null && (
        <Layout>
          {selectedEffect !== 6 &&
            !getBoardEffect(game.players, selectedEffect) && (
              <div>
                If a fascist is played on this turn, no special effect happens.
              </div>
            )}
          {selectedEffect === 6 &&
            !getBoardEffect(game.players, selectedEffect) && (
              <div>
                The government proceeds as normal, however if after the
                president passes the cards to the chancellor, and they both
                agree to veto, then no card is played and it is as if the
                government didn't happen.
              </div>
            )}
          {getBoardEffect(game.players, selectedEffect) === 'kill' && (
            <div>
              If a fascist is played on this turn the president for that
              government gets to kill someone. If hitler is killed the liberals
              win.
            </div>
          )}
          {getBoardEffect(game.players, selectedEffect) ===
            'choose president' && (
            <div>
              If a fascist is played on this turn the president for that
              government gets to choose the next president. After that next
              government, play resumes as normal with original play order.
            </div>
          )}
          {getBoardEffect(game.players, selectedEffect) === 'inspect cards' && (
            <div>
              If a fascist is played on this turn the president for that
              government gets to inspect the next three cards in order. They may
              choose to disclose what they see if they wish (or even lie about
              it).
            </div>
          )}
          {getBoardEffect(game.players, selectedEffect) === 'inspect role' && (
            <div>
              If a fascist is played on this turn the president for that
              government gets to inspect another players party membership. They
              will not know if someone is hitler or not, only if they are
              liberal or fascist. They may choose to disclose what they see if
              they wish (or even lie about it).
            </div>
          )}

          <ActionRow>
            <Button padded onClick={() => showEffect(null)}>
              close
            </Button>
          </ActionRow>
        </Layout>
      )}

      <div>
        <h3>Liberals:</h3>
        <ActionRow>
          {[1, 2, 3, 4, 5].map(i => (
            <Card
              key={`liberal-${
                i <= numLiberalCards ? 'card' : 'placeholder'
              }-${i}`}
              background={i <= numLiberalCards ? 'blue' : null}
            />
          ))}
        </ActionRow>
      </div>

      <Row>
        <Info title="Liberals">{numLiberals}</Info>
        <Info title="Fascists">{numFascists}</Info>
        <Info title="Hitler">1</Info>
      </Row>

      <Row>
        <Info title="Chaos">{game.chaos} of 3</Info>
        <Info title="Cards">{game.remainingCards.length}</Info>
      </Row>
    </Layout>
  )
}
