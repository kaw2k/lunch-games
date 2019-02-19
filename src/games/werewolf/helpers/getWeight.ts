import { Roles, getCard } from '../data/roles'

export function getWeight(roles: Roles[]): number {
  return roles.reduce<number>((memo, role) => {
    return memo + getCard(role).weight
  }, 0)
}
