/*
 * Concise encounter intel for every boss in boss-data.js.
 * These are the signature mechanics a viewer needs to understand the fight,
 * not an exhaustive frame-data list of every ordinary swipe or projectile.
 */
(function () {
  'use strict';

  const intel = (overview, danger, abilities, tips) => ({ overview, danger, abilities, tips });

  window.GENSHIN_BOSS_INTEL = {
    'Electro Hypostasis': intel(
      'An Electro core that is vulnerable only when its cube shell opens.',
      'If any Revival Prism survives, the boss heals and repeats its final phase.',
      [['Cube Arsenal', 'Turns its shell into drills, scissors, walls, and projectiles before exposing the core.'], ['Thunder Cage', 'Raises Electro pillars around the player and closes the safe space.'], ['Revival Prisms', 'Creates three prisms at critical HP that must be destroyed with reactions.']],
      ['Attack only while the core is exposed.', 'Save Pyro, Cryo, or Dendro application for the Revival Prisms.', 'Electro damage cannot hurt the boss or finish its prisms.']
    ),
    'Anemo Hypostasis': intel(
      'An Anemo core protected by cubes, with tornadoes and airborne recovery mechanics.',
      'Missing the Anemo Orbs during Second Wind lets it recover HP.',
      [['Tornado Field', 'Creates roaming tornadoes that leave elemental orbs when infused.'], ['Vacuum Burst', 'Pulls elemental orbs inward and releases large Anemo blasts.'], ['Second Wind', 'Creates updrafts and four Anemo Orbs when its HP reaches the final sliver.']],
      ['Wait for the shell to open before using bursts.', 'Ride the updrafts and collect all four Anemo Orbs.', 'Do not rely on Anemo damage.']
    ),
    'Cryo Regisvine': intel(
      'A giant Cryo plant whose exposed root or corolla core controls its resistance and stun window.',
      'Its sweeping frost beams and falling icicles punish standing close after the core recovers.',
      [['Root Core', 'The first weak point sits at the base; breaking it topples the plant.'], ['Corolla Core', 'The next weak point appears on its head and is harder for melee attacks to reach.'], ['Frost Eruption', 'Spreads persistent Cryo damage across much of the arena.']],
      ['Use Pyro to break the glowing core quickly.', 'Unload damage while the plant is toppled.', 'Back away when it rises and starts a wide spin.']
    ),
    'Geo Hypostasis': intel(
      'A Geo core that fights from stone pillars and rebuilds itself through three final pillars.',
      'Ignoring the pillar it occupies prolongs every damage cycle.',
      [['Stone Pillars', 'Moves between constructs while the core remains out of melee reach.'], ['Pillar Pulse', 'Channels linked shockwaves through the active constructs.'], ['Terra Resurgence', 'Creates three revival pillars at critical HP.']],
      ['Bring a Claymore user or other blunt attacks.', 'Break the occupied pillar, then burst the fallen core.', 'Destroy all three revival pillars; partial progress is saved.']
    ),
    'Oceanid': intel(
      'Rhodeia never takes direct damage; defeating waves of Hydro Mimics drains her HP.',
      'Flying raptors require ranged attacks, while frogs and finches explode when defeated.',
      [['Hydro Mimics', 'Summons birds, boars, crabs, ducks, frogs, and other forms with different attacks.'], ['Sinking Platforms', 'Removes two arena tiles after every two cleared waves.'], ['Submerge Blast', 'Punishes players who take too long to defeat a mimic wave.']],
      ['Bring at least one ranged attacker for flying raptors.', 'Cryo controls the permanently Wet mimics; Dendro and Electro clear groups well.', 'Leave the death-bomb radius of frogs and finches.']
    ),
    'Pyro Regisvine': intel(
      'A giant Pyro plant with a root or corolla core that must be broken to create a damage window.',
      'Its fire volleys and rotating beam can cover most of the nearby arena.',
      [['Root Core', 'The initial weak point at its base controls the first knockdown.'], ['Corolla Core', 'After recovery, the next weak point moves to the flower head.'], ['Firestorm', 'Launches tracking fireballs and leaves burning areas around the arena.']],
      ['Hydro breaks the Pyro core fastest.', 'Save your strongest rotation for the knockdown.', 'Circle away from the rotating beam instead of trading damage.']
    ),
    'Primo Geovishap': intel(
      'A Geo vishap infused with Pyro, Hydro, Cryo, or Electro that converts the arena into an elemental hazard.',
      'Primordial Shower ignores dash invulnerability and hits a huge area.',
      [['Infused Stones', 'Leaves delayed elemental mines whose pattern depends on the current infusion.'], ['Burrow and Slam', 'Dives underground, reappears near the player, and chains heavy melee attacks.'], ['Primordial Shower', 'Releases a huge infused blast that can be reflected by a shield.']],
      ['Bring a shield; Geo or a shield matching the infusion reflects the most damage.', 'Watch the color of its scales before committing a team.', 'Stay behind it when your shield is unavailable.']
    ),
    'Cryo Hypostasis': intel(
      'A Cryo core with short exposure windows and a shielded Frostfruit finale.',
      'Sheer Cold continues building during the fight, and the revival shield will restore HP if left intact.',
      [['Rolling Wheel', 'Becomes a spiked wheel that repeatedly charges across the arena.'], ['Icicle Barrage', 'Launches tracking Cryo projectiles before exposing its core.'], ['Frostfruit Recovery', 'Raises a Cryo shield and fires Frostfruits during its final phase.']],
      ['Use Pyro for damage and watch the Sheer Cold gauge.', 'Charged Attack Frostfruits back into the shield.', 'Break the shield, then finish the exposed core.']
    ),
    'Maguu Kenki': intel(
      'A mechanical swordsman that mixes close-range slashes with Anemo and Cryo phantoms.',
      'Its mask blocks many ranged attacks, and the phase transition releases a large blast.',
      [['Mask Guard', 'Raises its mask to block incoming ranged damage.'], ['Phantom Assault', 'Creates Anemo or Cryo copies that repeat or extend its sword attacks.'], ['Dual Blade Burst', 'At lower HP, empowers its attacks and releases overlapping elemental slashes.']],
      ['Fight at close range so the mask does not waste your attacks.', 'Dash through the delayed phantom slash, not just the first swing.', 'Step away when it plants both swords for the phase-change blast.']
    ),
    'Pyro Hypostasis': intel(
      'A Pyro core that starts behind an Ignited shield and repeatedly tries to reignite.',
      'If its Tinders survive, the shield returns and the boss may recover HP.',
      [['Ignited State', 'A Pyro shield prevents core damage and powers aggressive attacks.'], ['Extinguished Core', 'After the shield falls, normal Hypostasis exposure windows begin.'], ['Reignition Tinders', 'Plants three Tinders that rebuild the Ignited state.']],
      ['Bring rapid Hydro application; it is dramatically more efficient than other elements.', 'Destroy all three Tinders as soon as they appear.', 'Save burst damage for an exposed core after the shield is gone.']
    ),
    'Perpetual Mechanical Array': intel(
      'A ruin machine that reshapes itself and eventually splits into four Ruin Sentinels.',
      'Only the marked enhanced Sentinel ends Absolute Defense; attacking the others wastes time.',
      [['Mechanical Forms', 'Reconfigures into blades, a rocket, a cannon, and other large-area attacks.'], ['Absolute Defense', 'Becomes invulnerable and summons four different Ruin Sentinels.'], ['Paralyzed Core', 'Collapses with reduced resistance after the enhanced Sentinel is defeated.']],
      ['During the split, attack only the Sentinel with the glowing ring.', 'Save bursts for the long paralysis after Absolute Defense.', 'Keep moving sideways during the rocket and laser patterns.']
    ),
    'Hydro Hypostasis': intel(
      'A Hydro core with animal-shaped attacks, healing droplets, and a three-droplet revival phase.',
      'A healing droplet can restore a large chunk of HP, and revival droplets end the fight only when all are removed.',
      [['Hydro Mimic Forms', 'Uses dolphin dives, bubble cages, rain, and rolling wave attacks.'], ['Healing Droplet', 'A light-blue droplet approaches the core and heals it on contact.'], ['Revival Droplets', 'Three droplets slowly move toward the core at critical HP.']],
      ['Dendro deletes revival droplets quickly; Cryo can stop them.', 'Intercept the healing droplet before it reaches the core.', 'Attack during the brief opening after each mimic-shaped move.']
    ),
    'Thunder Manifestation': intel(
      'A mobile Electro lifeform that marks a target, enrages, and teleports around the arena.',
      'Once locked on, its tracking cage and moving lightning walls pressure constant movement.',
      [['Strike Probes', 'Marks circular zones that build Fury when they hit the player.'], ['Lightning Cage', 'Creates a tracking Electro cage that follows the active character.'], ['Twin Walls', 'Closes two large lightning walls across the arena.']],
      ['Do not bring an Electro damage dealer.', 'Ranged Pyro or Cryo attacks handle its teleports well.', 'Run perpendicular to the twin walls and keep moving during the cage.']
    ),
    'Golden Wolflord': intel(
      'A flying Rifthound that applies party-wide Corrosion and shields itself with three skulls.',
      'Corrosion damages the entire team through shields.',
      [['Golden Tornado', 'Spins through the arena and applies Corrosion on contact.'], ['Elemental Devourer', 'Becomes shielded and places three Rifthound Skulls around the arena.'], ['Earthshaking Dive', 'Covers most of the arena with chained impacts during the shield phase.']],
      ['Bring healing plus a Geo character for the three skulls.', 'Use the long stun after the shield breaks for your full rotation.', 'Ranged damage helps during its airborne patterns.']
    ),
    'Bathysmal Vishap Herd': intel(
      'A paired Cryo and Electro vishap fight where special projectiles drain Energy before HP.',
      'Energy-drain shots ignore shields and deal HP damage when your Energy is empty.',
      [['Cleansing Shower', 'Fires a projectile that removes Elemental Energy and then HP.'], ['Wall Perch', 'Bolteater climbs a wall and repeatedly fires Energy-draining attacks.'], ['Revival Link', 'Defeating one vishap causes the other to continue until both are resolved.']],
      ['Bring blunt damage to destroy the perch wall quickly.', 'Dodge the slow Energy-drain orbs instead of trying to shield them.', 'Lower both health bars together to shorten the last phase.']
    ),
    'Ruin Serpent': intel(
      'A burrowing ruin machine that creates Oozing Concretions and gains energy for a powerful charge.',
      'It spends long periods underground and can absorb nearby ooze to unleash a large attack.',
      [['Burrowing Assault', 'Travels below the arena before sweeping, drilling, or erupting beneath the player.'], ['Oozing Concretions', 'Creates dark nodes that power special attacks.'], ['Energy Charge', 'Exposes glowing weak points while charging an empowered strike.']],
      ['Equip and charge the Lumenstone Adjuvant before the fight.', 'Clear the Oozing Concretions when they appear.', 'Hit the glowing body segments during its charge to paralyze it.']
    ),
    'Electro Regisvine': intel(
      'An Electro plant whose shifting core and two charged Stamens control its most dangerous attacks.',
      'If the Waxing and Waning Stamens meet, they trigger a large electrical explosion.',
      [['Root and Corolla Core', 'The weak point moves between the roots and flower head.'], ['Electric Beam', 'Sweeps or tracks the arena with a sustained Electro ray.'], ['Stamen Collision', 'Creates two charged Stamens that explode when both remain active.']],
      ['Pyro, Cryo, or Dendro breaks the core efficiently.', 'Destroy each Stamen before the next one joins it.', 'Burst during the full knockdown after the core breaks.']
    ),
    'Jadeplume Terrorshroom': intel(
      'A Dendro beast whose Fury changes depending on Electro activation or Pyro scorching.',
      'Its activated rampage hits hard; Pyro scorching can summon extra Fungi.',
      [['Activated Rampage', 'Electro fills Fury, causing charges, pecking, or homing spore attacks before a long collapse.'], ['Scorched State', 'Pyro suppresses activation but creates seeds that become Fungi.'], ['Spore Barrage', 'Launches multiple waves of tracking Dendro projectiles.']],
      ['Use Electro to force a rampage, dodge it, then punish the long paralysis.', 'Avoid excessive Pyro unless you can clear the summoned Fungi.', 'Do not rely on Dendro damage.']
    ),
    'Aeonblight Drake': intel(
      'A ruin drake that alternates between ground and flight and adapts its resistance to absorbed damage.',
      'Without a bow, its aerial phase and elemental adaptation can greatly extend the fight.',
      [['Aerial Mode', 'Takes flight and uses missile barrages, tail sweeps, and rushing attacks.'], ['Element Absorption', 'Raises resistance to the element that dealt the most damage.'], ['Exposed Cores', 'Glowing weak points appear on the head, chest, or wings during key attacks.']],
      ['Bring a bow and shoot both wing cores to force it down.', 'Use more than one damage element if it adapts to your main one.', 'Unload damage during the long paralysis after a core shot.']
    ),
    'Algorithm of Semi-Intransient Matrix of Overseer Network': intel(
      'A desert automaton that creates components, becomes invisible, and hides behind high resistance.',
      'While invisible, brute-force attacks are heavily resisted and its laser zones keep pressuring the arena.',
      [['Repulsor Parts', 'Splits off components that fire beams and create attack zones.'], ['Invisible Recovery', 'Conceals its body and moves while restoring its systems.'], ['Overclocked Laser Zone', 'Marks a large area before filling it with repeated lasers.']],
      ['Use Quicken—Dendro plus Electro—while it is invisible to reveal and paralyze it.', 'Electro can also hit recovering components to interrupt the phase.', 'Keep mobile until the real body is revealed.']
    ),
    'Dendro Hypostasis': intel(
      'A Dendro core with familiar shell attacks and a mandatory cleansing finale.',
      'The boss cannot be finished without activating its Restorative Piths.',
      [['Vine Assault', 'Uses thorn cages, plunging vines, and rolling Dendro shell patterns.'], ['Restorative Piths', 'Summons three inactive Piths at critical HP.'], ['Scorched Piths', 'Pyro can halt an activated Pith and slow the cleansing process.']],
      ['Bring Dendro even though the boss is immune to Dendro damage.', 'Apply Dendro to every Pith, then Electro to accelerate them.', 'Keep Pyro away from the active Piths.']
    ),
    'Setekh Wenut': intel(
      'An Anemo serpent that spends much of the fight underground and exposes Windbite Bullets during a charge.',
      'Its airborne beam is long and damaging if the Windbite mechanic is missed.',
      [['Burrowing Strikes', 'Erupts under the player, sweeps the arena, and fires Anemo projectiles.'], ['Windbite Bullets', 'Creates floating orbs while preparing its strongest attack.'], ['Anemo Beam', 'Absorbs surviving bullets and releases a sweeping aerial beam.']],
      ['Use Pyro, Hydro, Cryo, or Electro to pop two Windbite Bullets.', 'Save ranged elemental attacks for the bullet phase.', 'Burst during the resistance-reduced knockdown.']
    ),
    'Iniquitous Baptist': intel(
      'An Abyssal boss that rotates among Cryo, Pyro, Hydro, and Electro rings and shields.',
      'A team unable to counter one of its three chosen shield elements can lose long periods of damage.',
      [['Elemental Rings', 'Opens with three rings matching the elements shown before the fight.'], ['Rotating Shields', 'Cycles through those elemental shields and changes its attacks with each one.'], ['Elemental Barrage', 'Combines projectiles, spikes, and area attacks from its selected elements.']],
      ['Read the three floating colors before starting and adjust the party.', 'Break the opening rings to earn an immediate paralysis.', 'Bring broad reaction coverage rather than one mono-element team.']
    ),
    'Icewind Suite: Dirge of Coppelia': intel(
      'The Anemo-led version of the dancing Mek pair, built around whirlwinds and an Arkhe-interruptible Climax.',
      'During Climax, overlapping Anemo pulses and infused whirlwinds control much of the arena.',
      [['Whirlwinds of Dirge', 'Creates roaming Anemo vortices that can absorb Cryo from Coppelius.'], ['Dance Sequence', 'The pair alternates fan pulses, cane slashes, and wide skating sweeps.'], ['Climax', 'Raises resistance and repeats an empowered sequence.']],
      ['Focus Coppelia, the named lead, while tracking the partner’s crossfire.', 'Use Pneuma hits during Climax to weaken or interrupt it.', 'Do not bring an Anemo-only damage team.']
    ),
    'Icewind Suite: Nemesis of Coppelius': intel(
      'The Cryo-led version of the dancing Mek pair, featuring a Cryo shield and wide skating patterns.',
      'Coppelia keeps circling and throwing Anemo blades while Coppelius is shielded.',
      [['Cryo Shield', 'Coppelius shields himself during the solo portion of Climax.'], ['Anemo Partner', 'Coppelia circles the arena and fires blades across the player’s path.'], ['Climax', 'The pair gains resistance and chains larger Cryo and Anemo attacks.']],
      ['Focus Coppelius, the named lead.', 'Use Ousia to disrupt the Climax and strip its protection.', 'Bring a strong Pyro attacker to remove the Cryo shield quickly.']
    ),
    'Emperor of Fire and Iron': intel(
      'A Pyro-armored crab whose Twin Molten Horns grant high resistance and stronger attacks.',
      'The horns regenerate, so slow shield damage can erase the opening you worked for.',
      [['Twin Molten Horns', 'A Pyro Ward greatly raises all resistance while active.'], ['Volcanic Eruption', 'Launches fireballs and leaves burning ground around the arena.'], ['Burrowing Charge', 'Dives under the sand and erupts with a close-range strike.']],
      ['Use fast Hydro application on the horns.', 'Ranged or area attacks reach the horns more reliably than low melee swings.', 'Burst immediately after the horns break and the crab collapses.']
    ),
    'Experimental Field Generator': intel(
      'A gravity-control Mek that creates a low-gravity field and upgrades its Geo attacks with Ousia.',
      'Its empowered shockwaves cover the floor and punish players who do not use the jump height.',
      [['Gravity Reduction Field', 'Lets characters jump much higher while the boss channels Ousia.'], ['Ring Shockwaves', 'Sends repeated Geo rings across the ground.'], ['Homing Stones', 'Tracks the player with missiles and falling Geo impacts.']],
      ['Jump over shockwaves inside the low-gravity field.', 'Three Pneuma hits end the Ousia state early.', 'Avoid Geo-focused damage because of its high Geo resistance.']
    ),
    'Millennial Pearl Seahorse': intel(
      'An Electro seahorse protected by a Xenomare Pearl that raises all resistance.',
      'If its three Resonant Coral Orbs survive, they restore the Pearl and prolong the fight.',
      [['Xenomare Pearl', 'An Electro Ward below its head powers attacks and raises resistance.'], ['Fontemer Hoarthunder', 'Flies up, summons three Coral Orbs, and calls repeated lightning strikes.'], ['Fishnado', 'Creates a fast circular current that erupts under the player.']],
      ['Use Cryo, Pyro, or Dendro reactions to break the Pearl.', 'Destroy all Coral Orbs during Hoarthunder.', 'Commit your damage after the Pearl shatters and its Electro attacks shut down.']
    ),
    'Hydro Tulpa': intel(
      'A pure Hydro lifeform that summons Half-Tulpas and can absorb them to grow stronger.',
      'Half-Tulpas heal and empower the main body if they reach it.',
      [['Half-Tulpa Summons', 'Creates smaller Hydro creatures that move toward the boss.'], ['Absorption', 'Consumes a surviving Half-Tulpa to enlarge and strengthen its attacks.'], ['Torrential Flurry', 'Raises a Hydro shield and charges a punishing multi-hit sequence.']],
      ['Do not bring a Hydro damage dealer.', 'Destroy Half-Tulpas immediately; Cryo can freeze them.', 'Break the charged shield to interrupt Torrential Flurry and damage the boss.']
    ),
    'Solitary Suanni': intel(
      'An illuminated beast that alternates between Hydro and Anemo adeptal-energy phases.',
      'During either gathering phase its resistance rises sharply until the mechanic is interrupted.',
      [['Hydro Gathering', 'Applies Hydro to itself and prepares a large burst.'], ['Spiritwind Pearls', 'Summons three Anemo pearls that become dangerous vortices if ignored.'], ['Adeptal Barrage', 'Chains water blades, tracking projectiles, and tail sweeps.']],
      ['Freeze it during Hydro Gathering, then Shatter, Melt, or react to break the Frozen aura.', 'Destroy Spiritwind Pearls with Pyro, Hydro, Cryo, or Electro.', 'Avoid Hydro- or Anemo-only damage teams.']
    ),
    'Legatus Golem': intel(
      'A statue protected by a durable Geo Ward and assisted by resonators.',
      'Its shield heavily reduces incoming damage until broken.',
      [['Geo Ward', 'Begins protected by a large shield that raises effective durability.'], ['Resonators', 'Summons devices whose destruction weakens the Ward.'], ['Burning Symphony', 'Uses Pyro waves, sword slams, and musical area attacks while active.']],
      ['Use Geo, Claymore, plunging, or other blunt damage on the Ward.', 'Destroy resonators when direct shield damage is slow.', 'Save bursts for the long collapse after the shield breaks.']
    ),
    'Gluttonous Yumkasaur Mountain King': intel(
      'A huge Dendro Yumkasaur that eats Flamegranates to create stronger Pyro attacks.',
      'If it consumes all three prepared fruits, the enhanced bomb pattern is wide and dangerous.',
      [['Flamegranates', 'Drops one or three fruits, pauses, and then consumes them.'], ['Enhanced Bombs', 'Spits flaming bombs and a wave based on how many fruits it ate.'], ['Aerial Slam', 'Leaps above the player and lands with little warning.']],
      ['Apply Pyro to the Flamegranates before they are eaten.', 'Burn all three fruits to force a long paralysis.', 'Avoid Dendro main damage because of its high Dendro resistance.']
    ),
    'Goldflame Qucusaur Tyrant': intel(
      'A Pyro Qucusaur that takes flight behind a Golden Flame Ward.',
      'If the Flamewind Feather survives, the boss dives into it and continues its aerial pressure.',
      [['Golden Flame State', 'Gains a Pyro shield and remains airborne.'], ['Flamewind Feather', 'Drops a Pyro construct before preparing a powerful dive.'], ['Swooping Barrage', 'Crosses the arena with dives and falling fire attacks.']],
      ['Use ranged Hydro application on the airborne shield.', 'Destroy the Flamewind Feather before the dive.', 'Burst during the long grounded knockdown.']
    ),
    'Secret Source Automaton: Configuration Device': intel(
      'A Natlan automaton with high resistance that builds two Phlogiston pillars and exposed mechanisms.',
      'Without vertical mobility, reaching both Accretion Mechanisms can be slow.',
      [['Countermeasure State', 'Raises resistance and charges its Boltsphere Cannon.'], ['Phlogiston Pillars', 'Creates two tall columns with one mechanism on each top.'], ['Boltsphere Cannon', 'Prepares a powerful attack while the mechanisms remain active.']],
      ['Nightsoul use makes the special state arrive sooner.', 'Use climbing, high jumps, or Natlan movement skills to reach each mechanism.', 'Break both mechanisms to cancel the cannon and trigger a damage window.']
    ),
    'Tenebrous Papilla: Type I': intel(
      'An Abyssal Mimiflora that copies other bosses and later protects itself with a Void Ward.',
      'Failing to break its Ward allows a high-damage attack and extends the fight.',
      [['Mimic Forms', 'Transforms into familiar enemies and borrows their signature attacks.'], ['Void Ward', 'Creates a multi-hit shield while preparing a major Abyssal attack.'], ['Form Flash', 'Becomes briefly invulnerable whenever it changes its copied body.']],
      ['Use frequent elemental hits; Nightsoul-aligned hits break the Void Ward best.', 'Do not spend bursts into the transformation flash.', 'After the Ward breaks, use the paralysis for your strongest rotation.']
    ),
    'Wayward Hermetic Spiritspeaker': intel(
      'A Cryo-aligned warrior that divides into four shielded Radiant Reflections.',
      'All four clones attack at once until every Cryo shield is broken.',
      [['Radiant Reflections', 'Splits into four clones, each protected by a Cryo Ward.'], ['Tracking Circles', 'Places repeated delayed circles under the player.'], ['Flight and Dive', 'Takes off with an area blast and dives at the player’s location.']],
      ['Use Pyro to break all four Cryo shields quickly.', 'Masters of the Night-Wind can identify and suppress the clones.', 'Keep moving in one direction through the tracking-circle sequence.']
    ),
    'Lava Dragon Statue': intel(
      'A stone dragon whose extreme resistance falls only after repeated Pyro triggers Overburn.',
      'Its charged state can unleash large slams and long rushing attacks before it overheats.',
      [['Geohuman State', 'Starts as a highly resistant stone statue.'], ['Molten Dragon', 'Continuous Pyro awakens and transforms it into an aggressive dragon.'], ['Overburn', 'Further Pyro fills its heat state until it collapses.']],
      ['Use rapid, repeated Pyro hits to force Overburn; raw Pyro damage is not the point.', 'Save non-Pyro burst damage for the collapse.', 'Stay near its side to avoid the longest frontal charges.']
    ),
    'Secret Source Automaton: Overseer Device': intel(
      'A Hydro automaton that reads sustained Nightsoul use, enters Counterstrike Mode, and builds Flow Momentum.',
      'Sweeper Mode raises every resistance enormously until Flow Momentum is suppressed.',
      [['Waterblade Combo', 'Chains close-range Hydro slashes and a cross-cut.'], ['Counterstrike Mode', 'Changes behavior after sustained Nightsoul’s Blessing use.'], ['Sweeper Mode', 'Gains extreme resistance while Flow Momentum powers its attacks.']],
      ['Maintain Nightsoul’s Blessing to provoke Counterstrike Mode.', 'Use consecutive Cryo hits to drain Flow Momentum.', 'Burst when momentum drops below 10 and its Cryo resistance falls.']
    ),
    'Knuckle Duckle': intel(
      'An Electro combat automaton whose Stamping Devices can be turned against its Ward.',
      'Duckstruction Mode adds relentless charges while the Ward blocks meaningful damage.',
      [['Stamping Devices', 'Summons helper machines that fire and move around the arena.'], ['Duckstruction Mode', 'Gains a Ward and uses rapid punching or spinning charges.'], ['Malfunction', 'Disabled devices ram the boss and remove a large part of its Ward.']],
      ['Trigger Electro-Charged with Hydro and Electro on the Stamping Devices.', 'Destroy or malfunction devices so they hit the boss.', 'Dump damage during the roughly 12-second stun after the Ward breaks.']
    ),
    'Radiant Moonfly': intel(
      'A Radiant beast that changes elemental behavior and traps characters in a damaging Radiant Cocoon.',
      'Radiant Cocoon suppresses damage and healing until the affected character is fully restored.',
      [['Radiant Cocoon', 'Reduces combat performance and can only be cleared by healing to full HP.'], ['Pyro Barrage', 'Changes into an aggressive Pyro form with sweeping aerial attacks.'], ['Dendro Return', 'Reactive damage can end the barrage and return it to its vulnerable Dendro form.']],
      ['Bring a reliable healer and top off Cocooned characters.', 'Use Hydro or Cryo reactions to end the Pyro barrage.', 'Exploit the short vulnerability after its form is forced back.']
    ),
    'Frostnight Herra': intel(
      'A moon-touched beast that enters Gloomveiled state, absorbs the dominant damage element, and becomes immune to it.',
      'If Gloomveil is not interrupted quickly, it keeps its huge resistance and releases an empowered explosion.',
      [['Gloomveiled State', 'Raises all resistance and fills a Fury bar from incoming hits.'], ['Elemental Absorption', 'After the bar fills, becomes immune to the element that dealt the most damage.'], ['Moon Barrage', 'Fires crescents, falling spheres, dives, and enhanced wing slashes.']],
      ['Use many rapid hits or Lunar Reaction damage to fill the Fury bar.', 'Avoid letting your only DPS element become the absorbed immunity.', 'Burst during the short stun after Gloomveil breaks.']
    ),
    'Super-Heavy Landrover: Mechanized Fortress': intel(
      'A mechanized fortress that must be overheated with repeated Pyro hits before its Cryo cooling Ward appears.',
      'If it finishes cooling, it regulates its temperature and continues its strongest attacks.',
      [['Overheat Gauge', 'Every instance of Pyro damage raises its temperature.'], ['Cooling Ward', 'At maximum heat, generates a Cryo Ward to lower the gauge.'], ['Mechanized Assault', 'Uses saw sweeps, slams, charges, and bombardment patterns.']],
      ['Use fast, repeated Pyro hits to fill Overheat.', 'Break the Cryo Ward before the gauge empties.', 'Use the 16-second paralysis and resistance loss for your full burst.']
    ),
    'Lord of the Hidden Depths: Whisperer of Nightmares': intel(
      'An Electro abyssal predator that summons four Fishers and an elemental-only Deepdark Shield.',
      'If the shield survives its charge, it consumes the Fishers and releases an arena-wide strike.',
      [['Rift Dive', 'Opens a portal and plunges onto the player’s location.'], ['Deepdark Shield', 'Shields itself and summons four Fishers of Hidden Depths.'], ['Deepdark Strike', 'Charges a devastating arena-wide attack behind the shield.']],
      ['Use elemental damage on the boss or defeat Fishers; Physical cannot damage the shield.', 'Lunar Reactions break the shield three times faster.', 'When it breaks, exploit the 10-second stun and major resistance loss.']
    ),
    'Radiant Moongecko': intel(
      'A Geo Radiant beast that weakens characters with a Cocoon and protects a Moonstone Anchor with layered Wards.',
      'Radiant Cocoon removes CRIT chance, damage, and healing power until the character reaches full HP.',
      [['Radiant Cocoon', 'Damages nearby characters and applies a severe offensive and healing debuff.'], ['Moonstone Anchor', 'Creates a dome with nine Ward layers and two copies of the boss.'], ['Voidstep Reverberation', 'If the Anchor survives, detonates a massive Geo blast.']],
      ['Bring strong healing and restore a Cocooned character to full HP.', 'Use Geo, Claymore, or other blunt attacks on the Moonstone Anchor.', 'Break all Ward layers within 25 seconds to stun and heavily damage it.']
    ),
    'Watcher: Fallen Vigil': intel(
      'A Geo Watcher that records two attack elements, then turns those recordings into Elemental Stars.',
      'Surviving Stars become giant spears during Phenomena’s Delirium.',
      [['Supreme Overseer', 'Records the Pyro, Hydro, Electro, or Cryo element that hits it most.'], ['Elemental Stars', 'Creates two Stars from the two recorded elements; each is immune to its own element.'], ['Phenomena’s Delirium', 'After charging, converts surviving Stars into massive falling spears.']],
      ['Deliberately record two different reactive elements.', 'Destroy each Star with an element it is not immune to.', 'Breaking both Stars cancels the attack and stuns the Watcher.']
    ),
    'Immortal Construct': intel(
      'A Pyro bio-alchemical bird that burns its own HP, shields itself, and tries to heal through Lifeflare.',
      'It cannot die while a shield is active, even if its HP reaches zero.',
      [['Revival Shields', 'Builds layered HP shields that prevent defeat.'], ['Lifeflare', 'Consumes power to restore HP and continue the cycle.'], ['Blazing Brilliance', 'Charges a lethal Pyro burst when shield layers fall or Lifeflare lasts too long.']],
      ['Break every shield before trying to finish it.', 'Stellar Glimmer—especially Stellar Conduct—stops its healing and strips shields quickly.', 'Leave the marked area when Blazing Brilliance begins.']
    ),
    'Chimeric Winged Lion': intel(
      'A fast Snezhnayan boss that alternates between Electro Thundercall and Anemo Galeforce states.',
      'Each state charges a heavy arena attack if its fixed counter is ignored.',
      [['Thundercall', 'Gains an Electro Ward and spreads thunder blades while charging a radial blast.'], ['Galeforce', 'Summons Anemo Orbs and absorbs them to power an area attack.'], ['Stellar Disruption', 'Stellar Glimmer can interrupt parts of either enhanced state.']],
      ['Break Thundercall with Cryo or Pyro.', 'Destroy Galeforce Orbs with Pyro, Hydro, Electro, or Cryo.', 'Use each interruption’s stun window for your strongest rotation.']
    ),
    'All-Devouring Narwhal': intel(
      'A cosmic whale that fills a Hostility meter before swallowing the party into a shadow encounter.',
      'Spending too long in the whale phase delays damage, while the inner Dark Shadow uses dangerous Foul Legacy attacks.',
      [['Primordial Sea Assault', 'Breaches the arena with dives, waves, and star-like projectiles.'], ['Devouring', 'At full Hostility, swallows the player into an inner realm.'], ['Dark Shadow', 'A humanoid Foul Legacy enemy attacks inside the whale.']],
      ['Deal damage to fill Hostility quickly and advance the phase.', 'Use Pneuma or Ousia on the Dark Shadow’s Eye of the Maelstrom to damage it faster.', 'After defeating the Shadow, unload damage on the collapsed whale.']
    ),
    'Azhdaha': intel(
      'A massive Geo dragon that absorbs two domain-displayed elements and causes damaging elemental seals.',
      'Phase transitions cannot be interrupted, and marked characters take persistent damage without a shield.',
      [['Elemental Absorption', 'Infuses its tail and body with the two elements shown on the domain door.'], ['Elemental Seals', 'Several attacks mark characters for repeated damage.'], ['Quake Transition', 'Stomps repeatedly while changing phases and becoming briefly untargetable.']],
      ['Check the two door sigils and avoid relying on those damage elements.', 'Bring a shield to block elemental seals.', 'Retreat during each HP-gated stomping transition.']
    ),
    'Childe': intel(
      'A three-phase duel that moves from Hydro bow attacks to Electro blades and a mixed Foul Legacy form.',
      'Riptide marks enable powerful tracking finishers in the first two phases.',
      [['Hydro Arsenal', 'Uses arrows, water blades, and a giant whale attack in phase one.'], ['Electro Delusion', 'Rushes with fast spear and blade combos in phase two.'], ['Foul Legacy', 'Combines Hydro and Electro attacks with larger range in the final phase.']],
      ['Touch the arena wall to remove a Hydro or Electro mark.', 'Do not attack into his elemental counter stance.', 'Use the long pauses after major attacks to deal damage safely.']
    ),
    'Guardian of Apep\'s Oasis': intel(
      'A three-stage Dendro dragon encounter with a defense phase around the Heart of Oasis.',
      'Aftershocks of the Apocalypse is nearly lethal outside the Revival Hymn shields.',
      [['Warden Phase', 'Uses limb slams, burrowing attacks, and tracking thorn projectiles.'], ['Heart of Oasis', 'Summons waves of Proliferating Organisms that attack the central Heart.'], ['Aftershocks of the Apocalypse', 'Charges an arena-wide blast while three protective domes appear.']],
      ['Use area damage to clear organisms and protect the Heart.', 'Enter a Revival Hymn dome before every Apocalypse blast.', 'Avoid Dendro-focused damage because the encounter has high Dendro resistance.']
    ),
    'Il Dottore': intel(
      'Dottore fused with Irminsul, using barriers and nodes to imprison the party in a distorted realm.',
      'Ignoring barrier nodes leaves the team bound while he continues multi-element attacks.',
      [['Irminsul Prison', 'Creates a barrier realm linked to several destructible nodes.'], ['Heretical Arsenal', 'Combines Pyro, Electro, Cryo, and Physical attacks across the arena.'], ['Core Exposure', 'Becomes vulnerable after the prison’s sustaining nodes are destroyed.']],
      ['Find and destroy the barrier nodes instead of attacking the sealed boss.', 'Keep moving through the multi-element ground patterns.', 'Save bursts for the exposed Irminsul core window.']
    ),
    'La Signora': intel(
      'A two-phase Cryo and Pyro fight governed by Sheer Cold, Blazing Heat, and corner devices.',
      'Breaking every corner device too early can leave no safe way to control the temperature gauge.',
      [['Cocoon of Ice', 'At the phase change, encases herself while Crimson Lotus Moths appear.'], ['Sheer Cold', 'Cryo attacks and the frozen floor continuously fill a damaging gauge.'], ['Blazing Heat', 'The Pyro phase raises heat and fills the arena with burning zones and tornadoes.']],
      ['Stand near Hearts of Flame or Eyes of Frost to lower the current gauge.', 'Use Crimson Lotus Moths to break the ice cocoon.', 'Preserve corner devices until you truly need an emergency temperature reset.']
    ),
    'Lord of Eroded Primal Fire': intel(
      'A stationary Abyss-corrupted dragon that applies Attrition, shrinks the arena, and builds a Void Ward.',
      'Eroded attacks pierce shields and stacked Attrition can kill after a delay.',
      [['Arena Sever', 'Cuts away sections of the battlefield, reducing room to dodge.'], ['Void Ward', 'Shields itself and prepares a major attack.'], ['Eroded Assault', 'Applies stackable Attrition that later drains HP through shields.']],
      ['Bring strong team healing; shielding alone is not enough.', 'Use frequent elemental hits on the Void Ward; Nightsoul hits are most effective.', 'Destroy summoned pillars to stun it and protect your remaining space.']
    ),
    'Lupus Boreas, Dominator of Wolves': intel(
      'A Cryo and Anemo wolf with a fast running intermission and stronger arena-wide attacks below half HP.',
      'Cryo and Anemo damage are ineffective, and frozen floor telegraphs most dangerous hits.',
      [['Frozen Claw', 'Marks the ground before sweeping, pouncing, or spinning through the area.'], ['Running Phase', 'Circles the arena and repeatedly charges the player at high speed.'], ['Storm Phase', 'Adds falling icicles, wind blades, and phantom wolves below half HP.']],
      ['Avoid Cryo and Anemo main damage.', 'Use the frozen ground as the attack indicator.', 'During the running phase, conserve stamina and dodge sideways at the last moment.']
    ),
    'Magatsu Mitake Narukami no Mikoto': intel(
      'A relentless Electro puppet that gains Ominous Destiny and transforms into a shielded Baleful Shadowlord.',
      'Final Calamity defeats the active character unless the Flower of Remembrance creates protection.',
      [['Baleful Shadowlord', 'Gains a large Electro Ward, stronger attacks, and drains party Energy.'], ['Clone Assault', 'Creates copies; striking the correct one interrupts the pattern.'], ['Final Calamity', 'Charges an unavoidable slash while a Flower of Remembrance appears.']],
      ['Bring Electro to charge the Flower of Remembrance instantly.', 'Destroy the flower and stand inside its shield for Final Calamity.', 'Attack through Shadowlord to drain the Ward and force a long collapse.']
    ),
    'Shouki no Kami, the Prodigal': intel(
      'A two-phase giant mech assisted by the Neo Akasha Terminal and elemental floor matrices.',
      'Setsuna Shoumetsu is lethal if the Nirvana Engines survive and no shield is created.',
      [['Elemental Matrices', 'Phase-one floor panels heal, clear hazards, create updrafts, or paralyze the boss.'], ['Neo Akasha Terminal', 'Collects energy blocks and automatically attacks the mech in phase two.'], ['Setsuna Shoumetsu', 'Charges a lethal attack while four Nirvana Engines appear.']],
      ['Collect energy blocks instead of chasing only damage.', 'In phase one, trigger both Electro matrices to paralyze it.', 'Destroy Nirvana Engines, charge the Terminal, and fire before the lethal attack.']
    ),
    'Stormterror': intel(
      'Dvalin is an aerial encounter where breaking his shield exposes a corrupted spike on his neck.',
      'Cracked platforms deal continuous damage and eventually force relocation.',
      [['Aerial Barrage', 'Flies past the platform, fires projectiles, and breathes Anemo across the floor.'], ['Claw Landing', 'Plants his claws on the platform, allowing the shield to be damaged.'], ['Caelestinum Finale Termini', 'Cracks platforms and makes them continuously dangerous.']],
      ['Damage the claws or head to break the shield.', 'Climb the neck and hit the purple spike during knockdown.', 'Use the side wind currents to move to a clean platform.']
    ),
    'The Doctor': intel(
      'The False Moon incarnation of Dottore uses Moonfall, lunar prohibitions, turrets, and control-altering commands.',
      'Moonfall is lethal without cover, while breaking a prohibition drains the entire party’s Energy.',
      [['Moonfall Impact', 'Rises into the air and calls a lethal lunar strike; Ancient Moon remnants provide cover.'], ['Authority of Three Moons', 'Orders the player not to face him, not to travel far, or inverts movement controls.'], ['Lunar Blasters', 'Summons four Hydro turrets and a Ward; Lunar reactions can turn turrets against him.']],
      ['Hide behind an Ancient Moon remnant during Moonfall.', 'Obey the displayed prohibition until it ends to recover full Energy.', 'Use Lunar-Bloom or Lunar-Charged on turrets to damage his Ward.']
    ),
    'The Game Before the Gate': intel(
      'A King-and-Queen encounter whose two phases use Freeze as the answer to lethal chess moves.',
      'Both Lethal Blows defeat the active character and cannot be avoided with Burst invulnerability.',
      [['King’s Lethal Blow', 'The King charges an arena-wide sword strike in phase one.'], ['Queen’s Lethal Blow', 'The Queen charges while the King rushes around the arena in phase two.'], ['Royal Combination', 'The pair coordinate dashes, blades, and board-wide patterns.']],
      ['Bring consistent Hydro and Cryo application.', 'Freeze the King before the first Lethal Blow completes.', 'In phase two, Freeze the Queen and bait the King’s charge into her.']
    ),
    'The Knave': intel(
      'Arlecchino applies Bond of Life, moves at high speed, and rewards players who cleanse the mark correctly.',
      'Her marked attacks deal more damage and heal her when they hit a character already carrying Bond of Life.',
      [['Bond of Life', 'Blocks healing until enough healing is received and adds persistent HP loss.'], ['Bloodtide Banquet', 'Charges a powerful arena attack after applying her mark.'], ['Winged Assault', 'In phase two, chains aerial dives, scythe throws, and wide crimson patterns.']],
      ['Bring a strong healer and clear Bond of Life promptly.', 'After cleansing it, save the Scarlet Nighttide Charged Attack.', 'Use that Charged Attack to interrupt Bloodtide Banquet and deal true damage.']
    )
  };
})();
