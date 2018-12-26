export type Loading<T extends object> =
  | { loading: true }
  | { loading: false; error: true }
  | ({ loading: false; error: false } & T)
