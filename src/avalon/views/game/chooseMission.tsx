import * as React from 'react'
import values from 'ramda/es/values'
import { PlayerId } from '../../../interfaces/player'
import { AvalonGameContext } from '../../../helpers/contexts'
import { Layout } from '../../../components/layout'
import { getBoardEffect } from '../../helpers/getBoardEffect'
import { Profile } from '../../../components/profile'
import { ActionRow } from '../../../components/actionRow'
import { Button } from '../../../components/button'

export const ChooseMission: React.SFC<{
  cancel: () => void
  fails: () => void
  done: (ids: PlayerId[]) => void
}> = ({ done, cancel, fails }) => {
  const { player, game } = React.useContext(AvalonGameContext)
  const [targets, setTarget] = React.useState<PlayerId[]>([player.id])
  const { fail, people } = getBoardEffect(game.players, game.missionResults)

  function updateTargets(id: PlayerId) {
    const hasTarget = !!targets.find(pid => pid === id)
    if (hasTarget) {
      setTarget(targets.filter(pid => pid !== id))
    } else {
      setTarget([id, ...targets].slice(0, people))
    }
  }

  return (
    <Layout padded>
      <h1>
        Choose your mission with {people} people, it needs {fail} fail. You may
        choose to not put yourself on the mission if you wish.
      </h1>

      {values(game.players).map(p => (
        <Profile
          key={p.id}
          text={p.name}
          image={p.profileImg}
          selected={!!targets.find(id => p.id === id)}
          onClick={() => updateTargets(p.id)}
        />
      ))}

      <ActionRow>
        <Button padded onClick={cancel}>
          cancel
        </Button>
        <Button padded onClick={fails}>
          fails
        </Button>
        <Button
          padded
          disabled={targets.length !== people}
          onClick={() => {
            done(targets)
          }}>
          goes
        </Button>
      </ActionRow>
    </Layout>
  )
}
