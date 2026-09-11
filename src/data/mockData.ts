import type { LanguageCourse, SMMCourse, Testimonial, FAQItem, ServiceItem } from '../types';

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    alt: 'CELAVIE Academy Interactive Classroom',
    caption: 'Interactive language learning session',
  },
  {
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    alt: 'Nice Exchange French Riviera Excursion',
    caption: 'Summer immersion trip on the French Riviera',
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    alt: 'SMM Marketing Strategy Workshop',
    caption: 'SMM Academy team strategy workshop',
  },
  {
    url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800',
    alt: 'Vieux Nice Cultural Exploration',
    caption: 'Exploring historical sites in Old Town Nice',
  },
  {
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    alt: 'Student Conversation Practice',
    caption: 'Native tutor speaking club meeting',
  },
  {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    alt: 'Certification & Graduation Event',
    caption: 'Graduation celebration for language tracks',
  },
];

export const LANGUAGE_COURSES: LanguageCourse[] = [
  {
    id: 'lang-french',
    slug: 'french',
    title: 'French Language Mastery',
    subtitle: 'Immerse yourself in French language and culture from A1 to C2.',
    description: 'Master French with native-speaking certified tutors. Structured curriculum covering grammar, vocabulary, pronunciation, and practical conversational fluency.',
    category: 'language',
    language: 'French',
    flagEmoji: '🇫🇷',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks per Level',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper Intermediate', 'C1 Advanced', 'C2 Proficiency'],
    features: ['Live Interactive Sessions', 'Native Instructors', 'DELF/DALF Exam Prep', 'Cultural Immersion Workshops'],
    whatYouWillLearn: [
      'Confidential and fluent spoken French in everyday and professional scenarios',
      'Advanced French grammar, syntax, and nuanced vocabulary',
      'Listening comprehension for native accents and colloquialisms',
      'Preparation for official DELF/DALF certification exams'
    ],
    learningPath: [
      { step: 1, title: 'Foundations & Phonics', description: 'Master pronunciation, basic greetings, and core sentence structures.' },
      { step: 2, title: 'Conversational Confidence', description: 'Build vocabulary for travel, dining, and daily interactions.' },
      { step: 3, title: 'Grammar & Writing', description: 'Dive deep into tenses, complex clauses, and formal writing.' },
      { step: 4, title: 'Fluency & Certification', description: 'Advanced debate, literature review, and exam prep.' }
    ],
    schedule: ['Mon & Wed: 18:00 - 19:30 CET', 'Tue & Thu: 19:00 - 20:30 CET', 'Saturday Intensive: 10:00 - 13:00 CET'],
    niceExchangeAddon: true,
    faq: [
      { question: 'Is prior French knowledge required?', answer: 'No, we offer absolute beginner courses starting at level A1.' },
      { question: 'How is the Nice Exchange program related to this course?', answer: 'Students enrolled in French courses get priority access to our summer immersion exchange in Nice, France.' }
    ]
  },
  {
    id: 'lang-english',
    slug: 'english',
    title: 'English Global Communication',
    subtitle: 'Achieve global professional and academic English fluency.',
    description: 'Accelerate your career and academic opportunities with comprehensive English language courses focused on business communication, academic writing, and TOEFL/IELTS preparation.',
    category: 'language',
    language: 'English',
    flagEmoji: '🇬🇧',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    features: ['Business English Focus', 'IELTS & TOEFL Prep', 'Public Speaking Practice', '1-on-1 Feedback'],
    whatYouWillLearn: [
      'Natural conversational fluency and idiom usage',
      'Professional email writing, presentations, and negotiations',
      'Standardized test strategies for IELTS and TOEFL',
      'Flawless pronunciation and accent softening techniques'
    ],
    learningPath: [
      { step: 1, title: 'Basic Fluency', description: 'Essential communication, grammar basics, and essential vocabulary.' },
      { step: 2, title: 'Intermediate Immersion', description: 'Real-world dialogue, news discussion, and practical grammar.' },
      { step: 3, title: 'Professional English', description: 'Corporate presentations, negotiations, and technical vocabulary.' },
      { step: 4, title: 'Mastery & Testing', description: 'Advanced academic writing and official test mock exams.' }
    ],
    schedule: ['Mon & Wed: 19:00 - 20:30 CET', 'Tue & Thu: 18:00 - 19:30 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Do you offer IELTS test preparation?', answer: 'Yes, our B2-C1 courses include targeted IELTS and TOEFL preparation modules.' }
    ]
  },
  {
    id: 'lang-italian',
    slug: 'italian',
    title: 'Italian Language & Culture',
    subtitle: 'Discover the beauty of Italian literature, art, and conversation.',
    description: 'Learn Italian with native experts. Experience the rich culture, history, and expressive nature of Italian language learning.',
    category: 'language',
    language: 'Italian',
    flagEmoji: '🇮🇹',
    level: 'All Levels (A1-C2)',
    duration: '10 Weeks',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    features: ['Native Italian Tutors', 'Cultural Seminars', 'Small Group Practice', 'CILS Exam Guidance'],
    whatYouWillLearn: [
      'Master conversational Italian for travel, study, or living in Italy',
      'Italian grammar fundamentals and idiomatic expressions',
      'Italian art, cuisine, and business culture insights',
      'Listening comprehension with authentic Italian media'
    ],
    learningPath: [
      { step: 1, title: 'Primer', description: 'Basic expressions, alphabet, and fundamental verb conjugations.' },
      { step: 2, title: 'Daily Conversation', description: 'Ordering food, navigating cities, and casual dialogue.' },
      { step: 3, title: 'Intermediate Skills', description: 'Past tenses, subjunctive mood, and formal letters.' },
      { step: 4, title: 'Fluency', description: 'Debates, cinema analysis, and advanced literature.' }
    ],
    schedule: ['Tue & Thu: 18:30 - 20:00 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Can I take Italian online?', answer: 'Yes, all our standard language courses are offered live online.' }
    ]
  },
  {
    id: 'lang-spanish',
    slug: 'spanish',
    title: 'Spanish Conversational & Business',
    subtitle: 'Connect with over 500 million Spanish speakers worldwide.',
    description: 'Dynamic Spanish language training tailored for students, travelers, and professionals looking to excel in Hispanic markets.',
    category: 'language',
    language: 'Spanish',
    flagEmoji: '🇪🇸',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    features: ['DELE Preparation', 'Castilian & Latin American Dialects', 'Interactive Roleplay', 'Flexible Scheduling'],
    whatYouWillLearn: [
      'Fluency in both Peninsular and Latin American Spanish variations',
      'Comprehensive grasp of Spanish grammar and conjugation',
      'Confidence in professional and social settings',
      'Preparation for official DELE certification'
    ],
    learningPath: [
      { step: 1, title: 'Inicio', description: 'Alphabet, simple phrases, and basic present tense.' },
      { step: 2, title: 'Comunicación', description: 'Expressing opinions, travel scenarios, and past tenses.' },
      { step: 3, title: 'Perfeccionamiento', description: 'Subjunctive, business communication, and formal writing.' },
      { step: 4, title: 'Dominio', description: 'Advanced literature, negotiation, and DELE exam strategy.' }
    ],
    schedule: ['Mon & Wed: 18:00 - 19:30 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Do you teach Latin American or European Spanish?', answer: 'We cover both standard Castilian and key Latin American variants.' }
    ]
  },
  {
    id: 'lang-german',
    slug: 'german',
    title: 'German Academic & Professional',
    subtitle: 'Precision language learning for study, work, and life in DACH region.',
    description: 'Structured, logical approach to mastering German. Ideal for engineers, university applicants, and international professionals.',
    category: 'language',
    language: 'German',
    flagEmoji: '🇩🇪',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    features: ['Goethe-Zertifikat Prep', 'Technical & Business Vocabulary', 'Intensive Grammar Drill', 'Native Instructors'],
    whatYouWillLearn: [
      'Clear understanding of German cases, word order, and syntax',
      'Fluency in academic, technical, and everyday discussions',
      'Strategies for passing Goethe and TestDaF exams',
      'Workplace etiquette and professional correspondence'
    ],
    learningPath: [
      { step: 1, title: 'Grundstufe 1', description: 'Basics, articles, present tense, and simple sentences.' },
      { step: 2, title: 'Grundstufe 2', description: 'Dative/Accusative cases, modal verbs, and daily routine.' },
      { step: 3, title: 'Mittelstufe', description: 'Subjunctive II, passive voice, and technical reading.' },
      { step: 4, title: 'Oberstufe', description: 'Academic argument, nuance, and official certification.' }
    ],
    schedule: ['Tue & Thu: 19:00 - 20:30 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Do you prepare for TestDaF?', answer: 'Yes, our B2-C1 courses are specifically aligned with TestDaF and Goethe standards.' }
    ]
  },
  {
    id: 'lang-russian',
    slug: 'russian',
    title: 'Russian Language Program',
    subtitle: 'Unlock Cyrillic script and rich literary traditions.',
    description: 'Clear, step-by-step guidance to mastering Russian reading, writing, and speaking for beginners and advanced learners alike.',
    category: 'language',
    language: 'Russian',
    flagEmoji: '🇷🇺',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1513326718677-b964603b136d?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    features: ['Cyrillic Script Immersion', 'TORFL Exam Alignment', 'Cultural Context', 'Speaking Clubs'],
    whatYouWillLearn: [
      'Reading and writing fluently in Cyrillic',
      'Grasping the Russian case system intuitively',
      'Conversational skills for everyday situations',
      'Understanding contemporary media and literature'
    ],
    learningPath: [
      { step: 1, title: 'Alphabet & Phonetics', description: 'Cyrillic mastery, greetings, and basic noun genders.' },
      { step: 2, title: 'Case System Essentials', description: 'Nominative, Prepositional, and Accusative cases in context.' },
      { step: 3, title: 'Verbs of Motion & Complex Grammar', description: 'Aspects of verbs, Genitive and Instrumental cases.' },
      { step: 4, title: 'Fluency & Nuance', description: 'Spoken confidence, news reading, and formal correspondence.' }
    ],
    schedule: ['Mon & Wed: 19:00 - 20:30 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Is the Cyrillic alphabet hard to learn?', answer: 'Our students typically master reading Cyrillic within the first 2 weeks.' }
    ]
  },
  {
    id: 'lang-armenian',
    slug: 'armenian',
    title: 'Armenian Language & Heritage',
    subtitle: 'Learn Eastern and Western Armenian with cultural depth.',
    description: 'Immersive Armenian course covering reading, writing, phonetics, and conversation. Ideal for heritage learners, expats, and enthusiasts.',
    category: 'language',
    language: 'Armenian',
    flagEmoji: '🇦🇲',
    level: 'All Levels (A1-C2)',
    duration: '10 Weeks',
    image: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    features: ['Eastern & Western Options', 'Unique Alphabet Training', 'Cultural & History Modules', 'Native Tutors'],
    whatYouWillLearn: [
      'Fluency in reading and writing the 39-letter Armenian alphabet',
      'Conversational vocabulary for family, business, and travel',
      'Grammatical structures and verb tenses',
      'Deep insights into Armenian culture, history, and traditions'
    ],
    learningPath: [
      { step: 1, title: 'Alphabet & Sounds', description: 'Mastering unique letters and phonetic patterns.' },
      { step: 2, title: 'Everyday Dialogues', description: 'Family, dining, travel, and social interactions.' },
      { step: 3, title: 'Grammar & Structure', description: 'Verb conjugations, declensions, and sentence building.' },
      { step: 4, title: 'Cultural Immersion', description: 'Literature, media, and advanced discussion.' }
    ],
    schedule: ['Tue & Thu: 18:00 - 19:30 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Do you teach Eastern or Western Armenian?', answer: 'We offer specialized tracks for both Eastern (Republic of Armenia) and Western Armenian.' }
    ]
  },
  {
    id: 'lang-korean',
    slug: 'korean',
    title: 'Korean Language & Modern Culture',
    subtitle: 'Master Hangul and natural Korean conversation.',
    description: 'Learn Korean systematically from Hangul basics to TOPIK exam preparation with engaging, real-world cultural context.',
    category: 'language',
    language: 'Korean',
    flagEmoji: '🇰🇷',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    features: ['Hangul in 1 Week', 'TOPIK Test Alignment', 'Honorifics & Casual Speech', 'K-Culture Immersion'],
    whatYouWillLearn: [
      'Read and write Hangul effortlessly',
      'Master honorific levels and polite conversation',
      'Understand drama dialogues, modern media, and news',
      'Prepare for official TOPIK certification'
    ],
    learningPath: [
      { step: 1, title: 'Hangul & Basics', description: 'Reading Hangul, basic greetings, and self-introductions.' },
      { step: 2, title: 'Sentence Structures', description: 'Subject-Object-Verb order, particles, and present/past tenses.' },
      { step: 3, title: 'Honorifics & Expressions', description: 'Formality levels, indirect speech, and complex verbs.' },
      { step: 4, title: 'TOPIK Preparation', description: 'Advanced reading, writing essays, and mock testing.' }
    ],
    schedule: ['Mon & Wed: 18:30 - 20:00 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'How quickly can I learn Hangul?', answer: 'Hangul is very logical! Most students read Hangul within the first 3 lessons.' }
    ]
  },
  {
    id: 'lang-chinese',
    slug: 'chinese',
    title: 'Mandarin Chinese Excellence',
    subtitle: 'Master Pinyin, Hanzi, and conversational Mandarin for business and travel.',
    description: 'Comprehensive Mandarin course with focus on tones, essential Chinese characters, daily conversation, and HSK test preparation.',
    category: 'language',
    language: 'Chinese',
    flagEmoji: '🇨🇳',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'],
    features: ['Pinyin & Tone Drills', 'Character Stroke Training', 'HSK Exam Prep', 'Business Etiquette'],
    whatYouWillLearn: [
      'Accurate pronunciation with 4 main tones and neutral tone',
      'Reading and writing fundamental Chinese characters (Hanzi)',
      'Conversational skills for everyday business and social interactions',
      'Preparation for official HSK 1 - HSK 6 exams'
    ],
    learningPath: [
      { step: 1, title: 'Pinyin & Tones', description: 'Phonetic mastery, basic numbers, and greetings.' },
      { step: 2, title: 'HSK 1-2 Level', description: 'Essential characters, daily shopping, and directions.' },
      { step: 3, title: 'HSK 3-4 Level', description: 'Complex sentence structures, business conversations, and stroke rules.' },
      { step: 4, title: 'Advanced Fluency', description: 'High-level business Chinese, news reading, and essay writing.' }
    ],
    schedule: ['Tue & Thu: 19:00 - 20:30 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Do you teach Simplified or Traditional characters?', answer: 'We primary teach Simplified characters with optional exposure to Traditional characters.' }
    ]
  },
  {
    id: 'lang-japanese',
    slug: 'japanese',
    title: 'Japanese Mastery & JLPT',
    subtitle: 'Master Hiragana, Katakana, Kanji, and authentic spoken Japanese.',
    description: 'Structured Japanese program taking you step-by-step from writing systems to natural conversational fluency and JLPT exam readiness.',
    category: 'language',
    language: 'Japanese',
    flagEmoji: '🇯🇵',
    level: 'All Levels (A1-C2)',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    cefrLevels: ['JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'JLPT N1'],
    features: ['Kana & Kanji Training', 'Keigo (Polite Speech)', 'JLPT Focused Prep', 'Interactive Media'],
    whatYouWillLearn: [
      'Writing and reading Hiragana, Katakana, and core Kanji',
      'Navigating polite (Keigo) vs casual registers correctly',
      'Conversational skills for living, working, or visiting Japan',
      'JLPT preparation from N5 through N1'
    ],
    learningPath: [
      { step: 1, title: 'Kana Mastery', description: 'Hiragana, Katakana, basic greetings, and simple particle usage.' },
      { step: 2, title: 'N5-N4 Foundations', description: 'Basic Kanji, verb conjugations (Te-form), and daily routines.' },
      { step: 3, title: 'N3 Intermediate', description: 'Expressing nuance, conditionality, and reading short stories.' },
      { step: 4, title: 'N2-N1 Advanced', description: 'Keigo fluency, news commentary, and professional business Japanese.' }
    ],
    schedule: ['Mon & Wed: 18:00 - 19:30 CET'],
    niceExchangeAddon: false,
    faq: [
      { question: 'Which JLPT levels do you cover?', answer: 'We offer classes ranging from JLPT N5 (beginner) to JLPT N1 (advanced).' }
    ]
  }
];

export const SMM_COURSES: SMMCourse[] = [
  {
    id: 'smm-starter',
    slug: 'starter',
    tier: 'starter',
    title: 'SMM Starter: Social Media Foundations',
    subtitle: 'Build a solid foundation in digital marketing and content creation.',
    description: 'Perfect for beginners, small business owners, and aspiring social media managers looking to establish an impactful online presence.',
    category: 'smm',
    level: 'Beginner',
    duration: '4 Weeks',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    features: ['Profile Optimization', 'Basic Graphic Design', 'Content Scheduling', 'Certificate of Completion'],
    schedule: ['Tuesdays: 18:00 - 20:00 CET'],
    whatYouWillMaster: [
      'Optimizing Instagram, TikTok, Facebook, and LinkedIn profiles',
      'Creating engaging graphics using Canva and modern AI tools',
      'Crafting compelling copy and strategic hashtag research',
      'Building a 30-day content calendar for any brand'
    ],
    curriculum: [
      { module: 'Module 1: Social Media Foundations', topics: ['Platform Algorithms 101', 'Target Audience Research', 'Brand Identity Setup'] },
      { module: 'Module 2: Visual Content Creation', topics: ['Canva Mastery', 'Reels & TikTok Short Form Video', 'Graphic Design Principles'] },
      { module: 'Module 3: Copywriting & Captions', topics: ['Hook Writing', 'Call-to-Action Strategies', 'Hashtag SEO'] },
      { module: 'Module 4: Publishing & Management', topics: ['Content Calendars', 'Scheduling Tools (Buffer/Later)', 'Basic Analytics'] }
    ],
    realWorldProjects: [
      'Complete Brand Profile Audit & Overhaul',
      'Design a 30-Day Cross-Platform Content Plan'
    ],
    careerOutcomes: [
      'Manage personal or client social accounts with confidence',
      'Qualify for Junior Social Media Assistant roles'
    ],
    faq: [
      { question: 'Do I need marketing experience?', answer: 'No, this course starts from absolute fundamentals.' }
    ]
  },
  {
    id: 'smm-pro',
    slug: 'pro',
    tier: 'pro',
    title: 'SMM Pro: Growth & Paid Advertising',
    subtitle: 'Scale brand reach with targeted Meta Ads, content strategy, and analytics.',
    description: 'For intermediate marketers wanting to master Meta Business Suite, paid advertising campaigns, influencer outreach, and community growth.',
    category: 'smm',
    level: 'Intermediate',
    duration: '8 Weeks',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    features: ['Meta Ads Manager Training', 'Influencer Outreach Systems', 'Growth Analytics', 'Live Portfolio Reviews'],
    schedule: ['Mon & Wed: 19:00 - 20:30 CET'],
    whatYouWillMaster: [
      'Setting up Meta Pixel, Conversions API, and custom audiences',
      'Designing high-converting ad creatives and copywriting',
      'Managing influencer campaigns from outreach to ROI analysis',
      'A/B testing ad variations to minimize Cost Per Acquisition (CPA)'
    ],
    curriculum: [
      { module: 'Module 1: Strategic Content Funnels', topics: ['TOFU, MOFU, BOFU Content', 'Viral Mechanics', 'Storytelling Systems'] },
      { module: 'Module 2: Paid Ads Mastery', topics: ['Meta Ads Setup', 'Campaign Budgets (CBO vs ABO)', 'Retargeting Strategies'] },
      { module: 'Module 3: Influencer & UGC Marketing', topics: ['Finding Creators', 'Negotiation & Contracts', 'Tracking ROI'] },
      { module: 'Module 4: Advanced Analytics & Reporting', topics: ['Google Analytics 4', 'Client Dashboard Reports', 'Data-Driven Scaling'] }
    ],
    realWorldProjects: [
      'Launch & Optimize a Live Meta Ad Campaign ($50 test budget included)',
      'Construct an end-to-end Influencer Acquisition Funnel'
    ],
    careerOutcomes: [
      'Work as a freelance Social Media Specialist charging premium rates',
      'Take on paid ad management for e-commerce and local businesses'
    ],
    faq: [
      { question: 'Is ad spend budget provided during the course?', answer: 'We guide you through setting up test budgets, and practice environments are provided.' }
    ]
  },
  {
    id: 'smm-expert',
    slug: 'expert',
    tier: 'expert',
    title: 'SMM Expert: Agency & CMO Mastery',
    subtitle: 'Build a full-scale SMM agency, automate operations, and lead enterprise campaigns.',
    description: 'The ultimate blueprint for ambitious marketers, agency founders, and senior managers seeking to master high-ticket client acquisition, team delegation, and multi-channel strategies.',
    category: 'smm',
    level: 'Advanced',
    duration: '12 Weeks',

    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    features: ['Agency Blueprint', 'High-Ticket Sales Training', 'Omnichannel Strategy', '1-on-1 Mentorship'],
    schedule: ['Tue & Thu: 18:30 - 20:30 CET'],
    whatYouWillMaster: [
      'Structuring retainer packages from $2,000/mo to $10,000/mo',
      'Cold outreach and sales closing techniques for B2B client acquisition',
      'Hiring, onboarding, and managing freelance creators & media buyers',
      'Omnichannel marketing across YouTube, TikTok, LinkedIn, and Meta'
    ],
    curriculum: [
      { module: 'Module 1: Omnichannel Dominance', topics: ['YouTube SEO & Long-Form', 'LinkedIn B2B Authority', 'TikTok Shop Ecosystem'] },
      { module: 'Module 2: Agency Operations & Systems', topics: ['SOP Creation', 'Notion/Asana Workflows', 'Client Onboarding Automation'] },
      { module: 'Module 3: High-Ticket Client Acquisition', topics: ['Cold Email Systems', 'Audit Proposals', 'Closing Calls & Contracts'] },
      { module: 'Module 4: Leadership & CMO Strategy', topics: ['Managing Teams', 'Enterprise Scaling', 'Brand Equity & PR'] }
    ],
    realWorldProjects: [
      'Pitch and onboard a real prospective client using academy proposal templates',
      'Build a complete SMM Agency Operational System in Notion/Asana'
    ],
    careerOutcomes: [
      'Launch and run a high-ticket Social Media Marketing Agency',
      'Step into Senior CMO or Head of Growth roles at tech companies'
    ],
    faq: [
      { question: 'Will I get mentorship from agency owners?', answer: 'Yes, this tier includes weekly direct group mentorship and 1-on-1 feedback.' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sophie Laurent',
    role: 'Student, Nice Exchange Program',
    courseName: 'French Language Mastery',
    comment: 'The Nice Exchange program transformed my confidence completely. Learning French in classrooms is one thing, but practicing on the French Riviera while staying with a host family was unforgettable!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: '2',
    name: 'Alexandre Dubois',
    role: 'SMM Freelancer',
    courseName: 'SMM Pro: Growth & Paid Advertising',
    comment: 'CELAVIE Academy\'s SMM Pro course gave me the exact tools I needed to start taking on paid ad clients. Within 2 months of graduation, I landed three monthly retainers!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Marketing Manager',
    courseName: 'English Global Communication',
    comment: 'The focus on business English and executive presentation skills was top-tier. I passed my IELTS with 8.0 and earned a promotion at work.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: '4',
    name: 'David Min',
    role: 'Agency Founder',
    courseName: 'SMM Expert: Agency Mastery',
    comment: 'The framework taught in the SMM Expert tier saved me years of trial and error. The SOPs and client acquisition blueprints are worth ten times the price.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Are classes held online or in-person?',
    answer: 'Our standard language and SMM courses are delivered via interactive live online sessions with recorded access. The Nice Exchange program includes an immersive in-person experience in Nice, France.'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Will I receive a certificate upon completion?',
    answer: 'Yes! All students who successfully complete their course requirements, assignments, and attendance receive an official CELAVIE Educational Academy Certificate of Completion.'
  },
  {
    id: 'faq-3',
    category: 'registration',
    question: 'How do I register for a course?',
    answer: 'Select your program, enter your student information, then review and submit your registration. We will follow up with course and schedule details.'
  },
  {
    id: 'faq-4',
    category: 'nice-exchange',
    question: 'Who is eligible for the Nice Exchange program?',
    answer: 'The program is open to students aged 11 and above. Applicants under 18 must provide parent or guardian consent during the application process.'
  },
  {
    id: 'faq-5',
    category: 'smm',
    question: 'Can I upgrade my SMM course tier later?',
    answer: 'Absolutely. You can start with SMM Starter and upgrade to Pro or Expert at any time by paying the price difference.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    slug: 'language-courses',
    title: 'Language Academy',
    description: 'Immersive language education across 10 global languages with native-speaking certified tutors.',
    icon: 'Languages',
    features: ['10 Global Languages', 'Small Class Sizes', 'CEFR Standardized Alignment', 'Certificate of Completion']
  },
  {
    id: 'serv-2',
    slug: 'smm-academy',
    title: 'SMM & Digital Marketing',
    description: 'Practical training for social media creators, growth managers, and digital agency founders.',
    icon: 'TrendingUp',
    features: ['3 Flexible Tiers', 'Real-world Ad Campaigns', 'Agency Operations Blueprint', '1-on-1 Mentorship']
  },
  {
    id: 'serv-3',
    slug: 'nice-exchange',
    title: 'Nice Exchange Immersion',
    description: 'A transformative summer cultural & language exchange program hosted in Nice, France.',
    icon: 'Globe',
    features: ['Hosted in Nice, France', 'Family & Student Housing', 'Guided Cultural Excursions', 'Intensive Spoken French']
  },
  {
    id: 'serv-4',
    slug: 'corporate-training',
    title: 'Corporate Language & Digital Training',
    description: 'Customized B2B language and marketing programs designed for international corporate teams.',
    icon: 'Briefcase',
    features: ['Tailored Business Modules', 'Dedicated Account Manager', 'Employee Progress Tracking', 'Flexible Scheduling']
  }
];
