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
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Absorb',
    Description:
      'A keyword ability that prevents damage.',
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
      'A keyword action that puts +1/+1 counters on a creature that doesn\' have any yet.',
    Example: 'Tap 3 Forest: Adapt 1 (If this creature has no +1/+1 counters on it, put a +1/+1 counter on it.)',
  },
  {
    Keyword: 'Addendum',
    Description: 'Spells with Addendum have additional or alternative effects if you cast the spell during your main phase.',
    Example: 'If you cast this spell during your main phase, you may exile target creature with power 3 or greater until this spell leaves the battlefield.',
  },
  {
    Keyword: 'Affinity',
    Description: 'Affinity is a keyword ability that reduces the mana cost of a spell by the number of permanents of a certain type that the player controls.',
    Example: 'Affinity for artifacts (This spell costs less to cast for each artifact you control.)',
  },
  {
    Keyword: 'Afflict',
    Description: 'Whenever a creature with this ability becomes blocked, defending player loses life equal to the Afflict value. If a creature has multiple instances of afflict, each triggers separately.',
    Example: 'Afflict 1 (Whenever this creature becomes blocked, defending player loses 1 life.)',
  },
  {
    Keyword: 'Afterlife',
    Description: 'Afterlife is a triggered ability and includes a number. When the creature with afterlife dies, it creates that number of 1/1 black and white Spirit creature tokens with flying. Afterlife triggers only when the creature dies, meaning "goes to the graveyard from the battlefield." If it\'s exiled directly from the battlefield or similar, afterlife won\'t trigger. If a permanent has multiple instances of afterlife, each triggers separately.',
    Example: 'Afterlife 1 (When this creature dies, create a 1/1 white and black Spirit creature token with flying.)',
  },
  {
    Keyword: 'Aftermath',
    Description: 'A keyword ability that lets a player cast one half of a split card only from their graveyard.',
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
    Description: 'Assemble is a keyword action in the Unstable set that puts Contraptions onto the battlefield.',
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
  {
    Keyword: 'Dredge',
    Description: 'Dredge is a recursion mechanic, where the owner of a card in a graveyard with Dredge can return the card to their hand by choosing to skip their draw and mill a number of cards.',
    Example: 'Dredge 3 (If you would draw a card, you may mill three cards instead. If you do, return this card from your graveyard to your hand.)',
  },
  {
    Keyword: 'Echo',
    Description: 'Echo is a keyword ability on permanents that requires the permanent\'s controller to pay its echo cost at the beginning of their next upkeep after they gain control of it, or sacrifice it.',
    Example: 'Echo 2 (At the beginning of your upkeep, if this came under your control since the beginning of your last upkeep, sacrifice it unless you pay its echo cost.)',
  },
  {
    Keyword: 'Embalm',
    Description: 'The embalm ability can only be activated if the creature is in your graveyard. When activated, the card is exiled but it creates a token copy of that creature. Moreover, this creature token has three changes: it has no mana cost, it is a zombie in addition to its other creature types, and it becomes a monocolored white creature.',
    Example: 'Tap 1 White (Exile this card from your graveyard: Create a token that\'s a copy of it, except it\'s a white Zombie Cat with no mana cost. Embalm only as a sorcery.)',
  },
  {
    Keyword: 'Emerge',
    Description: 'A keyword ability that lets a player cast a spell for less by sacrificing a creature.',
    Example: 'Tap 9 Forest (You may cast this spell by sacrificing a creature and paying the emerge cost reduced by that creature\'s mana value.)',
  },
  {
    Keyword: 'Eminence',
    Description: 'Eminence gives an advantageous tribal effect whether the creature is played as a commander or as a creature.',
    Example: 'Eminence — As long as The Ur-Dragon is in the command zone or on the battlefield, other Dragon spells you cast cost 1 less to cast.',
  },
  {
    Keyword: 'Enchant',
    Description: 'Enchant is a keyword ability that restricts what an Aura can target and be attached to. Aura is an enchantment type.',
    Example: 'Enchant artifact At the beginning of the upkeep of enchanted artifact\'s controller, Warp Artifact deals 1 damage to that player.',
  },
  {
    Keyword: 'Encore',
    Description: 'Encore is an activated ability that can be activated only if the creature card that has it is in your graveyard. You can pay a creature\'s encore cost and exile it from your graveyard to create a number of token copies of it equal to your number of opponents. Each of those tokens has haste, must attack that player, and is sacrificed during the end step.',
    Example: 'Encore 3 (Exile this card from your graveyard: For each opponent, create a token copy that attacks that opponent this turn if able. They gain haste. Sacrifice them at the beginning of the next end step. Activate only as a sorcery.)',
  },
  {
    Keyword: 'Enlist',
    Description: 'Enlist represents an optional cost to attack. As you attack with a creature with enlist, you can tap a different untapped creature you control that isn\'t attacking. When you enlist a creature, the attacking creature that has the enlist ability gets +X/+0 until end of turn, where X is the power of the enlisted creature.',
    Example: 'Enlist (As this creature attacks, you may tap a nonattacking creature you control without summoning sickness. When you do, add its power to this creature\'s until end of turn.)',
  },
  {
    Keyword: 'Enrage',
    Description: 'Enrage gives an advantageous effect when the creature with the ability is dealt damage. It appears in red, white, and green.',
    Example: 'Enrage — Whenever Ripjaw Raptor is dealt damage, draw a card.',
  },
  {
    Keyword: 'Entwine',
    Description: 'As you cast a spell with entwine, if you pay the additional entwine cost, instead of choosing only one of the modes of the spell, you choose all of them. In all cases but one, this is two options, and hence the reminder uses "both".',
    Example: 'Entwine — Sacrifice three lands. (Choose both if you pay the entwine cost.)',
  },
  {
    Keyword: 'Epic',
    Description: 'An epic spell is copied in its controller\'s upkeep on every turn for the rest of the game. If it has any targets, the player may choose new targets for the copy. In exchange for this powerful ability, the player can\'t cast spells for the rest of the game.',
    Example: 'Epic (For the rest of the game, you can\'t cast spells. At the beginning of each of your upkeeps, copy this spell except for its epic ability.)',
  },
  {
    Keyword: 'Equip',
    Description: 'Equip is a keyword ability found on artifacts with the subtype "Equipment." By paying the equip cost, you can attach the artifact to a creature you control, which is referred to in the text as the "equipped creature." Equipping can only be activated at sorcery speed. When an equipped creature leaves the battlefield, unlike Auras, the equipment remains on the battlefield.',
    Example: 'Equip 2 (Equipped creature can\'t be blocked and has shroud. (It can\'t be the target of spells or abilities.))',
  },
  {
    Keyword: 'Escalate',
    Description: 'By paying the escalate cost, additional modes may be activated.',
    Example: 'Escalate 2 (Pay this cost for each mode chosen beyond the first.) Target player gains 4 life. Untap up to two target creatures. Target opponent sacrifices an attacking creature.',
  },
  {
    Keyword: 'Escape',
    Description: 'Spells with escape can be cast from the graveyard for their escape cost. The cost includes exiling a number of other cards from the graveyard. If a creature escapes, it may receive an additional bonus.',
    Example: 'Escape 3. Exile four other cards from your graveyard (You may cast this card from your graveyard for its escape cost.)',
  },
  {
    Keyword: 'Eternalize',
    Description: 'The eternalize ability only can be activated if the creature is in your graveyard. When activated, the card is exiled but it creates a token copy of that creature. Moreover, this creature token has four changes: its power and toughness becomes 4/4, it has no mana cost, it is a zombie in addition to its other creature types, and it becomes a monocolored black creature.',
    Example: 'Eternalize 6 (Exile this card from your graveyard: Create a token that\'s a copy of it, except it\'s a 4/4 black Zombie Cat with no mana cost. Eternalize only as a sorcery.)',
  },
  {
    Keyword: 'Evoke',
    Description: 'Evoke is a keyword ability that allows a player to pay an alternative cost for a creature spell that possesses this ability; however, if the evoke cost is paid, the creature is sacrificed when it enters the battlefield.',
    Example: 'When Wispmare enters the battlefield, destroy target enchantment. Evoke 1 (You may cast this spell for its evoke cost. If you do, it\'s sacrificed when it enters the battlefield.)',
  },
  {
    Keyword: 'Evolve',
    Description: 'A creature with evolve gains additional +1/+1 counters whenever another, bigger creature enters the battlefield under the same player\'s control.',
    Example: 'Evolve (Whenever a creature enters the battlefield under your control, if that creature has greater power or toughness than this creature, put a +1/+1 counter on this creature.) Whenever a +1/+1 counter is placed on Fathom Mage, you may draw a card.',
  },
  {
    Keyword: 'Exalted',
    Description: 'Whenever a creature you control attacks alone, that creature gets +1/+1 until end of turn for each instance of exalted on the battlefield under your control.',
    Example: 'Exalted (Whenever a creature you control attacks alone, that creature gets +1/+1 until end of turn.)',
  },
  {
    Keyword: 'Exchange',
    Description: 'To swap two things, such as objects, sets of objects, or life totals.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Exert',
    Description: 'When a creature with the exert ability is exerted, then an ability is triggered and the creature doesn\'t untap at the beginning of its controller\'s next untap step.',
    Example: 'You may exert Glory-Bound Initiate as it attacks. When you do, it gets +1/+3 and gains lifelink until end of turn. (An exerted creature won\'t untap during your next untap step.)',
  },
  {
    Keyword: 'Exile',
    Description: 'The exile zone is essentially a holding area for objects. Some spells and abilities exile an object without any way to return that object to another zone. Other spells and abilities exile an object only temporarily.',
    Example: 'Exile target nonwhite attacking creature. You gain life equal to its toughness.',
  },
  {
    Keyword: 'Exploit',
    Description: 'When a creature with exploit enters the battlefield, the player may sacrifice a creature. Each creature with exploit has another ability that gives the player a benefit when it "exploits a creature." This means when the player sacrificed a creature because of its exploit ability.',
    Example: 'Exploit (When this creature enters the battlefield, you may sacrifice a creature.) When Silumgar Butcher exploits a creature, target creature gets -3/-3 until end of turn.',
  },
  {
    Keyword: 'Explore',
    Description: 'If a creature you control explores, you reveal the top card of your library. If the revealed card is a land, representing your creature finding some new territory you can check out, put that card into your hand. If it\'s not a land card, your creature comes back empty-handed but still benefits from the attempt.',
    Example: 'When Tishana\'s Wayfinder enters the battlefield, it explores. (Reveal the top card of your library. Put that card into your hand if it\'s a land. Otherwise put a +1/+1 counter on this creature, then put the card back or put it into your graveyard.)',
  },
  {
    Keyword: 'Extort',
    Description: 'Extort allows players to pay additional energy for spells they cast and create a small life-draining effect.',
    Example: 'Extort (Whenever you cast a spell, you may pay 1. If you do, each opponent loses 1 life and you gain that much life.)',
  },
  {
    Keyword: 'Fabricate',
    Description: 'The fabricate ability triggers when the creature enters the battlefield, but you don\'t choose counters or tokens until that ability resolves. That means your opponent will have an opportunity to respond to the ability before you make that choice and before the +1/+1 counters or Servo tokens exist. If the creature with fabricate isn\'t on the battlefield as the fabricate ability resolves, you must choose to create the Servo tokens.',
    Example: 'Fabricate N (When this permanent enters the battlefield, you may put N +1/+1 counters on it. If you don\'t, create N 1/1 colorless Servo artifact creature tokens.)',
  },
  {
    Keyword: 'Fading',
    Description: 'During each of its controller\'s upkeeps, that player removes one fade counter from the permanent. If the player cannot remove a fade counter, they must sacrifice the permanent. This acts as a countdown to destroying the permanent on the player\'s next turn after the countdown reaches zero, which players found unintuitive.',
    Example: 'Fading 3 (This creature enters the battlefield with three fade counters on it. At the beginning of your upkeep, remove a fade counter from it. If you can\'t, sacrifice it.)',
  },
  {
    Keyword: 'Fateful hour',
    Description: 'Fateful hour abilities work as long as you have 5 life or less. As soon as your life total drops to 5 or less, they immediately kick in. As soon as your life total becomes 6 or higher, fateful hour abilities stop working.',
    Example: 'Creatures you control get +1/+1 until end of turn. Fateful hour — If you have 5 or less life, those creatures gain indestructible until end of turn. (Damage and effects that say "destroy" don\'t destroy them.)',
  },
  {
    Keyword: 'Fateseal',
    Description: 'Fateseal is a keyword action similar to scry. The only difference between them is that when you scry, you affect your own library, and when you fateseal, you affect an opponent\'s library.',
    Example: 'All Slivers have "When this permanent comes into play, fateseal 1." (To fateseal 1, its controller looks at the top card of an opponent\'s library, then they may put that card on the bottom of that library.)',
  },
  {
    Keyword: 'Fear',
    Description: 'Fear is a keyword ability found primarily on black creatures. It is an evasion ability that allows a creature to only be blocked by black or artifact creatures.',
    Example: 'Fear (This creature can\'t be blocked except by artifact creatures and/or black creatures.)',
  },
  {
    Keyword: 'Ferocious',
    Description: 'Ferocious triggers an advantage for the player if they control a creature with power 4 or greater. It could appear on any card type, though it has yet to appear on artifacts (or battles, due to recency).',
    Example: 'Ferocious — Whenever Heir of the Wilds attacks, if you control a creature with power 4 or greater, Heir of the Wilds gets +1/+1 until end of turn.',
  },
  {
    Keyword: 'Fight',
    Description: 'When two creatures fight, each deals damage equal to its power to the other.',
    Example: 'Target creature fights another target creature. (Each deals damage equal to its power to the other.)',
  },
  {
    Keyword: 'First strike',
    Description: 'A creature with first strike deals combat damage before creatures without first strike. The ability usually represents a creature\'s exceptional speed or skill; or possession of long range weapons, such as spears, lances, or bows. The most common creature types to have first strike are Knights and Soldiers.',
    Example: 'First strike (This creature deals combat damage before creatures without first strike.)',
  },
  {
    Keyword: 'Flanking',
    Description: 'Flanking is a triggered ability that triggers during the declare blockers step. It checks if the creature without flanking is blocking a creature with flanking. If it is, the creature without flanking gets -1/-1 until end of turn.',
    Example: 'Flanking (Whenever a creature without flanking blocks this creature, the blocking creature gets -1/-1 until end of turn.)',
  },
  {
    Keyword: 'Flash',
    Description: 'Flash is a static ability that functions in any zone from which you could play the card it\'s on. It lets a player play a card any time they could cast an instant.',
    Example: 'Flash (You may cast this spell any time you could cast an instant.)',
  },
  {
    Keyword: 'Flashback',
    Description: 'Flashback is a keyword ability on instants and sorceries that allows the player to pay an alternative cost to cast the spell directly from their graveyard. The spell card is exiled when the spell leaves the stack.',
    Example: 'Destroy target enchantment. Flashback 1 Forest (You may cast this card from your graveyard for its flashback cost. Then exile it.)',
  },
  {
    Keyword: 'Flying',
    Description: 'Flying is an evergreen evasion ability that makes creatures without flying unable to block creatures with flying. It has been in Magic since the original Alpha set.',
    Example: 'Flying (This creature can\'t be blocked except by creatures with flying or reach.)',
  },
  {
    Keyword: 'Food',
    Description: 'A Food token is a colorless artifact token with “2, Tap, Sacrifice this artifact: You gain 3 life.”',
    Example: 'Tap 2 Energy, Sacrifice this artifact: You gain 3 life.',
  },
  {
    Keyword: 'For Mirrodin!',
    Description: 'When a card with For Mirrodin! enters the battlefield, it creates a 2/2 red Rebel creature token and attaches itself to it.',
    Example: 'For mirrodin! (When this Equipment enters the battlefield, create a 2/2 red Rebel creature token, then attach this to it.)',
  },
  {
    Keyword: 'Forecast',
    Description: 'Forecast is an activated ability that a player can only use when the card is in their hand, and only during their upkeep. What the individual card does is usually related to what it does normally, either a scaled-down effect of the spell, or something that supports the spell once it\'s cast.',
    Example: 'Forecast - Tap 3 Water, Reveal Pride of the Clouds from your hand: Create a 1/1 white and blue Bird creature token with flying. (Activate this ability only during your upkeep and only once each turn.)',
  },
  {
    Keyword: 'Forestcycling',
    Description: 'Forestcycling is a variant of the cycling ability. Unlike cycling (which allows you to draw a card), forestcycling allows you to search your library for a Forest card. The card you find can be a basic Forest or any land card with the Forest land type.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Forestwalk',
    Description: 'See Landwalk.',
    Example: 'This creature can\'t be blocked as long as defending player controls a Forest.',
  },
  {
    Keyword: 'Foretell',
    Description: 'During your turn, you may pay 2 and exile a card with foretell from your hand face down. You may cast it on a later turn for its foretell cost (the mana cost listed as part of the foretell keyword). Foretelling is optional, so you can always cast the spell as normal if you want a more immediate impact.',
    Example: 'Foretell Tap 2 Forest (During your turn, you may pay 2 and exile this card from your hand face down. Cast it on a later turn for its foretell cost.)',
  },
  {
    Keyword: 'Formidable',
    Description: 'Some formidable abilities are activated abilities that require creatures you control to have a total power of 8 or greater. Once you activate these abilities, it doesn\'t matter what happens to the total power of creatures you control. Other formidable abilities are triggered abilities with an “intervening if” clause. Such abilities check the total power of creatures you control twice: once at the appropriate time to see if the ability will trigger, and again as the ability tries to resolve. If at that time, the total power of creatures you control is no longer 8 or greater, the ability will have no effect.',
    Example: 'Formidable — When Stampeding Elk Herd attacks, if creatures you control have total power 8 or greater, creatures you control gain trample until end of turn.',
  },
  {
    Keyword: 'Fortify',
    Description: 'Fortify is a keyword ability that appears on Fortifications. It\'s exactly the same as equip, except that it affects a land instead of a creature.',
    Example: 'Fortify Tap 3 (Attach to target land you control. Fortify only as a sorcery. This card enters the battlefield unattached and stays on the battlefield if the land leaves.)',
  },
  {
    Keyword: 'Frenzy',
    Description: 'A keyword ability that can make a creature better in combat. If a creature has multiple instances of frenzy, each triggers separately.',
    Example: 'All Sliver creatures have frenzy 1. (Whenever a Sliver attacks and isn\'t blocked, it gets +1/+0 until end of turn.)',
  },
  {
    Keyword: 'Friends forever',
    Description: '“Friends forever” is a variant of the partner ability. Friends forever modifies the rules for deck construction in the Commander variant, and it functions before the game begins. Rather than a single legendary creature card, you may designate two legendary creature cards as your commander if each has “friends forever.”',
    Example: 'Friends forever (You can have two commanders if both have friends forever.)',
  },
  {
    Keyword: 'Fuse',
    Description: 'Fuse is a static ability found on some split cards that applies while the card with fuse is in a player’s hand. If a player casts a split card with fuse from their hand, the player may choose to cast both halves of that split card rather than choose one half. This choice is made before putting the split card with fuse onto the stack. The resulting spell is a fused split spell.',
    Example: 'Fuse (You may cast one or both halves from your hand.)',
  },
  {
    Keyword: 'Goad',
    Description: 'Goad causes a creature to be goaded until a player\'s next turn. A goaded creature has to attack a player (not a planeswalker or battle) other than you if it can. If the creature can\'t attack a player other than you, then it must attack you or a planeswalker if it can. This is most likely when the game is down to two players. The controller of a goaded creature still chooses who the creature attacks.',
    Example: 'When Jeering Homunculus enters the battlefield, you may goad target creature. (Until your next turn, that creature attacks each combat if able and attacks a player other than you if able.)',
  },
  {
    Keyword: 'Graft',
    Description: 'Graft represents both a static ability and a triggered ability. “Graft N” means “This permanent enters the battlefield with N +1/+1 counters on it” and “Whenever another creature enters the battlefield, if this permanent has a +1/+1 counter on it, you may move a +1/+1 counter from this permanent onto that creature.” If a permanent has multiple instances of graft, each one works separately.',
    Example: 'Graft 3 (This creature enters the battlefield with three +1/+1 counters on it. Whenever another creature enters the battlefield, you may move a +1/+1 counter from this creature onto it.)',
  },
  {
    Keyword: 'Grandeur',
    Description: 'The grandeur ability can be activated only while the creature that has it is on the battlefield. To activate the ability, a different card with the same name must be discarded.',
    Example: 'Grandeur — Discard another card named Tarox Bladewing: Tarox Bladewing gets +X/+X until end of turn, where X is its power.',
  },
  {
    Keyword: 'Gravestorm',
    Description: 'Gravestorm is a triggered keyword ability. It\'s similar to storm, except that instead of counting the number of spells casted that turn, it counts the number of permanents put into a graveyard from the battlefield that turn.',
    Example: 'Gravestorm (When you cast this spell, copy it for each permanent put into a graveyard this turn. You may choose new targets for the copies.)',
  },
  {
    Keyword: 'Haste',
    Description: 'Haste is a keyword ability that allows a creature to circumvent summoning sickness. Creatures with haste can attack or use activated abilities with the Tap or Untap symbol in the activation cost even if they have not been continuously controlled by a player since the beginning of that player\'s most recent turn.',
    Example: 'Haste (This creature can attack and Tap as soon as it comes under your control.)',
  },
  {
    Keyword: 'Haunt',
    Description: 'Haunt works by allowing a permanent\'s "enters the battlefield"-ability (ETB) or spell effect to go off twice. It allows a card to be exiled from a graveyard "haunting" a creature, and when that creature dies, a triggered ability of the haunting card is put on the stack and allows a second usage of the card.',
    Example: 'Haunt (When this creature dies, exile it haunting target creature.) When this card comes into play or the creature it haunts is put into a graveyard, target player loses 2 life and you gain 2 life.',
  },
  {
    Keyword: 'Hellbent',
    Description: 'Hellbent is an ability word that indicates that a card is better if its controller has no cards in their hand.',
    Example: 'Hellbent — Demon\'s Jester gets +2/+1 as long as you have no cards in hand.',
  },
  {
    Keyword: 'Heroic',
    Description: 'A creature with heroic gives the controlling player powerful benefits every time they cast a spell that targets it.',
    Example: 'Heroic — Whenever you cast a spell that targets Favored Hoplite, put a +1/+1 counter on Favored Hoplite and prevent all damage that would be dealt to it this turn.',
  },
  {
    Keyword: 'Hero\'s Reward',
    Description: 'A Hero\'s Reward offers a boon when the card leaves the battlefield or when it is put into the graveyard from anywhere.',
    Example: 'Hero\'s Reward — When Snapping Fang Head leaves the battlefield, each player gains 4 life and draws a card.',
  },
  {
    Keyword: 'Hexproof',
    Description: 'Hexproof is an evergreen keyword ability that prevents a permanent or player from being the target of spells or abilities played by opponents.',
    Example: 'Hexproof (This creature can\'t be the target of spells or abilities your opponents control.)',
  },
  {
    Keyword: 'Hexproof from',
    Description: 'Introduced in the 78th expansion pack, "hexproof from [quality]" as a variant of the hexproof ability. For example, "hexproof from black" means "this permanent can\'t be the target of black spells your opponents control or abilities of black sources your opponents control."',
    Example: 'Hexproof from black (This creature can\'t be the target of black spells or abilities your opponents control.)',
  },
  {
    Keyword: 'Hidden agenda',
    Description: 'Hidden agenda is a static ability that functions as a conspiracy card with hidden agenda is put into the command zone. It allows you to secretly choose a card name, and creatures you control with the chosen name have haste.',
    Example: 'Hidden agenda (Start the game with this conspiracy face down in the command zone and secretly name a card. You may turn this conspiracy face up any time and reveal the chosen name.) Creatures you control with the chosen name have haste.',
  },
  {
    Keyword: 'Hideaway',
    Description: 'When a permanent enters the battlefield, at that time, you may look at the top N cards of your library, exile one face down, then put the rest on the bottom of your library in a random order. Usually, a second ability on each card interacts with the exiled card when certain conditions are met.',
    Example: 'Hideaway 4 (When this land enters the battlefield, look at the top four cards of your library, exile one face down, then put the rest on the bottom of your library.) When this card leaves the battlefield, put the exiled card into its owner\'s hand.',
  },
  {
    Keyword: 'Horsemanship',
    Description: 'Horsemanship is a keyword ability on creatures that serves as an evasion ability. Attacking creatures with horsemanship cannot be blocked by creatures without horsemanship.',
    Example: 'Horsemanship (This creature can\'t be blocked except by creatures with horsemanship.)',
  },
  {
    Keyword: 'Imprint',
    Description: 'Some abilities associated with the imprint ability word are triggered, commonly by entering the battlefield; and some are activated abilities, but both exile cards from some zone. All cards with imprint are permanents, and all have a second ability that refers to the exiled card in some respect.',
    Example: 'Imprint — When Phyrexian Ingester enters the battlefield, you may exile target nontoken creature. Phyrexian Ingester gets +X/+Y, where X is the exiled creature card\'s power and Y is its toughness.',
  },
  {
    Keyword: 'Improvise',
    Description: 'It allows a player to tap artifacts rather than pay some of the mana cost of a spell. Each artifact tapped after activating mana abilities pays for 1 energy.',
    Example: 'Improvise (Your artifacts can help cast this spell. Each artifact you tap after you\'re done activating mana abilities pays for 1.)',
  },
  {
    Keyword: 'Incubate',
    Description: 'A keyword action that creates an Incubator token with a specified number of +1/+1 counters on it.',
    Example: 'Target opponent reveals their hand. You may choose a creature or battle card from it. If you do, that player discards that card. If you don\'t, incubate 3. (Create an Incubator token with three +1/+1 counters on it and “Pay 2: Transform this artifact.” It transforms into a 0/0 Phyrexian artifact creature.)',
  },
  {
    Keyword: 'Indestructible',
    Description: 'Indestructible is an evergreen keyword ability. Indestructible permanents can\'t be destroyed by rules or effects. They can still be put into their owner\'s graveyard by other means.',
    Example: 'Indestructible (Effects that say "destroy" don\'t destroy this artifact.)',
  },
  {
    Keyword: 'Infect',
    Description: 'A creature with infect deals damage to creatures in the form of -1/-1 counters and players in the form of poison counters. If a player has ten or more poison counters, they lose the game. In Two-Headed Giant, it\'s fifteen or more.',
    Example: 'Infect (This creature deals damage to creatures in the form of -1/-1 counters and to players in the form of poison counters.)',
  },
  {
    Keyword: 'Ingest',
    Description: 'Ingest is a keyword ability that triggers when a creature with ingest deals combat damage to a player. That player exiles the top card of their library.',
    Example: 'Ingest (Whenever this creature deals combat damage to a player, that player exiles the top card of their library.)',
  },
  {
    Keyword: 'Inspired',
    Description: 'Whenever an inspired creature becomes untapped, it does something. Inspired abilities trigger no matter how the creature becomes untapped: by the turn-based action at the beginning of the untap step or by a spell or ability.',
    Example: 'Inspired — Whenever Pheres-Band Tromper becomes untapped, put a +1/+1 counter on it.',
  },
  {
    Keyword: 'Intensity',
    Description: 'Intensity is a card designation that starts at a certain value ("Starting Intensity") and will perpetually change based on the card\'s rules text.',
    Example: '"Starting Intensity 1: Whenever Bellowsbreath Ogre attacks, it deals damage equal to its intensity to any target, then perpetually increase its intensity by 1."',
  },
  {
    Keyword: 'Intimidate',
    Description: 'A creature with intimidate can\'t be blocked except by artifact creatures and/or creatures that share a color with it.',
    Example: 'Intimidate (This creature can\'t be blocked except by artifact creatures and/or creatures that share a color with it.)',
  },
  {
    Keyword: 'Investigate',
    Description: 'To investigate, you create a Clue token. Clues are colorless artifacts, which have the ability "Pay 2, Sacrifice this artifact: Draw a card."',
    Example: 'Investigate. (Create a colorless Clue artifact token with "2, Sacrifice this artifact: Draw a card.")',
  },
  {
    Keyword: 'Islandcycling',
    Description: 'Islandcycling is a variant of the cycling ability. Unlike cycling (which allows you to draw a card), islandcycling allows you to search your library for an Island card. The card you find can be a basic Island or any land card with the Island land type.',
    Example: 'Plainscycling 2, islandcycling 2 (2, Discard this card: Search your library for a Plains or Island card, reveal it, put it into your hand, then shuffle your library.)',
  },
  {
    Keyword: 'Islandwalk',
    Description: 'See Landwalk. This creature can\'t be blocked as long as defending player controls an Island.',
    Example: 'Islandwalk (This creature can\'t be blocked as long as defending player controls an Island.)',
  },
  {
    Keyword: 'Join forces',
    Description: 'Join forces allows multiple players to pay mana to increase the effectiveness of the same card. All join forces cards included in the set have symmetric effects that benefit all players equally.',
    Example: 'Join forces — Starting with you, each player may pay any amount of mana. Each player puts the top X cards of their library into their graveyard, where X is the total amount of mana paid this way.',
  },
  {
    Keyword: 'Jump-start',
    Description: 'Jump-start is a keyword ability on instants and sorceries that allows the player to cast a spell from their graveyard for the additional cost of discarding a card.',
    Example: 'Jump-start (You may cast this card from your graveyard by discarding a card in addition to paying its other costs. Then exile this card.)',
  },
  {
    Keyword: 'Kicker',
    Description: 'Kicker is a keyword ability that allows the player to pay an optional cost when casting a spell to achieve an additional effect.',
    Example: 'Multikicker 1 Red (You may pay an additional 1 Red any number of times as you cast this spell.) Skitter of Lizards enters the battlefield with a +1/+1 counter on it for each time it was kicked.',
  },
  {
    Keyword: 'Kinfall',
    Description: 'Kinfall is a mix-up of the Kinship and Landfall abilities. Whenever a creature enters the battlefield under your control, if it shares a creature type with the creature with Kinfall, a certain action may be performed.',
    Example: 'Kinfall — Whenever a creature enters the battlefield under your control, if it shares a creature type with Plane-Merge Elf, creatures you control get +1/+1 until end of turn.',
  },
  {
    Keyword: 'Kinship',
    Description: 'Kinship is an ability word that indicates a group of similar triggered abilities that appear on Morningtide creatures. Each of them works the same way except for the bonus you might get.',
    Example: 'Kinship — At the beginning of your upkeep, you may look at the top card of your library. If it shares a creature type with Wandering Graybeard, you may reveal it. If you do, you gain 4 life.',
  },
  {
    Keyword: 'Landcycling',
    Description: 'Unlike the normal cycling ability, basic landcycling doesn\'t allow you to draw a card. Instead, it lets you search your library for a basic land card. The card you find can be a basic Island or any land card with the Island land type.',
    Example: 'Islandwalk (This creature can\'t be blocked as long as defending player controls an Island.)',
  },
  {
    Keyword: 'Landfall',
    Description: 'The landfall ability word rewards a player each time a land enters the battlefield under their control. Generally being a sorcery-speed action means most landfall abilities are geared toward proactive gameplay (usually attacking) and incentivize playing more lands, even in aggressive decks.',
    Example: 'Landfall — Whenever a land enters the battlefield under your control, Plated Geopede gets +2/+2 until end of turn.',
  },
  {
    Keyword: 'Landship',
    Description: 'Landship is a mix-up of the Landfall and Kinship abilities. At the beginning of your upkeep, you may look at the top card of your library. If it\'s a land, you may reveal it. If you do, you can perform a certain action.',
    Example: 'Landship — At the beginning of your upkeep, you may look at the top card of your library. If it\'s a land, you may reveal it. If you do, create a 1/1 green Elf Warrior creature token.',
  },
  {
    Keyword: 'Landwalk',
    Description: 'Landwalk is a generic term that appears within an object\'s rules text as “[type]walk,” where [type] is usually a land type, but it can also be the card type land plus any combination of land types, card types, and/or supertypes. A creature with landwalk can\'t be blocked as long as the defending player controls at least one land with the specified land type, type, or supertype.',
    Example: 'Islandwalk (This creature can\'t be blocked as long as defending player controls an Island.)',
  },
  {
    Keyword: 'Learn',
    Description: 'If spell or ability instructs you to learn, you may do nothing or do one of the two following choices. Your first choice is that you can discard a card and then draw a card. Your second choice is to reveal a Lesson card from outside the game and put it into your hand.',
    Example: 'Learn. (You may reveal a Lesson card you own from outside the game and put it into your hand, or discard a card to draw a card.)',
  },
  {
    Keyword: 'Legacy',
    Description: 'Legacy is an eternal format alongside Vintage. Since Vintage demands hard-to-acquire cards (e.g.: Black Lotus), Legacy became the most popular of the two for being less restrictive for new players to join.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Legendary landwalk',
    Description: 'See Landwalk.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Level Up',
    Description: 'The ability can only be activated anytime the player could cast a sorcery. When the ability resolves, a level counter is put on the creature, and its level is considered to be the number of level counters on the card.',
    Example: 'Level up 2 G (2G: Put a level counter on this. Level up only as a sorcery.) LEVEL 1-3: 4/4, LEVEL 4+: 6/6, Trample',
  },
  {
    Keyword: 'Lieutenant',
    Description: 'Sometimes, highly competitive Commander players choose their commanders mostly for color identity, without the intent of building their decks around them. A creature with lieutenant gets (or grants) a bonus as long as you control your commander. Lieutenant is meant as a reward for players who intend to cast their commanders and try to keep them on the battlefield.',
    Example: 'Lieutenant — As long as you control your commander, Angelic Field Marshal gets +2/+2 and creatures you control have vigilance.',
  },
  {
    Keyword: 'Lifelink',
    Description: 'Damage dealt by a source with lifelink causes that source\'s controller, or its owner if it has no controller, to gain that much life (in addition to any other results that damage causes).',
    Example: 'Lifelink (Damage dealt by this creature also causes you to gain that much life.)',
  },
  {
    Keyword: 'Living metal',
    Description: 'Living Metal makes all Transformers in vehicle mode also count as a creature and does not require it to be crewed.',
    Example: 'Living Metal (As long as it\'s your turn, this Vehicle is also a creature).',
  },
  {
    Keyword: 'Living weapon',
    Description: 'When a card with Living weapon enters the battlefield, it creates a 0/0 black Phyrexian Germ creature token and attaches itself to it. Thus Living weapons are themselves creatures until they die or their controller chooses to upgrade a different creature, with the detaching of the equipment and killing the Germ, as it is now a 0/0 creature. Due to state-based effects it is put into the graveyard and ceases to exist.',
    Example: 'Living weapon (When this Equipment enters the battlefield, put a 0/0 black Phyrexian Germ creature token onto the battlefield, then attach this to it.)',
  },
  {
    Keyword: 'Madness',
    Description: 'Madness is a keyword ability on spells that allows a player to cast that spell for an alternate cost if the card is discarded.',
    Example: 'Madness 1 Swamp (If you discard this card, you may cast it for its madness cost instead of putting it into your graveyard.)',
  },
  {
    Keyword: 'Magecraft',
    Description: 'Each magecraft ability has a different effect, although they all have the same trigger condition, whenever you cast or copy an instant or sorcery spell.',
    Example: 'Magecraft — Whenever you cast or copy an instant or sorcery spell, each opponent loses 2 life and you gain 2 life.',
  },
  {
    Keyword: 'Manifest',
    Description: 'To manifest a card, turn it face down. It becomes a 2/2 face-down creature card with no text, no name, no subtypes, and no mana cost. Put that card onto the battlefield face down. That permanent is a manifested permanent as long as it remains face down. The effect defining its characteristics works while the card is face down and ends when it\'s turned face up.',
    Example: 'Manifest the top card of your library. (Put it on the battlefield face down as a 2/2 creature. Turn it face up any time for its mana cost if it\'s a creature card.)',
  },
  {
    Keyword: 'Megamorph',
    Description: 'Megamorph creatures are basically morph creatures with one extra bonus. Turning them face-up by paying their megamorph cost puts a +1/+1 counter on the creature. Often the cards have an additional beneficial effect that is only activated when the megamorph cost has been paid.',
    Example: 'Megamorph Tap 7 Plains (You may cast this card face down as a 2/2 creature for 3. Turn it face up at any time for its megamorph cost and put a +1/+1 counter on it.) When Shieldhide Dragon is turned face up, put a +1/+1 counter on each other Dragon creature you control.',
  },
  {
    Keyword: 'Meld',
    Description: 'A melded card is a single permanent represented by two cards. If it is one creature, it behaves as any other creature does. It can attack and block, has abilities, can be enchanted or equipped, or have counters put on it. A single spell that says "Destroy target creature" will destroy the whole permanent.',
    Example: 'Tap 7: If you both own and control Urza, Lord Protector and an artifact named The Mightstone and Weakstone, exile them, then meld them into Urza, Planeswalker, Activate only as a sorcery.',
  },
  {
    Keyword: 'Melee',
    Description: 'Melee is a triggered keyword ability that makes creatures bigger if they attack.',
    Example: 'Melee (Whenever this creature attacks, it gets +1/+1 until end of turn for each opponent you attacked with a creature this combat.)',
  },
  {
    Keyword: 'Menace',
    Description: 'Menace is an evergreen keyword ability. Creatures with menace can\'t be blocked except by two or more creatures.',
    Example: 'Menace (This creature can\'t be blocked except by two or more creatures.)',
  },
  {
    Keyword: 'Mentor',
    Description: 'Mentor can only be found on creatures. When a creature with Mentor attacks, you may place a +1/+1 counter on an attacking creature with lesser power.',
    Example: 'Mentor (Whenever this creature attacks, put a +1/+1 counter on target attacking creature with lesser power.)',
  },
  {
    Keyword: 'Metalcraft',
    Description: 'Metalcraft gives a bonus to a permanent or a spell if its controller also controls three or more artifacts.',
    Example: 'Metalcraft — As long as you control three or more artifacts, Auriok Sunchaser gets +2/+2 and has flying.',
  },
  {
    Keyword: 'Mill',
    Description: 'Mill is a keyword action used in Magic to describe the action of a player taking cards from the top of their library and putting them into their graveyard. Milling is a strategy some decks use which takes advantage of the decking rule.',
    Example: 'Target creature gets -3/-3 until end of turn. Target player mills three cards. You gain 3 life.',
  },
  {
    Keyword: 'Miracle',
    Description: 'Miracle provides an alternative cost for a card which can be used while drawing it if it is the first card drawn during a turn. The timing of casting it is similar to the timing of casting cards with Madness. If a player intends to cast a card for its miracle cost, the card must be revealed immediately.',
    Example: 'Miracle Tap 1 Plains (You may cast this card for its Miracle cost when you draw it if it\'s the first card you drew this turn.)',
  },
  {
    Keyword: 'Modular',
    Description: 'Modular is a keyword ability that causes a permanent to enter the battlefield with a number of +1/+1 counters. When that permanent dies, its controller may put a +1/+1 counter onto an artifact creature for each +1/+1 counter the permanent had on it when it died.',
    Example: 'Modular 3 (This enters the battlefield with three +1/+1 counters on it. When it dies, you may put its +1/+1 counters on target artifact creature.)',
  },
  {
    Keyword: 'Monstrosity',
    Description: 'Monstrosity is an activated ability you can activate any time you can pay for it. When it resolves, it checks whether the creature is already monstrous. If it\'s not, the ability puts a number of +1/+1 counters on the creature and causes the creature to become monstrous.',
    Example: 'Tap 8 Mountain: Monstrosity 3 (If this creature isn\'t monstrous, put 3 +1/+1 counters on it and it becomes monstrous.) When Stoneshock Giant becomes monstrous, creatures without flying your opponents control can\'t block this turn.',
  },
  {
    Keyword: 'Morbid',
    Description: 'Morbid is an ability word introduced in Innistrad. It signals that a spell or ability has different effects, additional effects, or may only be used if a creature has died earlier in the same turn.',
    Example: 'Morbid — When Hollowhenge Scavenger enters the battlefield, if a creature died this turn, you gain 5 life.',
  },
  {
    Keyword: 'More Than Meets the Eye',
    Description: 'More Than Meets the Eye is a way to combine modal double-faced cards with transforming double-faced cards. It is an alternative cost that lets the caster cast the converted side. A keyword was needed because the rules couldn\'t handle both.',
    Example: 'More Than Meets the Eye Tap 2 Black (You may cast this card converted for 2 Black)',
  },
  {
    Keyword: 'Morph',
    Description: 'Morph is a keyword ability on permanents that allows the player to pay 3 to cast a card with the ability face down as a 2/2 colorless, typeless creature. The player can then turn that creature face-up at any time they could cast an instant by paying a variable Morph cost printed on each card.',
    Example: 'Morph 1 Island (You may cast this face down as a 2/2 creature for 3. Turn it face up any time for its morph cost.)',
  },
  {
    Keyword: 'Mountaincycling',
    Description: 'Mountaincycling is a variant of the cycling ability. Unlike cycling (which allows you to draw a card), mountaincycling allows you to search your library for a Mountain card. The card you find can be a basic Mountain or any land card with the Mountain land type.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Mountainwalk',
    Description: 'This creature can\'t be blocked as long as defending player controls a Mountain.',
    Example: 'See Landwalk',
  },
  {
    Keyword: 'Multikicker',
    Description: 'Multikicker is a variant of the kicker keyword ability. It represents an optional additional cost that may be paid any number of times.',
    Example: 'Multikicker 1 Mountain (You may pay an additional 1 Mountain any number of times as you cast this spell.) Skitter of Lizards enters the battlefield with a +1/+1 counter on it for each time it was kicked.',
  },
  {
    Keyword: 'Mutate',
    Description: 'Mutate is a keyword ability that is featured in Ikoria: Lair of Behemoths. It allows two or more permanents to merge.',
    Example: 'Mutate 2 Plains (If you cast this spell for its mutate cost, put it over or under target non-Human creature you own. They mutate into the creature on top plus all abilities under it.). Whenever this creature mutates, other creatures you control get +X/+X until end of turn, where X is the number of times the creature has mutated.',
  },
  {
    Keyword: 'Myriad',
    Description: 'Whenever a creature with myriad attacks, its controller may create token copies of that creature for each other opponent, which are exiled at the end of combat. Those tokens may also attack planeswalkers controlled by the corresponding player.',
    Example: 'Myriad (Whenever this creature attacks, for each opponent other than defending player, you may put a token that\'s a copy of this creature onto the battlefield tapped and attacking that player or a planeswalker they control. Exile the tokens at the end of combat.)',
  },
  {
    Keyword: 'Nightbound',
    Description: 'An ability found on the back faces of some double-faced cards. Cards with daybound and nightbound are face up when it\'s day and face down when it\'s night. Any time a player controls a permanent that is back face up with nightbound and it\'s day, that player transforms that permanent. This happens immediately and isn\'t a state-based action. Any time a player controls a permanent with nightbound, if it\'s neither day nor night and there are no permanents with daybound on the battlefield, it becomes night.',
    Example: 'Nightbound (If a player cast at least two spells during their own turn, it becomes day next turn.)',
  },
  {
    Keyword: 'Ninjutsu',
    Description: 'Ninjutsu is an activated ability that functions only while the card with ninjutsu is in a player\'s hand.',
    Example: 'Ninjutsu Tap 2 Water (2 Water, Return an unblocked attacker you control to hand: Put this card onto the battlefield from your hand tapped and attacking.)',
  },
  {
    Keyword: 'Nonbasic landwalk',
    Description: 'See Landwalk.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Offering',
    Description: 'Offering is a keyword ability that allows a player to sacrifice an appropriate permanent to cast a card with Offering as though it had flash and at reduced mana cost.',
    Example: 'Rat offering (You may cast this card any time you could cast an instant by sacrificing a Rat and paying the difference in mana costs between this and the sacrificed Rat. Mana cost includes color.)',
  },
  {
    Keyword: 'Open an Attraction',
    Description: 'Attractions are artifacts, but they don\'t have a mana cost. They aren\'t cast, and never even go to your hand. To get them from your Attraction deck to the battlefield, you\'ll need to open "open an attraction". When told to open an Attraction, put the top card of your Attraction deck onto the battlefield face up under your control.',
    Example: 'When Complaints Clerk enters the battlefield, open an Attraction. (Put the top card of your Attraction deck onto the battlefield.)',
  },
  {
    Keyword: 'Outlast',
    Description: 'Outlast grants a +1/+1 counter on the creature for a small cost: two mana for commons, and one mana for uncommons.',
    Example: 'Outlast Tap 2 Plains (2 Plains, Tap: Put a +1/+1 counter on this creature. Outlast only as a sorcery.)',
  },
  {
    Keyword: 'Overload',
    Description: 'Overload provides an alternate, usually more expensive, mana cost for a card which can be used when casting it, and upon doing it increases the effect of the card to each potential target.',
    Example: 'Overload X (You may cast this spell for its overload cost. If you do, change its text by replacing all instances of "target" with "each".)',
  },
  {
    Keyword: 'Pack tactics',
    Description: 'Pack tactics is an ability word that gives an advantage if you attack with creatures with a total power 6 or greater.',
    Example: 'Pack tactics — Whenever Minion of the Mighty attacks, if you attacked with creatures with total power 6 or greater this combat, you may put a Dragon creature card from your hand onto the battlefield tapped and attacking.',
  },
  {
    Keyword: 'Parley',
    Description: 'Parley abilities instruct each player to reveal the top card of their library. Then, an additional effect happens based on the number of nonland cards revealed this way. Finally, each player draws a card (the one that was just revealed).',
    Example: 'Parley — Each player reveals the top card of their library. For each nonland card revealed this way, you create a 1/1 white Spirit creature token. Then each player draws a card.',
  },
  {
    Keyword: 'Partner',
    Description: 'A player can have two commanders if both have partner. Because both commanders start the game in the command zone, the remaining library is only 98 cards. Your two commanders are treated individually for all other Commander rules.',
    Example: 'Partner (You can have two commanders if both have partner.)',
  },
  {
    Keyword: 'Partner with',
    Description: 'A keyword ability that lets two legendary creatures or planeswalkers be your commander in the Commander variant rather than one. “Partner with [name]” is a specialized version of the ability that works even outside of the Commander variant to help two cards reach the battlefield together.',
    Example: 'Partner with Lore Weaver (When this creature enters the battlefield, target player may put Lore Weaver into their hand from their library, then shuffle.)',
  },
  {
    Keyword: 'Persist',
    Description: 'A keyword ability that can return a creature from the graveyard to the battlefield.',
    Example: 'Persist (When this creature dies, if it had no -1/-1 counters on it, return it to the battlefield under its owner\'s control with a -1/-1 counter on it.)',
  },
  {
    Keyword: 'Phasing',
    Description: 'Phasing is a mechanic where permanents may phase out, causing them to be treated as if they don\'t exist until they automatically phase back in on their next untap step. This can be a protective action, or a means to temporarily disable an opponent\'s permanents.',
    Example: 'Until your next turn, your life total can\'t change and you gain protection from everything. All permanents you control phase out. (While they\'re phased out, they\'re treated as though they don\'t exist. They phase in before you untap during your untap step.)',
  },
  {
    Keyword: 'Plainscycling',
    Description: 'Plainscycling is a variant of the cycling ability. Unlike cycling (which allows you to draw a card), plainscycling allows you to search your library for a Plains card. The card you find can be a basic Plains or any land card with the Plains land type.',
    Example: 'See Landcycling',
  },
  {
    Keyword: 'Plainswalk',
    Description: 'This creature can\'t be blocked as long as defending player controls a Plains.',
    Example: 'See Landwalk',
  },
  {
    Keyword: 'Planeswalk',
    Description: 'This creature can\'t be blocked as long as defending player controls a Planes.',
    Example: 'See Landwalk',
  },
  {
    Keyword: 'Play',
    Description: 'Play is a keyword action which usually describes putting a land onto the battlefield from the hand. The equivalent for spells is "casting" them, although casting is much more complex than playing a land.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Poisonous',
    Description: 'Poisonous is a keyword ability that allows the use of multiple poison counters.',
    Example: 'Enchanted creature has poisonous 3. (Whenever it deals combat damage to a player, that player gets three poison counters. A player with ten or more poison counters loses the game.)',
  },
  {
    Keyword: 'Populate',
    Description: 'A keyword action that creates a copy of a creature token you control.',
    Example: 'Put a 1/1 white Bird creature token with flying onto the battlefield, then populate. (Put a token onto the battlefield that\'s a copy of a creature token you control.)',
  },
  {
    Keyword: 'Proliferate',
    Description: 'When a player proliferates, they choose any number of players and/or permanents with counters on them, then put another of each kind of counter already there on these players or permanents.',
    Example: 'Counter target spell, then proliferate. (Choose any number of permanents and/or players, then give each another counter of each kind already there.)',
  },
  {
    Keyword: 'Protection',
    Description: 'This ability represents a magical resistance to certain types of magic, often a specific color.',
    Example: 'Protection from black (This creature can\'t be blocked, targeted, dealt damage, or enchanted by anything black.)',
  },
  {
    Keyword: 'Prototype',
    Description: 'Prototype is a keyword ability introduced in The Brothers\' War which allows an alternate version of a card to be cast for less than its normal mana cost. It is unique to artifacts and artifact creatures.',
    Example: 'Prototype (You may cast this spell with different mana cost, color, and size. It keeps its abilities and types.) 3/3',
  },
  {
    Keyword: 'Provoke',
    Description: 'Provoke is a keyword ability on creatures that allows a player to, during their declare attackers step, untap a creature the defending player controls and require that creature to block the attacking creature with provoke. The block must still be legal, e.g. a non-flying creature cannot block a flying creature even when Provoke is used on it.',
    Example: 'Provoke (Whenever this creature attacks, you may have target creature defending player controls untap and block it if able.)',
  },
  {
    Keyword: 'Prowess',
    Description: 'Creatures with prowess get +1/+1 until end of turn whenever a noncreature spell is cast by their controller.',
    Example: 'Prowess (Whenever you cast a noncreature spell, this creature gets +1/+1 until end of turn.)',
  },
  {
    Keyword: 'Prowl',
    Description: 'Prowl is an alternative cost that appears on some Rogue creature or tribal cards. You may cast a card for its prowl cost if you dealt combat damage to a player the current turn with a creature that shared a creature type with the card with Prowl.',
    Example: 'Prowl Tap 1 Black (You may cast this for its prowl cost if you dealt combat damage to a player this turn with a Rogue.)',
  },
  {
    Keyword: 'Radiance',
    Description: 'Radiance is an ability word associated with the Boros Legion of Ravnica. Radiance — Target creature and each other creature that shares a color with it get +1/+1 until end of turn.',
    Example: 'Radiance — Target creature and each other creature that shares a color with it get +1/+1 until end of turn.',
  },
  {
    Keyword: 'Raid',
    Description: 'Raid is an ability word introduced in Khans of Tarkir, wherein it is the Mardu Horde clan mechanic. It gives an advantageous effect if a player has attacked with a creature the same turn.',
    Example: 'Raid — When Mardu Heart-Piercer enters the battlefield, if you attacked this turn, Mardu Heart-Piercer deals 2 damage to target creature or player.',
  },
  {
    Keyword: 'Rally',
    Description: 'Every time an Ally enters the battlefield under your control, all your rally abilities will trigger. You can put those abilities onto the stack in any order. If an Ally with a rally ability enters the battlefield under your control at the same time as other Allies, that ability will trigger once for each of those Allies and once for the creature with the ability itself.',
    Example: 'Rally — Whenever Chasm Guide or another Ally enters the battlefield under your control, creatures you control gain haste until end of turn.',
  },
  {
    Keyword: 'Rampage',
    Description: 'Rampage is a keyword ability that gives an attacking creature a bonus to its power and toughness when it is blocked by more than one creature.',
    Example: 'Rampage 2 (Whenever this creature becomes blocked, it gets +2/+2 until end of turn for each creature blocking it beyond the first.)',
  },
  {
    Keyword: 'Ravenous',
    Description: 'A keyword ability found on some creature cards with X in their mana cost.',
    Example: 'Ravenous (This creature enters the battlefield with X +1/+1 counters on it. If X is 5 or more, draw a card when it enters.)',
  },
  {
    Keyword: 'Reach',
    Description: 'A keyword ability that allows a creature to block an attacking creature with flying.',
    Example: 'Reach (This creature can block creatures with flying.)',
  },
  {
    Keyword: 'Read Ahead',
    Description: 'A keyword ability found on some Sagas that allows their controller to choose which chapter it starts on.',
    Example: 'Read ahead (Choose a chapter and start with that many lore counters. Add one after your draw step. Skipped chapters don\'t trigger. Sacrifice after III.)',
  },
  {
    Keyword: 'Rebound',
    Description: 'A keyword ability that allows an instant or sorcery spell to be cast a second time.',
    Example: 'Rebound (If you cast this spell from your hand, exile it as it resolves. At the beginning of your next upkeep, you may cast this card from exile without paying its mana cost.)',
  },
  {
    Keyword: 'Reconfigure',
    Description: 'A keyword ability that allows an Equipment creature to temporarily stop being a creature and become attached to another creature.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Recover',
    Description: 'A keyword ability that lets a player return a card from their graveyard to their hand.',
    Example: 'Recover 2 Black (When a creature is put into your graveyard from the battlefield, you may pay 2 Black. If you do, return this card from your graveyard to your hand. Otherwise, exile this card.)',
  },
  {
    Keyword: 'Regenerate',
    Description: 'To replace a permanent\'s destruction with an alternate sequence of events.',
    Example: 'Regenerate Cudgel Troll. (The next time this creature would be destroyed this turn, it isn\'t. Instead tap it, remove all damage from it, and remove it from combat.)',
  },
  {
    Keyword: 'Reinforce',
    Description: 'Reinforce is an activated keyword ability that functions only while the card with reinforce is in a player\'s hand.',
    Example: 'Reinforce 1 — (Discard this card: Put a +1/+1 counter on target creature.)',
  },
  {
    Keyword: 'Renown',
    Description: 'A keyword ability that makes a creature stronger after it deals combat damage to a player.',
    Example: 'Renown 1 (Whenever this creature deals combat damage to a player, if this creature is not renowned, put a +1/+1 counter on it and it becomes renowned.) When Relic Seeker becomes renowned, you may search your library for an Equipment card, reveal it, put it into your hand, then shuffle your library.',
  },
  {
    Keyword: 'Replicate',
    Description: 'A keyword ability that creates copies of a spell.',
    Example: 'Replicate Mountain (When you cast this spell, copy it for each time you paid its replicate cost. You may choose new targets for the copies.)',
  },
  {
    Keyword: 'Retrace',
    Description: 'A keyword ability that lets a player cast a card from their graveyard.',
    Example: 'Retrace (You may cast this card from your graveyard by discarding a land card in addition to paying its other costs.)',
  },
  {
    Keyword: 'Reveal',
    Description: 'To show a card to all players for a brief time.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Revolt',
    Description: 'Revolt is very similar to Morbid, which checks if a creature died earlier in this turn.',
    Example: 'Revolt — When Silkweaver Elite enters the battlefield, if a permanent you control left the battlefield this turn, draw a card.',
  },
  {
    Keyword: 'Riot',
    Description: 'A keyword ability that lets a player choose whether certain creatures enter the battlefield with haste or with a +1/+1 counter.',
    Example: 'Riot (This creature enters the battlefield with your choice of a +1/+1 counter or haste.)',
  },
  {
    Keyword: 'Ripple',
    Description: 'A keyword ability that may let a player cast extra cards from their library for no cost.',
    Example: 'Ripple 4 (When you cast this spell, you may reveal the top four cards of your library. You may cast any revealed cards with the same name as this spell without paying their mana costs. Put the rest on the bottom of your library.)',
  },
  {
    Keyword: 'Roll to Visit Your Attractions',
    Description: 'Roll to Visit Your Attractions is primarily a background game mechanic that links the open an attraction and visit mechanics together with the Attraction card.',
    Example: 'To roll to visit your Attractions, roll a six-sided die. Then if you control one or more Attractions with a number lit up that is equal to that result, each of those Attractions has been “visited” and its visit ability triggers.',
  },
  {
    Keyword: 'Sacrifice',
    Description: 'To move a permanent you control to its owner\'s graveyard.',
    Example: 'Target opponent sacrifices a creature.',
  },
  {
    Keyword: 'Scavenge',
    Description: 'A keyword ability that allows you to exile a creature card from your graveyard to put +1/+1 counters on a creature.',
    Example: 'Scavenge 3 Swamp (Exile this card from your graveyard: Put a number of +1/+1 counters equal to this card\'s power on target creature. Scavenge only as a sorcery.)',
  },
  {
    Keyword: 'Scry',
    Description: 'To manipulate some of the cards on top of your library.',
    Example: 'Scry 2. (Look at the top two cards of your library, then put any number of them on the bottom of your library and the rest on top in any order.)',
  },
  {
    Keyword: 'Secret council',
    Description: 'To secretly vote, each player writes down their chosen option without showing it to anyone else. Each player then keeps their vote secret until all players simultaneously reveal their votes.',
    Example: 'Secret council — When Elrond of the White Council enters the battlefield, each player secretly votes for fellowship or aid, then those votes are revealed. For each fellowship vote, the voter chooses a creature they control. You gain control of each creature chosen this way, and they gain "This creature can\'t attack its owner." Then for each aid vote, put a +1/+1 counter on each creature you control.',
  },
  {
    Keyword: 'Seek',
    Description: 'Seek is a digital twist on a tutor effect. Certain cards allow you to seek a card with specific criteria, randomly pulling one from your library that meets that criteria without shuffling afterward which is something that couldn\'t happen at the tabletop without a player manually looking through their deck. While the reminder text is phrased traditionally as an instruction for the player to carry out, in fact, the game will resolve the effect automatically, and will not show the player the cards it randomly chose from, or any other cards in the library.',
    Example: 'When Manor Guardian dies, each player seeks a nonland card with mana value 2 or less.',
  },
  {
    Keyword: 'Set in motion',
    Description: 'To move a scheme card off the top of your scheme deck and turn it face up.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Shadow',
    Description: 'A keyword ability that restricts how a creature may be blocked and which creatures it can block.',
    Example: 'Shadow (This creature can block or be blocked by only creatures with shadow.)',
  },
  {
    Keyword: 'Shroud',
    Description: 'A keyword ability that precludes a permanent or player from being targeted.',
    Example: 'Shroud (This creature can\'t be the target of spells or abilities.)',
  },
  {
    Keyword: 'Shuffle',
    Description: 'To randomize the cards in a deck (before a game) or library (during a game).',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Skulk',
    Description: 'A keyword ability that restricts how a creature may be blocked.',
    Example: 'Skulk (This creature can\'t be blocked by creatures with greater power.)',
  },
  {
    Keyword: 'Slivercycling',
    Description: 'Unlike a normal cycling ability, Slivercycling doesn\'t have you draw a card. Instead, it lets you search your library for a Sliver card.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Soulbond',
    Description: 'A keyword ability that makes creatures better by pairing them together.',
    Example: 'Soulbond (You may pair this creature with another unpaired creature when either enters the battlefield. They remain paired for as long as you control both of them.) As long as Wingcrafter is paired with another creature, both creatures have flying.',
  },
  {
    Keyword: 'Soulshift',
    Description: 'A keyword ability that lets a player return a card from their graveyard to their hand.',
    Example: 'Soulshift 7 (When this creature dies, you may return target Spirit card with converted mana cost 7 or less from your graveyard to your hand.)',
  },
  {
    Keyword: 'Specialize',
    Description: 'Specialize is a digital-only combination of transform and perpetual mechanics. Cards with specialize feature a circled upward pointing triangle in the upper left corner of the card, similar to the MDFC arrow but colored black instead of white. This indicates that it is able to specialize. The ability invokes the choosing of a D&D character\'s new class during a campaign.',
    Example: 'When this creature Specializes, conjure a duplicate of target creature card exiled with this creature into your hand. The duplicate perpetually gains "You may spend mana as though it were mana of any color to cast this spell." and "When this creature enters the battlefield each opponent loses 2 life and you gain 2 life.',
  },
  {
    Keyword: 'Spectacle',
    Description: 'A keyword ability that allows certain spells to be cast for an alternative cost if an opponent has lost life.',
    Example: 'Spectacle Red (You may cast this spell for its spectacle cost rather than its mana cost if an opponent lost life this turn.)',
  },
  {
    Keyword: 'Spell mastery',
    Description: 'Check to see if there are two or more instant and/or sorcery cards in your graveyard as the spell resolves to determine whether the spell mastery ability applies. The spell itself won\'t count because it\'s still on the stack as you make this check.',
    Example: 'Spell mastery — If there are two or more instant and/or sorcery cards in your graveyard, Ravaging Blaze also deals X damage to that creature\'s controller.',
  },
  {
    Keyword: 'Splice',
    Description: 'A keyword ability that lets a player add a card\'s rules text onto another spell.',
    Example: 'Splice onto Arcane — Exile four cards from your graveyard. (As you cast an Arcane spell, you may reveal this card from your hand and pay its splice cost. If you do, add this card\'s effects to that spell.)',
  },
  {
    Keyword: 'Split second',
    Description: 'A keyword ability that makes it nearly impossible for a player to respond to a spell.',
    Example: 'Split second (As long as this spell is on the stack, players can\'t cast spells or activate abilities that aren\'t mana abilities.)',
  },
  {
    Keyword: 'Squad',
    Description: 'A keyword ability that creates copies of a creature when it enters the battlefield.',
    Example: 'Squad 2 (As an additional cost to cast this spell, you may pay 2 any number of times. When this creature enters the battlefield, create that many tokens that are copies of it.)',
  },
  {
    Keyword: 'Storm',
    Description: 'A keyword ability that creates copies of a spell.',
    Example: 'Storm (When you cast this spell, copy it for each spell cast before it this turn. You may choose new targets for the copies.)',
  },
  {
    Keyword: 'Strive',
    Description: 'A spell with a strive ability lets you pump more mana into it to increase the number of targets.',
    Example: 'Strive — Ajani\'s Presence costs 2 Plains more to cast for each target beyond the first. Any number of target creatures each get +1/+1 and gain indestructible until end of turn. (Damage and effects that say "destroy" don\'t destroy them.)',
  },
  {
    Keyword: 'Sunburst',
    Description: 'A keyword ability that can have a permanent enter the battlefield with +1/+1 counters or charge counters on it.',
    Example: 'Sunburst (This enters the battlefield with a charge counter on it for each color of mana spent to cast it.)',
  },
  {
    Keyword: 'Support',
    Description: 'A keyword action that lets you put +1/+1 counters on creatures.',
    Example: 'When Gladehart Cavalry enters the battlefield, support 6. (Put a +1/+1 counter on each of up to six other target creatures.)',
  },
  {
    Keyword: 'Surge',
    Description: 'A keyword ability that provides an alternative cost to cast a card if you or one of your teammates has cast another spell in the same turn.',
    Example: 'When Reckless Bushwhacker enters the battlefield, if its surge cost was paid, other creatures you control get +1/+0 and gain haste until end of turn.',
  },
  {
    Keyword: 'Surveil',
    Description: 'To manipulate some of the cards on top of your library, sending some of them to your graveyard and rearranging the rest.',
    Example: 'When Dimir Informant enters the battlefield, surveil 2. (Look at the top two cards of your library, then put any number of them into your graveyard and the rest on the top of your library in any order.)',
  },
  {
    Keyword: 'Suspend',
    Description: 'A keyword ability that provides an alternative way to play a card. A card is “suspended” if it\'s in the exile zone, has suspend, and has a time counter on it.',
    Example: 'Suspend 3 — 0 (Rather than cast this card from your hand, pay 0 and exile it with three time counters on it. At the beginning of your upkeep, remove a time counter. When the last is removed, cast it without paying its mana cost.)',
  },
  {
    Keyword: 'Swampcycling',
    Description: 'Swampcycling is a variant of the cycling ability. Unlike cycling (which allows you to draw a card), Swampcycling allows you to search your library for a Swamp card.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Swampwalk',
    Description: 'This creature can\'t be blocked as long as defending player controls a Swamp.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Sweep',
    Description: 'Sweep cards require you to return some number of a specific type of basic land card to your hand as they resolve. The rest of the card\'s effect depends on how many land cards were returned.',
    Example: 'Sweep — Return any number of Plains you control to their owner\'s hand. Target creature gets +1/+1 until end of turn for each Plains returned this way.',
  },
  {
    Keyword: 'Tap',
    Description: 'To tap a permanent, turn it 90 degrees from an upright position.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Tempting offer',
    Description: 'A tempting offer allows a player to perform a certain beneficial action and then gives all opponents the chance to perform the same action. Then, for each opponent who does, the player may repeat the action.',
    Example: 'Tempting offer — Put a +1/+1 counter on each creature you control. Each opponent may put a +1/+1 counter on each creature they control. For each opponent who does, put a +1/+1 counter on each creature you control.',
  },
  {
    Keyword: 'Threshold',
    Description: 'Threshold is an ability word that gives a card different or additional characteristics if its controller has seven or more cards in their graveyard.',
    Example: 'Threshold — As long as seven or more cards are in your graveyard, Boneshard Slasher gets +2/+2 and has "When Boneshard Slasher becomes the target of a spell or ability, sacrifice it."',
  },
  {
    Keyword: 'Totem armor',
    Description: 'Totem armor is a static ability that appears on some Auras. “Totem armor” means “If enchanted permanent would be destroyed, instead remove all damage marked on it and destroy this Aura.”',
    Example: 'Totem armor (If enchanted creature would be destroyed, instead remove all damage from it and destroy this Aura.)',
  },
  {
    Keyword: 'Toxic',
    Description: 'Any time a creature with toxic deals combat damage to a player, that player gets a number of poison counters equal to the toxic value of that creature. The toxic value is the number after the toxic keyword. Poison counters are handed out in addition to the damage being dealt.',
    Example: 'Toxic 1 (Players dealt combat damage by this creature also get a poison counter.)',
  },
  {
    Keyword: 'Training',
    Description: 'A keyword ability that means “Whenever this creature and at least one other creature with power greater that this creature\'s power attack, put a +1/+1 counter on this creature.”',
    Example: 'Training (Whenever this creature attacks with another creature with greater power, put a +1/+1 counter on this creature.)',
  },
  {
    Keyword: 'Trample',
    Description: 'The controller of an attacking creature with trample first assigns damage to the creature(s) blocking it. Once all those blocking creatures are assigned lethal damage, any excess damage is assigned as its controller chooses among those blocking creatures and the player, planeswalker, or battle the creature is attacking.',
    Example: 'A 6/6 green creature with trample is blocked by a 2/2 creature with protection from green. The attacking creature\'s controller must assign at least 2 damage to the blocker, even though that damage will be prevented by the blocker\'s protection ability. The attacking creature\'s controller can divide the rest of the damage as they choose between the blocking creature and the defending player.',
  },
  {
    Keyword: 'Transfigure',
    Description: 'A keyword ability that lets a player search their library for a replacement creature card.',
    Example: 'Transfigure [cost], Sacrifice this creature: Search your library for a creature card with the same converted mana cost as this creature and put that card onto the battlefield. Then shuffle your library. Transfigure only as a sorcery.)',
  },
  {
    Keyword: 'Transform',
    Description: 'To turn a double-faced card so its other face is up. To transform a permanent, turn it over so that its other face is up. Only transforming tokens and permanents represented by transforming double-faced cards can transform.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Transmute',
    Description: 'Transmute is an activated ability that functions only while the card with transmute is in a player\'s hand. “Transmute [cost]” means “[Cost], Discard this card: Search your library for a card with the same mana value as the discarded card, reveal that card, and put it into your hand. Then shuffle your library. Activate only as a sorcery.”',
    Example: 'Transmute [cost], Discard this card: Search your library for a card with the same converted mana cost as this card, reveal it, and put it into your hand. Then shuffle your library. Transmute only as a sorcery.)',
  },
  {
    Keyword: 'Treasure',
    Description: 'Treasure is a predefined token and artifact type. A Treasure token is a colorless artifact token with “Tap, Sacrifice this artifact: Add one mana of any color.”',
    Example: 'A Food token is a colorless Food artifact token with “{2}, {T}, Sacrifice this artifact: You gain 3 life.”',
  },
  {
    Keyword: 'Tribute',
    Description: 'Tribute is a static ability that functions as the creature with tribute is entering the battlefield. “Tribute N” means “As this creature enters the battlefield, choose an opponent. That player may put an additional N +1/+1 counters on it as it enters the battlefield.”',
    Example: 'Tribute 3 (As this creature enters the battlefield, an opponent of your choice may put three +1/+1 counters on it.)\nWhen Nessian Demolok enters the battlefield, if tribute wasn\'t paid, destroy target noncreature permanent.',
  },
  {
    Keyword: 'Typecycling',
    Description: 'A variant of the cycling ability. It allows the player to search their library for a card of a certain subtype instead of drawing the top card of their library.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Undaunted',
    Description: 'A keyword ability that reduces the cost of a spell based on the number of opponents you have.',
    Example: 'Undaunted (This spell costs 1 less to cast for each opponent.)',
  },
  {
    Keyword: 'Underdog',
    Description: 'Underdog is an ability word that gives cards a bonus in the next game within a match, when they have lost a previous game in that match.',
    Example: 'Underdog — If you\'ve lost a game this match, Ruff, Underdog Champ and other Dogs you control get +1/+1.',
  },
  {
    Keyword: 'Undergrowth',
    Description: 'Undergrowth abilities care for the number of creature cards in your graveyard.',
    Example: 'Undergrowth — Golgari Raiders enters the battlefield with a +1/+1 counter on it for each creature card in your graveyard.',
  },
  {
    Keyword: 'Undying',
    Description: 'A keyword ability that can return a creature from the graveyard to the battlefield.',
    Example: 'Undying (When this creature dies, if it had no +1/+1 counters on it, return it to the battlefield under its owner\'s control with a +1/+1 counter on it.)',
  },
  {
    Keyword: 'Unearth',
    Description: 'A keyword ability that lets a player return a creature card from their graveyard to the battlefield.',
    Example: 'Unearth Swamp (Swamp: Return this card from your graveyard to the battlefield. It gains haste. Exile it at the beginning of the next end step or if it would leave the battlefield. Unearth only as a sorcery.)',
  },
  {
    Keyword: 'Unleash',
    Description: 'Unleash is a keyword that represents two static abilities. “Unleash” means “You may have this permanent enter the battlefield with an additional +1/+1 counter on it” and “This permanent can\'t block as long as it has a +1/+1 counter on it.”',
    Example: 'Unleash (You may have this creature enter the battlefield with a +1/+1 counter on it. It can\'t block as long as it has a +1/+1 counter on it.)',
  },
  {
    Keyword: 'Untap',
    Description: 'It is the process of rotating a permanent back to the upright position from a sideways position.',
    Example: 'No example available at this time.',
  },
  {
    Keyword: 'Vanishing',
    Description: 'Vanishing is a keyword ability that limits the number of turns a permanent can remain on the battlefield, using time as a resource.',
    Example: 'Vanishing 2 (This permanent enters the battlefield with two time counters on it. At the beginning of your upkeep, remove a time counter from it. When the last is removed, sacrifice it.)',
  },
  {
    Keyword: 'Venture into the dungeon',
    Description: 'If you venture into the dungeon while you don\'t have any dungeons in the command zone, you put the dungeon of your choice into the command zone and put a venture marker on the first room, at the top. The next time you venture into the dungeon, you\'ll move to the next room by placing the marker on that room. When you enter a room, the room ability of that room triggers. After the final room ability resolves or otherwise leaves the stack, the dungeon is removed from the game. Removing it from the game results in you completing the dungeon. When you complete a dungeon certain cards receive a bonus.',
    Example: 'Tap an untapped legendary creature you control: Venture into the dungeon. Activate only as a sorcery.',
  },
  {
    Keyword: 'Vigilance',
    Description: 'A keyword ability that lets a creature attack without tapping.',
    Example: 'Vigilance (Attacking doesn\'t cause this creature to tap.)',
  },
  {
    Keyword: 'Vote',
    Description: 'Some spells and abilities instruct players to vote for one choice from a list of options to determine some aspect of the effect of that spell or ability. To vote, each player, starting with a specified player and proceeding in turn order, chooses one of those choices.',
    Example: 'Whenever Cirdan the Shipwright enters the battlefield or attacks, each player secretly votes for a player, then those votes are revealed. Each player draws a card for each vote they received. Each player who received no votes may put a permanent card from their hand onto the battlefield.',
  },
  {
    Keyword: 'Ward',
    Description: 'A triggered ability that can counter spells or abilities that target the permanent with ward.',
    Example: 'Ward 2 (Whenever this creature becomes the target of a spell or ability an opponent controls, counter it unless that player pays 2).',
  },
  {
    Keyword: 'Will of the council',
    Description: 'Will of the Council is a voting mechanic that gives players, generally, two different options to vote for at the table. Players, generally starting with the one who triggered Will of the Council, will vote in clockwise order as the card depicts. Depending on who voted for what, various effects will occur to various players.',
    Example: 'Will of the council — Starting with you, each player votes for time or knowledge. If time gets more votes, take an extra turn after this one. If knowledge gets more votes or the vote is tied, draw three cards.',
  },
  {
    Keyword: 'Wither',
    Description: 'Wither is a static ability. Damage dealt to a creature by a source with wither isn\'t marked on that creature. Rather, it causes that source\'s controller to put that many -1/-1 counters on that creature. The -1/-1 counters remain on the creature indefinitely. They won\'t be removed if the creature regenerates or the turn ends.',
    Example: 'Wither (This deals damage to creatures in the form of -1/-1 counters.)',
  },
  {
    Keyword: 'Wizardcycling',
    Description: 'Unlike the normal cycling ability, Wizardcycling doesn\'t allow you to draw a card. Instead, it lets you search your library for a Wizard card. After you find a Wizard card in your library, you reveal it, put it into your hand, then shuffle your library.',
    Example: 'Wizardcycling 3 (3, Discard this card: Search your library for a Wizard card, reveal it, put it into your hand, then shuffle your library.)',
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
