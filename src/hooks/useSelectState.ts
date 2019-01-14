import { useState } from 'react'
import equals from 'ramda/es/equals'

export function useSelectState<T>(
  initialState: T[],
  numToSelect: number = 1
): [T[], (item: T) => void] {
  const [selected, _setSelected] = useState<T[]>(initialState)

  function updateSelected(item: T) {
    const hasTarget = !!selected.find(i => equals(i, item))
    if (hasTarget) {
      _setSelected(selected.filter(i => !equals(i, item)))
    } else {
      _setSelected([item, ...selected].slice(0, numToSelect))
    }
  }

  return [selected, updateSelected]
}
