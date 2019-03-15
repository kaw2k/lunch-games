import { getCard, Roles } from '../interfaces/card/cards'

// TODO: Make this computation smart
export function getWeight(roles: Roles[]): number {
  let weight = roles.reduce<number>((memo, role) => {
    return memo + getCard(role).weight
  }, 0)

  const hasFrankenstein = !!roles.find(role => role === 'frankensteins monster')
  if (hasFrankenstein) {
    const numAbsorbableRoles = roles
      .map(getCard)
      .filter(c => c.canFrankensteinAbsorbIt).length
    weight = weight + numAbsorbableRoles * 2
  }

  return weight
}
