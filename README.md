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

Make dawn more generic, this way we can use it for any prompts

figure out how to only show who died at a particular time in the prompts menu

- For things that alter roles

  - Try to stay within the same faction, for wolves it would be wolves and allies
  - Find all the living roles in the game and get their combined weight. Try to balance the weight with the new role.

- For the timer, make a hook that updates some internal state

Resume game in case someone ends the game but mistake

- Questionable, I think this was getting kicked by accident

* Somehow when tyler was made diseased from melanie he had to choose someone else

What roles are in the game?

- Add views to what roles / artifacts are in the game

Moderator -role count make clearer
