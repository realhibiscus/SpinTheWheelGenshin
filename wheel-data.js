/*
  FATE WHEEL — editable content
  -----------------------------------
  Edit the labels below whenever you like. Keep every `id` unique.

  FATE contains twenty physically equal slices: fourteen CHALLENGE entries
  and six BLESSING entries. Repeating an entry controls its odds without using
  unequal slice sizes. Fate never removes an entry.

  CHALLENGE and BLESSING evolve independently: after an outcome is selected,
  choose REMOVE FROM WHEEL to take it out of that wheel, or KEEP ON WHEEL to
  leave it available.
*/

window.WHEEL_CONFIG = {
  subtitle: "EVERY DEATH = ONE SPIN",
  spinDurationMs: 5600,
  minTurns: 7,
  maxTurns: 10,
  routeRevealMs: 1100,
  outcomeRevealMs: 3600,
  soundOnByDefault: true,

  wheels: {
    fate: {
      title: "FATE",
      subtitle: "EVERY DEATH = ONE SPIN",
      removesSelected: false,
      items: [
        { id: "punishment-01", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-02", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "blessing-01",   label: "Blessing",   short: "BLESSING",   target: "blessing" },
        { id: "punishment-03", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-04", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "blessing-02",   label: "Blessing",   short: "BLESSING",   target: "blessing" },
        { id: "punishment-05", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-06", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-07", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "blessing-03",   label: "Blessing",   short: "BLESSING",   target: "blessing" },
        { id: "punishment-08", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-09", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "blessing-04",   label: "Blessing",   short: "BLESSING",   target: "blessing" },
        { id: "punishment-10", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-11", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "blessing-05",   label: "Blessing",   short: "BLESSING",   target: "blessing" },
        { id: "punishment-12", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-13", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "punishment-14", label: "Challenge", short: "CHALLENGE", target: "punishment" },
        { id: "blessing-06",   label: "Blessing",   short: "BLESSING",   target: "blessing" }
      ]
    },

    punishment: {
      title: "CHALLENGE",
      subtitle: "WHEEL 2 · ACTIVE CHALLENGES",
      removesSelected: true,
      items: [
        { id: "full-hp",         label: "Use a full HP build for this boss",                 short: "FULL HP" },
        { id: "full-atk",        label: "Use a full ATK build for this boss",                short: "FULL ATK" },
        { id: "full-def",        label: "Use a full DEF build for this boss",                short: "FULL DEF" },
        { id: "full-em",         label: "Use a full EM build for this boss",                 short: "FULL EM" },
        { id: "low-rarity-weapon", label: "Use a random 1–3 star weapon for this boss",      short: "RANDOM 1–3★", weaponLottery: true },
        { id: "no-five-star",    label: "You cannot use a 5-star weapon for this boss",      short: "NO 5★ WEAPON" },
        { id: "level-one",       label: "Use a level 1 weapon for this boss",                short: "LEVEL 1" },
        { id: "remove-artefact", label: "Remove one artefact for this boss",                 short: "REMOVE ARTEFACT", artefactLottery: true },
        { id: "no-burst",        label: "No Burst for this boss",                            short: "NO BURST" },
        { id: "no-skill",        label: "No Skill for this boss",                            short: "NO SKILL" },
        { id: "no-healer",       label: "No healer for this boss",                           short: "NO HEALER" },
        { id: "normal-only",     label: "Normal attacks only for this boss",                 short: "NORMAL ONLY" },
        { id: "no-sprint",       label: "No sprinting for this boss",                        short: "NO SPRINT" },
        { id: "low-dpi",         label: "Use very low mouse DPI for this boss",              short: "VERY LOW DPI" },
        { id: "high-dpi",        label: "Use very high mouse DPI for this boss",             short: "VERY HIGH DPI" },
        { id: "upside-down",     label: "Play with your screen upside down",                 short: "UPSIDE DOWN" },
        { id: "no-hud",          label: "No HUD for this boss",                              short: "NO HUD" },
        { id: "spin-twice",      label: "Spin twice and use both results",                   short: "SPIN TWICE" },
        { id: "two-bosses",      label: "Current effect lasts for 2 bosses",                 short: "2 BOSSES" },
        { id: "standard-pull",   label: "1 Standard Banner pull",                            short: "STANDARD PULL" },
        { id: "event-pull",      label: "1 Event Character Banner pull",                     short: "EVENT CHARACTER" },
        { id: "weapon-pull",     label: "1 Event Weapon Banner pull",                        short: "EVENT WEAPON" },
      ]
    },

    blessing: {
      title: "BLESSING",
      subtitle: "WHEEL 2 · ACTIVE PRIVILEGES",
      removesSelected: true,
      items: [
        { id: "random-four-star", label: "+1 random 4-star character for this boss",          short: "RANDOM 4★", lotteryRarity: 4 },
        { id: "random-five-star", label: "+1 random 5-star character for this boss",          short: "RANDOM 5★", lotteryRarity: 5 },
        { id: "remove-punishment", label: "Remove one active challenge",                    short: "REMOVE ONE" },
        { id: "ignore-death",      label: "Ignore the next death",                           short: "IGNORE DEATH" },
        { id: "choose-weapon",     label: "Choose your weapon for this boss (overrides weapon challenges)", short: "CHOOSE WEAPON" },
        { id: "choose-build",      label: "Choose your artefact build (overrides build challenges)", short: "CHOOSE BUILD" },
        { id: "support-ally",       label: "A random support character is allowed for this boss (overrides No healer)", short: "RANDOM SUPPORT", healerLottery: true },
        { id: "extra-attempt",     label: "+1 attempt on the boss",                          short: "+1 ATTEMPT" },
        { id: "revive",            label: "Revive without counting a death",                 short: "REVIVE" },
        { id: "undo-punishment",   label: "Undo one active challenge",                       short: "UNDO ONE" },
        { id: "immunity",          label: "Immunity for the next 3 deaths",                  short: "3 DEATH IMMUNITY" }
      ]
    }
  }
};
