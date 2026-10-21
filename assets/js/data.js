
// ============================================================================
// MACHIAVELLIFY MASTER INTELLIGENCE DATASET
// ============================================================================

const PYRAMID_TIERS = [
  {
    id: 'tier-1',
    rank: 'TIER I — APEX',
    title: 'The Sovereign Architects (Top 0.1%)',
    pop: '0.1% of Population',
    color: 'from-amber-500 to-amber-600 text-obsidian-950 font-extrabold',
    summary: 'They design the rules, own the capital infrastructure, and remain invisible behind institutional veils.',
    tactic: 'Never appear as the direct author of harsh decrees; delegate punishments to courts or committees while reserving pardons and windfalls for personal branding.'
  },
  {
    id: 'tier-2',
    rank: 'TIER II — CONSIGLIERI',
    title: 'The Grand Strategists & Gatekeepers (1.9%)',
    pop: '1.9% of Population',
    color: 'from-crimson-700 to-crimson-600 text-white font-bold',
    summary: 'Chiefs of staff, board directors, senior bureaucrats, and deans who control information flow and agenda-setting.',
    tactic: 'Master procedural bylaws to blur the line—neutralizing protests through endless administrative committees and selective co-optation.'
  },
  {
    id: 'tier-3',
    rank: 'TIER III — ENFORCERS',
    title: 'The Tactical Lions & Operatives (8%)',
    pop: '8% of Population',
    color: 'from-obsidian-700 to-obsidian-800 text-amber-300 font-semibold border-amber-500/30',
    summary: 'Ambitious VPs, department heads, and operators who enforce fear and harvest metrics from the tiers below.',
    tactic: 'Command calibrated dread over affection. Ensure every subordinate knows their career trajectory depends on strict alignment.'
  },
  {
    id: 'tier-4',
    rank: 'TIER IV — BUFFER',
    title: 'The Moralizing Middle Managers (25%)',
    pop: '25% of Population',
    color: 'from-obsidian-800 to-obsidian-900 text-slate-300',
    summary: 'Trapped between upper-tier mandates and lower-tier resentment; they absorb blame when the Sovereign blurs the line.',
    tactic: 'Escape this tier immediately by acquiring asymmetric leverage (exclusive client relationships, proprietary technical keys, or regulatory mastery).'
  },
  {
    id: 'tier-5',
    rank: 'TIER V — BASE',
    title: 'The Conditioned Flock (65% Sheep Costume)',
    pop: '65% of Population',
    color: 'from-obsidian-900 to-obsidian-950 text-slate-400',
    summary: 'Pacified by slogans of "workplace family", meritocracy myths, and abstract benevolence while trading autonomy for security.',
    tactic: 'First step of Machiavellify: recognize that nobody is coming to reward your quiet obedience. Shed the sheep costume.'
  }
];

const ARENAS_DATA = [
  {
    id: 'corporate',
    name: 'Corporate Office',
    badge: 'ARENA 01 • C-SUITE & HIERARCHY',
    headline: 'Corporate Office Warfare: Credit Architecture & Rival Neutralization',
    quote: '"Men are so simple of mind, and so much dominated by their immediate needs, that a deceitful man will always find plenty who are ready to be deceived." — The Prince, Ch. XVIII',
    sheepIllusion: 'Believing that working 70 hours a week with your head down, helping colleagues unconditionally, and being "universally liked" will naturally earn you the VP promotion.',
    wolfReality: 'Promotions are allocations of political capital, not rewards for exhaustion. If you are indispensable at your current desk and feared by nobody, keeping you stagnant is the most profitable move for your superiors.',
    fearVsLoveApplication: 'When subordinates merely "like" you, they miss deadlines whenever convenient and expect your empathy. When they fear your precision audits, documented performance trails, and decisive reassignment of star projects, your division executes with clockwork discipline.',
    blurringTheLineProtocol: 'When pushing through an unpopular restructuring or KPI hike, never announce it as your personal whim. Attribute it to "Cross-Functional Board Alignment Metrics" or an external audit matrix. Let disgruntled staff argue with an abstract rubric while you appear as the pragmatic mediator.',
    playbook: [
      { title: 'Information Asymmetry Gatekeeping', desc: 'Become the sole bridge between two siloed departments (e.g., Engineering and Revenue). Translate each side to the other so neither can operate without your brokerage.' },
      { title: 'Strategic Credit Delegation', desc: 'Own projects with high executive visibility and clear binary wins. Delegate ambiguous, politically radioactive committees to your most ambitious peer.' },
      { title: 'Paper-Trail Deterrence', desc: 'Follow every verbal concession from a rival with a polite "Per our alignment" summary email. You build an unassailable fortress of accountability.' },
      { title: 'Calculated Scarcity of Praise', desc: 'Constant praise inflates subordinate entitlement. Dispense approval rarely and unpredictably so high performers compete relentlessly for your nod.' }
    ]
  },
  {
    id: 'business',
    name: 'Business & Markets',
    badge: 'ARENA 02 • MONOPOLY & LEVERAGE',
    headline: 'Business & Boardroom Dominion: Asymmetric Moats & Competitor Encirclement',
    quote: '"Never attempt to win by force what can be won by deception." — Niccolò Machiavelli, Discourses on Livy',
    sheepIllusion: 'Assuming business is a polite game of "win-win partnerships," transparent pricing, and trusting handshake promises from suppliers, venture capitalists, or co-founders.',
    wolfReality: 'Every counterparty in a value chain is constantly testing whether they can compress your margin or replicate your moat. Enduring empires are built on switching costs, exclusive bottlenecks, and contractual iron.',
    fearVsLoveApplication: 'Vendors, distributors, and partners who "love" your brand will still abandon you for a 7% margin improvement. Partners who fear losing access to your proprietary distribution channel or facing your legal/exclusivity penalties never defect.',
    blurringTheLineProtocol: 'While stealthily building a product that obsoletes a competitor or partner, publicly praise their ecosystem and participate in joint industry panels. Keep your strategic pivot cloaked behind benign R&D framing until switching costs are locked.',
    playbook: [
      { title: 'Dual-Source Supplier Competition', desc: 'Never allow a single vendor or key executive to hold a monopoly on your operations. Keep a visible secondary option warm so every negotiator feels replaceable.' },
      { title: 'Weaponized Compliance & Standards', desc: 'Once you achieve scale, lobby for rigorous industry certifications or technical standards that your infrastructure already meets but smaller rivals cannot afford.' },
      { title: 'Decoy Signaling in Market Entry', desc: 'Announce loud exploratory interest in a secondary vertical to draw competitor capital there, while quietly locking up distressed assets in your primary target market.' },
      { title: 'Crisis Acquisition Leverage', desc: 'Maintain liquid reserves when competitors over-leverage during hype cycles; acquire their core IP for pennies when credit tightens.' }
    ]
  },
  {
    id: 'college',
    name: 'School & College',
    badge: 'ARENA 03 • ACADEMIA & CAMPUS',
    headline: 'School & University Hierarchy: Patronage Networks, Committees & Status Games',
    quote: '"A wise prince should build on what is his own and not on what is another’s." — The Prince, Ch. XVII',
    sheepIllusion: 'Thinking university is purely about isolated exam grades or joining campus activist groups as an unpaid foot soldier while sacrificing your own career leverage.',
    wolfReality: 'Elite universities and schools are rehearsal stages for institutional gatekeeping. Recommendations, lab funding, fellowship nominations, and alumni pipelines flow to those who master faculty patronage and coalition control.',
    fearVsLoveApplication: 'In group projects, student government, or research labs, peers exploit the "agreeable teammate" by dumping work on them. Establish early that you control the final submission deck and grade-contribution log—making shirking costly.',
    blurringTheLineProtocol: 'Never get baited into polarized campus shouting matches that leave permanent digital scars. Position yourself as the "Institutional Reform Liaison" who sits on the dean’s advisory committee—gaining faculty recommendation letters while vocal agitators burn out.',
    playbook: [
      { title: 'Faculty Ego & Citation Patronage', desc: 'Read a target professor’s most neglected paper before office hours. Ask a sharp question extending their thesis; you instantly transition from student #400 to protégé.' },
      { title: 'Kingmaker Coalition in Campus Elections', desc: 'Instead of running as a polarizing figurehead, organize the swing bloc of 3 technical clubs and extract guaranteed treasurer/committee seats from whichever candidate wins.' },
      { title: 'Archive & Syllabus Arbitrage', desc: 'Collect past grading rubrics, grant templates, and alumni interview dossiers into a private repository; grant access selectively to build a network of indebted high-achievers.' },
      { title: 'Neutralizing Free-Riders', desc: 'Modularize group deliverables on Day 1 with individual sign-offs visible to the instructor, making any slacker’s failure self-isolating.' }
    ]
  },
  {
    id: 'workplace',
    name: 'Workplace Teams',
    badge: 'ARENA 04 • COMMAND & SUBORDINATES',
    headline: 'Workplace Leadership: Mastering Fear vs. Love & Crushing Mutiny',
    quote: '"Love is held by a chain of obligation which, men being selfish, is broken whenever it serves their purpose; but fear is maintained by a dread of punishment which never fails." — The Prince, Ch. XVII',
    sheepIllusion: 'Trying to be the "cool, empathetic boss" who shields underperformers, apologizes for assigning urgent tasks, and treats subordinates as close confidants.',
    wolfReality: 'Familiarity breeds contempt. The moment you need your team to execute under pressure, the "friend-boss" faces excuses and pushback, whereas the feared commander receives immediate compliance.',
    fearVsLoveApplication: 'Machiavelli stresses a critical distinction: command FEAR, never HATRED. You avoid hatred by never humiliating subordinates arbitrarily or stealing their contractual compensation; you command fear by making standards absolute and consequences swift, impersonal, and irreversible.',
    blurringTheLineProtocol: 'When two ambitious subordinates begin forming a clique to challenge your authority, do not confront them together. Promote both to co-lead a high-pressure initiative with a single undivided bonus pool—turning their alliance into mutual surveillance.',
    playbook: [
      { title: 'Swift, Single-Stroke Discipline', desc: 'Per Chapter VIII, injuries and disciplinary restructuring must be executed all at once so the shock is brief; rewards and bonuses must be dripped out gradually so they are savored.' },
      { title: 'Divide Incipient Cliques', desc: 'Reassign seating, project pairings, and reporting windows whenever an informal faction starts coordinating pushback against departmental targets.' },
      { title: 'The Scape-Mechanism', desc: 'Use an external consultant or automated auditing tool to deliver harsh performance cuts, then step in personally to grant a partial reprieve—securing both compliance and gratitude.' },
      { title: 'Never Reveal Your Constraint', desc: 'Even when an directive comes from above, present it with sovereign composure. A leader who complains about upper management to his team signals impotence.' }
    ]
  },
  {
    id: 'bureaucracy',
    name: 'Bureaucracy & State',
    badge: 'ARENA 05 • INSTITUTIONS & PROTESTS',
    headline: 'Bureaucracy & Institutional Politics: Blurring the Line to Dissolve Protests',
    quote: '"One who deceives will always find those who allow themselves to be deceived." — Niccolò Machiavelli',
    sheepIllusion: 'Fighting a bureaucracy head-on with emotional petitions, moral outrage, or loud public protests while ignoring how the procedural machinery actually operates.',
    wolfReality: 'Bureaucracies are immune to moral outrage; they only respond to procedural leverage, jurisdictional bottlenecks, and career-risk calculus. He who writes the definitions and controls the calendar rules the institution.',
    fearVsLoveApplication: 'Bureaucrats do not act out of love for the public or the mission; they act out of fear of career liability, audit exposure, or jurisdictional loss. Frame every demand so that approving your request is their safest career path.',
    blurringTheLineProtocol: 'To suppress protests against your administration without triggering backlash: blur the line between concession and control. Establish a "Blue-Ribbon Listening Commission" with a 9-month timeline, split protesters into moderates vs. radicals via selective policy crumbs, and bury hostile motions in sub-committee procedural reviews.',
    playbook: [
      { title: 'Procedural Exhaustion (Fabian Delay)', desc: 'When facing an organized protest movement, never give them a dramatic refusal to rally around. Welcome their petition into a 14-step technical review until their momentum and funding evaporate.' },
      { title: 'Co-Opting the Vanguard', desc: 'Invite the two most articulate protest leaders into an exclusive "Policy Working Group" with NDA protocols. Their base will immediately suspect them of selling out.' },
      { title: 'Jurisdictional Fog ("Blurring the Line")', desc: 'Split controversial authority across three overlapping boards so no single official can be cornered, subpoenaed, or targeted by opposition campaigns.' },
      { title: 'Agenda & Calendar Sovereignty', desc: 'Place contentious votes at the end of 6-hour technical sessions or on holiday eves after exhausting opponents on trivial amendments.' }
    ]
  }
];

const MAXIMS_DATA = [
  {
    id: 'm1',
    chapter: 'The Prince • Chapter XVII',
    category: 'Fear & Authority',
    title: 'Better to Be Feared Than Loved',
    quote: 'It is much safer to be feared than loved, when, of the two, either must be dispensed with.',
    analysis: 'Men love at their own inclination, but fear at the inclination of the prince. A wise ruler builds on what is under his own control, not on the fickle gratitude of others.',
    realWorldMove: 'Anchor team compliance in clear, audited consequences and performance gates rather than emotional appeals.'
  },
  {
    id: 'm2',
    chapter: 'The Prince • Chapter XVIII',
    category: 'Deception & Optics',
    title: 'The Lion and The Fox',
    quote: 'A prince must imitate the fox and the lion, for the lion cannot protect himself from traps, and the fox cannot defend himself from wolves.',
    analysis: 'Pure brute force (the Lion) walks blindly into legal, financial, and political snares. Pure cunning (the Fox) lacks the coercive weight to deter open aggression. Combine both.',
    realWorldMove: 'Read every fine-print clause like a Fox; enforce contractual breaches with the overwhelming force of a Lion.'
  },
  {
    id: 'm3',
    chapter: 'The Prince • Chapter VIII',
    category: 'Fear & Authority',
    title: 'Cruelties Well-Used vs. Ill-Used',
    quote: 'Injuries ought to be done all at one time, so that, being tasted less, they offend less; benefits ought to be given little by little, so that the flavor of them may last longer.',
    analysis: 'Dragging out layoffs, budget cuts, or disciplinary measures breeds chronic paranoia and rebellion. Execute necessary severities in a single decisive stroke, then pivot immediately to incremental rewards.',
    realWorldMove: 'Consolidate all organizational restructuring into Day 1 of your tenure; spend the next 11 months distributing targeted incentives.'
  },
  {
    id: 'm4',
    chapter: 'The Prince • Chapter XVIII',
    category: 'Deception & Optics',
    title: 'Appearance Over Essence (The Mask of Virtue)',
    quote: 'It is not necessary for a prince to have all the good qualities I have enumerated, but it is very necessary to appear to have them.',
    analysis: 'Actually practicing unconditional mercy, total honesty, and rigid generosity at all times will destroy you among ruthless competitors. Yet appearing merciful, pious, and Principled wins public legitimacy.',
    realWorldMove: 'Champion high-minded corporate social governance publicly while executing ruthless margin optimization behind closed doors.'
  },
  {
    id: 'm5',
    chapter: 'Discourses on Livy • Book I',
    category: 'Crushing Dissent',
    title: 'Blurring the Line to Pacify the Multitude',
    quote: 'He who desires to reform an existing state must retain at least the shadow of its ancient customs, so that the people do not perceive that the order has changed.',
    analysis: 'People rebel against sudden changes in titles and symbols far more than changes in actual substance. Keep familiar titles, committees, and ceremonies intact while hollowing out and centralizing real power.',
    realWorldMove: 'When centralizing decision power in a company or bureaucracy, keep existing committee names as "advisory boards" so nobody realizes their veto was removed.'
  },
  {
    id: 'm6',
    chapter: 'The Prince • Chapter XVII',
    category: 'Fear & Authority',
    title: 'Command Fear Without Provoking Hatred',
    quote: 'A prince ought to inspire fear in such a way that, if he does not win love, he avoids hatred; because he can endure very well being feared whilst he is not hated.',
    analysis: 'Fear is a cold, rational respect for your power to punish disobedience. Hatred is an emotional vendetta triggered when you humiliate people gratuitously or seize their personal property/credit unfairly.',
    realWorldMove: 'Enforce strict standards impersonally; never mock subordinates in public or withhold earned commissions.'
  },
  {
    id: 'm7',
    chapter: 'The Prince • Chapter VI',
    category: 'Strategy & Warfare',
    title: 'Armed Prophets Conquer, Unarmed Perish',
    quote: 'All armed prophets have conquered, and the unarmed ones have been destroyed.',
    analysis: 'Ideas, vision decks, and moral arguments have zero durability once initial enthusiasm fades unless backed by structural enforcement—budget control, hiring/firing authority, or contractual lock-in.',
    realWorldMove: 'Never accept a "transformation leadership" role without direct sign-off over budget and personnel evaluations.'
  },
  {
    id: 'm8',
    chapter: 'The Prince • Chapter XIX',
    category: 'Crushing Dissent',
    title: 'Delegate Odious Measures, Monopolize Grace',
    quote: 'Princes should delegate to others the enactment of unpopular measures and keep in their own hands the distribution of favors.',
    analysis: 'Like Cesare Borgia using Remirro de Orco to pacify Romagna and then sacrificing him in the piazza, a strategic leader lets algorithms, compliance boards, or external auditors deliver bad news.',
    realWorldMove: 'Let HR or external consultants announce policy tightening; step in personally to announce bonuses and promotions.'
  },
  {
    id: 'm9',
    chapter: 'The Prince • Chapter XXI',
    category: 'Strategy & Warfare',
    title: 'The Fatal Trap of Neutrality',
    quote: 'A prince is also respected when he is either a true friend or a downright enemy; neutral states are always the prey of the conqueror.',
    analysis: 'Sitting on the fence during an institutional power struggle earns the contempt of the victor (who sees you as a coward) and the resentment of the loser (whom you refused to aid).',
    realWorldMove: 'Assess which faction holds superior structural leverage, then commit decisive support in exchange for a guaranteed post-victory seat.'
  },
  {
    id: 'm10',
    chapter: 'The Prince • Chapter XIII',
    category: 'Strategy & Warfare',
    title: 'Never Rely on Mercenary or Borrowed Arms',
    quote: 'Auxiliary and mercenary arms are useless and perilous; a wise prince always avoids these arms and turns to his own.',
    analysis: 'If your business depends entirely on a single third-party platform algorithm, or your career depends entirely on one mentor’s protection, you are a prisoner masquerading as a ruler.',
    realWorldMove: 'Own your client relationships, direct distribution list, and core technical competency directly.'
  },
  {
    id: 'm11',
    chapter: 'Discourses on Livy • Book III',
    category: 'Deception & Optics',
    title: 'Strategic Concealment of Ambition',
    quote: 'No enterprise is more likely to succeed than one concealed from the enemy until it is ripe for execution.',
    analysis: 'Announcing your ambition to become CEO, Dean, or Market Leader prematurely unites every threatened incumbent against you while you are still weak.',
    realWorldMove: 'Project loyal, unthreatening competence until you have quietly secured the votes, capital, and leverage to make your ascension irreversible.'
  },
  {
    id: 'm12',
    chapter: 'The Prince • Chapter XXV',
    category: 'Strategy & Warfare',
    title: 'Commanding Fortuna (Audacity Over Caution)',
    quote: 'Fortune is a river that floods the plains when unchecked; yet men can build dikes and embankments in quiet times, and command her with audacity.',
    analysis: 'Fifty percent of human affairs may be governed by macro volatility, but the other fifty percent belongs to preparation and bold, aggressive timing when rivals hesitate.',
    realWorldMove: 'Build cash and political reserves during calm quarters; strike aggressively when market or organizational chaos paralyzes cautious peers.'
  }
];

const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Why Love Is an Abstract Illusion and Fear Is Structural Steel in Modern Management',
    category: 'Corporate Warfare',
    readTime: '7 min read',
    date: 'October 2026 • Dossier #01',
    tags: ['fear', 'love', 'corporate', 'workplace', 'subordinates'],
    excerpt: 'An empirical dissection of Chapter XVII of The Prince applied to Fortune 500 management. Why "servant leadership" breeds entitlement and how calibrated dread drives flawless execution.',
    body: [
      'Walk into any modern corporate onboarding session and you will be drowned in the vocabulary of unconditional benevolence: "psychological safety," "we are a family," and "servant leadership." Yet look at the actual cap table and the executive committee at the apex of that same firm. None of them ascended by being the most self-sacrificing sheep in the pasture.',
      'In Chapter XVII of Il Principe, Niccolò Machiavelli posed the eternal question: Is it better to be loved than feared, or the reverse? His answer remains undefeated after five centuries: "One would wish to be both, but because it is difficult to combine them, it is much safer to be feared than loved, when of the two either must be dispensed with."',
      'Why does love fail in the workplace, business, and bureaucracy? Because love is held by a chain of moral obligation—an abstract psychological contract. Because human beings are fundamentally driven by self-interest, the moment your subordinate gets a competing offer, faces a political squeeze, or realizes they can slack off without penalty, they break that chain of obligation without a second thought.',
      'Fear, by contrast, is anchored in the dread of consequence—lost bonuses, revoked territory, public audit exposure, or career stagnation. Consequence never loses its grip. The secret of the Machiavellify operator is learning to project cold, predictable, unshakeable consequence while remaining outwardly polite, composed, and scrupulously fair with contractual rewards so that fear never degenerates into personal hatred.'
    ],
    checklist: [
      'Never apologize for enforcing a deadline or standard.',
      'Replace emotional reprimands with cold, documented metric reviews.',
      'Reward exceptional loyalty visibly; sever chronic defiance in a single stroke.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Blurring the Line: How Elite Bureaucracies Dissolve Protests Without Firing a Shot',
    category: 'Bureaucracy & Statecraft',
    readTime: '9 min read',
    date: 'October 2026 • Dossier #02',
    tags: ['protest', 'bureaucracy', 'blurring the line', 'dissent', 'politics'],
    excerpt: 'Amateur rulers confront protests head-on and create martyrs. Sovereign architects blur jurisdictional lines, co-opt ringleaders, and drown opposition in procedural labyrinths.',
    body: [
      'When subordinates, students, employees, or citizens organize a protest against an administration, the amateur ruler makes one of two fatal errors: either he panics and surrenders his authority, or he lashes out with clumsy, visible brutality that galvanizes the protestors into a unified crusade.',
      'The Machiavellian sovereign understands that a protest requires three elements to survive: a clear villain, a simple binary grievance, and emotional momentum. To crush the protest effortlessly, you must systematically starve all three by blurring the line.',
      'First, eliminate the clear villain. Never let an unpopular policy carry a single human face. Route it through a "Multi-Stakeholder Governance Rubric" or an external regulatory mandate so protesters are forced to yell at a spreadsheet.',
      'Second, fracture their coalition through selective concessions. Every protest movement consists of ideological hardliners and pragmatic followers who only care about one tangible perk. Grant a minor, low-cost concession to the pragmatists while inviting the two most ambitious student or union leaders onto a prestigious "Advisory Task Force." The moment the base sees their leaders drinking coffee in the executive suite, mutual suspicion destroys the movement from within.'
    ],
    checklist: [
      'Absorb initial outrage into a slow-moving procedural study committee.',
      'Separate pragmatic followers from ideological agitators via targeted micro-concessions.',
      'Retain ancient nomenclature and ceremonial participation while centralizing budgetary sign-off.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Dark Psychology in the Boardroom: Detecting and Deploying Double Binds & Strategic Ambiguity',
    category: 'Dark Psychology',
    readTime: '8 min read',
    date: 'October 2026 • Dossier #03',
    tags: ['deception', 'dark psychology', 'manipulation', 'business', 'fox'],
    excerpt: 'How apex negotiators use framing traps, engineered scarcity, and strategic vagueness to extract asymmetrical concessions while leaving counterparties convinced they won.',
    body: [
      'True manipulation mastery is never loud or coercive. When a counterparty feels forced, they spend the next twelve months plotting revenge. When you architect the choice environment so they "freely choose" the exact outcome you engineered, they defend your agenda as their own.',
      'Consider the Machiavellian Double Bind in executive negotiations: you never present a single demand that can be rejected with a simple "No." Instead, you frame two options—Option A (which imposes high political exposure on your rival) and Option B (your actual objective, framed as the "moderate, safe compromise").',
      'Combine this with Strategic Ambiguity. When superiors or rivals try to pin you down on a risky forecast, couch your commitment in contingent parameters ("Assuming Q3 infrastructure parity holds..."). If the initiative triumphs, you claim full authorship; if external headwinds strike, the pre-planted contingency exonerates you completely.'
    ],
    checklist: [
      'Always anchor negotiations with an extreme Option A so your true target (Option B) appears reasonable.',
      'Embed contingent escape clauses in every high-risk verbal or written commitment.',
      'Watch what rivals do with their budget and calendar—ignore their virtuous press releases.'
    ]
  },
  {
    id: 'blog-4',
    title: 'The Campus Prince: Mastering University Patronage, Lab Politics, and Elite Networks',
    category: 'Campus & Academia',
    readTime: '6 min read',
    date: 'October 2026 • Dossier #04',
    tags: ['college', 'school', 'academia', 'patronage', 'hierarchy'],
    excerpt: 'Schools and universities preach egalitarian meritocracy while operating as feudal fiefdoms. Here is how to turn professors, deans, and student committees into your personal catapult.',
    body: [
      'Students trapped in the sheep mindset treat college like an assembly line: attend lectures, memorize slides, take the exam, and join twenty clubs as an overworked volunteer. They graduate with a generic degree and zero structural leverage.',
      'A university is actually a collection of rival feudal baronies (departments, labs, endowment committees, and alumni chapters) competing for prestige and funding. Professors and deans have egos, rivals, and legacy anxieties.',
      'By identifying the 3 faculty members who sit on fellowship and placement committees—and becoming the indispensable research lieutenant who advances their flagship publications—you bypass the open application slush pile entirely. In campus politics, never waste energy on symbolic debates; seize control of the Finance & Appropriations Committee that allocates budget to every other student organization.'
    ],
    checklist: [
      'Target committee-chair faculty and align your research directly with their citation goals.',
      'Control the treasury/appropriations node in student organizations rather than symbolic titles.',
      'Build a private dossier of alumni decision-makers two years before graduation.'
    ]
  },
  {
    id: 'blog-5',
    title: 'The Anatomy of the Scapegoat: Cesare Borgia’s Romagna Playbook in Corporate Turnarounds',
    category: 'Corporate Warfare',
    readTime: '7 min read',
    date: 'October 2026 • Dossier #05',
    tags: ['corporate', 'cesare borgia', 'scapegoat', 'fear', 'workplace'],
    excerpt: 'In Chapter VII of The Prince, Cesare Borgia used the ruthless minister Remirro de Orco to pacify a lawless province, then executed him to win the people’s awe. Here is the modern corporate equivalent.',
    body: [
      'When Cesare Borgia conquered the chaotic province of Romagna, he knew that restoring order required draconian measures that would make the ruler unpopular. So he appointed Remirro de Orco, a cruel and efficient minister, with plenary power. Once Remirro had crushed the bandits and restored iron discipline, Borgia dissolved the tribunal and had Remirro displayed in the piazza at Cesena—leaving the populace simultaneously terrified, satisfied, and loyal to Borgia.',
      'In modern corporate turnarounds and M&A integrations, executives deploy this exact protocol without bloodshed. When acquiring a bloated division, never walk in personally as the hatchet man if you plan to lead the survivors long-term.',
      'Instead, bring in an interim Restructuring Director or external Turnaround Consultancy to execute the painful layoffs, cancel pet projects, and enforce strict new KPIs. Once the culture is shocked into compliance, conclude the consultant’s contract, restore a handful of minor perks, and step forward as the benevolent sovereign who brought stability back.'
    ],
    checklist: [
      'Separate the agent of necessary disruption from the permanent face of sovereign leadership.',
      'Ensure all unpopular cuts happen in Phase 1 before your permanent branding campaign begins.',
      'Never reverse the structural gains of the turnaround—only soften the ceremonial tone.'
    ]
  },
  {
    id: 'blog-6',
    title: 'Information Starvation & The Velvet Glove: Neutralizing Passive-Aggressive Rivals',
    category: 'Dark Psychology',
    readTime: '6 min read',
    date: 'October 2026 • Dossier #06',
    tags: ['deception', 'workplace', 'rivals', 'manipulation', 'office'],
    excerpt: 'The most dangerous enemies in an office or bureaucracy never attack you openly—they sabotage via delay, selective omission, and feigned incompetence. Here is how to crush them.',
    body: [
      'Open enemies are easy to fight; covert saboteurs who smile in meetings while starving your project of data or slow-walking approvals are far deadlier. If you lose your temper at a passive-aggressive colleague, you look unhinged while they play the innocent victim.',
      'The Machiavellify counter-measure is the Velvet Trap: enthusiastically praise their expertise in front of senior leadership, then assign them a crystal-clear, time-stamped micro-deliverable with executive CC visibility. Offer them "support resources" in writing so they cannot claim overload.',
      'Now their weapon is turned against them: if they deliver, your project wins under your leadership; if they stall, their incompetence is automatically broadcast to the entire executive chain without you uttering a single hostile word.'
    ],
    checklist: [
      'Never fight covert sabotage with emotional confrontation.',
      'Use public praise + high-visibility CC’d milestones to box passive-aggressive rivals in.',
      'Maintain parallel backup channels so a rival’s delay never halts your critical path.'
    ]
  }
];

const INTRIGUE_SCENARIOS = [
  {
    stage: 1,
    arena: 'CORPORATE OFFICE • Q4 SUCCESSION',
    title: 'The Credit Heist in the Executive Suite',
    situation: 'Your peer Director, Julian, has privately obtained your team’s Q4 turnaround deck and plans to present its core thesis as his own during tomorrow morning’s Board Strategy Review.',
    choices: [
      {
        label: 'A. Confront Julian angrily in his office today and demand he back off.',
        outcome: 'Amateur Lion mistake. Julian now knows you are aware, alters his slides slightly, and tells the VP you are emotionally unstable.',
        delta: { fear: -10, leverage: -15, optics: -15, protest: +15 },
        verdict: 'SHEEP / RECKLESS LION MOVE'
      },
      {
        label: 'B. Say nothing; plant one flawed metric in the shared draft he stole, then unveil the verified live dataset during the Board Q&A.',
        outcome: 'Pure Florentine Fox mastery! Julian presents the poisoned number, you calmly offer the real-time audited correction in front of the CEO, and Julian’s credibility is shattered permanently.',
        delta: { fear: +20, leverage: +25, optics: +15, protest: -10 },
        verdict: 'APEX MACHIAVELLIAN PLAY'
      },
      {
        label: 'C. Complain to HR about intellectual property fairness.',
        outcome: 'HR files a generic mediation note. The Board still sees Julian as the bold presenter and views you as a whiner.',
        delta: { fear: -20, leverage: -10, optics: -10, protest: +10 },
        verdict: 'CONDITIONED SHEEP MOVE'
      }
    ]
  },
  {
    stage: 2,
    arena: 'BUREAUCRACY • COALITION REVOLT',
    title: 'Suppressing the Departmental Protest Petition',
    situation: 'Thirty junior staff members have drafted a joint protest petition against your new performance-tracking rubric, threatening to escalate to the press and union board on Friday.',
    choices: [
      {
        label: 'A. Blur the line: Announce a "Joint Rubric Calibration Council," appoint the two loudest ringleaders as co-chairs with 60-day review mandates, and keep the rubric running as a "pilot."',
        outcome: 'Masterstroke! By blurring the line between pilot and policy and co-opting the leaders into administrative paperwork, the protest fractures within 72 hours while your tracking stays 100% active.',
        delta: { fear: +15, leverage: +20, optics: +20, protest: -25 },
        verdict: 'APEX MACHIAVELLIAN PLAY'
      },
      {
        label: 'B. Cancel the rubric immediately and apologize so everyone loves you again.',
        outcome: 'Fatal capitulation. Your subordinates now know that any coordinated tantrum will force you to fold. Mutiny risk skyrockets.',
        delta: { fear: -30, leverage: -25, optics: -10, protest: +30 },
        verdict: 'SHEEP CAPITULATION'
      },
      {
        label: 'C. Send an all-caps email threatening to fire all 30 signatories today.',
        outcome: 'Clumsy tyranny. Your email is leaked to journalists within an hour, creating martyrs and uniting the board against you.',
        delta: { fear: +10, leverage: -20, optics: -30, protest: +35 },
        verdict: 'BLIND BRUTE FORCE'
      }
    ]
  },
  {
    stage: 3,
    arena: 'BUSINESS & BOARDROOM • SUPPLIER HOLDUP',
    title: 'The Monopoly Supplier Extortion',
    situation: 'Your primary cloud-component vendor realizes you have a major product launch in 21 days and suddenly demands a 35% price hike to renew the contract.',
    choices: [
      {
        label: 'A. Sign the 35% hike immediately out of panic and beg for mercy next year.',
        outcome: 'You bleed margin and signal total dependency. Next year they will demand 50%.',
        delta: { fear: -15, leverage: -25, optics: -10, protest: +10 },
        verdict: 'WEAK NEGOTIATOR'
      },
      {
        label: 'B. Sign a 60-day interim bridge at +10% while secretly migrating 70% of volume to a rival supplier, then terminate their exclusivity on Day 61 with zero warning.',
        outcome: 'Chapter XVIII perfection: conceal your strike until your alternative arms are fully deployed, then sever dependency in a single stroke.',
        delta: { fear: +25, leverage: +25, optics: +10, protest: -15 },
        verdict: 'APEX MACHIAVELLIAN PLAY'
      },
      {
        label: 'C. Refuse to pay and let your product launch crash in 21 days.',
        outcome: 'Cutting off your nose to spite your face. Never start a war before your own supply lines are secured.',
        delta: { fear: -5, leverage: -20, optics: -25, protest: +20 },
        verdict: 'UNARMED PROPHET'
      }
    ]
  },
  {
    stage: 4,
    arena: 'SCHOOL & UNIVERSITY • LAB DOMINANCE',
    title: 'The Prestigious Fellowship Bottleneck',
    situation: 'Only one candidate from your department will receive the Dean’s Global Fellowship nomination. Your rival has higher raw GPA, but the 3-professor selection committee is deadlocked.',
    choices: [
      {
        label: 'A. Hope the committee rewards your quiet sincerity and moral character.',
        outcome: 'Committees reward institutional utility, not silent hope. Your rival takes the fellowship.',
        delta: { fear: -10, leverage: -15, optics: -5, protest: +5 },
        verdict: 'PASSIVE SHEEP'
      },
      {
        label: 'B. Identify the swing professor’s upcoming grant renewal, build a bespoke preliminary dataset that solves his methodology gap, and present it as part of your fellowship proposal.',
        outcome: 'You align the sovereign’s self-interest with your ascension. The swing professor champions you relentlessly and locks in your nomination.',
        delta: { fear: +10, leverage: +25, optics: +20, protest: -10 },
        verdict: 'APEX MACHIAVELLIAN PLAY'
      },
      {
        label: 'C. Spread anonymous rumors about your rival on student forums.',
        outcome: 'Low-level amateur move that traces back to your IP and disgusts the faculty.',
        delta: { fear: -10, leverage: -20, optics: -25, protest: +20 },
        verdict: 'CLUMSY CONSPIRATOR'
      }
    ]
  },
  {
    stage: 5,
    arena: 'WORKPLACE LEADERSHIP • THE STAR LIEUTENANT',
    title: 'When Your Top Subordinate Grows Too Ambitious',
    situation: 'Your highest-performing manager, Elena, has started having private lunches with your boss (the SVP) and subtly hinting that she is ready to replace you.',
    choices: [
      {
        label: 'A. Nominate Elena to lead a high-profile, cross-border expansion taskforce in another time zone that reports to a separate matrix—removing her from your turf while appearing as her generous sponsor.',
        outcome: 'Classic Florentine promotion-into-exile! You look magnanimous to the SVP, Elena is bogged down in a brutal remote turnaround, and your core citadel remains 100% under your direct command.',
        delta: { fear: +15, leverage: +20, optics: +25, protest: -15 },
        verdict: 'APEX MACHIAVELLIAN PLAY'
      },
      {
        label: 'B. Publicly berate Elena in the weekly team meeting to show who is boss.',
        outcome: 'You validate her narrative to the SVP that you are insecure and petty.',
        delta: { fear: -5, leverage: -20, optics: -25, protest: +25 },
        verdict: 'EMOTIONAL BLUNDER'
      },
      {
        label: 'C. Ignore it and trust that Elena would never betray you because you mentored her.',
        outcome: 'Chapter XVII warning: gratitude is broken the moment ambition calls. Six months later, you are reorganized out.',
        delta: { fear: -25, leverage: -25, optics: -15, protest: +15 },
        verdict: 'NAIVE SHEEP'
      }
    ]
  }
];

const GAUNTLET_QUESTIONS = [
  {
    q: '1. In a cross-functional meeting, a rival VP smiles warmly and says: "We all admire how passionate your team is, even if the timeline was a bit optimistic for a group of your current experience." What dark psychological tactic is being deployed, and what is the Sovereign counter-move?',
    options: [
      { text: 'Tactic: Compliment-Wrapped Status Degradation (Negging/Framing). Counter: Never defend softly; calmly pivot by citing your team’s audited delivery beat vs. his division’s Q2 slippage.', correct: true, rationale: 'Correct! Defending your "experience" accepts his subordinate frame. Counter-framing with cold comparative metrics re-establishes dominance.' },
      { text: 'Tactic: Friendly banter. Counter: Thank him for the compliment and promise to try harder next quarter.', correct: false, rationale: 'Incorrect. Accepting the frame cements your status as the junior subordinate in front of the room.' },
      { text: 'Tactic: Provocation. Counter: Shout at him and demand an apology.', correct: false, rationale: 'Incorrect. Losing emotional composure hands him the exact optics victory he baited you for.' }
    ]
  },
  {
    q: '2. According to Machiavelli’s Chapter XVII doctrine on Fear vs. Love, why must a ruler prioritize being feared over being loved when both cannot be achieved simultaneously?',
    options: [
      { text: 'Because love is a bond of obligation which selfish humans break whenever it serves their advantage, whereas fear is held by a dread of punishment that stays under the ruler’s control.', correct: true, rationale: 'Exact canonical doctrine. Men love at their own pleasure, but fear at the pleasure of the Prince.' },
      { text: 'Because a ruler should aim to be hated and cruel at all times to everyone.', correct: false, rationale: 'False! Machiavelli explicitly warns that a Prince must inspire fear while strictly avoiding hatred.' },
      { text: 'Because fear makes subordinates love you emotionally over time.', correct: false, rationale: 'Incorrect. Fear is not about emotional affection; it is about reliable structural deterrence.' }
    ]
  },
  {
    q: '3. When an institutional leader wants to suppress a growing protest or employee revolt without triggering media backlash, what does "blurring the line" entail?',
    options: [
      { text: 'Diffusing accountability across procedural committees, co-opting moderate ringleaders into advisory bodies, and disguising control changes behind familiar institutional labels.', correct: true, rationale: 'Spot on. Removing a clear target and splitting the coalition drains protest momentum silently.' },
      { text: 'Surrendering all budget authority to the protestors immediately.', correct: false, rationale: 'Incorrect. Capitulation invites escalating demands.' },
      { text: 'Publicly abolishing all rules and declaring personal dictatorship on social media.', correct: false, rationale: 'Incorrect. Overt theatrical tyranny unites all factions against you.' }
    ]
  },
  {
    q: '4. In Chapter VIII & VII (The Cesare Borgia / Remirro de Orco paradigm), how should a leader sequence necessary severities (cuts/penalties) versus rewards (bonuses/favors)?',
    options: [
      { text: 'Execute all severities in a single decisive stroke (ideally via an intermediary/system) so resentment doesn’t fester; distribute benefits gradually so each is savored.', correct: true, rationale: 'Masterful! Injuries done all at once offend less; benefits dripped out build continuous dependency.' },
      { text: 'Give all rewards on Day 1 and inflict small punishments every week for a year.', correct: false, rationale: 'Catastrophic error. Weekly punishments keep subordinates in permanent mutinous resentment.' },
      { text: 'Never punish anyone and hope problems resolve themselves.', correct: false, rationale: 'Chapter XVII warns that excessive mercy allows disorder to grow until the whole state is ruined.' }
    ]
  },
  {
    q: '5. A colleague privately asks for your candid negative opinion about the new CEO’s strategy, promising "this stays strictly between us." How does the Fox respond?',
    options: [
      { text: 'Assume every "confidential" gripe is an intelligence trap. Express measured strategic alignment that would flatter you if repeated verbatim to the CEO, while probing why the colleague is asking.', correct: true, rationale: 'Pure Fox discipline. Never hand a potential rival recorded or repeatable ammunition against your loyalty.' },
      { text: 'Vent all your frustrations honestly to bond with your colleague.', correct: false, rationale: 'Sheep trap! You just handed your colleague a loaded weapon to trade for favor with the CEO.' },
      { text: 'Refuse to speak to anyone in the office ever again.', correct: false, rationale: 'Isolation blinds your intelligence network. Engage warmly while revealing zero vulnerability.' }
    ]
  }
];

const AUDIT_QUESTIONS = [
  {
    id: 'aq1',
    prompt: '1. When a subordinate or teammate misses a critical commitment with a sentimental excuse, your reflex is:',
    sheepOption: 'Accept the excuse warmly, do their work yourself late at night, and hope they reciprocate next time (0 pts)',
    hybridOption: 'Express mild annoyance but extend the deadline without structural penalty (10 pts)',
    wolfOption: 'Remain icy calm, log the variance formally, reallocate their high-upside scope immediately, and enforce a clear consequence (20 pts)'
  },
  {
    id: 'aq2',
    prompt: '2. In a workplace, college, or bureaucratic hierarchy, how do you view office politics and power dynamics?',
    sheepOption: 'I avoid politics completely and believe pure hard work and kindness will be rewarded automatically (0 pts)',
    hybridOption: 'I observe politics defensively so I don’t get stepped on, but rarely initiate plays (10 pts)',
    wolfOption: 'I map every stakeholder’s self-interest, control information bottlenecks, and engineer coalitions proactively (20 pts)'
  },
  {
    id: 'aq3',
    prompt: '3. If given the choice between being universally liked as "harmless and nice" vs. respected and feared as "formidable and untouchable":',
    sheepOption: 'I want everyone to love me and think I am a nice person (0 pts)',
    hybridOption: 'I try to balance both equally even when people take advantage of my niceness (10 pts)',
    wolfOption: 'I choose calibrated fear and unshakeable respect—never hated, never toyed with (20 pts)'
  },
  {
    id: 'aq4',
    prompt: '4. When a faction in your organization starts protesting or resisting your directive:',
    sheepOption: 'I back down quickly or plead with them emotionally to see my side (0 pts)',
    hybridOption: 'I argue with them publicly in long email threads (10 pts)',
    wolfOption: 'I blur the line via procedural committees, co-opt key swing voices privately, and isolate the remaining agitators (20 pts)'
  },
  {
    id: 'aq5',
    prompt: '5. How much of your long-term ambition, next career move, and leverage do you reveal to peers?',
    sheepOption: 'I share my plans, struggles, and next moves openly with coworkers and friends (0 pts)',
    hybridOption: 'I tell only a few close colleagues (10 pts)',
    wolfOption: 'I practice strict concealment; my moves are only visible once they are irreversible (20 pts)'
  }
];

const COUNSELLING_TIERS = [
  {
    id: 'tier-initiate',
    name: 'The Courtier',
    subtitle: 'Foundational Deprogramming',
    monthlyPrice: 190,
    annualPrice: 152,
    badge: 'ENTRY DOCTRINE',
    features: [
      'Monthly 45-min 1-on-1 Mindset Deprogramming Session',
      'Full Corporate & Campus Power Mapping Audit',
      'Encrypted Vault Access to All 12 Florentine Playbooks',
      'Passive-Aggressive Rival Counter-Script Library'
    ]
  },
  {
    id: 'tier-consigliere',
    name: 'The Consigliere',
    subtitle: 'Executive & Institutional Ascendance',
    monthlyPrice: 490,
    annualPrice: 392,
    badge: 'MOST COMMISSIONED',
    featured: true,
    features: [
      'Bi-Weekly 60-min War Room Strategy Sessions',
      'Bespoke "Fear vs. Love" Subordinate Architecture',
      'Live Crisis & Protest Suppression Line-Blurring Playbook',
      '24/7 Encrypted Dispatch Review for High-Stakes Emails'
    ]
  },
  {
    id: 'tier-sovereign',
    name: 'Sovereign Apex',
    subtitle: 'Boardroom, M&A & Bureaucratic Dominion',
    monthlyPrice: 1490,
    annualPrice: 1192,
    badge: 'ELITE PYRAMID',
    features: [
      'Weekly Unlimited War Room Advisory + On-Call Red Team',
      'Hostile Boardroom / Bureaucratic Coalition Engineering',
      'Psychological Profiling of Your Top 5 Rivals & Counterparties',
      'Direct Chief Strategist Retainer & Custom Simulation Models'
    ]
  }
];

const FAQ_ITEMS = [
  {
    q: 'Does Machiavellify advocate mindless cruelty or illegal behavior?',
    a: 'Never. Mindless cruelty is the mark of a stupid brute who quickly ends up deposed or imprisoned. In Chapter VIII and XVII, Machiavelli explicitly condemns gratuitous abuse because it generates hatred—the one force that destroys a ruler. Machiavellify teaches legal, structural, psychological mastery: understanding leverage, incentives, procedural rules, strategic ambiguity, and calibrated authority so you are never exploited by those who already play by these rules at the top.'
  },
  {
    q: 'Why does Machiavelli insist it is safer to be feared than loved?',
    a: 'Because love depends on the other person’s fluctuating emotions and convenience ("men being selfish, break the chain of obligation whenever it serves their advantage"). Fear—defined as the rational certainty that crossing you or failing their duty carries an unavoidable consequence—remains 100% under your sovereign control.'
  },
  {
    q: 'How do these 16th-century Florentine principles apply to a modern corporate office or college?',
    a: 'Human software has not updated since 1513. Whether in the Medici court, a SaaS executive suite, a university tenure committee, or a ministry bureaucracy, scarce resources (promotions, capital, prestige, tenure) are allocated through coalition building, optics management, information asymmetry, and deterrence.'
  },
  {
    q: 'What does "blurring the line" to suppress protests mean in practice?',
    a: 'When an opposition bloc forms, they need a sharp polarization line ("Us vs. The Tyrant") to recruit followers. You blur that line by adopting their vocabulary, routing unpopular necessities through technical sub-committees, offering selective concessions to divide pragmatists from ideologues, and letting procedural timelines exhaust their outrage.'
  }
];
