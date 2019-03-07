import * as React from 'react'
import { WerewolfGameContext } from '../../../helpers/contexts'
import { PlayerId } from '../../../interfaces/player'
import { Artifacts, getArtifact } from '../interfaces/artifact/artifacts'
import { values } from 'ramda'

// New Idea:
// - Have run actions optionally set a flag on the game object
// - if this flag is set (artifacts played, multiple things happen)
//   then the prompt shows up with the additional actions for the narrator

// The question is how do we force the moderator to show this view
// - have some property on the game

interface Props {
  source: 'dawn' | 'other'
}

export const RunActionsView: React.SFC<Props> = ({ source }) => {
  const { game } = React.useContext(WerewolfGameContext)

  if (game.actions) {
    const artifacts: { player: PlayerId; artifact: Artifacts }[] = []

    for (let player of values(game.players)) {
      for (let artifact of player.artifacts) {
        if (
          player.alive &&
          artifact.activated &&
          !!getArtifact(artifact.type).MorningView
        ) {
          artifacts.push({ player: player.id, artifact: artifact.type })
        }
      }
    }
  }

  return <div>yup</div>
}

//   if (game.night.type === 'pre-day') {
//     const artifacts: { player: PlayerId; artifact: Artifacts }[] = []
//     for (let player of values(game.players)) {
//       for (let artifact of player.artifacts) {
//         if (
//           player.alive &&
//           artifact.activated &&
//           !!getArtifact(artifact.type).MorningView
//         ) {
//           artifacts.push({ player: player.id, artifact: artifact.type })
//         }
//       }
//     }
//     return (
//       <>
//         <Typography gutterBottom variant="h1">
//           Things to say:
//         </Typography>
//         <Typography>People who died:</Typography>
//         <Typography component="em">
//           {game.peopleKilledAtNight.join(', ') || 'no one'}
//         </Typography>

//         {!!artifacts.length && (
//           <>
//             <Typography gutterBottom variant="h1">
//               Artifacts to play:
//             </Typography>
//             {artifacts.map(({ player, artifact }) => (
//               <div key={player}>
//                 <Typography gutterBottom>
//                   {game.players[player].name || player}: play {artifact}
//                 </Typography>
//               </div>
//             ))}
//           </>
//         )}

//         <ActionRow fixed>
//           <Button color="green" onClick={() => updateGame(startDay(game))}>
//             done
//           </Button>
//         </ActionRow>
//       </>
//     )
//   }
