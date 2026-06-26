/**
 * questionBank.advanced.js
 *
 * Advanced-level question bank for the Najdi Arabic speaking app.
 *
 * SOURCING NOTE: every grammatical fact used here — relative clauses with
 * "illi", the connector words (9ashaan, laakin, bir-raghm min, ma9a anna,
 * w ba9deen, min thumm, bima anna, fi Haal), the impersonal "they say"
 * construction, the it-/in- prefixed passive-like verb forms, and
 * agent-restructuring with "Hadd"/plural verbs — is taken directly from
 * the already-verified content in Chapters 21 and 22 of "Speaking Najdi"
 * v4.3. No new grammatical claims are introduced here.
 *
 * Per the project's stated short -> medium -> long sentence-length
 * progression (Beginner -> Intermediate -> Advanced), every question here
 * uses a LONG, multi-clause sentence — this is the level where that
 * progression completes. Specific sentences are newly written for the
 * app and do not duplicate the book's own example sentences, though they
 * necessarily reuse the same core vocabulary the book itself uses to
 * teach these patterns (kaas/cup, mushkila/problem, tagreer/report, etc.)
 * since substituting in unverified vocabulary would defeat the purpose.
 *
 * Per the level's design (see levelProgression.js / Quiz.jsx), Advanced
 * is Arabic-only by default with no English on prompts/answers; English
 * appears only in the always-bilingual explanation block.
 */

export const advancedQuestions = [
  // ---------------------------------------------------------------
  // CATEGORY: relative_clauses (Ch.21.1 - "illi")
  // ---------------------------------------------------------------
  {
    id: "adv-rel-001",
    type: "mcq",
    category: "relative_clauses",
    prompt: { ar: "اختر الترجمة الصحيحة:", en: "Choose the correct translation: \"The man who works at the bank is my neighbor.\"" },
    options: [
      { ar: "الرجال اللي يشتغل في البنك جاري", translit: "Ar-rajjaal illi yishtaghil fi al-bank jaari" },
      { ar: "الرجال اللي اشتغل في البنك جاري", translit: "Ar-rajjaal illi ishtaghal fi al-bank jaari" },
      { ar: "الرجال يشتغل في البنك جاري", translit: "Ar-rajjaal yishtaghil fi al-bank jaari" },
      { ar: "الرجال اللي تشتغل في البنك جاري", translit: "Ar-rajjaal illi tishtaghil fi al-bank jaari" },
    ],
    correctIndex: 0,
    explanation: {
      en: '"Illi" introduces the relative clause and never changes for gender/number. The verb inside still needs the right present-tense prefix: "yishtaghil" (he works), matching "ar-rajjaal" (the man).',
      ar: '"اللي" تبدأ الجملة الموصولة ولا تتغير حسب الجنس أو العدد. الفعل بداخلها يحتاج السابقة الصحيحة للمضارع: "yishtaghil" (يعمل)، لتطابق "الرجال".',
    },
  },
  {
    id: "adv-rel-002",
    type: "reading",
    category: "relative_clauses",
    prompt: { ar: "البنت اللي تشتغل معي راحت الرياض الاسبوع الماضي", translit: "Al-bint illi tishtaghil ma9i raaHat ar-Riyadh al-usboo9 al-maaDi" },
    options: [
      "The girl who works with me went to Riyadh last week",
      "The girl who worked with me will go to Riyadh",
      "The girl who works with me lives in Riyadh",
      "I worked with the girl who went to Riyadh",
    ],
    correctIndex: 0,
    explanation: {
      en: '"Al-bint illi tishtaghil ma9i" (the girl who works with me) is the relative clause subject, and "raaHat ar-Riyadh al-usboo9 al-maaDi" (went to Riyadh last week) is the main, past-tense action.',
      ar: '"البنت اللي تشتغل معي" (الفتاة التي تعمل معي) هي فاعل الجملة الموصولة، و"راحت الرياض الاسبوع الماضي" هي الفعل الرئيسي بصيغة الماضي.',
    },
  },
  {
    id: "adv-rel-003",
    type: "speaking",
    category: "relative_clauses",
    prompt: { ar: "قل: \"الكتاب اللي قريته كان زين، لكن طويل شوي\"", en: 'Say: "The book that I read was good, but a little long."' },
    expectedAnswer: {
      ar: "الكتاب اللي قريته كان زين، لكن طويل شوي",
      translit: "Al-kitaab illi gareetah kaan zeen, lakin Taweel shway",
      en: "The book that I read was good, but a little long",
    },
    explanation: {
      en: '"Al-kitaab illi gareetah" (the book that I read) uses "illi" for the relative clause, "kaan zeen" (was good) sets the past-tense main clause, and "lakin" (but, more formal than "bass") introduces the contrast.',
      ar: '"الكتاب اللي قريته" تستخدم "اللي" للجملة الموصولة، و"كان زين" تمهد للجملة الرئيسية بصيغة الماضي، و"لكن" (أكثر رسمية من "بس") تقدم التضاد.',
    },
  },
  {
    id: "adv-rel-004",
    type: "mcq",
    category: "relative_clauses",
    prompt: { ar: "وش الخطأ في هذي الجملة: \"الناس اللي يسكنون هنا زينات\"؟", en: 'What is wrong with this sentence: "An-naas illi yiskunoon hina zeenat"?' },
    options: [
      "Nothing, it's correct",
      "\"Illi\" should change to agree with \"an-naas\" being plural",
      "\"Zeenat\" should be \"zeenoon\" or \"zeeneen\" to agree with the plural \"an-naas\"",
      "\"Yiskunoon\" should be singular",
    ],
    correctIndex: 2,
    explanation: {
      en: '"Illi" itself never changes (that\'s the whole point of using it), but adjectives elsewhere in the sentence still need to agree — "an-naas" (the people) is plural, so the adjective should be "zeenoon" or "zeeneen," not the feminine-singular "zeenat."',
      ar: '"اللي" نفسها لا تتغير أبدا (هذا هو سبب استخدامها)، لكن الصفات في باقي الجملة لا تزال تحتاج للتطابق — "الناس" جمع، فالصفة يجب أن تكون "zeenoon" أو "zeeneen"، لا صيغة المفرد المؤنث "zeenat".',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: connectors (Ch.21.2-21.3 - multi-clause connector words)
  // ---------------------------------------------------------------
  {
    id: "adv-conn-001",
    type: "mcq",
    category: "connectors",
    prompt: { ar: "اختر الترجمة الصحيحة:", en: 'Choose the correct translation: "Despite it being late, I went to the market, and then I came home."' },
    options: [
      "RiHt as-sooq bir-raghm min annah kaan muta'akhkhir, w ba9deen jeet al-beet",
      "RiHt as-sooq 9ashaan kaan muta'akhkhir, w ba9deen jeet al-beet",
      "B-arooH as-sooq bir-raghm min annah kaan muta'akhkhir, w ba9deen jeet al-beet",
      "RiHt as-sooq bir-raghm min annah kaan muta'akhkhir, bass jeet al-beet",
    ],
    correctIndex: 0,
    explanation: {
      en: '"Bir-raghm min annah kaan muta\'akhkhir" (despite it being late) sets up the contrast, "riHt as-sooq" (I went to the market) is the past-tense main action, and "w ba9deen" (and then) bridges to the next action, "jeet al-beet" (I came home).',
      ar: '"بالرغم من انه كان متأخر" (despite) تمهد للتضاد، و"رحت السوق" فعل الماضي الرئيسي، و"وبعدين" (and then) تربط للفعل التالي "جيت البيت".',
    },
  },
  {
    id: "adv-conn-002",
    type: "reading",
    category: "connectors",
    prompt: { ar: "ما رحت مع ان عندي وقت، بما اني تعبان", translit: "Ma riHt ma9a anna 9indi waqt, bima anni ta9baan" },
    options: [
      "I didn't go even though I had time, since I was tired",
      "I went even though I had time, but I was tired",
      "I will not go because I have time",
      "I didn't go because I didn't have time",
    ],
    correctIndex: 0,
    explanation: {
      en: '"Ma riHt ma9a anna 9indi waqt" (I didn\'t go even though I had time) uses "ma9a anna" for the concessive clause, and "bima anni ta9baan" (since I was tired) gives the actual reason with "bima anna."',
      ar: '"ما رحت مع ان عندي وقت" تستخدم "مع ان" للجملة المتنازلة، و"بما اني تعبان" تقدم السبب الحقيقي بـ"بما ان".',
    },
  },
  {
    id: "adv-conn-003",
    type: "speaking",
    category: "connectors",
    prompt: { ar: "قل: \"خلصت الشغل، وبعدين رحت السوق، لكن السوق كان سكر\"", en: 'Say: "I finished work, and then I went to the market, but the market was closed."' },
    expectedAnswer: {
      ar: "خلصت الشغل، وبعدين رحت السوق، لكن السوق كان سكر",
      translit: "KhallaSt ash-shughul, w ba9deen riHt as-sooq, lakin as-sooq kaan sakkar",
      en: "I finished work, and then I went to the market, but the market was closed",
    },
    explanation: {
      en: 'Three clauses chained together: "khallaSt ash-shughul" (I finished work), "w ba9deen riHt as-sooq" (and then I went to the market), "lakin as-sooq kaan sakkar" (but the market was closed) — exactly the multi-clause structure this level builds toward.',
      ar: 'ثلاث جمل مترابطة: "خلصت الشغل"، "وبعدين رحت السوق"، "لكن السوق كان سكر" — وهذا هو نوع الجملة متعددة الأجزاء المستهدف في هذا المستوى.',
    },
  },
  {
    id: "adv-conn-004",
    type: "mcq",
    category: "connectors",
    prompt: { ar: "اي اداة ربط تناسب: \"___ انك تعبان، خلينا نروح البيت\"؟", en: 'Which connector fits: "___ you\'re tired, let\'s go home" (= "Since you\'re tired...")' },
    options: [
      { ar: "بما ان", translit: "Bima anna" },
      { ar: "بالرغم من", translit: "Bir-raghm min" },
      { ar: "مع ان", translit: "Ma9a anna" },
      { ar: "في حال", translit: "Fi Haal" },
    ],
    correctIndex: 0,
    explanation: {
      en: '"Bima anna" means "given that / since," the right fit for stating a reason that leads to a suggestion. "Bir-raghm min" (despite) and "ma9a anna" (even though) both signal contrast, not reason; "fi Haal" means "in case."',
      ar: '"بما ان" تعني given that / since، وهي المناسبة لتقديم سبب يؤدي لاقتراح. أما "بالرغم من" و"مع ان" فتدلان على التضاد لا السبب؛ و"في حال" تعني in case.',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: passive_voice (Ch.22.1 - impersonal "they say")
  // ---------------------------------------------------------------
  {
    id: "adv-pass-001",
    type: "mcq",
    category: "passive_voice",
    prompt: { ar: "اختر الترجمة الصحيحة:", en: 'Choose the correct translation: "It is said that the new restaurant is excellent, but I haven\'t gone yet."' },
    options: [
      "Yigooloon innah al-mat9am al-jadeed mumtaaz, bass ma riHt ba9ad",
      "Gaaloo li innah al-mat9am al-jadeed mumtaaz, bass riHt",
      "Al-mat9am al-jadeed mumtaaz, bass yigooloon ma riHt",
      "Yibdu anna al-mat9am al-jadeed sakkar, bass ma riHt ba9ad",
    ],
    correctIndex: 0,
    explanation: {
      en: '"Yigooloon innah..." (it is said that / they say that) is the impersonal construction spoken Najdi actually uses instead of the MSA passive, followed by "al-mat9am al-jadeed mumtaaz" (the new restaurant is excellent) and the contrasting "bass ma riHt ba9ad" (but I haven\'t gone yet).',
      ar: '"يقولون انه..." هي الصيغة غير الشخصية التي يستخدمها أهل نجد فعليا بدل صيغة المبني للمجهول في الفصحى، تليها "المطعم الجديد ممتاز" و"بس ما رحت بعد" للتضاد.',
    },
  },
  {
    id: "adv-pass-002",
    type: "reading",
    category: "passive_voice",
    prompt: { ar: "يبدو ان السوق سكر اليوم، لان حد قال لي كذا", translit: "Yibdu anna as-sooq sakkar al-yoom, la'an Hadd gaal li kidha" },
    options: [
      "The market is open today, someone told me",
      "It seems the market is closed today, because someone told me so",
      "The market will close today",
      "I was told the market opened today",
    ],
    correctIndex: 1,
    explanation: {
      en: '"Yibdu anna" (it seems that) introduces the impersonal observation, "as-sooq sakkar al-yoom" (the market is closed today) is the content, and "Hadd gaal li kidha" (someone told me so) gives the impersonal source.',
      ar: '"يبدو ان" تقدم الملاحظة غير الشخصية، و"السوق سكر اليوم" هو المحتوى، و"حد قال لي كذا" (شخص ما قال لي ذلك) يقدم المصدر غير الشخصي.',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: passive_voice (Ch.22.2 - it-/in- prefixed verb forms)
  // ---------------------------------------------------------------
  {
    id: "adv-pass-003",
    type: "mcq",
    category: "passive_voice",
    prompt: { ar: "اختر الترجمة الصحيحة:", en: 'Choose the correct translation: "The cup broke while we were eating, and then the problem got solved quickly."' },
    options: [
      "Al-kaas inkasar w niHna naakul, w ba9deen al-mushkila inHallat bisur9a",
      "Hadd kasar al-kaas w niHna naakul, w ba9deen Hallaw al-mushkila bisur9a",
      "Al-kaas kasarna w niHna naakul, w ba9deen al-mushkila Hallat bisur9a",
      "Al-kaas inkasar w niHna naakul, w ba9deen al-mushkila kaanat mushkila",
    ],
    correctIndex: 0,
    explanation: {
      en: '"Al-kaas inkasar" (the cup broke) uses the "in-" prefixed form to show something happening without naming who did it, and "al-mushkila inHallat" (the problem got solved) uses the same pattern — exactly the passive-like strategy this level teaches.',
      ar: '"الكاس انكسر" تستخدم صيغة "in-" لتُظهر أن شيئا حدث دون تحديد من فعله، و"المشكلة انحلت" تستخدم نفس النمط — وهذا هو الأسلوب الشبيه بالمبني للمجهول المستهدف في هذا المستوى.',
    },
  },
  {
    id: "adv-pass-004",
    type: "speaking",
    category: "passive_voice",
    prompt: { ar: "قل: \"الجوال انكسر امبارح، وما اعرف كيف\"", en: 'Say: "The phone broke yesterday, and I don\'t know how."' },
    expectedAnswer: {
      ar: "الجوال انكسر امبارح، وما اعرف كيف",
      translit: "Al-jawaal inkasar imbaariH, w ma a9rif keef",
      en: "The phone broke yesterday, and I don't know how",
    },
    explanation: {
      en: '"Al-jawaal inkasar" (the phone broke) uses the "in-" prefixed passive-like form, with no agent named, paired with "w ma a9rif keef" (and I don\'t know how).',
      ar: '"الجوال انكسر" تستخدم صيغة "in-" الشبيهة بالمبني للمجهول، دون تحديد فاعل، مع "وما اعرف كيف".',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: passive_voice (Ch.22.3 - restructuring around an agent)
  // ---------------------------------------------------------------
  {
    id: "adv-pass-005",
    type: "mcq",
    category: "passive_voice",
    prompt: { ar: "اختر الترجمة الصحيحة:", en: 'Choose the correct translation: "Someone finished the report, and then they sent it to the manager."' },
    options: [
      "Hadd khallaS at-tagreer, w ba9deen sawwoo arsalooh lil-mudeer",
      "At-tagreer khallaS, w ba9deen al-mudeer arsalah",
      "Hadd khallaS at-tagreer, w ba9deen arsalooh lil-mudeer",
      "Sawwoo at-tagreer, w ba9deen Hadd arsalah lil-mudeer",
    ],
    correctIndex: 2,
    explanation: {
      en: '"Hadd khallaS at-tagreer" (someone finished the report) restructures around the generic agent "Hadd" rather than using a passive form, and "arsalooh lil-mudeer" (they sent it to the manager) continues with a plural "they" verb, the most common native strategy for this kind of sentence.',
      ar: '"حد خلص التقرير" تعيد بناء الجملة حول الفاعل العام "حد" بدل المبني للمجهول، و"ارسلوه للمدير" تستمر بفعل جمع "هم"، وهو الأسلوب الأكثر طبيعية لدى الناطقين.',
    },
  },
  {
    id: "adv-pass-006",
    type: "reading",
    category: "passive_voice",
    prompt: { ar: "حلوا المشكلة بسرعة، لان حد كان يعرف الحل من قبل", translit: "Hallaw al-mushkila bisur9a, la'an Hadd kaan yi9rif al-Hall min gabel" },
    options: [
      "The problem was never solved",
      "They solved the problem quickly, because someone already knew the solution",
      "Someone will solve the problem soon",
      "The solution was unknown to everyone",
    ],
    correctIndex: 1,
    explanation: {
      en: '"Hallaw al-mushkila bisur9a" (they solved the problem quickly) uses a plural verb instead of a passive, and "Hadd kaan yi9rif al-Hall min gabel" (someone already knew the solution before) explains why, using "Hadd" again as the generic agent.',
      ar: '"حلوا المشكلة بسرعة" تستخدم فعلا بصيغة الجمع بدل المبني للمجهول، و"حد كان يعرف الحل من قبل" تفسر السبب، مستخدمة "حد" مجددا كفاعل عام.',
    },
  },
  {
    id: "adv-pass-007",
    type: "speaking",
    category: "passive_voice",
    prompt: { ar: "قل: \"حد كسر الكاس، بس ما حد يعرف مين\"", en: 'Say: "Someone broke the cup, but no one knows who."' },
    expectedAnswer: {
      ar: "حد كسر الكاس، بس ما حد يعرف مين",
      translit: "Hadd kasar al-kaas, bass ma Hadd yi9rif meen",
      en: "Someone broke the cup, but no one knows who",
    },
    explanation: {
      en: '"Hadd kasar al-kaas" (someone broke the cup) restructures around the generic agent "Hadd," and "ma Hadd yi9rif meen" (no one knows who) reuses "Hadd" negated to mean "no one."',
      ar: '"حد كسر الكاس" تعيد البناء حول الفاعل العام "حد"، و"ما حد يعرف مين" تعيد استخدام "حد" منفية لتعني "لا أحد".',
    },
  },
  {
    id: "adv-pass-008",
    type: "mcq",
    category: "passive_voice",
    prompt: { ar: "ليش الناطقون النجديون غالبا يتجنبون صيغة المبني للمجهول الفصيحة في الكلام العادي؟", en: "Why do native Najdi speakers mostly avoid the formal MSA passive voice in everyday speech?" },
    options: [
      "Because the passive voice doesn't exist in Najdi Arabic at all",
      "Because it sounds bookish and overly formal, like newspaper prose, in casual conversation",
      "Because it's grammatically incorrect in spoken Arabic",
      "Because impersonal constructions are easier to pronounce",
    ],
    correctIndex: 1,
    explanation: {
      en: 'The MSA passive is grammatically available but sounds stiff and formal in casual Najdi speech — it would be understood, but it signals a register mismatch, similar to suddenly speaking in formal written English mid-conversation.',
      ar: 'صيغة المبني للمجهول في الفصحى متاحة نحويا لكنها تبدو رسمية وجافة في الكلام النجدي العادي — ستُفهم، لكنها تشير لعدم تناسب في المستوى اللغوي، شبيه بالتحدث بإنجليزية رسمية مكتوبة وسط محادثة عادية.',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: combined (long sentences mixing relative clauses + passive + connectors)
  // ---------------------------------------------------------------
  {
    id: "adv-combo-001",
    type: "mcq",
    category: "combined",
    prompt: { ar: "اختر الترجمة الصحيحة:", en: 'Choose the correct translation: "The girl who works with me said the report got finished, despite her being tired."' },
    options: [
      "Al-bint illi tishtaghil ma9i gaalat inna at-tagreer khallaS, bir-raghm min annaha ta9baana",
      "Al-bint tishtaghil ma9i gaalat at-tagreer khallaS, bass muu ta9baana",
      "Al-bint illi shaafatni gaalat inna at-tagreer itsawwa, bir-raghm min annaha kaanat ta9baana ams",
      "Al-bint illi tishtaghil ma9i kaanat tigool inna at-tagreer khallaS, bir-raghm min annaha ta9baana",
    ],
    correctIndex: 0,
    explanation: {
      en: 'This combines "illi" for the relative clause ("al-bint illi tishtaghil ma9i," the girl who works with me), past tense throughout ("gaalat," "khallaS"), and "bir-raghm min annaha" (despite her being) for the concessive ending — a different combination of the same verified patterns from Ch.21-22.',
      ar: 'هذه الجملة تجمع "اللي" للجملة الموصولة ("البنت اللي تشتغل معي")، وصيغة الماضي طوال الجملة ("قالت"، "خلص")، و"بالرغم من انها" للجملة المتنازلة في النهاية — دمج مختلف لنفس الأنماط الموثقة من الفصلين 21 و22.',
    },
  },
  {
    id: "adv-combo-002",
    type: "reading",
    category: "combined",
    prompt: { ar: "يقولون ان المشكلة انحلت بسرعة، بالرغم من ان حد ما كان متاكد من الحل بالاول", translit: "Yigooloon inna al-mushkila inHallat bisur9a, bir-raghm min ann Hadd ma kaan mit'akkid min al-Hall bil-awwal" },
    options: [
      "The problem was never solved, despite everyone trying",
      "They say the problem got solved quickly, despite no one being sure of the solution at first",
      "Someone solved the problem slowly",
      "It is said the problem will be solved soon",
    ],
    correctIndex: 1,
    explanation: {
      en: '"Yigooloon inna al-mushkila inHallat bisur9a" (they say the problem got solved quickly) combines the impersonal "they say" with the "in-" passive-like verb, and "bir-raghm min ann..." (despite...) adds the concessive contrast.',
      ar: '"يقولون ان المشكلة انحلت بسرعة" تجمع بين "يقولون" غير الشخصية وفعل "in-" الشبيه بالمبني للمجهول، و"بالرغم من ان..." تضيف التضاد المتنازل.',
    },
  },
  {
    id: "adv-combo-003",
    type: "speaking",
    category: "combined",
    prompt: { ar: "قل: \"البنت اللي تشتغل معي قالت ان الشغل اتسوى، بس ما حد صدقها بالاول\"", en: 'Say: "The girl who works with me said the work got done, but no one believed her at first."' },
    expectedAnswer: {
      ar: "البنت اللي تشتغل معي قالت ان الشغل اتسوى، بس ما حد صدقها بالاول",
      translit: "Al-bint illi tishtaghil ma9i gaalat inna ash-shughul itsawwa, bass ma Hadd Sadagha bil-awwal",
      en: "The girl who works with me said the work got done, but no one believed her at first",
    },
    explanation: {
      en: 'A three-part sentence: a relative clause ("al-bint illi tishtaghil ma9i"), reported speech with the passive-like "itsawwa" (it got done), and a contrasting clause using "Hadd" negated ("ma Hadd," no one) — the full combination this level is designed to practice.',
      ar: 'جملة من ثلاثة أجزاء: جملة موصولة ("البنت اللي تشتغل معي")، وكلام منقول بصيغة "اتسوى" الشبيهة بالمبني للمجهول، وجملة متضادة باستخدام "حد" منفية ("ما حد") — هذا هو الدمج الكامل الذي صُمم هذا المستوى لممارسته.',
    },
  },
];

export const advancedMeta = {
  level: "advanced",
  totalQuestions: advancedQuestions.length,
  categories: ["relative_clauses", "connectors", "passive_voice", "combined"],
};
