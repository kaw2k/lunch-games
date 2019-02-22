import { WerewolfGame, WerewolfLobby } from '../interfaces/game'
import { Roles } from '../data/roles'
import { isModerator } from './isModerator'
import { shuffle } from '../../../helpers/shuffle'
import { AllArtifacts, getArtifact } from '../data/artifacts'
import { PlayerWerewolf } from '../interfaces/player'

export function makeGame(roles: Roles[], lobby: WerewolfLobby): WerewolfGame {
  const players = lobby.lobbyPlayers.filter(p => !isModerator(p, lobby))

  const shuffledRoles = shuffle(roles)

  const shouldHaveArtifact = !!lobby.artifacts.length
  const extraArtifacts = shuffle(
    AllArtifacts.map(a => a.type).filter(
      a => !lobby.artifacts.find(b => a !== b)
    )
  )
  const shuffledArtifacts = shuffle(lobby.artifacts)
    .concat(extraArtifacts)
    .slice(0, players.length)

  const gamePlayers = players.reduce<WerewolfGame['players']>(
    (memo, player, i) => {
      const playerWerewolf: PlayerWerewolf = {
        ...player,
        alive: true,
        artifacts: shouldHaveArtifact
          ? [getArtifact(shuffledArtifacts[i]).state]
          : [],
        inCult: [],
        isBlessed: false,
        isGuarded: false,
        linkedTo: [],
        ready: false,
        secondaryRole: null,
        role: shuffledRoles[i],
      }

      return { ...memo, [player.id]: playerWerewolf }
    },
    {}
  )

  return {
    type: 'werewolf-game',
    ready: false,
    actions: [],
    dayCount: 0,
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
    artifactState: {
      nightTargets: [],
    },
    night: {
      kills: [],
      story: [],
      prompts: null,
    },
  }
}
