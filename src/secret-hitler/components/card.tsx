import * as React from 'react'
import { BoardEffects } from '../interfaces/game'

export const Card: React.SFC<{
  type?: BoardEffects | null
  background?: 'red' | 'blue' | 'grey' | null
}> = ({ type, background }) => {
  let color = 'transparent'
  if (background === 'red') color = '#ec4d3b'
  if (background === 'blue') color = '#69D2E7'
  if (background === 'grey') color = '#d4d4d4'

  return (
    <div className="placeholder">
      {type === 'kill' && '🔪'}
      {type === 'inspect role' && '👤'}
      {type === 'inspect cards' && '🃏'}
      {type === 'choose president' && '👑'}

      <style jsx>{`
        .placeholder {
          height: 3em;
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${color};
        }
      `}</style>
    </div>
  )
}
