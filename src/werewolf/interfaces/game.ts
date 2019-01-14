// import { Player } from '../../interfaces/player'
// import { Opaque } from '../../interfaces/opaque'

// type Image = Opaque<'image', string>
// type Emoji = Opaque<'emoji', string>

// type Teams =
//   | 'wolf'
//   | 'minion'
//   | 'villager'
//   | 'tanner'
//   | 'vampire'
//   | 'cult leader'
//   | 'mason'
//   | 'chewks'
//   | 'boogyman'

// export interface Card<Role extends string = string> {
//   role: Role

//   team: Teams

//   weight: number
//   cardCount: number
//   description: string
//   hints: string[]

//   emoji: Emoji
//   image: Image
//   profile: Image

//   preDeathAction?: (player: Player) => Prompt
//   nightMessage?: string
//   deathMessage?: string

//   // Custom actions the role will always have available
//   actions?: Actions[]
// }
