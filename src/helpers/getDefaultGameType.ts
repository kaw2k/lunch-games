export function getDefaultGameType(): 'avalon' | 'secret-hitler' {
  return process.env.GAME === 'avalon' ? 'avalon' : 'secret-hitler'
}
