import { Opaque } from '../interfaces/opaque'

export type Id = Opaque<'id', string>
export const Id = () =>
  Math.random()
    .toString()
    .slice(4) as Id

export type ArtifactType = Opaque<'artifact type', Id>
export const ArtifactType = (type: string) => type as ArtifactType

export type CardRole = Opaque<'card role', Id>
export const CardRole = (type: string) => type as CardRole

export type ActionId = Opaque<'action id', Id>
export const ActionId = () => Id() as ActionId
