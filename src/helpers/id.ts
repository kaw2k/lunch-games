import { Opaque } from '../interfaces/opaque'

export type Id = Opaque<'id', string>
export const Id = () =>
  Math.random()
    .toString()
    .slice(4) as Id

// Werewolf
export type ArtifactType = Opaque<'artifact type', Id>
export const ArtifactType = (type: string) => type as ArtifactType

export type CardRole = Opaque<'card role', Id>
export const CardRole = (type: string) => type as CardRole

export type ActionId = Opaque<'action id', Id>
export const ActionId = () => Id() as ActionId

// Murder
export type WeaponId = Opaque<'Weapon Id', Id>
export const WeaponId = (type: string | number) => type as WeaponId

export type EvidenceId = Opaque<'Evidence Id', Id>
export const EvidenceId = (type: string | number) => type as EvidenceId

export type SceneId = Opaque<'Scene Id', Id>
export const SceneId = (type: string | number) => type as SceneId

export type EventId = Opaque<'Event Id', Id>
export const EventId = (type: string | number) => type as EventId
