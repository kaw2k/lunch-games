## Setup

First copy `.env.template` to `.env` and fill in the missing variables

```
nvm use
npm start
```

## TODO

- Make sure secondary night roles are called out by name (even if they don't have a night action)
- Make a isBranded toggle on players to remove their active state
- Add some indication to the player and the moderator at night to indicate if they are active
- Make sure flip / no flip works
- Make sure the revive artifacts don't happen until the end of the night
- Try to remove artifact state from artifacts, help removes the any type
- Make sure artifact doppleganger makes you call out the player by name
- Allow players to play and use their artifacts (for inspection or passing)
- Have a list of reminders for the narrator with artifacts
- Add diseased protection type, this will be a better hold for protections and figuring things out. clean this up after night ends

## Werewolf Options

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

Night

Test apprentice seer
