export interface Artifact<Type extends string> {
  type: Type
  title: string
  description: string
  infinite: boolean
}

export const Artifact = <Type extends string>(
  artifact: Artifact<Type>
): Artifact<Type> => artifact
