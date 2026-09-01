export type Language = 'en' | 'hy' | 'ru' | 'fr';

export interface SiteTranslation {
  nav: {
    home: string;
    courses: string;
    explore: string;
    gallery: string;
    niceExchange: string;
    about: string;
    faq: string;
    registerNow: string;
    languageCourses: string;
    smmAcademy: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    selectCourse: string;
    niceExchangeBtn: string;
    metricsLanguages: string;
    metricsSpeakers: string;
    metricsExchange: string;
  };
  courses: {
    badge: string;
    title: string;
    tabLanguages: string;
    tabSMM: string;
    viewDetails: string;
    duration: string;
    level: string;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
  };
  niceExchange: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    firstName: string;
    lastName: string;
    age: string;
    school: string;
    email: string;
    phone: string;
    country: string;
    frenchLevel: string;
    englishLevel: string;
    parentName: string;
    parentPhone: string;
    essay: string;
    essayHelper: string;
    terms: string;
    termsLink: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    submitAnother: string;
    featureHousing: string;
    featureDuration: string;
    featureHours: string;
    featureStaff: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    graduates: string;
    successRate: string;
    storiesBadge: string;
    storiesTitle: string;
  };
  register: {
    badge: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    directionLanguage: string;
    directionSMM: string;
    selectSpecific: string;
    continuePersonalInfo: string;
    continuePayment: string;
    back: string;
    completeRegistration: string;
    processing: string;
    successTitle: string;
    successDesc: string;
    registerAnother: string;
    paymentCard: string;
    paymentBank: string;
    paymentPlan: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    acceptTerms: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    explore: string;
    contact: string;
    rights: string;
  };
  levels: {
    a1: string;
    a2: string;
    b1: string;
    b2: string;
    c1: string;
    c2: string;
  };
  errors: {
    firstNameRequired: string;
    lastNameRequired: string;
    ageMin: string;
    schoolRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
    countryRequired: string;
    frenchLevelRequired: string;
    englishLevelRequired: string;
    parentNameRequired: string;
    parentPhoneInvalid: string;
    essayWordCount: string;
    termsRequired: string;
    cardNumberInvalid: string;
    cardExpiryRequired: string;
    cardCvcInvalid: string;
  };
}

export const siteTranslations: Record<Language, SiteTranslation> = {
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      explore: 'Explore',
      gallery: 'Gallery',
      niceExchange: 'Nice Exchange',
      about: 'About',
      faq: 'FAQ',
      registerNow: 'Register Now',
      languageCourses: 'Language Courses',
      smmAcademy: 'SMM Academy',
    },
    hero: {
      badge: 'FOREIGN LANGUAGE CENTER & SMM ACADEMY',
      title: 'CELAVIE Educational Academy',
      subtitle: 'Master global foreign languages and high-impact social media marketing with expert native tutors. Take part in our exclusive Nice Exchange program in France.',
      selectCourse: 'Select Course',
      niceExchangeBtn: 'Nice Exchange Program',
      metricsLanguages: 'Foreign Languages',
      metricsSpeakers: 'Native Speakers',
      metricsExchange: 'Summer Exchange',
    },
    courses: {
      badge: 'OUR ACADEMIC DIRECTIONS',
      title: 'Explore Foreign Languages & SMM Tiers',
      tabLanguages: 'Foreign Languages (10+)',
      tabSMM: 'SMM Training (3 Tiers)',
      viewDetails: 'View Course Details',
      duration: 'Duration',
      level: 'Level',
    },
    gallery: {
      badge: 'ATMOSPHERE & MOMENTS',
      title: 'Life at CELAVIE Educational Academy',
      subtitle: 'Take a glance into our vibrant learning spaces, speaking clubs, and exchange trips.',
    },
    niceExchange: {
      badge: 'SUMMER CULTURAL IMMERSION 🇫🇷',
      title: 'The Nice Exchange Program in France',
      subtitle: 'Combine intensive spoken French education with authentic Mediterranean living. Stay with welcoming French host families or private residences while enjoying guided cultural excursions across the French Riviera.',
      formTitle: 'Apply for the Nice Exchange Program',
      formSubtitle: 'Please fill in your application details. All fields marked with * are required.',
      firstName: 'First Name *',
      lastName: 'Last Name *',
      age: 'Age *',
      school: 'School / University / Organization *',
      email: 'Email Address *',
      phone: 'Phone Number *',
      country: 'Country of Residence *',
      frenchLevel: 'Current French Level *',
      englishLevel: 'Current English Level *',
      parentName: 'Parent Name *',
      parentPhone: 'Parent Phone Number *',
      essay: 'Motivation Essay (300–500 words) *',
      essayHelper: 'Explain why you wish to participate in the Nice Exchange program and what goals you hope to achieve.',
      terms: 'I agree to the Exchange',
      termsLink: 'Terms of Service & Code of Conduct',
      submit: 'Submit Application',
      submitting: 'Submitting Application...',
      successTitle: 'Application Submitted Successfully!',
      successDesc: 'Thank you for applying to the CELAVIE Nice Exchange Program. Our team will review your application essay and contact you via email within 48 hours.',
      submitAnother: 'Submit Another Application',
      featureHousing: 'Verified Host Families & Housing',
      featureDuration: '2 to 8 Weeks Flexible Durations',
      featureHours: '20 Hours/Week Intensive French',
      featureStaff: '24/7 On-Site Support Staff',
    },
    about: {
      badge: 'ABOUT US',
      title: 'CELAVIE Educational Academy',
      description: 'Our academy brings together a passionate community of foreign language educators and digital marketing pioneers. We believe language learning is not just about grammar—it\'s about opening new life paths and cultural connections.',
      graduates: 'Graduates Worldwide',
      successRate: 'Fluency & Career Rate',
      storiesBadge: 'STUDENT STORIES',
      storiesTitle: 'What Our Graduates Say',
    },
    register: {
      badge: 'REGISTER NOW',
      title: 'Register for a course',
      subtitle: 'Three simple steps to start your learning journey.',
      step1: 'Choose a direction',
      step2: 'Personal Info',
      step3: 'Payment',
      directionLanguage: 'Foreign language',
      directionSMM: 'SMM training',
      selectSpecific: 'Select Specific Course Batch',
      continuePersonalInfo: 'Continue to Personal Info',
      continuePayment: 'Continue to Payment',
      back: 'Back',
      completeRegistration: 'Complete Registration',
      processing: 'Processing Enrollment...',
      successTitle: 'Registration Successful!',
      successDesc: 'A confirmation email with enrollment details has been sent to your email.',
      registerAnother: 'Register for Another Course',
      paymentCard: 'Credit Card',
      paymentBank: 'Bank Transfer',
      paymentPlan: 'Payment Plan',
      cardNumber: 'Card Number',
      cardExpiry: 'Expiry Date',
      cardCvc: 'CVC',
      acceptTerms: 'I agree to the enrollment terms and conditions.',
    },
    faq: {
      badge: 'QUESTIONS & ANSWERS',
      title: 'Frequently Asked Questions',
      subtitle: 'Have questions regarding enrollment, schedules, or payment methods?',
    },
    footer: {
      tagline: 'Empowering global learners through immersion language programs and digital agency training.',
      explore: 'Explore',
      contact: 'Contact',
      rights: 'CELAVIE Educational Academy. All rights reserved.',
    },
    levels: {
      a1: 'Beginner / A1',
      a2: 'Elementary / A2',
      b1: 'Intermediate / B1',
      b2: 'Upper Intermediate / B2',
      c1: 'Advanced / C1',
      c2: 'Proficient / C2',
    },
    errors: {
      firstNameRequired: 'First name is required.',
      lastNameRequired: 'Last name is required.',
      ageMin: 'Minimum age for participation is 11.',
      schoolRequired: 'School or organization is required.',
      emailInvalid: 'Please enter a valid email address.',
      phoneInvalid: 'Please enter a valid phone number.',
      countryRequired: 'Country of residence is required.',
      frenchLevelRequired: 'French level selection is required.',
      englishLevelRequired: 'English level selection is required.',
      parentNameRequired: 'Parent or guardian name is required.',
      parentPhoneInvalid: 'Parent phone number is required.',
      essayWordCount: 'Essay must be between 300 and 500 words.',
      termsRequired: 'You must accept the terms of service.',
      cardNumberInvalid: 'Please enter a valid card number.',
      cardExpiryRequired: 'Expiry date is required.',
      cardCvcInvalid: 'CVC code must be 3 or 4 digits.',
    },
  },
  hy: {
    nav: {
      home: 'Գլխավոր',
      courses: 'Դասընթացներ',
      explore: 'Ուսումնասիրել',
      gallery: 'Պատկերասրահ',
      niceExchange: 'Նիցցայի Ծրագիր',
      about: 'Մեր մասին',
      faq: 'Հարց ու պատասխան',
      registerNow: 'Գրանցվել հիմա',
      languageCourses: 'Օտար լեզուներ',
      smmAcademy: 'SMM Ակադեմիա',
    },
    hero: {
      badge: 'ՕՏԱՐ ԼԵԶՈՒՆԵՐԻ ԿԵՆՏՐՈՆ ԵՎ SMM ԱԿԱԴԵՄԻԱ',
      title: 'CELAVIE Կրթական Ակադեմիա',
      subtitle: 'Տիրապետեք օտար լեզուներին և թվային մարքեթինգին փորձառու մասնագետների հետ։ Մասնակցեք Ֆրանսիայի Նիցցա քաղաքի մեր ծրագրին։',
      selectCourse: 'Ընտրել Դասընթացը',
      niceExchangeBtn: 'Նիցցայի Փոխանակման Ծրագիր',
      metricsLanguages: 'Օտար Լեզուներ',
      metricsSpeakers: 'Մայրենի Լեզվակիրներ',
      metricsExchange: 'Ամառային Փոխանակում',
    },
    courses: {
      badge: 'ՄԵՐ ԿՐԹԱԿԱՆ ՈՒՂՂՈՒԹՅՈՒՆՆԵՐԸ',
      title: 'Ուսումնասիրեք Օտար Լեզուները և SMM Փաթեթները',
      tabLanguages: 'Օտար Լեզուներ (10+)',
      tabSMM: 'SMM Ուսուցում (3 Մակարդակ)',
      viewDetails: 'Դիտել Մանրամասները',
      duration: 'Տևողությունը',
      level: 'Մակարդակը',
    },
    gallery: {
      badge: 'ՄԹՆՈԼՈՐՏ ԵՎ ՊԱՀԵՐ',
      title: 'Կյանքը CELAVIE Կրթական Ակադեմիայում',
      subtitle: 'Ծանոթացեք մեր ուսումնական տարածքներին, խոսակցական ակումբներին և ճամփորդություններին։',
    },
    niceExchange: {
      badge: 'ԱՄԱՌԱՅԻՆ ՄՇԱԿՈՒԹԱՅԻՆ ՓՈԽԱՆԱԿՈՒՄ 🇫🇷',
      title: 'Նիցցայի Փոխանակման Ծրագիր Ֆրանսիայում',
      subtitle: 'Զուգակցեք ֆրանսերենի ինտենսիվ ուսուցումը Միջերկրական ծովի ափին ապրելու հետ։ Բնակվեք ֆրանսիական հյուրընկալ ընտանիքներում կամ ռեզիդենցիաներում։',
      formTitle: 'Դիմել Նիցցայի Փոխանակման Ծրագրին',
      formSubtitle: 'Խնդրում ենք լրացնել դիմումի տվյալները։ *-ով նշված բոլոր դաշտերը պարտադիր են։',
      firstName: 'Անուն *',
      lastName: 'Ազգանուն *',
      age: 'Տարիք *',
      school: 'Դպրոց / Համալսարան / Կազմակերպություն *',
      email: 'Էլ. փոստի հասցե *',
      phone: 'Հեռախոսահամար *',
      country: 'Բնակության երկիր *',
      frenchLevel: 'Ֆրանսերենի ընթացիկ մակարդակ *',
      englishLevel: 'Անգլերենի ընթացիկ մակարդակ *',
      parentName: 'Ծնողի անուն ազգանուն *',
      parentPhone: 'Ծնողի հեռախոսահամար *',
      essay: 'Մոտիվացիոն էսսե (300–500 բառ) *',
      essayHelper: 'Նկարագրեք, թե ինչու եք ցանկանում մասնակցել Նիցցայի ծրագրին և ինչ նպատակներ ունեք։',
      terms: 'Ես համաձայն եմ փոխանակման',
      termsLink: 'Ծառայությունների մատուցման պայմաններին',
      submit: 'Ուղարկել դիմումը',
      submitting: 'Ուղարկվում է...',
      successTitle: 'Դիմումը հաջողությամբ ուղարկվել է։',
      successDesc: 'Շնորհակալություն CELAVIE Նիցցայի փոխանակման ծրագրին դիմելու համար։ Մեր թիմը կապ կհաստատի 48 ժամվա ընթացքում։',
      submitAnother: 'Ուղարկել այլ դիմում',
      featureHousing: 'Ստուգված հյուրընկալ ընտանիքներ',
      featureDuration: '2-ից 8 շաբաթ ճկուն տևողություն',
      featureHours: '20 ժամ/շաբաթ ինտենսիվ ֆրանսերեն',
      featureStaff: '24/7 աջակցություն տեղում',
    },
    about: {
      badge: 'ՄԵՐ ՄԱՍԻՆ',
      title: 'CELAVIE Կրթական Ակադեմիա',
      description: 'Մեր ակադեմիան միավորում է օտար լեզուների փորձառու ուսուցիչներին և թվային մարքեթինգի մասնագետներին։ Լեզուների ուսուցումը նոր հնարավորություններ է բացում։',
      graduates: 'Շրջանավարտներ աշխարհով մեկ',
      successRate: 'Հաջողության և կարիերայի ցուցանիշ',
      storiesBadge: 'ՈՒՍԱՆՈՂՆԵՐԻ ՊԱՏՄՈՒԹՅՈՒՆՆԵՐԸ',
      storiesTitle: 'Ինչ են ասում մեր շրջանավարտները',
    },
    register: {
      badge: 'ԳՐԱՆՑՎԵԼ ՀԻՄԱ',
      title: 'Գրանցվել դասընթացին',
      subtitle: 'Երեք պարզ քայլ ուսումնառությունը սկսելու համար։',
      step1: 'Ընտրել ուղղությունը',
      step2: 'Անձնական տվյալներ',
      step3: 'Վճարում',
      directionLanguage: 'Օտար լեզուներ',
      directionSMM: 'SMM ուսուցում',
      selectSpecific: 'Ընտրել konkrét դասընթացը',
      continuePersonalInfo: 'Շարունակել դեպի անձնական տվյալներ',
      continuePayment: 'Շարունակել դեպի վճարում',
      back: 'Հետ',
      completeRegistration: 'Ավարտել գրանցումը',
      processing: 'Մշակվում է...',
      successTitle: 'Գրանցումը հաջողվեց։',
      successDesc: 'Հաստատման նամակն ուղարկվել է Ձեր էլ. փոստին։',
      registerAnother: 'Գրանցվել այլ դասընթացի',
      paymentCard: 'Բանկային քարտ',
      paymentBank: 'Բանկային փոխանցում',
      paymentPlan: 'Վճարման պլան',
      cardNumber: 'Քարտի համարը',
      cardExpiry: 'Վավերականություն',
      cardCvc: 'CVC',
      acceptTerms: 'Ես համաձայն եմ գրանցման պայմաններին։',
    },
    faq: {
      badge: 'ՀԱՐՑ ՈՒ ՊԱՏԱՍԽԱՆ',
      title: 'Հաճախ տրվող հարցեր',
      subtitle: 'Ունե՞ք հարցեր գրանցման, ժամանակացույցի կամ վճարման եղանակների վերաբերյալ։',
    },
    footer: {
      tagline: 'Ուսուցում ինտենսիվ լեզվական ծրագրերի և թվային մարքեթինգի միջոցով։',
      explore: 'Բաժիններ',
      contact: 'Կապ',
      rights: 'CELAVIE Կրթական Ակադեմիա. Բոլոր իրավունքները պաշտպանված են։',
    },
    levels: {
      a1: 'Սկսնակ / A1',
      a2: 'Տարրական / A2',
      b1: 'Միջին / B1',
      b2: 'Բարձր միջին / B2',
      c1: 'Առաջադեմ / C1',
      c2: 'Գերազանց / C2',
    },
    errors: {
      firstNameRequired: 'Անունը պարտադիր է։',
      lastNameRequired: 'Ազգանունը պարտադիր է։',
      ageMin: 'Մասնակցության նվազագույն տարիքը 11 է։',
      schoolRequired: 'Դպրոցը կամ կազմակերպությունը պարտադիր է։',
      emailInvalid: 'Խնդրում ենք մուտքագրել վավեր էլ․ փոստի հասցե։',
      phoneInvalid: 'Խնդրում ենք մուտքագրել վավեր հեռախոսահամար։',
      countryRequired: 'Բնակության երկիրը պարտադիր է։',
      frenchLevelRequired: 'Ֆրանսերենի մակարդակի ընտրությունը պարտադիր է։',
      englishLevelRequired: 'Անգլերենի մակարդակի ընտրությունը պարտադիր է։',
      parentNameRequired: 'Ծնողի անունը պարտադիր է։',
      parentPhoneInvalid: 'Ծնողի հեռախոսահամարը պարտադիր է։',
      essayWordCount: 'Էսսեն պետք է պարունակի 300-ից 500 բառ։',
      termsRequired: 'Պետք է համաձայնեք պայմաններին։',
      cardNumberInvalid: 'Խնդրում ենք մուտքագրել վավեր քարտի համար։',
      cardExpiryRequired: 'Վավերականության ժամկետը պարտադիր է։',
      cardCvcInvalid: 'CVC կոդը պետք է լինի 3 կամ 4 նիշ։',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      courses: 'Курсы',
      explore: 'Обзор',
      gallery: 'Галерея',
      niceExchange: 'Обмен в Ницце',
      about: 'О нас',
      faq: 'FAQ',
      registerNow: 'Записаться',
      languageCourses: 'Иностранные языки',
      smmAcademy: 'SMM Академия',
    },
    hero: {
      badge: 'ЦЕНТР ИНОСТРАННЫХ ЯЗЫКОВ И SMM АКАДЕМИЯ',
      title: 'Академия CELAVIE',
      subtitle: 'Освойте иностранные языки и цифровой маркетинг с опытными преподавателями. Участвуйте в нашей программе обмена в Ницце, Франция.',
      selectCourse: 'Выбрать курс',
      niceExchangeBtn: 'Программа обмена в Ницце',
      metricsLanguages: 'Иностранных языков',
      metricsSpeakers: 'Носителей языка',
      metricsExchange: 'Летний обмен',
    },
    courses: {
      badge: 'НАШИ НАПРАВЛЕНИЯ',
      title: 'Изучайте языки и уровни SMM',
      tabLanguages: 'Иностранные языки (10+)',
      tabSMM: 'SMM Обучение (3 Уровня)',
      viewDetails: 'Подробнее о курсе',
      duration: 'Длительность',
      level: 'Уровень',
    },
    gallery: {
      badge: 'АТМОСФЕРА И МОМЕНТЫ',
      title: 'Жизнь в Академии CELAVIE',
      subtitle: 'Взгляните на наши учебные классы, разговорные клубы и поездки.',
    },
    niceExchange: {
      badge: 'ЛЕТНЕЕ КУЛЬТУРНОЕ ПОГРУЖЕНИЕ 🇫🇷',
      title: 'Программа обмена в Ницце, Франция',
      subtitle: 'Совмещайте интенсивное изучение французского языка с жизнью на Лазурном Берегу. Проживайте в принимающих семьях или резиденциях.',
      formTitle: 'Заявка на программу обмена в Ницце',
      formSubtitle: 'Пожалуйста, заполните данные заявки. Все поля со знаком * обязательны.',
      firstName: 'Имя *',
      lastName: 'Фамилия *',
      age: 'Возраст *',
      school: 'Школа / Университет / Организация *',
      email: 'Электронная почта *',
      phone: 'Номер телефона *',
      country: 'Страна проживания *',
      frenchLevel: 'Текущий уровень французского *',
      englishLevel: 'Текущий уровень английского *',
      parentName: 'Имя родителя *',
      parentPhone: 'Телефон родителя *',
      essay: 'Мотивационное эссе (300–500 слов) *',
      essayHelper: 'Опишите, почему вы хотите принять участие в программе обмена в Ницце.',
      terms: 'Я принимаю условия',
      termsLink: 'Условий обслуживания и правил поведения',
      submit: 'Отправить заявку',
      submitting: 'Отправка заявки...',
      successTitle: 'Заявка успешно отправлена!',
      successDesc: 'Спасибо за подачу заявки на программу обмена CELAVIE в Ницце. Наша команда свяжется с вами в течение 48 часов.',
      submitAnother: 'Подать еще одну заявку',
      featureHousing: 'Проверенные принимающие семьи',
      featureDuration: 'От 2 до 8 недель обучения',
      featureHours: '20 часов в неделю французского',
      featureStaff: 'Поддержка 24/7 на месте',
    },
    about: {
      badge: 'О НАС',
      title: 'Академия CELAVIE',
      description: 'Наша академия объединяет преподавателей иностранных языков и экспертов цифрового маркетинга.',
      graduates: 'Выпускников по всему миру',
      successRate: 'Успешность и карьерный рост',
      storiesBadge: 'ИСТОРИИ СТУДЕНТОВ',
      storiesTitle: 'Что говорят наши выпускники',
    },
    register: {
      badge: 'РЕГИСТРАЦИЯ',
      title: 'Записаться на курс',
      subtitle: 'Три простых шага для начала обучения.',
      step1: 'Выберите направление',
      step2: 'Личные данные',
      step3: 'Оплата',
      directionLanguage: 'Иностранный язык',
      directionSMM: 'SMM обучение',
      selectSpecific: 'Выберите конкретный курс',
      continuePersonalInfo: 'Далее к личным данным',
      continuePayment: 'Далее к оплате',
      back: 'Назад',
      completeRegistration: 'Завершить регистрацию',
      processing: 'Обработка...',
      successTitle: 'Регистрация прошла успешно!',
      successDesc: 'Письмо с подтверждением отправлено на вашу электронную почту.',
      registerAnother: 'Записаться на другой курс',
      paymentCard: 'Банковская карта',
      paymentBank: 'Банковский перевод',
      paymentPlan: 'Рассрочка',
      cardNumber: 'Номер карты',
      cardExpiry: 'Срок действия',
      cardCvc: 'CVC',
      acceptTerms: 'Я принимаю условия регистрации.',
    },
    faq: {
      badge: 'ВОПРОСЫ И ОТВЕТЫ',
      title: 'Часто задаваемые вопросы',
      subtitle: 'Есть вопросы по поводу зачисления, расписания или оплаты?',
    },
    footer: {
      tagline: 'Обучение через языковое погружение и курсы SMM маркетологов.',
      explore: 'Разделы',
      contact: 'Контакты',
      rights: 'Академия CELAVIE. Все права защищены.',
    },
    levels: {
      a1: 'Начинающий / A1',
      a2: 'Элементарный / A2',
      b1: 'Средний / B1',
      b2: 'Выше среднего / B2',
      c1: 'Продвинутый / C1',
      c2: 'Профессиональный / C2',
    },
    errors: {
      firstNameRequired: 'Имя обязательно к заполнению.',
      lastNameRequired: 'Фамилия обязательна к заполнению.',
      ageMin: 'Минимальный возраст для участия — 11 лет.',
      schoolRequired: 'Учебное заведение или организация обязательно.',
      emailInvalid: 'Пожалуйста, введите корректный email.',
      phoneInvalid: 'Пожалуйста, введите корректный номер телефона.',
      countryRequired: 'Страна проживания обязательна.',
      frenchLevelRequired: 'Выберите уровень французского языка.',
      englishLevelRequired: 'Выберите уровень английского языка.',
      parentNameRequired: 'Имя родителя обязательно.',
      parentPhoneInvalid: 'Телефон родителя обязателен.',
      essayWordCount: 'Эссе должно содержать от 300 до 500 слов.',
      termsRequired: 'Необходимо принять условия соглашения.',
      cardNumberInvalid: 'Введите корректный номер карты.',
      cardExpiryRequired: 'Срок действия карты обязателен.',
      cardCvcInvalid: 'CVC должен состоять из 3 или 4 цифр.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      courses: 'Cours',
      explore: 'Explorer',
      gallery: 'Galerie',
      niceExchange: 'Échange à Nice',
      about: 'À propos',
      faq: 'FAQ',
      registerNow: 'S\'inscrire',
      languageCourses: 'Langues étrangères',
      smmAcademy: 'Académie SMM',
    },
    hero: {
      badge: 'CENTRE DE LANGUES ÉTRANGÈRES ET ACADÉMIE SMM',
      title: 'Académie Éducative CELAVIE',
      subtitle: 'Maîtrisez les langues étrangères et le marketing digital avec des tuteurs natifs experts. Participez à notre programme d\'échange exclusif à Nice, France.',
      selectCourse: 'Choisir un cours',
      niceExchangeBtn: 'Programme d\'Échange à Nice',
      metricsLanguages: 'Langues étrangères',
      metricsSpeakers: 'Tuteurs natifs',
      metricsExchange: 'Échange d\'été',
    },
    courses: {
      badge: 'NOS ORIENTATIONS ACADÉMIQUES',
      title: 'Explorez nos langues et niveaux SMM',
      tabLanguages: 'Langues étrangères (10+)',
      tabSMM: 'Formation SMM (3 Niveaux)',
      viewDetails: 'Voir les détails',
      duration: 'Durée',
      level: 'Niveau',
    },
    gallery: {
      badge: 'ATMOSPHÈRE ET MOMENTS',
      title: 'La vie à l\'Académie CELAVIE',
      subtitle: 'Découvrez nos salles de cours, clubs de conversation et voyages.',
    },
    niceExchange: {
      badge: 'IMMERSION CULTURELLE ÉTÉ 🇫🇷',
      title: 'Le Programme d\'Échange à Nice, France',
      subtitle: 'Associez un apprentissage intensif du français oral à la vie méditerranéenne. Logez dans des familles d\'accueil chaleureuses.',
      formTitle: 'Candidater au Programme d\'Échange à Nice',
      formSubtitle: 'Veuillez remplir vos informations. Tous les champs marqués d\'un * sont obligatoires.',
      firstName: 'Prénom *',
      lastName: 'Nom *',
      age: 'Âge *',
      school: 'École / Université / Organisation *',
      email: 'Adresse e-mail *',
      phone: 'Numéro de téléphone *',
      country: 'Pays de résidence *',
      frenchLevel: 'Niveau actuel de français *',
      englishLevel: 'Niveau actuel d\'anglais *',
      parentName: 'Nom du parent *',
      parentPhone: 'Téléphone du parent *',
      essay: 'Lettre de motivation (300–500 mots) *',
      essayHelper: 'Expliquez pourquoi vous souhaitez participer au programme d\'échange à Nice.',
      terms: 'J\'accepte les',
      termsLink: 'Conditions d\'utilisation et Code de conduite',
      submit: 'Envoyer la candidature',
      submitting: 'Envoi en cours...',
      successTitle: 'Candidature envoyée avec succès !',
      successDesc: 'Merci d\'avoir postulé au programme d\'échange CELAVIE Nice. Notre équipe vous contactera sous 48 heures.',
      submitAnother: 'Soumettre une autre candidature',
      featureHousing: 'Familles d\'accueil vérifiées',
      featureDuration: 'Durées flexibles de 2 à 8 semaines',
      featureHours: '20h/semaine de français intensif',
      featureStaff: 'Assistance 24/7 sur place',
    },
    about: {
      badge: 'À PROPOS DE NOUS',
      title: 'Académie Éducative CELAVIE',
      description: 'Notre académie réunit une communauté passionnée d\'enseignants de langues étrangères et d\'experts du marketing digital.',
      graduates: 'Diplômés dans le monde',
      successRate: 'Taux de réussite et carrière',
      storiesBadge: 'TÉMOIGNAGES',
      storiesTitle: 'Ce que disent nos diplômés',
    },
    register: {
      badge: 'S\'INSCRIRE MAINTENANT',
      title: 'Inscrivez-vous à un cours',
      subtitle: 'Trois étapes simples pour commencer votre apprentissage.',
      step1: 'Choisir une orientation',
      step2: 'Informations personnelles',
      step3: 'Paiement',
      directionLanguage: 'Langue étrangère',
      directionSMM: 'Formation SMM',
      selectSpecific: 'Sélectionner le cours spécifique',
      continuePersonalInfo: 'Poursuivre vers les infos',
      continuePayment: 'Poursuivre vers le paiement',
      back: 'Retour',
      completeRegistration: 'Finaliser l\'inscription',
      processing: 'Traitement en cours...',
      successTitle: 'Inscription réussie !',
      successDesc: 'Un e-mail de confirmation a été envoyé à votre adresse.',
      registerAnother: 'S\'inscrire à un autre cours',
      paymentCard: 'Carte bancaire',
      paymentBank: 'Virement bancaire',
      paymentPlan: 'Plan de paiement',
      cardNumber: 'Numéro de carte',
      cardExpiry: 'Date d\'expiration',
      cardCvc: 'CVC',
      acceptTerms: 'J\'accepte les conditions d\'inscription.',
    },
    faq: {
      badge: 'QUESTIONS & RÉPONSES',
      title: 'Foire Aux Questions',
      subtitle: 'Des questions concernant l\'inscription, les horaires ou le paiement ?',
    },
    footer: {
      tagline: 'Formations linguistiques en immersion et programmes de marketing digital.',
      explore: 'Explorer',
      contact: 'Contact',
      rights: 'Académie Éducative CELAVIE. Tous droits réservés.',
    },
    levels: {
      a1: 'Débutant / A1',
      a2: 'Élémentaire / A2',
      b1: 'Intermédiaire / B1',
      b2: 'Intermédiaire supérieur / B2',
      c1: 'Avancé / C1',
      c2: 'Maîtrise / C2',
    },
    errors: {
      firstNameRequired: 'Le prénom est obligatoire.',
      lastNameRequired: 'Le nom est obligatoire.',
      ageMin: 'L\'âge minimum pour participer est de 11 ans.',
      schoolRequired: 'L\'établissement ou l\'organisation est obligatoire.',
      emailInvalid: 'Veuillez saisir une adresse e-mail valide.',
      phoneInvalid: 'Veuillez saisir un numéro de téléphone valide.',
      countryRequired: 'Le pays de résidence est obligatoire.',
      frenchLevelRequired: 'Veuillez sélectionner votre niveau de français.',
      englishLevelRequired: 'Veuillez sélectionner votre niveau d\'anglais.',
      parentNameRequired: 'Le nom du parent est obligatoire.',
      parentPhoneInvalid: 'Le numéro du parent est obligatoire.',
      essayWordCount: 'La lettre de motivation doit contenir entre 300 et 500 mots.',
      termsRequired: 'Vous devez accepter les conditions d\'utilisation.',
      cardNumberInvalid: 'Veuillez saisir un numéro de carte valide.',
      cardExpiryRequired: 'La date d\'expiration est obligatoire.',
      cardCvcInvalid: 'Le code CVC doit comporter 3 ou 4 chiffres.',
    },
  },
};
