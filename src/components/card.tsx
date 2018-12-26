import * as React from 'react'
import { Party, BoardEffects } from '../interfaces/game'

export const Card: React.SFC<{ card: Party }> = ({ card }) => (
  <div className={`card ${card}`}>
    <style jsx>{`
      .card {
        border: 1px solid black;
        width: 2.5em;
        height: 3em;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .placeholder {
        border-style: dashed;
      }

      .fascist {
        background: red;
        border-color: red;
      }

      .liberal {
        background: blue;
        border-color: blue;
      }
    `}</style>
  </div>
)

export const Placeholder: React.SFC<{ type: BoardEffects | null }> = ({
  type,
}) => (
  <div className="placeholder">
    {type === 'kill' && '🔪'}
    {type === 'inspect role' && '🔎'}
    {type === 'choose president' && '😀'}
    {type === 'inspect cards' && '💳'}

    <style jsx>{`
      .placeholder {
        border: 1px dashed black;
        width: 2.5em;
        height: 3em;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
)
