import { WerewolfGame, WerewolfLobby } from '../interfaces/game'
import { isModerator } from './isModerator'
import { shuffle } from '../../../helpers/shuffle'
import { PlayerWerewolf } from '../interfaces/player'
import { Roles } from '../interfaces/card/cards'
import { Artifacts, ArtifactState } from '../interfaces/artifact/artifacts'

export function makeGame(roles: Roles[], lobby: WerewolfLobby): WerewolfGame {
  const players = shuffle(
    lobby.lobbyPlayers.filter(p => !isModerator(p, lobby))
  )
  const shuffledRoles = shuffle(roles)
  const shouldHaveArtifact = !!lobby.artifacts.length
  const extraArtifacts = shuffle(
    Artifacts.map(a => a.type).filter(a => !!lobby.artifacts.find(l => a !== l))
  )
  const shuffledArtifacts = shuffle(lobby.artifacts).concat(extraArtifacts)

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
        secondaryRole: null,
        role: shuffledRoles[i],
        state: {},
        copiedBy: null,
      }

      return { ...memo, [player.id]: playerWerewolf }
    },
    {}
  )

  return {
    type: 'werewolf-game',
    ready: false,
    actions: [],
    day: 0,
    delayedActions: [],
    initialRoles: lobby.roles,
    id: lobby.id,
    initialArtifacts: lobby.artifacts,
    lobbyPlayers: lobby.lobbyPlayers,
    message: null,
    moderators: lobby.moderators,
    options: lobby.options,
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
    playersKilled: [],
    playerInteraction: {
      actions: [],
      ready: false,
    },
    notifications: [],
    numberOfPeopleToKill: 1,
    playerOrder: [],
  }
}
