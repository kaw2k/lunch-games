import { Artifact } from '../../../interfaces/artifact'
import { addAction } from '../../../helpers/addAction'
import { scepterOfRebirth } from '../../../interfaces/actions'

export const ScepterOfRebirth = Artifact({
  type: 'scepter of rebirth',
  state: {
    type: 'scepter of rebirth',
    title: 'Scepter of Rebirth',
    description:
      'If this artifact has not been played when you die, you come back to life.',
    infinite: false,
    activated: false,
    morningAction: name,
    state: null,
  },
  actions: {
    setup: null,
    morningAction: null,
    action: null,
    postDeathAction: (artifact, killType, player, game) => {
      return addAction(scepterOfRebirth({ target: player.id }), game)
    },
  },
})
