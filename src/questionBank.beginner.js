/**
 * questionBank.beginner.js
 *
 * Beginner-level question bank for the Najdi Arabic speaking app.
 *
 * SOURCING NOTE: every grammatical fact used here (the four verb prefixes
 * a-/ti-/yi-/ni-, the two verb suffixes -een/-oon, the eight possessive
 * suffixes, and the masculine/feminine adjective agreement rule) is taken
 * directly from the already-verified content in Chapters 1, 5, and 6 of
 * "Speaking Najdi" v4.3. No new grammatical claims are introduced here.
 *
 * However, the specific vocabulary, example sentences, and distractors
 * below are NEWLY WRITTEN for this app and do not duplicate the book's own
 * example sentences, per instruction. Where a question reuses a verb or
 * noun the book already covers (e.g. "rooH," "kitaab"), the surrounding
 * sentence and quiz framing are original.
 *
 * Question types:
 *  - mcq         : multiple choice, 4 options
 *  - reading     : show Arabic, user reads/translates, MCQ-graded
 *  - speaking    : show English or Arabic prompt, user speaks the Najdi
 *                  answer aloud; graded via ASR transcription match
 *
 * Each question has:
 *  - id, type, category
 *  - prompt: { ar, translit, en }   (any may be empty depending on type)
 *  - options (mcq only)
 *  - correctIndex (mcq only)
 *  - expectedAnswer: { ar, translit, en }  (speaking only — what we grade against)
 *  - explanation: { en, ar }   shown on wrong answer (and always, for Beginner)
 */

export const beginnerQuestions = [
  // ---------------------------------------------------------------
  // CATEGORY: vocabulary
  // ---------------------------------------------------------------
  {
    id: "beg-vocab-001",
    type: "mcq",
    category: "vocabulary",
    prompt: { en: 'How do you say "thank you" in Najdi Arabic?' },
    options: [
      { ar: "يلا", translit: "Yallah" },
      { ar: "شكرا", translit: "Shukran" },
      { ar: "يمكن", translit: "Yimkin" },
      { ar: "ابدا", translit: "Abadan" },
    ],
    correctIndex: 1,
    explanation: {
      en: '"Shukran" means "thank you." "Yallah" means "let\'s go / come on," "yimkin" means "maybe," and "abadan" means "never."',
      ar: '"شكرا" تعني "thank you". "يلا" تعني "هيا بنا"، و"يمكن" تعني "maybe"، و"ابدا" تعني "never".',
    },
  },
  {
    id: "beg-vocab-002",
    type: "mcq",
    category: "vocabulary",
    prompt: { ar: "بيت", translit: "Beet", en: "" },
    options: ["Car", "House", "Book", "Water"],
    correctIndex: 1,
    explanation: {
      en: '"Beet" means "house." Keep it separate from "kitaab" (book) and "sayaara" (car).',
      ar: '"بيت" تعني "house". لا تخلطها مع "كتاب" (book) أو "سيارة" (car).',
    },
  },
  {
    id: "beg-vocab-003",
    type: "mcq",
    category: "vocabulary",
    prompt: { en: 'Which word means "water"?' },
    options: [
      { ar: "شاي", translit: "Shaay" },
      { ar: "قهوة", translit: "Qahwa" },
      { ar: "ماء", translit: "Maa" },
      { ar: "حليب", translit: "Haleeb" },
    ],
    correctIndex: 2,
    explanation: {
      en: '"Maa" is water. "Shaay" is tea, "qahwa" is coffee, "Haleeb" is milk.',
      ar: '"ماء" تعني الماء. "شاي" تعني tea، "قهوة" تعني coffee، "حليب" تعني milk.',
    },
  },
  {
    id: "beg-vocab-004",
    type: "reading",
    category: "vocabulary",
    prompt: { ar: "سيارة", translit: "Sayaara" },
    options: ["Phone", "Car", "Street", "Bag"],
    correctIndex: 1,
    explanation: {
      en: '"Sayaara" means "car." This is the same noun used later for possession practice (sayaarti = my car).',
      ar: '"سيارة" تعني car. هذا الاسم نفسه سنستخدمه لاحقا مع الملكية (سيارتي = my car).',
    },
  },
  {
    id: "beg-vocab-005",
    type: "speaking",
    category: "vocabulary",
    prompt: { en: 'Say the Najdi word for "coffee."' },
    expectedAnswer: { ar: "قهوة", translit: "Qahwa", en: "Coffee" },
    explanation: {
      en: '"Qahwa" means "coffee." Arabic coffee is central to Najdi hospitality, you will hear this word constantly.',
      ar: '"قهوة" تعني coffee. القهوة العربية جزء أساسي من الضيافة النجدية، وستسمع هذه الكلمة كثيرا.',
    },
  },
  {
    id: "beg-vocab-006",
    type: "speaking",
    category: "vocabulary",
    prompt: { en: 'Say the Najdi word for "today."' },
    expectedAnswer: { ar: "اليوم", translit: "Al-yoom", en: "Today" },
    explanation: {
      en: '"Al-yoom" means "today." You will see this paired with adjectives often, e.g. "tired today."',
      ar: '"اليوم" تعني today. ستجدها غالبا مع الصفات، مثل "تعبان اليوم".',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: verbs_with_pronouns
  // (grounded in Ch.5's a-/ti-/yi-/ni- + -een/-oon system)
  // ---------------------------------------------------------------
  {
    id: "beg-verb-001",
    type: "mcq",
    category: "verbs_with_pronouns",
    prompt: { en: 'How do you say "I understand" in Najdi Arabic?' },
    options: [
      { ar: "تفهم", translit: "Tifham" },
      { ar: "افهم", translit: "Afham" },
      { ar: "يفهم", translit: "Yifham" },
      { ar: "نفهم", translit: "Nifham" },
    ],
    correctIndex: 1,
    explanation: {
      en: '"Ana" takes the prefix "a-," so "I understand" is "afham." "Tifham" is you(m)/she, "yifham" is he, "nifham" is we.',
      ar: '"انا" تأخذ السابقة "a-"، فتكون "أنا أفهم" هي "afham". "tifham" لـ أنت/هي، "yifham" لـ هو، "nifham" لـ نحن.',
    },
  },
  {
    id: "beg-verb-002",
    type: "mcq",
    category: "verbs_with_pronouns",
    prompt: { en: 'You are asking a woman: "Do you hear?" Which form is correct?' },
    options: [
      { ar: "تسمع", translit: "Tisma9" },
      { ar: "تسمعين", translit: "Tisma9een" },
      { ar: "يسمع", translit: "Yisma9" },
      { ar: "اسمع", translit: "Asma9" },
    ],
    correctIndex: 1,
    explanation: {
      en: '"Inti" (you, feminine) takes "ti-" plus the suffix "-een": "tisma9een." "Tisma9" alone (no suffix) would sound like "you, masculine" or "she."',
      ar: '"انتي" تأخذ "ti-" مع اللاحقة "-een": "tisma9een". أما "tisma9" بدون اللاحقة فتبدو مثل صيغة "أنت" المذكر أو "هي".',
    },
  },
  {
    id: "beg-verb-003",
    type: "mcq",
    category: "verbs_with_pronouns",
    prompt: { en: 'How do you say "they study" (a group of people)?' },
    options: [
      { ar: "يدرس", translit: "Yidrus" },
      { ar: "تدرسون", translit: "Tidrusoon" },
      { ar: "يدرسون", translit: "Yidrusoon" },
      { ar: "ندرس", translit: "Nidrus" },
    ],
    correctIndex: 2,
    explanation: {
      en: '"Hoom" (they) takes the prefix "yi-" plus the plural suffix "-oon": "yidrusoon." "Tidrusoon" with "ti-" would mean "you all study," not "they."',
      ar: '"هم" تأخذ السابقة "yi-" مع لاحقة الجمع "-oon": "yidrusoon". أما "tidrusoon" بـ"ti-" فتعني "أنتم تدرسون"، لا "هم".',
    },
  },
  {
    id: "beg-verb-004",
    type: "reading",
    category: "verbs_with_pronouns",
    prompt: { ar: "نحنا نعرف الجواب", translit: "niHna ni9rif al-jawaab" },
    options: [
      "I know the answer",
      "We know the answer",
      "They know the answer",
      "You all know the answer",
    ],
    correctIndex: 1,
    explanation: {
      en: '"niHna" (we) pairs with the prefix "ni-": "ni9rif" = "we know." The sentence means "We know the answer."',
      ar: '"نحنا" تأخذ السابقة "ni-": "ni9rif" تعني "we know". والجملة معناها "نحن نعرف الجواب".',
    },
  },
  {
    id: "beg-verb-005",
    type: "speaking",
    category: "verbs_with_pronouns",
    prompt: { en: 'Say "he understands" in Najdi Arabic.' },
    expectedAnswer: { ar: "يفهم", translit: "Yifham", en: "He understands" },
    explanation: {
      en: '"Hoo" (he) takes the prefix "yi-": "yifham."',
      ar: '"هو" تأخذ السابقة "yi-": "yifham".',
    },
  },
  {
    id: "beg-verb-006",
    type: "speaking",
    category: "verbs_with_pronouns",
    prompt: { en: 'Say "you all hear" (speaking to a group) in Najdi Arabic.' },
    expectedAnswer: { ar: "تسمعون", translit: "Tisma9oon", en: "You all hear" },
    explanation: {
      en: '"Intoo" (you all) takes "ti-" plus the plural suffix "-oon": "tisma9oon."',
      ar: '"انتوا" تأخذ "ti-" مع لاحقة الجمع "-oon": "tisma9oon".',
    },
  },
  {
    id: "beg-verb-007",
    type: "mcq",
    category: "verbs_with_pronouns",
    prompt: { en: '"Tifham" can mean two different things depending on context. What are they?' },
    options: [
      "I understand / we understand",
      "You (m) understand / she understands",
      "He understands / they understand",
      "You all understand / they understand",
    ],
    correctIndex: 1,
    explanation: {
      en: '"ti-" is shared by "you" (masculine) and "she," so "tifham" alone could mean either, resolved by context — exactly the same collision the book points out for "tirooH."',
      ar: '"ti-" مشتركة بين "أنت" (مذكر) و"هي"، فـ"tifham" قد تعني أيا منهما حسب السياق، تماما كما في حالة "tirooH" في الكتاب.',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: nouns_adjectives_with_pronouns
  // (grounded in Ch.5 adjective-gender-agreement + Ch.6 possessive suffixes)
  // ---------------------------------------------------------------
  {
    id: "beg-noun-001",
    type: "mcq",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'A woman wants to say "I am tired." Which is correct?' },
    options: [
      { ar: "انا تعبان", translit: "Ana ta9baan" },
      { ar: "انا تعبانة", translit: "Ana ta9baana" },
      { ar: "انا تعبانين", translit: "Ana ta9baaneen" },
      { ar: "انا تعبانون", translit: "Ana ta9baanoon" },
    ],
    correctIndex: 1,
    explanation: {
      en: 'The pronoun "Ana" never changes, but adjectives still agree with the speaker\'s gender. A woman adds the feminine "-a": "ta9baana."',
      ar: '"أنا" لا تتغير، لكن الصفة تتفق مع جنس المتكلم. المرأة تضيف "-a" للمؤنث: "ta9baana".',
    },
  },
  {
    id: "beg-noun-002",
    type: "mcq",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'How do you say "my phone" in Najdi Arabic, using "jawaal" (phone)?' },
    options: [
      { ar: "جوالها", translit: "Jawaalha" },
      { ar: "جوالك", translit: "Jawaalak" },
      { ar: "جوالي", translit: "Jawaali" },
      { ar: "جوالكم", translit: "Jawaalkum" },
    ],
    correctIndex: 2,
    explanation: {
      en: 'The suffix "-i" marks "my," matching "Ana": "jawaali."',
      ar: 'اللاحقة "-i" تعني "my" وتطابق "أنا": "jawaali".',
    },
  },
  {
    id: "beg-noun-003",
    type: "mcq",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'You want to say "her book." Which is correct, using "kitaab" (book)?' },
    options: [
      { ar: "كتابه", translit: "Kitaabah" },
      { ar: "كتابها", translit: "Kitaabha" },
      { ar: "كتابكم", translit: "Kitaabkum" },
      { ar: "كتابهم", translit: "Kitaabhum" },
    ],
    correctIndex: 1,
    explanation: {
      en: '"-ha" marks "her" (kitaabha). Be careful not to confuse it with "-ah" (his, kitaabah) — the book specifically warns about this mix-up.',
      ar: '"-ha" تعني "her" (kitaabha). احذر الخلط بينها وبين "-ah" التي تعني "his" (kitaabah)، وهذا تنويه موجود في الكتاب أيضا.',
    },
  },
  {
    id: "beg-noun-004",
    type: "reading",
    category: "nouns_adjectives_with_pronouns",
    prompt: { ar: "هذا بيتكم", translit: "Haadha beetkum" },
    options: ["This is my house", "This is his house", "This is your (pl.) house", "This is their house"],
    correctIndex: 2,
    explanation: {
      en: '"-kum" marks "your," speaking to a group: "beetkum" = "your (all) house."',
      ar: '"-kum" تعني "your" عند خطاب الجماعة: "beetkum" تعني "بيتكم".',
    },
  },
  {
    id: "beg-noun-005",
    type: "speaking",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'Say "our house" in Najdi Arabic, using "beet" (house).' },
    expectedAnswer: { ar: "بيتنا", translit: "Beetna", en: "Our house" },
    explanation: {
      en: '"-na" marks "our": "beetna."',
      ar: '"-na" تعني "our": "بيتنا".',
    },
  },
  {
    id: "beg-noun-006",
    type: "speaking",
    category: "nouns_adjectives_with_pronouns",
    prompt: { en: 'A man wants to say "I am tired." What does he say?' },
    expectedAnswer: { ar: "انا تعبان", translit: "Ana ta9baan", en: "I am tired (man speaking)" },
    explanation: {
      en: 'A man says "ta9baan"; a woman would say "ta9baana," adding the feminine "-a."',
      ar: 'الرجل يقول "ta9baan"؛ والمرأة تقول "ta9baana" بإضافة "-a" للمؤنث.',
    },
  },

  // ---------------------------------------------------------------
  // CATEGORY: tenses (present tense focus for Beginner)
  // ---------------------------------------------------------------
  {
    id: "beg-tense-001",
    type: "mcq",
    category: "tenses",
    prompt: { en: 'How do you say "I drink tea" in Najdi Arabic?' },
    options: [
      { ar: "اشرب شاي", translit: "Ashrab shaay" },
      { ar: "تشرب شاي", translit: "Tishrab shaay" },
      { ar: "يشرب شاي", translit: "Yishrab shaay" },
      { ar: "نشرب شاي", translit: "Nishrab shaay" },
    ],
    correctIndex: 0,
    explanation: {
      en: '"Ana" + "a-" prefix gives "ashrab." The full sentence is "Ashrab shaay" (I drink tea).',
      ar: '"أنا" + السابقة "a-" تعطي "ashrab". الجملة كاملة: "Ashrab shaay" (أنا أشرب الشاي).',
    },
  },
  {
    id: "beg-tense-002",
    type: "mcq",
    category: "tenses",
    prompt: { en: 'Which sentence correctly says "She studies at home"?' },
    options: [
      { ar: "هي يدرس في البيت", translit: "Hiya yidrus fi al-beet" },
      { ar: "هي تدرس في البيت", translit: "Hiya tidrus fi al-beet" },
      { ar: "هي تدرسين في البيت", translit: "Hiya tidruseen fi al-beet" },
      { ar: "هي ندرس في البيت", translit: "Hiya nidrus fi al-beet" },
    ],
    correctIndex: 1,
    explanation: {
      en: '"Hiya" (she) takes the "ti-" prefix with no extra suffix: "tidrus." The "-een" suffix in option 3 only applies to "Inti" (you, feminine), not "Hiya."',
      ar: '"هي" تأخذ السابقة "ti-" بدون أي لاحقة إضافية: "tidrus". أما اللاحقة "-een" في الخيار الثالث فهي خاصة بـ"انتي" فقط، وليس "هي".',
    },
  },
  {
    id: "beg-tense-003",
    type: "reading",
    category: "tenses",
    prompt: { ar: "هم يشربون قهوة", translit: "Hoom yishraboon qahwa" },
    options: ["He drinks coffee", "We drink coffee", "They drink coffee", "You all drink coffee"],
    correctIndex: 2,
    explanation: {
      en: '"Hoom" (they) takes "yi-" plus "-oon": "yishraboon" = "they drink."',
      ar: '"هم" تأخذ "yi-" مع "-oon": "yishraboon" تعني "they drink".',
    },
  },
  {
    id: "beg-tense-004",
    type: "speaking",
    category: "tenses",
    prompt: { en: 'Say "we understand the book" in Najdi Arabic.' },
    expectedAnswer: { ar: "نحنا نفهم الكتاب", translit: "niHna nifham al-kitaab", en: "We understand the book" },
    explanation: {
      en: '"niHna" (we) takes the prefix "ni-": "nifham" = "we understand."',
      ar: '"نحنا" تأخذ السابقة "ni-": "nifham" تعني "we understand".',
    },
  },
  {
    id: "beg-tense-005",
    type: "speaking",
    category: "tenses",
    prompt: { en: 'Say "you (speaking to a woman) study every day" in Najdi Arabic.' },
    expectedAnswer: { ar: "انتي تدرسين كل يوم", translit: "Inti tidruseen kil yoom", en: "You (f) study every day" },
    explanation: {
      en: '"Inti" takes "ti-" plus the feminine suffix "-een": "tidruseen." Leaving off "-een" is the single most common beginner mistake the book warns about.',
      ar: '"انتي" تأخذ "ti-" مع لاحقة المؤنث "-een": "tidruseen". وحذف "-een" هو الخطأ الأكثر شيوعا عند المبتدئين كما ينبه الكتاب.',
    },
  },
  {
    id: "beg-tense-006",
    type: "mcq",
    category: "tenses",
    prompt: { en: 'Fix the mistake: "Inti tifham al-kitaab?" What is wrong?' },
    options: [
      "Nothing, it's correct",
      "It should be \"tifhameen,\" the -een suffix is missing",
      "It should use \"yi-\" instead of \"ti-\"",
      "It should use \"ni-\" instead of \"ti-\"",
    ],
    correctIndex: 1,
    explanation: {
      en: 'Speaking to a woman ("Inti") requires the suffix "-een" on top of "ti-": the correct form is "tifhameen al-kitaab?"',
      ar: 'عند مخاطبة امرأة ("انتي") يجب إضافة اللاحقة "-een" فوق "ti-": والصيغة الصحيحة هي "tifhameen al-kitaab?"',
    },
  },
];

export const beginnerMeta = {
  level: "beginner",
  totalQuestions: beginnerQuestions.length,
  categories: [
    "vocabulary",
    "verbs_with_pronouns",
    "nouns_adjectives_with_pronouns",
    "tenses",
  ],
};
