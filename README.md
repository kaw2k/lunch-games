## Setup

First copy `.env.template` to `.env` and fill in the missing variables

```
nvm use
npm start
```

## TODO

- Make sure secondary night roles are called out by name (even if they don't have a night action)
- Make a isBranded toggle on players to remove their active state
- Make sure flip / no flip works
- Make sure the revive artifacts don't happen until the end of the night
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

SECRET HITLER
Not clear when you are waiting to flip the cards, make the entire screen green
Same thing for avalon

frakenstine, already gets powers, just check if a wolf team membe is ded. that role just hijacks the "done" callback of all the other roles.

Boogyman also works fine, just set night timers, add in option for after every role

need seating chart

Make it so people can perform their action and then the moderator sees when it is done
maybe make night a union, (performing actions, wake people up, done)
