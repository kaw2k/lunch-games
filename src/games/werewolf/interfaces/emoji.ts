import { Opaque } from '../../../interfaces/opaque'

export type Emoji = Opaque<'emoji', string>
export const Emoji = (char: string) => char as Emoji
