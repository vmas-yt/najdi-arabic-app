/**
 * questionBank.intermediate.js
 *
 * Intermediate-level question bank for the Najdi Arabic speaking app.
 *
 * SOURCING NOTE: every grammatical fact used here (the past-tense
 * suffix-only system, the future "b-" prefix, the eight possessive
 * suffixes including the "-a -> -t" exception, "9ind" for having, and
 * the ma/muu negation split plus pronoun-fused negatives) is taken
 * directly from the already-verified content in Chapters 6, 13, 15, and
 * 16 of "Speaking Najdi" v4.3. No new grammatical claims are introduced.
 *
 * Per the Beginner->Intermediate->Advanced sentence-length progression,
 * questions here use MEDIUM-length sentences (typically combining two
 * grammar points — e.g. past tense + possession, or negation + future)
 * rather than the single-pattern short phrases used at Beginner level.
 *
 * Specific vocabulary, sentences, and distractors below are newly written
 * for this app and do not duplicate the book's own example sentences.
 */

export const intermediateQuestions = [
  // ---------------------------------------------------------------
  // CATEGORY: vocabulary (medium: short phrases/collocations, not single words)
  // ---------------------------------------------------------------
  {
    id: "int-vocab-001",
    type: "mcq",
    category: "vocabulary",
    prompt: { en: 'How do you say "last week" in Najdi Arabic?' },
    options: ["Al-usboo9 al-jaay", "Al-usboo9 al-maaDi", "Ba9ad usboo9", "Kil usboo9"],
    correctIndex: 1,
    explanation: {
      en: '"Al-usboo9 al-maaDi" means "last week." "Al-usboo9 al-jaay" is "next week," and "ba9ad usboo9" is "in a week."',
      ar: '"الاسبوع الماضي" تعني last week. "الاسبوع الجاي" تعني next week، و"بعد اسبوع" تعني in a week.',
    },
  },
  {
    id: "int-vocab-002",
    type: "reading",
    category: "vocabulary",
    prompt: { ar: "قبل يومين", translit: "Gabel yomeyn" },
    options: ["Tomorrow", "Two days ago", "In two days", "Two weeks ago"],
    correctIndex: 1,
    explanation: {
      en: '"Gabel" means "before," and "yomeyn" is the dual form of "day" (two days): "two days ago."',
      ar: '"قبل" تعني before، و"يومين" هي صيغة المثنى لكلمة "يوم": تعني "قبل يومين".',
    },
  },
  {
    id: "int-vocab-003",
    type: "speaking",
    category: "vocabulary",
    prompt: { en: 'Say "I don\'t have money" in Najdi Arabic, using "9ind."' },
    expectedAnswer: { ar: "ما عندي فلوس", translit: "Ma 9indi fuloos", en: "I don't have money" },
    explanation: {
      en: '"9ind" + suffix expresses "having." Negate it with "ma" the same way you negate any verb-like phrase: "ma 9indi."',
      ar: '"عند" + اللاحقة تعبر عن الملكية. تُنفى بـ"ما" تماما كما تُنفى الأفعال: "ما عندي".',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: verbs_with_pronouns (past + future, medium sentences)
  // ---------------------------------------------------------------
  {
    id: "int-verb-001",
    type: "mcq",
    category: "verbs_with_pronouns",
    prompt: { en: 'How do you say "we wrote the book yesterday"?' },
    options: ["Katabna al-kitaab imbaariH", "Katabtoo al-kitaab imbaariH", "Katabat al-kitaab imbaariH", "Katuboo al-kitaab imbaariH"],
    correctIndex: 0,
    explanation: {
      en: '"niHna" (we) takes the past-tense suffix "-na": "katabna" = "we wrote."',
      ar: '"نحنا" تأخذ لاحقة الماضي "-na": "katabna" تعني "we wrote".',
    },
  },
  {
    id: "int-verb-002",
    type: "mcq",
    category: "verbs_with_pronouns",
    prompt: { en: 'How do you say "they saw the house two days ago"?' },
    options: ["Shaafoo al-beet gabel yomeyn", "Shifna al-beet gabel yomeyn", "Shaafat al-beet gabel yomeyn", "Shift al-beet gabel yomeyn"],
    correctIndex: 0,
    explanation: {
      en: '"hoom" (they) takes the irregular past form "shaafoo" for "shaaf" (see), not a regular suffix.',
      ar: '"هم" تأخذ صيغة الماضي غير القياسية "shaafoo" للفعل "shaaf" (رأى)، وليست لاحقة قياسية.',
    },
  },
  {
    id: "int-verb-003",
    type: "reading",
    category: "verbs_with_pronouns",
    prompt: { ar: "ب نروح السوق بكرة", translit: "B-narooH as-sooq bakra" },
    options: ["We went to the market yesterday", "We will go to the market tomorrow", "They will go to the market", "I will go to the market"],
    correctIndex: 1,
    explanation: {
      en: '"B-" plus the present-tense "narooH" (we go) gives the future: "we will go." "Bakra" confirms it\'s about tomorrow, not the past.',
      ar: '"b-" مع المضارع "narooH" (نحن نذهب) تعطي المستقبل: "we will go". وكلمة "bakra" تؤكد أنها عن الغد لا الماضي.',
    },
  },
  {
    id: "int-verb-004",
    type: "speaking",
    category: "verbs_with_pronouns",
    prompt: { en: 'Say "she will not work tomorrow" in Najdi Arabic.' },
    expectedAnswer: { ar: "ما ب تشتغل بكرة", translit: "Ma b-tishtaghil bakra", en: "She will not work tomorrow" },
    explanation: {
      en: '"Ma" negates the future-tense verb the same way it negates the present: "ma b-tishtaghil."',
      ar: '"ما" تنفي فعل المستقبل تماما كما تنفي المضارع: "ma b-tishtaghil".',
    },
  },
  {
    id: "int-verb-005",
    type: "speaking",
    category: "verbs_with_pronouns",
    prompt: { en: 'Say "I understood the book last week" in Najdi Arabic.' },
    expectedAnswer: { ar: "فهمت الكتاب الاسبوع الماضي", translit: "Fihimt al-kitaab al-usboo9 al-maaDi", en: "I understood the book last week" },
    explanation: {
      en: '"Ana" takes the past suffix "-t": "fihimt" = "I understood."',
      ar: '"أنا" تأخذ لاحقة الماضي "-t": "fihimt" تعني "I understood".',
    },
  },
  {
    id: "int-verb-006",
    type: "mcq",
    category: "verbs_with_pronouns",
    prompt: { en: 'Fix the mistake: "Hiya ma katab al-kitaab." What is wrong?' },
    options: [
      "Nothing, it's correct",
      "Should be \"katabat,\" since \"hiya\" takes the feminine past suffix \"-at\"",
      "Should use \"muu\" instead of \"ma\"",
      "Should be future tense, not past",
    ],
    correctIndex: 1,
    explanation: {
      en: '"Hiya" (she) needs the "-at" suffix even in a negative sentence: the correct form is "Hiya ma katabat al-kitaab" (she didn\'t write the book).',
      ar: '"هي" تحتاج لاحقة "-at" حتى في الجملة المنفية: الصيغة الصحيحة هي "Hiya ma katabat al-kitaab".',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: nouns_adjectives_with_pronouns (possession incl. -a/-t exception, 9ind)
  // ---------------------------------------------------------------
  {
    id: "int-noun-001",
    type: "mcq",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'How do you say "her car" using "sayaara" (car)?' },
    options: ["Sayaaraha", "Sayaartha", "Sayaarahha", "Sayaaratha"],
    correctIndex: 1,
    explanation: {
      en: '"Sayaara" ends in "-a," so the rule drops that vowel and inserts "-t" before the suffix: "sayaartha," not "sayaaratha" or "sayaaraha."',
      ar: '"سيارة" تنتهي بـ"-a"، فتُحذف ويُضاف "-t" قبل اللاحقة: "sayaartha"، وليس "sayaaratha" أو "sayaaraha".',
    },
  },
  {
    id: "int-noun-002",
    type: "mcq",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'How do you say "our room" using "ghurfa" (room)?' },
    options: ["Ghurfana", "Ghurftna", "Ghurfatna", "Ghurfna"],
    correctIndex: 1,
    explanation: {
      en: 'Same "-a -> -t" shift applies: "ghurfa" + "our" becomes "ghurftna," not "ghurfana."',
      ar: 'ينطبق نفس التحول "-a إلى -t": "غرفة" + "our" تصبح "ghurftna"، وليس "ghurfana".',
    },
  },
  {
    id: "int-noun-003",
    type: "reading",
    category: "nouns_adjectives_with_pronouns",
    prompt: { ar: "عندهم بيت كبير في الرياض", translit: "9indahum beet kabeer fi ar-Riyadh" },
    options: ["I have a big house in Riyadh", "We have a big house in Riyadh", "They have a big house in Riyadh", "She has a big house in Riyadh"],
    correctIndex: 2,
    explanation: {
      en: '"9ind" + "-ahum" ("their") expresses "they have": "9indahum beet kabeer" = "they have a big house."',
      ar: '"عند" + "-ahum" (their) تعبر عن "they have": "9indahum beet kabeer" تعني "they have a big house".',
    },
  },
  {
    id: "int-noun-004",
    type: "speaking",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'Say "we don\'t have a meeting today" in Najdi Arabic.' },
    expectedAnswer: { ar: "ما عندنا اجتماع اليوم", translit: "Ma 9indna ijtimaa9 al-yoom", en: "We don't have a meeting today" },
    explanation: {
      en: '"9indna" (we have) negates the same way as any other "9ind" phrase: "ma 9indna."',
      ar: '"عندنا" (we have) تُنفى بنفس الطريقة: "ma 9indna".',
    },
  },
  {
    id: "int-noun-005",
    type: "mcq",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'How do you say "their school" using "madrasa" (school)?' },
    options: ["Madrasahum", "Madrastahum", "Madrasthum", "Madrasatuhum"],
    correctIndex: 2,
    explanation: {
      en: '"Madrasa" follows the same "-a -> -t" rule as "sayaara" and "ghurfa": "madrasthum," not "madrasahum."',
      ar: '"مدرسة" تتبع نفس قاعدة "-a إلى -t" مثل "سيارة" و"غرفة": "madrasthum"، وليس "madrasahum".',
    },
  },
  {
    id: "int-noun-006",
    type: "speaking",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'A woman wants to say "I was tired yesterday." What does she say?' },
    expectedAnswer: { ar: "كنت تعبانة امبارح", translit: "Kunt ta9baana imbaariH", en: "I was tired yesterday (woman speaking)" },
    explanation: {
      en: '"Kunt" (I was) stays the same regardless of gender, but the adjective "ta9baana" still takes the feminine "-a" for a woman speaker.',
      ar: '"كنت" (I was) لا تتغير حسب الجنس، لكن الصفة "تعبانة" تأخذ "-a" المؤنث عند المتكلمة.',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: tenses (past + future + negation combined, medium sentences)
  // ---------------------------------------------------------------
  {
    id: "int-tense-001",
    type: "mcq",
    category: "tenses",
    prompt: { en: 'How do you say "I was at home, but I will go to work tomorrow"?' },
    options: [
      "Kunt fi al-beet, bass b-arooH ash-shughul bakra",
      "Ana fi al-beet, bass arooH ash-shughul bakra",
      "Kunt fi al-beet, bass riHt ash-shughul bakra",
      "B-akoon fi al-beet, bass arooH ash-shughul bakra",
    ],
    correctIndex: 0,
    explanation: {
      en: 'The first clause needs the past "kunt" (I was), and the second needs the future "b-arooH" (I will go) — mixing tenses correctly within one sentence is exactly the medium-sentence skill this level builds.',
      ar: 'الجملة الأولى تحتاج الماضي "kunt" (كنت)، والثانية تحتاج المستقبل "b-arooH" (سأذهب) — الدمج الصحيح بين الزمنين هو المهارة المطلوبة في هذا المستوى.',
    },
  },
  {
    id: "int-tense-002",
    type: "reading",
    category: "tenses",
    prompt: { ar: "ما شفت الكتاب امبارح، بس ب اشوفه بكرة", translit: "Ma shift al-kitaab imbaariH, bass b-ashoofah bakra" },
    options: [
      "I saw the email yesterday and tomorrow",
      "I didn't see the email yesterday, but I will see it tomorrow",
      "I will not see the email tomorrow",
      "She didn't see the email, but he will",
    ],
    correctIndex: 1,
    explanation: {
      en: '"Ma shift" negates the past ("didn\'t see"); "b-ashoofah" is future ("will see it"), with "bass" ("but") connecting the two contrasting ideas.',
      ar: '"ما شفت" تنفي الماضي (لم أرَ)؛ و"ب اشوفه" مستقبل (سأراه)، مع "بس" تربط بين الفكرتين المتناقضتين.',
    },
  },
  {
    id: "int-tense-003",
    type: "speaking",
    category: "tenses",
    prompt: { en: 'Say "they were not at the meeting last week" in Najdi Arabic.' },
    expectedAnswer: { ar: "ما كانوا في الاجتماع الاسبوع الماضي", translit: "Ma kaanoo fi al-ijtimaa9 al-usboo9 al-maaDi", en: "They were not at the meeting last week" },
    explanation: {
      en: '"Kaanoo" (they were) negates with "ma," same as any past-tense verb.',
      ar: '"كانوا" (they were) تُنفى بـ"ما"، مثل أي فعل ماضٍ آخر.',
    },
  },
  {
    id: "int-tense-004",
    type: "mcq",
    category: "tenses",
    prompt: { en: 'How do you say "you all will not go because you all are tired"?' },
    options: [
      "Ma b-trooHoon 9ashaan intoo ta9baaneen",
      "Ma riHtoo 9ashaan intoo ta9baaneen",
      "B-trooHoon 9ashaan intoo ta9baaneen",
      "Ma trooHoon 9ashaan intoo ta9baaneen",
    ],
    correctIndex: 0,
    explanation: {
      en: '"TrooHoon" needs the future "b-" prefix since this is about an upcoming decision, and "ma" negates it: "ma b-trooHoon." "9ashaan" introduces the reason as a standalone connector, followed by its own subject ("intoo").',
      ar: '"trooHoon" تحتاج سابقة المستقبل "b-" لأن الجملة عن قرار مستقبلي، و"ما" تنفيها: "ma b-trooHoon". و"عشان" تقدم السبب كأداة ربط مستقلة، تليها فاعلها الخاص ("انتوا").',
    },
  },
  {
    id: "int-tense-005",
    type: "speaking",
    category: "tenses",
    prompt: { en: 'Say "I will not see him because I have a meeting" in Najdi Arabic.' },
    expectedAnswer: { ar: "ما ب اشوفه عشان عندي اجتماع", translit: "Ma b-ashoofah 9ashaan 9indi ijtimaa9", en: "I will not see him because I have a meeting" },
    explanation: {
      en: '"Ma b-ashoofah" negates the future ("I will not see him"); "9ashaan" introduces the reason as a standalone connector, followed by present-tense "9indi" (I have).',
      ar: '"ما ب اشوفه" تنفي المستقبل (لن أراه)؛ و"عشان" تقدم السبب كأداة ربط مستقلة، تليها "عندي" في المضارع (I have).',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: negation (new category at this level, building on Ch.13)
  // ---------------------------------------------------------------
  {
    id: "int-neg-001",
    type: "mcq",
    category: "negation",
    prompt: { en: 'Which sentence correctly uses the fused negative form for "he is not"?' },
    options: ["Hoo muu mawjood", "Maahu mawjood", "Ma hoo mawjood", "Muu hoo mawjood"],
    correctIndex: 1,
    explanation: {
      en: '"Maahu" fuses "muu" + "hoo" into one word, the natural form Najdi speakers actually use. "Hoo muu mawjood" is also correct, just more deliberate-sounding.',
      ar: '"ماهو" تدمج "muu" + "hoo" في كلمة واحدة، وهي الصيغة الطبيعية التي يستخدمها أهل نجد. "Hoo muu mawjood" صحيحة أيضا، لكنها أكثر تأنيا.',
    },
  },
  {
    id: "int-neg-002",
    type: "reading",
    category: "negation",
    prompt: { ar: "ماهي معانا اليوم، هي تعبانة", translit: "Maahi ma9aana al-yoom, hiya ta9baana" },
    options: ["She is with us today because she is tired", "She is not with us today, she is tired", "He is not with us because he is tired", "We are not with her today"],
    correctIndex: 1,
    explanation: {
      en: '"Maahi" fuses "muu" + "hiya" ("she is not"). The second clause "hiya ta9baana" (she is tired) gives the reason as a separate statement.',
      ar: '"ماهي" تدمج "muu" + "hiya" (she is not). والجملة الثانية "هي تعبانة" (she is tired) تقدم السبب كجملة مستقلة.',
    },
  },
  {
    id: "int-neg-003",
    type: "speaking",
    category: "negation",
    prompt: { en: 'Say "we are not tired" using the fused negative form.' },
    expectedAnswer: { ar: "ماحنا تعبانين", translit: "MaaHna ta9baaneen", en: "We are not tired" },
    explanation: {
      en: '"MaaHna" fuses "muu" + "niHna" ("we are not"). The adjective takes the plural "-een" ending.',
      ar: '"ماحنا" تدمج "muu" + "niHna" (we are not). والصفة تأخذ نهاية الجمع "-een".',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: medium sentences (full sentences combining 2+ patterns)
  // ---------------------------------------------------------------
  {
    id: "int-sent-001",
    type: "mcq",
    category: "tenses",
    prompt: { en: 'Choose the correct translation: "I have a meeting tomorrow, so I will not go to the market."' },
    options: [
      "9indi ijtimaa9 bakra, fa ma b-arooH as-sooq",
      "Kaan 9indi ijtimaa9 bakra, fa ma riHt as-sooq",
      "9indi ijtimaa9 imbaariH, fa b-arooH as-sooq",
      "Ma 9indi ijtimaa9 bakra, fa b-arooH as-sooq",
    ],
    correctIndex: 0,
    explanation: {
      en: '"9indi ijtimaa9 bakra" (I have a meeting tomorrow) sets up the reason, and "fa ma b-arooH as-sooq" (so I will not go to the market) gives the future-tense, negated result.',
      ar: '"عندي اجتماع بكرة" (لدي اجتماع غدا) تمهد للسبب، و"فا ما ب اروح السوق" (لذلك لن أذهب للسوق) تعطي النتيجة بصيغة المستقبل المنفية.',
    },
  },
  {
    id: "int-sent-002",
    type: "reading",
    category: "tenses",
    prompt: { ar: "كانت تعبانة امبارح، بس اليوم زينة", translit: "Kaanat ta9baana imbaariH, bass al-yoom zeena" },
    options: [
      "She is tired today, but was fine yesterday",
      "She was tired yesterday, but today she's fine",
      "He was tired yesterday",
      "She is tired and will be tired tomorrow too",
    ],
    correctIndex: 1,
    explanation: {
      en: '"Kaanat ta9baana imbaariH" (she was tired yesterday) sets the past scene with "kaanat," and "bass al-yoom zeena" (but today she\'s fine) contrasts it with the present.',
      ar: '"كانت تعبانة امبارح" (كانت متعبة بالأمس) تمهد للمشهد الماضي بـ"كانت"، و"بس اليوم زينة" (لكنها بخير اليوم) تقابله بالحاضر.',
    },
  },
  {
    id: "int-sent-003",
    type: "speaking",
    category: "tenses",
    prompt: { en: 'Say "I don\'t have her phone, but I will see her tomorrow" in Najdi Arabic.' },
    expectedAnswer: {
      ar: "ما عندي جوالها، بس ب اشوفها بكرة",
      translit: "Ma 9indi jawaalha, bass b-ashoofha bakra",
      en: "I don't have her phone, but I will see her tomorrow",
    },
    explanation: {
      en: 'This combines negated "9ind" possession with a future-tense verb joined by "bass" (but) — the exact kind of two-clause medium sentence this level builds toward.',
      ar: 'هذه الجملة تجمع بين نفي الملكية بـ"عند" وفعل في المستقبل مربوطين بـ"بس" — وهذا هو نوع الجملة المتوسطة المستهدف في هذا المستوى.',
    },
  },
  {
    id: "int-sent-004",
    type: "mcq",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'Choose the correct translation: "Their house is not big, but our house is big."' },
    options: [
      "Beethum muu kabeer, bass beetna kabeer",
      "Beethum kabeer, bass beetna muu kabeer",
      "Beetna muu kabeer, bass beethum kabeer",
      "Beethum maahu kabeer, bass beetha kabeer",
    ],
    correctIndex: 0,
    explanation: {
      en: '"Beethum" (their house) + "muu kabeer" (not big), contrasted with "beetna" (our house) + "kabeer" (big), joined by "bass" (but).',
      ar: '"بيتهم" (their house) + "مو كبير" (not big)، بالمقابل مع "بيتنا" (our house) + "كبير" (big)، مربوطين بـ"بس" (but).',
    },
  },
  {
    id: "int-vocab-004",
    type: "mcq",
    category: "vocabulary",
    prompt: { en: 'How do you say "after a while" or "soon" in Najdi Arabic?' },
    options: ["Bakra", "Ba9ad shway", "Gabel", "Al-yoom"],
    correctIndex: 1,
    explanation: {
      en: '"Ba9ad shway" means "after a while" or "soon." "Bakra" is "tomorrow," "gabel" is "before."',
      ar: '"بعد شوي" تعني after a while أو soon. "بكرة" تعني tomorrow، و"قبل" تعني before.',
    },
  },
  {
    id: "int-verb-007",
    type: "speaking",
    category: "verbs_with_pronouns",
    prompt: { en: 'Say "you all worked well last week" (speaking to a group) in Najdi Arabic.' },
    expectedAnswer: { ar: "اشتغلتوا زين الاسبوع الماضي", translit: "Ishtaghaltoo zeen al-usboo9 al-maaDi", en: "You all worked well last week" },
    explanation: {
      en: '"Intoo" (you all) takes the past-tense suffix "-too": "ishtaghaltoo."',
      ar: '"انتوا" تأخذ لاحقة الماضي "-too": "ishtaghaltoo".',
    },
  },
  {
    id: "int-noun-007",
    type: "reading",
    category: "nouns_adjectives_with_pronouns",
    prompt: { ar: "ما عندك وقت اليوم، بس عندك وقت بكرة", translit: "Ma 9indak waqt al-yoom, bass 9indak waqt bakra" },
    options: [
      "You have time today and tomorrow",
      "You don't have time today, but you have time tomorrow",
      "You don't have time at all",
      "She doesn't have time today",
    ],
    correctIndex: 1,
    explanation: {
      en: '"Ma 9indak" negates "you have" for today, while the second clause (no "ma") confirms "you have" time tomorrow.',
      ar: '"ما عندك" تنفي "تملك" لليوم، بينما الجملة الثانية (بلا "ما") تؤكد أن "تملك" وقتا غدا.',
    },
  },
  {
    id: "int-tense-006",
    type: "mcq",
    category: "tenses",
    prompt: { en: 'How do you say "he didn\'t understand because he wasn\'t there"?' },
    options: [
      "Ma fihim 9ashaan ma kaan mawjood",
      "Ma yifham 9ashaan muu mawjood",
      "Fihim 9ashaan kaan mawjood",
      "Ma fihim 9ashaan b-yikoon mawjood",
    ],
    correctIndex: 0,
    explanation: {
      en: 'Both clauses are past tense: "ma fihim" (he didn\'t understand) and "ma kaan mawjood" (he wasn\'t there), linked by "9ashaan" (because he).',
      ar: 'كلا الجملتين بصيغة الماضي: "ما فهم" (لم يفهم) و"ما كان موجود" (لم يكن موجودا)، مربوطتين بـ"عشان" (because he).',
    },
  },
  {
    id: "int-neg-004",
    type: "speaking",
    category: "negation",
    prompt: { en: 'Say "you (to a man) are not a student" using the fused negative form.' },
    expectedAnswer: { ar: "مانك طالب", translit: "Maanak Taalib", en: "You are not a student (to a man)" },
    explanation: {
      en: '"Maanak" fuses "muu" + "inta" ("you, masculine, are not").',
      ar: '"مانك" تدمج "muu" + "inta" (you are not, مذكر).',
    },
  },
];

export const intermediateMeta = {
  level: "intermediate",
  totalQuestions: intermediateQuestions.length,
  categories: [
    "vocabulary",
    "verbs_with_pronouns",
    "nouns_adjectives_with_pronouns",
    "tenses",
    "negation",
  ],
};
