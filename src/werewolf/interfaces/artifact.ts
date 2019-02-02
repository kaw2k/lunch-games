// ===========================
// TYPE
// ===========================
export interface Artifact<Type extends string = string> {
  type: Type
  title: string
  description: string
  infinite: boolean
  activated: boolean
}

const Artifact = <Type extends string>(
  artifact: Artifact<Type>
): Artifact<Type> => artifact

// ===========================
// LIST OF ARTIFACTS
// ===========================
export const AllArtifacts = [
  Artifact({
    type: 'diseased',
    title: 'Blood of the Diseased',
    activated: false,
    description:
      'Choose a player to become infected with disease. If the werewolves eliminate that player, they do not get to choose a target the following night.',
    infinite: true,
  }),
]

export type AllArtifacts = (typeof AllArtifacts)[0]['title']

// ===========================
// Helper Functions
// ===========================
export function getArtifact(type: AllArtifacts): Artifact<AllArtifacts> {
  return AllArtifacts.find(artifact => artifact.type === type) as Artifact<
    AllArtifacts
  >
}
