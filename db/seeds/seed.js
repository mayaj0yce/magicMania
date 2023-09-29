// seed.js

const mongoose = require('../connection'); // Import your mongoose setup
const MagicWords = require('../models/magicWords'); // Import your Mongoose model

// Data to be inserted into the database
const initialData = [
  {
    Keyword: 'Adamant',
    Description:
      "Spells with Adamant have additional or alternative effects if you cast the spell with three or more mana of one color. The text is different on each color of spell, as colored spells specify the spell's color whereas the two artifact spells outline that any color can be used.",
    Example: 'If at least three red mana was spent to cast this spell, it deals 4 damage instead.',
  },
  {
    Keyword: 'Abandon',
    Description:
      'Only used in Archenemy format. To turn a face-up ongoing scheme card face down and put it on the bottom of its owner\'s scheme deck.',
  },
  {
    Keyword: 'Absorb',
    Description:
      'Absorb was introduced in Future Sight. By its nature as a damage prevention ability, this is a white ability. It has only been printed on one card so far, the timeshifted Lymph Sliver. It ended up being a little too powerful and stalled the game too much to reuse in greater number.',
    Example: 'If a source would deal damage to a Sliver, prevent 1 of that damage.',
  },
  {
    Keyword: 'Activate',
    Description:
      'To activate an activated ability is to put it onto the stack and pay its costs, so that it will eventually resolve and have its effect. Only an object\'s controller (or its owner, if it doesn\'t have a controller) can activate its activated ability unless the object specifically says otherwise. A player may activate an ability if they have priority.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Adapt',
    Description:
      'Adapt is a tweaked version of Monstrosity. It is written as Adapt N, where N is any natural number. If a creature has no +1/+1 counters on it, you may pay the adapt cost to put N +1/+1 counters on that creature. In contrast to Monstrosity, if a creature somehow loses its +1/+1 counters, it can adapt again and pick up more. Alternatively, one can play counters in response to the activation to stop the creature from getting N counters.',
    Example: 'Tap 3 Forest: Adapt 1 (If this creature has no +1/+1 counters on it, put a +1/+1 counter on it.)',
  },
  {
    Keyword: 'Addendum',
    Description: 'Spells with Addendum have additional or alternative effects if you cast the spell during your main phase. Addendum is found mostly on instants. The exception is Sentinel\'s Mark, which is an enchantment with flash. Addendum designs were made in two forms: instants with main phase upside, and functional sorceries with weaker instant versions.',
    Example: 'Addendum - If you cast this spell during your main phase, you gain 2 life.',
  },
  {
    Keyword: 'Affinity',
    Description: 'Affinity is a keyword ability that reduces the mana cost of a spell by the number of permanents of a certain type that the player controls. It first appeared in the Mirrodin block. The ability is always written as "Affinity for [something]." The most common instance is "Affinity for artifacts" (This spell costs less to cast for each artifact you control.)',
    Example: 'Affinity for artifacts (This spell costs less to cast for each artifact you control.)',
  },
  {
    Keyword: 'Afflict',
    Description: 'Whenever a creature with this ability becomes blocked, defending player loses life equal to the Afflict value. If a creature has multiple instances of afflict, each triggers separately. Called "unstoppable" in design, the mechanic was created to convey the destructive and vicious power of the God-Pharaoh\'s legions, the Eternals.',
    Example: 'Afflict 1 (Whenever this creature becomes blocked, defending player loses 1 life.)',
  },
  {
    Keyword: 'Afterlife',
    Description: 'Afterlife is a triggered ability and includes a number. When the creature with afterlife dies, it creates that number of 1/1 black and white Spirit creature tokens with flying. Afterlife triggers only when the creature dies, meaning "goes to the graveyard from the battlefield." If it\'s exiled directly from the battlefield or similar, afterlife won\'t trigger. If a permanent has multiple instances of afterlife, each triggers separately.',
    Example: 'Afterlife 1 (When this creature dies, create a 1/1 white and black Spirit creature token with flying.)',
  },
  {
    Keyword: 'Aftermath',
    Description: 'Aftermath is an ability found on some split cards. It lets players cast one half of a split card only from their graveyard. It represents three static abilities. “Aftermath” means “You may cast this half of this split card from your graveyard,” “This half of this split card cannot be cast from any zone other than a graveyard,” and “If this spell was cast from a graveyard, exile it instead of putting it anywhere else any time it would leave the stack.”',
    Example: 'Aftermath (Cast this spell only from your graveyard. Then exile it.)',
  },
  {
    Keyword: 'Alliance',
    Description: 'Alliance is an ability word that triggers whenever another creature enters the battlefield under your control. The effects differ per card. If you control multiple creatures that each have an alliance ability and a creature enters the battlefield under your control, all of the alliance abilities trigger. Those abilities can be put on the stack in any order, and the last one to be put on the stack will be the first one to resolve.',
    Example: 'Alliance - Whenever another creature enters the battlefield under your control, double Devilish Valet\'s power until end of turn.',
  },
  {
    Keyword: 'Amass',
    Description: 'As you amass, if you don\'t already control an Army creature, you create a 0/0 black Army creature token. Then put a number of +1/+1 counters on one of your Armies equal to the number after amass. If you do control an Army, you don\'t create any new tokens. Rather, you\'ll put those +1/+1 counters on an Army you control. In both cases, the Army that you amass then becomes the creature type after amass, in addition to its other types.',
    Example: 'Whenever a nontoken sliver you control dies, amass Sliver 2. (Put a +1/+1 counter on an army you control. It\'s also a sliver. If you don\'t control an Army, create a 0/0 black Sliver Army creature token first.)',
  },
  {
    Keyword: 'Amplify',
    Description: 'Amplify is a keyword ability on creatures that allows the player to reveal creature cards in their hand that share a creature type with the creature. The creature enters the battlefield with a number of +1/+1 counters for each such card revealed. Some creatures with amplify have additional abilities tied to the number of +1/+1 counters on them.',
    Example: 'Amplify 1 (As this creature enters the battlefield, put a +1/+1 counter on it for each Beast card you reveal in your hand.)',
  },
  {
    Keyword: 'Annihilator',
    Description: 'Annihilator abilities trigger and resolve during the declare attackers step. The defending player chooses and sacrifices the required number of permanents before they declare blockers. Any creatures sacrificed this way won\'t be able to block. If a creature with annihilator is attacking a planeswalker, and the defending player chooses to sacrifice that planeswalker, the attacking creature continues to attack. It may be blocked. If it isn\'t blocked, it simply won\'t deal combat damage to anything.',
    Example: 'Annihilator 2 (Whenever this creature attacks, defending player sacrifices two permanents.)',
  },
  {
    Keyword: 'Ascend',
    Description: 'Ascend unlocks different bonuses on different cards if you have the city\'s blessing. Ascend always looks at the current game state, not the past. If ascend is on a permanent, it constantly checks to see whether you control ten or more permanents. The moment you do, you get the city\'s blessing. When Ascend appears on instants and sorceries, it checks if you control ten or more permanents only once, as the spell resolves. Once you have the city\'s blessing, you keep it for the rest of the game. Multiple players can all have the city\'s blessing at the same time.',
    Example: 'Ascend (If you control ten or more permanents, you get the city\'s blessing for the rest of the game.)',
  },
  {
    Keyword: 'Assemble',
    Description: 'Assemble was introduced as a joke in Future Sight and related to Contraptions. It was greatly expanded upon in Unstable. There is no functional difference between players assembling a contraption, and creatures assembling a contraption. If a card instructs you or a creature you control to assemble a Contraption, but your Contraption deck is empty, then nothing happens. However, Steamflogger Boss only cares about Contraptions assembled by creatures.',
    Example: 'When Steamflogger of the Month enters the battlefield, it assembles a Contraption for each Contraption you control. (To assemble a Contraption, put the top card of your Contraption deck face up onto one of your sprockets.)',
  },
  {
    Keyword: 'Assist',
    Description: 'Assist is a static ability that modifies the rules of paying for the spell with assist. If the total cost to cast a spell with assist includes a generic mana component, you may choose another player before you activate mana abilities while casting it. That player has a chance to activate mana abilities. Once that player chooses not to activate any more mana abilities, you have a chance to activate mana abilities. Before you begin to pay the total cost of the spell, the player you chose may pay for any amount of the generic mana in the spell’s total cost.',
    Example: 'Assist (Another player can pay up to 2 of this spell\'s cost.)',
  },
  {
    Keyword: 'Attach',
    Description: 'To attach an Aura, Equipment, or Fortification to an object or player means to take it from where it currently is and put it onto that object or player. An Aura, Equipment, or Fortification canot be attached to an object or player it could not enchant, equip, or fortify, respectively.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Augment',
    Description: 'The augment ability can only be activated if the card with augment is in your hand. It\'s the only way to play the cards with augment because they don\'t have a casting cost. The activation includes revealing the card with augment as part of the cost. When activated, the card is combined with a host creature you control. If there is no legal target when resolving the ability, then the card with augment returns to the player\'s hand.',
    Example: 'Augment Tap 2 Swamp (Reveal this card from your hand: Combine it with the target host. Augment only as a sorcery.)',
  },
  {
    Keyword: 'Aura Swap',
    Description: 'You may choose an Aura card in your hand. If you choose one, the game checks whether that Aura can enchant the enchanted permanently as it currently exists (while the Aura with aura swap is still on the battlefield). If it can, and you own the Aura with aura swap, then the Aura with aura swap is put into your hand and the chosen Aura is put onto the battlefield attached to that permanent.',
    Example: 'Tap 2 Water (Exchange this Aura with an Aura card in your hand.)',
  },
  {
    Keyword: 'Awaken',
    Description: 'Awaken appears on some instants and sorceries. It represents two abilities: a static ability that functions while the spell with awaken is on the stack and a spell ability. Casting a spell using its awaken ability follows the rules for paying alternative costs. The controller of a spell with awaken chooses the target of the awaken spell ability only if that player chose to pay the spell\'s awaken cost. Otherwise, the spell is cast as if it did not have that target.',
    Example: 'Awaken 3 (If you cast this card for 6 plains, also put three +1/+1 counters on target land you control and it becomes a 0/0 Elemental creature with haste. It\'s still a land.)',
  },
  {
    Keyword: 'Backup',
    Description: 'Backup is a keyword ability that lets a creature give +1/+1 counters to itself or another when it enters the battlefield. If a different creature is chosen, that creature also temporarily gains one or more abilities. Only abilities printed on the object with backup are granted by its backup ability. Any abilities gained by a permanent, whether due to a copy effect, an effect that grants an ability to a permanent, or an effect that creates a token with certain abilities, are not granted by a backup ability.',
    Example: 'Backup 1 (When this creature enters the battlefield, put a +1/+1 counter on target creature. If that\'s another creature, it gains the following abilities until end of turn.) Flying, first strike, lifelink',
  },
  {
    Keyword: 'Banding',
    Description: 'Banding is a keyword ability that modifies the rules for declaring attackers and assigning combat damage. “Bands with other” is a specialized version of the ability. Any creatures with banding, and up to one without, can attack in a band. Bands are blocked as a group. If any creatures with banding you control are blocking or being blocked by a creature, you divide that creature\'s combat damage, not its controller, among any of the creatures it\'s being blocked by or is blocking.',
    Example: 'Banding (Any creatures with banding, and up to one without, can attack in a band. Bands are blocked as a group. If any creatures with banding you control are blocking or being blocked by a creature, you divide that creature\'s combat damage, not its controller, among any of the creatures it\'s being blocked by or is blocking.)',
  },
  {
    Keyword: 'Bargain',
    Description: 'Bargain is a keyword ability that represents an optional additional cost of sacrificing an artifact, enchantment, or token. A spell has been bargained if its controller declared the intention to pay that cost.',
    Example: 'Bargain (You may sacrifice an artifact, enchantment, or token as you cast this spell.) Torch the Tower deals 2 damage to target creature or planeswalker. If this spell was bargained, instead it deals 3 damage to that permanent and you scry 1.',
  },
  {
    Keyword: 'Battalion',
    Description: 'Battalion is an ability word introduced in Gatecrash, wherein it is the Boros Legion guild mechanic. It gives an advantageous effect when a creature with battalion attacks alongside 2 or more other creatures.',
    Example: 'Battalion — Whenever Firemane Avenger and at least two other creatures attack, Firemane Avenger deals 3 damage to target creature or player and you gain 3 life.',
  },
  {
    Keyword: 'Battle Cry',
    Description: 'Battle cry is a triggered ability first introduced in Mirrodin Besieged and gives a +1/+0 bonus to each other attacking creature, thus being more or less an inversion of Exalted.',
    Example: 'Battle cry (Whenever this creature attacks, each other attacking creature gets +1/+0 until end of turn.)',
  },
  {
    Keyword: 'Bestow',
    Description: 'When a card with bestow is in your hand, you have two options: cast it normally for its mana cost, or cast it for its bestow cost. If you cast a bestow card normally, it\'s an enchantment creature spell that resolves and becomes an enchantment creature on the battlefield. Its bestow ability and its "Enchanted creature gets..." text are ignored.',
    Example: 'Bestow Tap 6 Water (If you cast this card for its bestow cost, it\'s an Aura spell with enchant creature. It becomes a creature again if it\'s not attached to a creature.)',
  },
  {
    Keyword: 'Blitz',
    Description: 'Blitz is an ability on permanents that allows the player to play the card for an alternative cost. Casting a spell for its blitz cost has several effects. The creature gains haste and "When this creature dies, draw a card." You won\'t have to wait too long for that card because at the beginning of the next end step, you sacrifice the creature.',
    Example: 'Blitz Tap 2 Mountain (If you cast this spell for its blitz cost, it gains haste and “When this creature dies, draw a card.” Sacrifice it at the beginning of the next end step.)',
  },
  {
    Keyword: 'Bloodrush',
    Description: 'Bloodrush is an ability word introduced in Gatecrash, wherein it is the Gruul Clans guild mechanic. It is a modal mechanic, with a moderately-sized creature on one "side" and a secondary mode of being able to be discarded to give an attacking creature a temporary power/toughness boost equal to the power and toughness of the discarded creature card, along with any combat-related abilities the creature had.',
    Example: 'Tap 1 Forest, 1 Mountain: Discard Rubblehulk: Target attacking creature gets +X/+X until end of turn, where X is the number of lands you control.',
  },
  {
    Keyword: 'Bloodthirst',
    Description: 'Bloodthirst works by putting a number of +1/+1 counters on a permanent (so far only creatures) as it enters the battlefield, if an opponent has been dealt damage that turn.',
    Example: 'Bloodthirst 1 (If an opponent was dealt damage this turn, this creature enters the battlefield with a +1/+1 counter on it.)',
  },
  {
    Keyword: 'Boast',
    Description: 'Boast keyword adds a drawback to an activated ability which is referred to as the boast ability. The drawback is as follows: a player can only activate the boast ability after the creature with the ability attacks and at most once each turn. Boast abilities can be activated during combat or even after combat — any time in the turn after the creature was declared as an attacker.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Bolster',
    Description: '"Bolster N” means “Choose a creature you control with the least toughness or tied for least toughness among creatures you control. Put N +1/+1 counters on that creature.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Bushido',
    Description: 'Bushido is a triggered ability. “Bushido N” means “Whenever this creature blocks or becomes blocked, it gets +N/+N until end of turn.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Buyback',
    Description: 'Buyback appears on some instants and sorceries. It represents two static abilities that function while the spell is on the stack. “Buyback [cost]” means “You may pay an additional [cost] as you cast this spell” and “If the buyback cost was paid, put this spell into its owner\'s hand instead of into that player\'s graveyard as it resolves.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Cascade',
    Description: 'Cascade is a triggered ability that functions only while the spell with cascade is on the stack. “Cascade” means “When you cast this spell, exile cards from the top of your library until you exile a nonland card whose mana value is less than this spell\'s mana value. You may cast that card without paying its mana cost if the resulting spell\'s mana value is less than this spell\'s mana value. Then put all cards exiled this way that weren\'t cast on the bottom of your library in a random order.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Cast',
    Description: 'To cast a spell is to take it from the zone it\'s in (usually the hand), put it on the stack, and pay its costs, so that it will eventually resolve and have its effect. A player may cast a spell if they have priority.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Casualty',
    Description: 'Casualty is a keyword that represents two abilities. The first is a static ability that functions while the spell with casualty is on the stack. The second is a triggered ability that functions while the spell with casualty is on the stack. Casualty N means “As an additional cost to cast this spell, you may sacrifice a creature with power N or greater,” and “When you cast this spell, if a casualty cost was paid for it, copy it. If the spell has any targets, you may choose new targets for the copy.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Celebration',
    Description: 'Celebration abilities trigger if two or more nonland permanents entered the battlefield under your control this turn, and each celebration ability has a different effect.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Champion',
    Description: 'Champion represents two triggered abilities. “Champion an [object]” means “When this permanent enters the battlefield, sacrifice it unless you exile another [object] you control” and “When this permanent leaves the battlefield, return the exiled card to the battlefield under its owner\'s control.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Changeling',
    Description: 'Changeling is a characteristic-defining ability. “Changeling” means “This object is every creature type.” This ability works everywhere, even outside the game.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Channel',
    Description: 'Channel cards have an activated ability that lets you discard them to get a temporary effect that\'s similar to the creature\'s normal ability.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Choose a Background',
    Description: '“Choose a Background” is a variant of the partner ability that represents a static ability. “Choose a Background” means “You may designate two cards as your commander as long as one of them is this card and the other is a legendary Background enchantment.” You can\'t designate two cards as your commander if one has a “choose a Background” ability and the other is not a Background enchantment, and legendary Background enchantments cannot be your commander unless you have also designated a commander with “choose a Background.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Chroma',
    Description: 'Cards with chroma require a count of the number of specific colored mana symbols on cards.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Cipher',
    Description: '“Cipher” means “If this spell is represented by a card, you may exile this card encoded on a creature you control” and “For as long as this card is encoded on that creature, that creature has "Whenever this creature deals combat damage to a player, you may copy the encoded card and you may cast the copy without paying its mana cost."',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Clash',
    Description: 'To clash, a player reveals the top card of their library. That player may then put that card on the bottom of their library.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Cleave',
    Description: '“Cleave [cost]” means “You may cast this spell by paying [cost] rather than paying its mana cost” and “If this spell\'s cleave cost was paid, change its text by removing all text found within square brackets in the spell\'s rules text.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Cohort',
    Description: 'Cohort is an ability word that can be activated by tapping the card with cohort and another creature with the Ally Subtype.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Commander ninjutsu',
    Description: 'Commander ninjutsu is a variant of the ninjutsu ability that also functions while the card with commander ninjutsu is in the command zone. “Commander ninjutsu [cost]” means “[Cost], Reveal this card from your hand or from the command zone, Return an unblocked attacking creature you control to its owner\'s hand: Put this card onto the battlefield tapped and attacking.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Companion',
    Description: 'Companion is a keyword ability that functions outside the game. It\'s written as “Companion—[Condition].” Before the game begins, you may reveal one card you own from outside the game with a companion ability whose condition is fulfilled by your starting deck. Once during the game, any time you have priority and the stack is empty, but only during a main phase of your turn, you may pay {3} and put that card into your hand. This is a special action that doesn\'t use the stack.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Compleated',
    Description: 'If this permanent would enter the battlefield with one or more loyalty counters on it and the player who cast it chose to pay life for any part of its cost represented by Phyrexian mana symbols, it instead enters the battlefield with that many loyalty counters minus two for each of those mana symbols.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Conjure',
    Description: 'Conjure creates a card for you to use that didn\'t exist before. It is not a token or a copy of a spell, but an actual card that can sit in your hand until you are ready to use it. It remains a card even when cast or otherwise changing zones, just like normal cards from the deck.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Connive',
    Description: 'Certain abilities instruct a permanent to connive. To do so, that permanent\'s controller draws a card, then discards a card. If a nonland card is discarded this way, that player puts a +1/+1 counter on the conniving permanent.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Conspire',
    Description: '“Conspire” means “As an additional cost to cast this spell, you may tap two untapped creatures you control that each share a color with it” and “When you cast this spell, if its conspire cost was paid, copy it. If the spell has any targets, you may choose new targets for the copy.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Constellation',
    Description: 'A constellation ability triggers whenever an enchantment enters the battlefield under your control for any reason. Enchantments with other card types, such as enchantment creatures, will also cause constellation abilities to trigger.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Converge',
    Description: 'No description available at this time.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Convert',
    Description: 'If an ability instructs you to convert the permanent, you turn it over so its other face is up. Whichever face is up at the time tells you what that permanent is and what it can do.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Convoke',
    Description: 'Convoke is a static ability that functions while the spell with convoke is on the stack. “Convoke” means “For each colored mana in this spell\'s total cost, you may tap an untapped creature of that color you control rather than pay that mana. For each generic mana in this spell\'s total cost, you may tap an untapped creature you control rather than pay that mana.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Corrupted',
    Description: 'Corrupted is an ability word that gives a card different or additional characteristics if an opponent has three or more Poison counters.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: "Council's dilemma",
    Description: "Council's dilemma calls for all players to vote on an effect.",
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Counter',
    Description: 'To counter a spell or ability means to cancel it, removing it from the stack. It doesn\'t resolve and none of its effects occur. A countered spell is put into its owner\'s graveyard.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Coven',
    Description: 'Coven provides an effect (in spells) or an ability (in permanents) if you control three or more creatures with different powers ("powers" refers to the number before the slash opposite toughness).',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Create',
    Description: 'Create is used when a card or effect puts a token onto the battlefield.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Crew',
    Description: 'Crew is an activated ability of Vehicle cards. “Crew N” means “Tap any number of other untapped creatures you control with total power N or greater: This permanent becomes an artifact creature until end of turn.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Cumulative upkeep',
    Description: 'Cumulative upkeep is a triggered ability that imposes an increasing cost on a permanent. “Cumulative upkeep [cost]” means “At the beginning of your upkeep, if this permanent is on the battlefield, put an age counter on this permanent. Then you may pay [cost] for each age counter on it. If you don\'t, sacrifice it.” If [cost] has choices associated with it, each choice is made separately for each age counter, then either the entire set of costs is paid, or none of them is paid. Partial payments aren\'t allowed.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Cycling',
    Description: 'Cycling is a keyword ability that allows a player to pay a cost that includes discarding the card. When the activated ability resolves, that player draws a card.',
    Example: 'Tap 2 Lands, Discard this card: Search your library for a Plains or Island card, reveal it, put it into your hand, then shuffle your library.)',
  },
  {
    Keyword: 'Dash',
    Description: 'Dash represents three abilities: two static abilities that function while the card with dash is on the stack, one of which may create a delayed triggered ability, and a static ability that functions while the object with dash is on the battlefield. “Dash [cost]” means “You may cast this card by paying [cost] rather than its mana cost,” “If this spell\'s dash cost was paid, return the permanent this spell becomes to its owner\'s hand at the beginning of the next end step,” and “As long as this permanent\'s dash cost was paid, it has haste.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Daybound',
    Description: 'Any time a player controls a permanent with daybound, if it\'s neither day nor night, it becomes day. Daybound is found on the front faces of some transforming double-faced cards and represents three static abilities. “Daybound” means “If it is night and this permanent is represented by a transforming double-faced card, it enters the battlefield transformed,” “As it becomes night, if this permanent is front face up, transform it,” and “This permanent can\'t transform except due to its daybound ability.” If it is day, and the active player of the previous turn cast no spells during their turn, it becomes night.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Deathtouch',
    Description: 'Deathtouch is a static ability that causes any amount of damage dealt by the source to a creature to be lethal damage.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Decayed',
    Description: "Decayed creatures can't block. When they attack, they are sacrificed at the end of combat.",
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Defender',
    Description: "A creature with defender can\t attack.",
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Delirium',
    Description: 'Delirium is an ability word that makes a creature or spell “better” if you have four or more card types in your graveyard.',
    Example: 'Delirium — If there are four or more card types among cards in your graveyard, search the graveyard, hand, and library of that spell\'s controller for any number of cards with the same name as that spell, exile those cards, then that player shuffles their library.',
  },
  {
    Keyword: 'Delve',
    Description: '“Delve” means “For each generic mana in this spell\'s total cost, you may exile a card from your graveyard rather than pay that mana.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Demonstrate',
    Description: 'Demonstrate is a triggered ability. “Demonstrate” means “When you cast this spell, you may copy it and you may choose new targets for the copy. If you copy the spell, choose an opponent. That player copies the spell and may choose new targets for that copy.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Desertwalk',
    Description: 'This creature can\'t be blocked as long as defending player controls a Desert.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Destroy',
    Description: 'When a permanent is destroyed, it is moved from the battlefield to its owner\'s graveyard. It is also the term used for creatures going to the graveyard due to lethal damage.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Detain',
    Description: 'A keyword action that temporarily stops a permanent from attacking, blocking, or having its activated abilities activated.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Dethrone',
    Description: 'A keyword ability that puts a +1/+1 counter on a creature when it attacks the player with the most life.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Devoid',
    Description: 'A characteristic-defining ability that makes an object colorless.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Devour',
    Description: 'A keyword ability that can have a creature enter the battlefield with +1/+1 counters on it. Devour is a static ability. “Devour N” means “As this object enters the battlefield, you may sacrifice any number of creatures. This permanent enters the battlefield with N +1/+1 counters on it for each creature sacrificed this way.”',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Discard',
    Description: 'To discard a card, move it from its owner\'s hand to that player\'s graveyard.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Disturb',
    Description: 'A keyword ability that allows a player to cast a double-faced card transformed from the graveyard',
    Example: 'No example available at this time.',
  },
  {
    Keyword: "Doctor's companion",
    Description: 'Rather than a single legendary creature card, you may designate two legendary creature cards as your Commander if the other is the Doctor. Doctor\'s Companion only works with creatures that are exactly (and not anything in addition to) Time Lord Doctor.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Domain',
    Description: 'Domain is an ability word used on cards that rely on and count the number of different basic land types (zero to five) a player controls.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Double',
    Description: 'Double multiplies certain characteristics or conditions by two.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Double agenda',
    Description: 'A variant of the hidden agenda ability. As you put a conspiracy card with double agenda into the command zone, you secretly name two different cards rather than one.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Double strike',
    Description: 'Double strike allows a creature to deal damage twice in a single attack step by having it deal damage during the first strike phase and the regular damage phase.',
    Example: 'No example available at this time.',
  },
];

// Seed the database
async function seedDatabase() {
  try {
    await MagicWords.deleteMany(); // Clear existing data
    await MagicWords.insertMany(initialData); // Insert new data
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDatabase();
