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

- Very infrequently you can get into a bad state with secret hitler. I was inspecting the top three cards of the deck, when i pressed done the played cards were different.
- Scan and process all the cards
  - card.png, circle.png, square.png (or just card and square)
- Make assets for avalon
- Play test the heck out of
  - Artifacts, anything that kills, modifies other artifacts, or changes roles
  - Leprechaun and how it interacts with other roles like alpha wolf, body guard, etc
  - Frankenstein and how it interacts with roles
- Figure out why colors are showing incorrectly for Avalon

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
  - Lobbies don't call set, they call update, when switching lobbies you see what exists first and use that
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

- Fix randoming new roles. If a werewolf dies, they are the last of their kind, and there is a different bad faction still alive, random the werewolf into a good person.

TODO: I started the previous governments for SH but it doesn't work

===========================

# MURDER RULES

## SETUP

Players:
Everyone gets some cards
Everyone can see other players cards
Witness sees who the murderer and accomplice are but doesn't know who is who
Accomplice sees who the murderer is and what their options were
Murder sees who the accomplice is and selects one of each type

Moderator:
Can see other players cards
Can see what the murderer's final options are
Can start the game when all players are ready
Is dealt "cause of Death" and choose one of the "Location of Crime" tiles
They are dealt 4 random cards (beside event cards)

## GAMEPLAY DAY

Everyone:
Can see peoples cards and who has flagged which items
Can see the moderators cards, what items have items selected and what haven't
Can see other players flags on items
Can see a timer with how long is left in the round
Can see what round it is
Can see who has put in their badge and guessed the murderer
Can see which combinations have been guessed

All Players:
Can tap on a players card to select it or deselect it
Can come forward and choose who the murderer is (only once)

Witness:
Can optionally see who the two players were

Murderer / Accomplice:
Can optionally see what items they selected
Can optionally see their team mates

Moderator:
Can select an item from one of their cards (it notifies the players of the selection)

## GAMEPLAY NIGHT

Moderator:
Has text for what to say
Can select a person to "go". This starts a timer everyone can see
Can start the day cycle at any moment

All Players:
Sees relevant timers
All normal day views

NOTE:
Once a marker has been placed by the moderator, that is the permanent order it displays in. Later in the game the moderator can "discard" one (should remain visible, but greyed out). Any item can be replaced besides location or cause of crime.
Events can optionally happen for the second or third round
Moderator should still put people to sleep so the murderer isn't given away
Would be nice for the accomplice to see in real time what the murderer is selecting
