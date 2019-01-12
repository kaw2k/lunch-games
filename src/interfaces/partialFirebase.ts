import { FieldValue } from '../helpers/firebase'

export type PartialFirebase<T> = Partial<
  { [K in keyof T]: T[K] extends (infer U)[] ? U[] | FieldValue<U> : T[K] }
>
