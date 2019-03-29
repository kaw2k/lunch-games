## Setup

First copy `.env.template` to `.env` and fill in the missing variables

```
nvm use
npm start
```

## SECRET HITLER / AVALON

- Not clear when you are waiting to flip the cards, make the entire screen green
- Same thing for avalon
- Add destroying lady of the lake to avalon

## WEREWOLF

### Options

- Artifacts
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

### HELP

- Scan and process all the cards
  - card.png, circle.png, square.png (or just card and square)
- Make assets for avalon
- Play test the heck out of
  - Artifacts, anything that kills, modifies other artifacts, or changes roles
  - Leprechaun and how it interacts with other roles like alpha wolf, body guard, etc
  - Frankenstein and how it interacts with roles

### TODO / NB

- Separate games from lobbies, so you can leave a game to modify the next lobby. If a game is going for a specific lobby you have an option to view it
- Add spectate option in all lobbies
- Make a isBranded toggle on players to remove their active state
- Add diseased protection type, this will be a better hold for protections and figuring things out. clean this up after night ends
- Boogyman also works fine, just set night timers, add in option for after every role
- Add more visible profile counts / selected states

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
  - have more explicit "secret" for all prompts. night action base should make description mandatory and a potential property for secret message

* Try adding artifact action which excepts generic actions, not the list of actions
* End game needs a second player to end the game. A modal shows up for everyone else to end the game with their choice. You can cancel. Also, end game is in a sub menu of the menu.

- Sometimes people get double artifacts
- Save seating chart for subsequent games

- I think there is a bug with leprechaun and alpha wolf where multiple conversions happen
- Add chat feature
