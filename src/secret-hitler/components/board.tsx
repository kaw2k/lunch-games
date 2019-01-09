import * as React from 'react'
import { SecretHitlerGame } from '../interfaces/game'
import { Card } from './card'
import { getBoardEffect } from '../helpers/getBoardEffect'
import { Button } from '../../components/button'
import { ActionRow } from '../../components/actionRow'
import { Layout } from '../../components/layout'
import { Flex } from '../../components/flex'
import values from 'ramda/es/values'

export const Board: React.SFC<{ game: SecretHitlerGame }> = ({ game }) => {
  const [selectedEffect, showEffect] = React.useState<number | null>(null)

  const fascists = game.playedCards.filter(c => c === 'fascist').length
  const liberals = game.playedCards.filter(c => c === 'liberal').length

  return (
    <Layout>
      <div>
        <h3>Fascists:</h3>
        <ActionRow>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Button
              style={{ flex: '1 1' }}
              key={`fascist-${i <= fascists ? 'card' : 'placeholder'}-${i}`}
              onClick={() => showEffect(i)}>
              <Card
                background={i === 6 ? 'grey' : i <= fascists ? 'red' : null}
                type={i > fascists ? getBoardEffect(game.players, i) : null}
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
              key={`liberal-${i <= liberals ? 'card' : 'placeholder'}-${i}`}
              background={i === 5 ? 'grey' : i <= liberals ? 'blue' : null}
            />
          ))}
        </ActionRow>
      </div>

      <Flex flow="row" justify="space-around">
        <div>
          <h3>Chaos:</h3>
          {game.chaos} of 3
        </div>

        <div>
          <h3>Cards:</h3>
          {game.remainingCards.length}
        </div>
        <div>
          <h3>Liberals:</h3>
          {values(game.players).filter(p => p.role.party === 'liberal').length}
        </div>

        <div>
          <h3>Fascists:</h3>
          {values(game.players).filter(p => p.role.party === 'fascist').length -
            1}
        </div>

        <div>
          <h3>Hitler:</h3>1
        </div>
      </Flex>
    </Layout>
  )
}
