export interface DelayAction<T extends object> {
  day: number
  time: 'day' | 'night'
  occurrence: 'once' | 'recurring'
  action: T
}
