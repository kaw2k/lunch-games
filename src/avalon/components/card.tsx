import * as React from 'react'
import { Colors, getColor } from '../../helpers/colors'

export const Card: React.SFC<{
  players: number
  fails: number
  background?: Colors | null
}> = ({ players, fails, background }) => {
  return (
    <div className="placeholder">
      {!background && (
        <React.Fragment>
          <h2 className="players">{players}</h2>
          {fails === 2 && <em className="fails">fails 2</em>}
        </React.Fragment>
      )}

      <style jsx>{`
        .placeholder {
          position: relative;
          height: 3em;
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${getColor(background)};
        }

        .fails {
          position: absolute;
          top: -1.5em;
        }
      `}</style>
    </div>
  )
}
