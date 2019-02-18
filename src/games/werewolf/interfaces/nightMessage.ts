export enum NightMessageOrder {
  inspection = 10,
  protection = 20,
  misc = 40,
  killing = 80,
  werewolf = 100,
}

export interface NightMessage {
  message: string
  order: NightMessageOrder
}
