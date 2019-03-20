## Setup

First copy `.env.template` to `.env` and fill in the missing variables

```
nvm use
npm start
```

## SECRET HITLER / AVALON

- Not clear when you are waiting to flip the cards, make the entire screen green
- Same thing for avalon

## WEREWOLF

### Options

- Artifacts

  - Werewolf doesn't need to be played for it to be active

- Role Mods
  - Priest
    - blessing dies with the priest
    - protects against all calamities (chewks, vampires, boogyman)
  - Diseased
    - protects against all calamities (chewks, vampires, boogyman)
  - Bodyguard
    - protects against all calamities (chewks, vampires, boogyman)
  - Vampire
    - bite kills by any seconding / bite kills when they are seconded (persists thru entire game)

### TODO / NB

- Make a isBranded toggle on players to remove their active state
- Add diseased protection type, this will be a better hold for protections and figuring things out. clean this up after night ends
- Boogyman also works fine, just set night timers, add in option for after every role
- Try to add isGameOver before dawn, that way you don't need to read artifacts if the game is over
- Remove the need for mad bomber to specify neighbors
- Add more visible profile counts / selected states
- Test insomniac
- Test Fang Face

- For things that alter roles

  - Try to stay within the same faction, for wolves it would be wolves and allies
  - Find all the living roles in the game and get their combined weight. Try to balance the weight with the new role.

* Moderator should see the active artifact. Maybe you request to play an artifact and the moderator sees it
* Moderator should be able to see who has what artifact
* Roles in player day should be one column
* When waking people up at night, display their name
* Make sure prompts for rebirth work
* At night it helps if moderator sees names AND roles
* Make sure werewolves can vote

* Add ability for people to return to lobby
  - Anyone can do it
  - There are two collections, games and lobbies
  - Lobbies dont call set, they call update, when switching lobbies you see what exists first and use that
  - Add spectate mode for all games

- Add option for moderator to turn off player actions
  - frankenstein should have all buttons if no-flip, only dead are enabled
  - have more explicit "secret" for all prompts. night action base should make description mandetory and a potential property for secret message

* Players' artifact buttons are disabled if someone is playing an artifact
* Moderator can perform all artifact actions
* Try adding artifact action which excepts generic actions, not the list of actions
* End game needs a second player to end the game. A modal shows up for everyone else to end the game with their choice. You can cancel.
