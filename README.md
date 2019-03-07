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
- Make sure flip / no flip works
- Add diseased protection type, this will be a better hold for protections and figuring things out. clean this up after night ends
- Frakenstine, already gets powers, just check if a wolf team member is ded. that role just hijacks the "done" callback of all the other roles.
- Boogyman also works fine, just set night timers, add in option for after every role
- need seating chart
- We need to check for game over after dawn is finished and after artifacts settle. They won't happen in the action loop. This only holds true if we have rebirth as a manual artifact.
- Things the moderator needs to say or know about
  - People killed at night
  - People reborn at night
  - Private things to say to the moderator
  - Artifact actions to play at dawn
  - Have rebirth and reincarnation be prompts that pop up instead of automatically happen. This way if they are given to someone and it is activated, they still work
- We can make a helper function to figure out who has died. It will take a game state and diff it against the current game state.
- We can re-use the dawn prompt which unifies who died and what the moderator should say coupled with corresponding artifact actions. This can be it's own component.
- We need to make sure the game doesn't end prematurely.
- We need to make sure when an artifact is forced to play (rebirth, linking), that it indicates so to the moderator AND the players
- We need to display to the moderator things to say, both who died and who was reborn
- We need to make sure rebirth artifacts are played when they are linked and the source plays their artifact

New approach

- Revival is still an automatic event, this should help with isGameOver
- We still need to move the isGameOver check to the end of the function call for running actions
- We will add a prompts (or similar) array of MiscPrompt type somewhere on the window. Anyone can write to this array. The moderator sees this array as a popup sheet or something and can act on it.
