export interface DelayAction<T extends object> {
  day: number
  time: 'day' | 'night'
  occurrence: 'once' | 'every night' | 'every morning'
  action: T
}
