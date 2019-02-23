import { Actions } from './actions'

export interface SetupViewProps {
  ready: (actions: Actions[]) => void
}
