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
- Frakenstine, already gets powers, just check if a wolf team member is ded. that role just hijacks the "done" callback of all the other roles.
- Boogyman also works fine, just set night timers, add in option for after every role
- Try to add isGameOver before dawn, that way you don't need to read artifacts if the game is over
- Remove the need for mad bomber to specify neighbors
- Add more visible profile counts / selected states
- Test insomniac
- Test Fang Face

- For things that alter roles

  - Try to stay within the same faction, for wolves it would be wolves and allies
  - Find all the living roles in the game and get their combined weight. Try to balance the weight with the new role.
