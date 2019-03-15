export enum NightMessageOrder {
  none = 0,
  inspection = 10,
  protection = 20,
  misc = 40,
  killing = 80,
  werewolf = 100,
  postWerewolf = 125,
}

export interface NightMessage {
  message: string
  order: NightMessageOrder
}
