import { WerewolfGame, WerewolfLobby } from '../interfaces/game'
import { isModerator } from './isModerator'
import { shuffle } from '../../../helpers/shuffle'
import { PlayerWerewolf } from '../interfaces/player'
import { Roles } from '../interfaces/card/cards'
import { Artifacts } from '../interfaces/artifact/artifacts'
import { ArtifactState } from '../interfaces/artifact'
import { isSpectator } from '../../../helpers/isSpectator'

export function makeGame(roles: Roles[], lobby: WerewolfLobby): WerewolfGame {
  const players = shuffle(
    lobby.lobbyPlayers.filter(
      p => !(isModerator(p, lobby) || isSpectator(p, lobby))
    )
  )
  const shuffledRoles = shuffle(roles)
  const shouldHaveArtifact = !!lobby.werewolfArtifacts.length
  const extraArtifacts = shuffle(
    Artifacts.map(a => a.type).filter(
      a => !!lobby.werewolfArtifacts.find(l => a !== l)
    )
  )
  const shuffledArtifacts = shuffle(lobby.werewolfArtifacts).concat(
    extraArtifacts
  )

  const gamePlayers = players.reduce<WerewolfGame['players']>(
    (memo, player, i) => {
      const playerWerewolf: PlayerWerewolf = {
        ...player,
        alive: true,
        artifacts: shouldHaveArtifact
          ? [ArtifactState(shuffledArtifacts[i])]
          : [],
        inCult: [],
        isBlessed: false,
        isGuarded: false,
        linkedTo: [],
        ready: false,
        areBrainsEaten: false,
        secondaryRole: null,
        role: shuffledRoles[i],
        sasquatchWakesUp: false,
        state: {},
        copiedBy: null,
      }

      return { ...memo, [player.id]: playerWerewolf }
    },
    {}
  )

  console.log(gamePlayers)

  return {
    type: 'werewolf-game',
    ready: false,
    actions: [],
    day: 0,
    delayedActions: [],
    initialRoles: lobby.werewolfRoles,
    id: lobby.id,
    initialArtifacts: lobby.werewolfArtifacts,
    lobbyPlayers: lobby.lobbyPlayers,
    message: null,
    moderators: lobby.werewolfModerators,
    options: lobby.werewolfOptions,
    timer: null,
    victory: null,
    players: gamePlayers,
    prismOfPower: [],
    story: [],
    time: 'day',
    prompts: {
      items: [],
      active: null,
      show: false,
    },
    killedAtDawn: [],
    killedAtDay: [],
    killedAtNight: [],
    playerInteraction: {
      actions: [],
      ready: false,
    },
    notifications: [],
    numberOfPeopleToKill: 1,
    playerOrder: [],
  }
}
