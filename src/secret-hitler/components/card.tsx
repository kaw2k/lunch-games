import * as React from 'react'
import { BoardEffects } from '../interfaces/game'
import { getColor, Colors } from '../../helpers/colors'

export const Card: React.SFC<{
  type?: BoardEffects | null
  background?: Colors | null
}> = ({ type, background }) => {
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
          background: ${getColor(background)};
        }
      `}</style>
    </div>
  )
}
