/*
  THE WHEEL — editable outcomes
  -----------------------------------
  Every item has EXACTLY the same chance.
  There are no categories and no weights.
  Once an item is selected, it is removed from future spins until RESET WHEEL is used.

  Edit/add/remove items below. Keep each id unique.
  "short" is the text drawn on the wheel; "label" is the full result shown on the side.
*/

window.WHEEL_CONFIG = {
  title: "SPIN THE WHEEL",
  subtitle: "EVERY DEATH = ONE SPIN",
  spinDurationMs: 5600,
  minTurns: 7,
  maxTurns: 10,
  soundOnByDefault: true,
  removeSelected: true,

  items: [
    { id: "best-build",       label: "Use the best build for this boss",                 short: "BEST BUILD" },
    { id: "full-hp",          label: "Use a full HP build for this boss",                short: "FULL HP" },
    { id: "best-weapon",      label: "Use the best weapon for this boss",                short: "BEST WEAPON" },
    { id: "full-atk",         label: "Use a full ATK build for this boss",               short: "FULL ATK" },
    { id: "barbara",          label: "Barbara is allowed for this boss",                 short: "BARBARA" },
    { id: "one-star",         label: "Change to a 1-star weapon",                        short: "1★ WEAPON" },
    { id: "remove-one",       label: "Remove one active wheel effect",                   short: "REMOVE ONE" },
    { id: "three-star",       label: "Change to a random 3-star weapon",                 short: "3★ RANDOM" },
    { id: "extra-attempt",    label: "+1 attempt on this boss",                          short: "+1 ATTEMPT" },
    { id: "no-barbara",       label: "No Barbara for this boss",                         short: "NO BARBARA" },
    { id: "free-death",       label: "The next death does not spin the wheel",            short: "FREE DEATH" },
    { id: "no-burst",         label: "No Burst for this boss",                           short: "NO BURST" },
    { id: "no-skill",         label: "No Skill for the first 30 seconds",                short: "NO SKILL 30S" },
    { id: "no-circlet",       label: "Remove the Circlet for this boss",                 short: "NO CIRCLET" },
    { id: "no-goblet",        label: "Remove the Goblet for this boss",                  short: "NO GOBLET" },
    { id: "no-sands",         label: "Remove the Sands for this boss",                   short: "NO SANDS" },
    { id: "carry-over",       label: "This wheel effect carries into the next boss",      short: "CARRY OVER" },
    { id: "double-spin",      label: "Spin twice and use both results",                   short: "DOUBLE SPIN" },
    { id: "no-sprint",        label: "No sprinting for this boss",                       short: "NO SPRINT" },
    { id: "royal-pardon",     label: "Clear every active wheel effect and the next death is free", short: "ROYAL PARDON" },
    { id: "event-ten-pull",   label: "10-pull on the event banner",                      short: "10-PULL" }
  ]
};
