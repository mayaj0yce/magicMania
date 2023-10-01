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
    AbilityWord: 'Landfall',
    Description: 'The landfall ability word rewards a player each time a land enters the battlefield under their control. Generally being a sorcery-speed action means most landfall abilities are geared toward proactive gameplay (usually attacking) and incentivize playing more lands, even in aggressive decks.',
    Example: 'Landfall — Whenever a land enters the battlefield under your control, Plated Geopede gets +2/+2 until end of turn.',
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
