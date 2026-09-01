export type Language = 'en' | 'hy' | 'ru' | 'fr';

export const niceTranslations: Record<Language, {
  badge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  formTitle: string;
  formSubtitle: string;
  firstNameLabel: string;
  lastNameLabel: string;
  ageLabel: string;
  schoolLabel: string;
  emailLabel: string;
  phoneLabel: string;
  countryLabel: string;
  frenchLevelLabel: string;
  englishLevelLabel: string;
  parentNameLabel: string;
  parentPhoneLabel: string;
  essayLabel: string;
  essayHelperText: string;
  termsText: string;
  termsLink: string;
  submitButton: string;
  submittingButton: string;
  successTitle: string;
  successMessage: string;
  submitAnotherButton: string;
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
    parentPhoneRequired: string;
    essayWords: (current: number) => string;
    termsRequired: string;
  };
}> = {
  en: {
    badge: 'SUMMER CULTURAL IMMERSION 🇫🇷',
    sectionTitle: 'The Nice Exchange Program in France',
    sectionSubtitle: 'Combine intensive spoken French education with authentic Mediterranean living. Stay with welcoming French host families or private residences while enjoying guided cultural excursions across the French Riviera.',
    formTitle: 'Apply for the Nice Exchange Program',
    formSubtitle: 'Please fill in your application details. All fields marked with * are required.',
    firstNameLabel: 'First Name *',
    lastNameLabel: 'Last Name *',
    ageLabel: 'Age *',
    schoolLabel: 'School / University / Organization *',
    emailLabel: 'Email Address *',
    phoneLabel: 'Phone Number *',
    countryLabel: 'Country of Residence *',
    frenchLevelLabel: 'Current French Level *',
    englishLevelLabel: 'Current English Level *',
    parentNameLabel: 'Parent Name *',
    parentPhoneLabel: 'Parent Phone Number *',
    essayLabel: 'Motivation Essay (300–500 words) *',
    essayHelperText: 'Explain why you wish to participate in the Nice Exchange program and what goals you hope to achieve.',
    termsText: 'I agree to the Exchange',
    termsLink: 'Terms of Service & Code of Conduct',
    submitButton: 'Submit Application',
    submittingButton: 'Submitting Application...',
    successTitle: 'Application Submitted Successfully!',
    successMessage: 'Thank you for applying to the CELAVIE Nice Exchange Program. Our team will review your application essay and contact you via email within 48 hours.',
    submitAnotherButton: 'Submit Another Application',
    levels: {
      a1: 'Beginner / A1',
      a2: 'Elementary / A2',
      b1: 'Intermediate / B1',
      b2: 'Upper Intermediate / B2',
      c1: 'Advanced / C1',
      c2: 'Proficient / C2',
    },
    errors: {
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      ageMin: 'Applicants must be at least 11 years old',
      schoolRequired: 'School / University / Organization is required',
      emailInvalid: 'Valid email address is required',
      phoneInvalid: 'Valid phone number is required',
      countryRequired: 'Country of residence is required',
      frenchLevelRequired: 'French level selection is required',
      englishLevelRequired: 'English level selection is required',
      parentNameRequired: 'Parent name is required',
      parentPhoneRequired: 'Parent phone number is required',
      essayWords: (current: number) => `Essay must be between 300 and 500 words (Current word count: ${current})`,
      termsRequired: 'You must accept the Terms of Service & Code of Conduct',
    },
  },
  hy: {
    badge: 'ԱՄԱՌԱՅԻՆ ՄՇԱԿՈՒԹԱՅԻՆ ՓՈԽԱՆԱԿՈՒՄ 🇫🇷',
    sectionTitle: 'Նիցցայի Փոխանակման Ծրագիր Ֆրանսիայում',
    sectionSubtitle: 'Զուգակցեք ֆրանսերենի ինտենսիվ ուսուցումը Միջերկրական ծովի ափին ապրելու հետ։',
    formTitle: 'Դիմել Նիցցայի Փոխանակման Ծրագրին',
    formSubtitle: 'Խնդրում ենք լրացնել դիմումի տվյալները։ *-ով նշված բոլոր դաշտերը պարտադիր են։',
    firstNameLabel: 'Անուն *',
    lastNameLabel: 'Ազգանուն *',
    ageLabel: 'Տարիք *',
    schoolLabel: 'Դպրոց / Համալսարան / Կազմակերպություն *',
    emailLabel: 'Էլ. փոստի հասցե *',
    phoneLabel: 'Հեռախոսահամար *',
    countryLabel: 'Բնակության երկիր *',
    frenchLevelLabel: 'Ֆրանսերենի ընթացիկ մակարդակ *',
    englishLevelLabel: 'Անգլերենի ընթացիկ մակարդակ *',
    parentNameLabel: 'Ծնողի անուն ազգանուն *',
    parentPhoneLabel: 'Ծնողի հեռախոսահամար *',
    essayLabel: 'Մոտիվացիոն էսսե (300–500 բառ) *',
    essayHelperText: 'Նկարագրեք, թե ինչու եք ցանկանում մասնակցել Նիցցայի ծրագրին և ինչ նպատակներ ունեք։',
    termsText: 'Ես համաձայն եմ փոխանակման',
    termsLink: 'Ծառայությունների մատուցման պայմաններին և վարկանիշային կանոններին',
    submitButton: 'Ուղարկել դիմումը',
    submittingButton: 'Ուղարկվում է...',
    successTitle: 'Դիմումը հաջողությամբ ուղարկվել է։',
    successMessage: 'Շնորհակալություն CELAVIE Նիցցայի փոխանակման ծրագրին դիմելու համար։ Մեր թիմը կապ կհաստատի 48 ժամվա ընթացքում։',
    submitAnotherButton: 'Ուղարկել այլ դիմում',
    levels: {
      a1: 'Սկսնակ / A1',
      a2: 'Տարրական / A2',
      b1: 'Միջին / B1',
      b2: 'Բարձր միջին / B2',
      c1: 'Առաջադեմ / C1',
      c2: 'Գերազանց / C2',
    },
    errors: {
      firstNameRequired: 'Անունը պարտադիր է',
      lastNameRequired: 'Ազգանունը պարտադիր է',
      ageMin: 'Դիմորդը պետք է լինի առնվազն 11 տարեկան',
      schoolRequired: 'Դպրոցը/Համալսարանը/Կազմակերպությունը պարտադիր է',
      emailInvalid: 'Ճիշտ էլ. փոստի հասցե է պահանջվում',
      phoneInvalid: 'Ճիշտ հեռախոսահամար է պահանջվում',
      countryRequired: 'Բնակության երկիրը պարտադիր է',
      frenchLevelRequired: 'Ֆրանսերենի մակարդակը պարտադիր է',
      englishLevelRequired: 'Անգլերենի մակարդակը պարտադիր է',
      parentNameRequired: 'Ծնողի անունը պարտադիր է',
      parentPhoneRequired: 'Ծնողի հեռախոսահամարը պարտադիր է',
      essayWords: (current: number) => `Էսսեն պետք է լինի 300-ից 500 բառ (Ընթացիկ քանակ՝ ${current})`,
      termsRequired: 'Դուք պետք է ընդունեք պայմանները',
    },
  },
  ru: {
    badge: 'ЛЕТНЕЕ КУЛЬТУРНОЕ ПОГРУЖЕНИЕ 🇫🇷',
    sectionTitle: 'Программа обмена в Ницце, Франция',
    sectionSubtitle: 'Совмещайте интенсивное изучение французского языка с жизнью на Лазурном Берегу.',
    formTitle: 'Заявка на программу обмена в Ницце',
    formSubtitle: 'Пожалуйста, заполните данные заявки. Все поля со знаком * обязательны.',
    firstNameLabel: 'Имя *',
    lastNameLabel: 'Фамилия *',
    ageLabel: 'Возраст *',
    schoolLabel: 'Школа / Университет / Организация *',
    emailLabel: 'Электронная почта *',
    phoneLabel: 'Номер телефона *',
    countryLabel: 'Страна проживания *',
    frenchLevelLabel: 'Текущий уровень французского *',
    englishLevelLabel: 'Текущий уровень английского *',
    parentNameLabel: 'Имя родителя *',
    parentPhoneLabel: 'Телефон родителя *',
    essayLabel: 'Мотивационное эссе (300–500 слов) *',
    essayHelperText: 'Опишите, почему вы хотите принять участие в программе обмена в Ницце.',
    termsText: 'Я принимаю условия',
    termsLink: 'Условий обслуживания и правил поведения',
    submitButton: 'Отправить заявку',
    submittingButton: 'Отправка заявки...',
    successTitle: 'Заявка успешно отправлена!',
    successMessage: 'Спасибо за подачу заявки на программу обмена CELAVIE в Ницце. Наша команда свяжется с вами в течение 48 часов.',
    submitAnotherButton: 'Подать еще одну заявку',
    levels: {
      a1: 'Начинающий / A1',
      a2: 'Элементарный / A2',
      b1: 'Средний / B1',
      b2: 'Выше среднего / B2',
      c1: 'Продвинутый / C1',
      c2: 'Профессиональный / C2',
    },
    errors: {
      firstNameRequired: 'Имя обязательно',
      lastNameRequired: 'Фамилия обязательна',
      ageMin: 'Минимальный возраст участника — 11 лет',
      schoolRequired: 'Укажите учебное заведение или организацию',
      emailInvalid: 'Укажите корректный адрес электронной почты',
      phoneInvalid: 'Укажите корректный номер телефона',
      countryRequired: 'Укажите страну проживания',
      frenchLevelRequired: 'Выберите уровень французского',
      englishLevelRequired: 'Выберите уровень английского',
      parentNameRequired: 'Имя родителя обязательно',
      parentPhoneRequired: 'Телефон родителя обязателен',
      essayWords: (current: number) => `Эссе должно содержать от 300 до 500 слов (Сейчас слов: ${current})`,
      termsRequired: 'Необходимо принять условия',
    },
  },
  fr: {
    badge: 'IMMERSION CULTURELLE ÉTÉ 🇫🇷',
    sectionTitle: 'Le Programme d\'Échange à Nice, France',
    sectionSubtitle: 'Associez un apprentissage intensif du français oral à la vie méditerranéenne.',
    formTitle: 'Candidater au Programme d\'Échange à Nice',
    formSubtitle: 'Veuillez remplir vos informations. Tous les champs marqués d\'un * sont obligatoires.',
    firstNameLabel: 'Prénom *',
    lastNameLabel: 'Nom *',
    ageLabel: 'Âge *',
    schoolLabel: 'École / Université / Organisation *',
    emailLabel: 'Adresse e-mail *',
    phoneLabel: 'Numéro de téléphone *',
    countryLabel: 'Pays de résidence *',
    frenchLevelLabel: 'Niveau actuel de français *',
    englishLevelLabel: 'Niveau actuel d\'anglais *',
    parentNameLabel: 'Nom du parent *',
    parentPhoneLabel: 'Téléphone du parent *',
    essayLabel: 'Lettre de motivation (300–500 mots) *',
    essayHelperText: 'Expliquez pourquoi vous souhaitez participer au programme d\'échange à Nice.',
    termsText: 'J\'accepte les',
    termsLink: 'Conditions d\'utilisation et Code de conduite',
    submitButton: 'Envoyer la candidature',
    submittingButton: 'Envoi en cours...',
    successTitle: 'Candidature envoyée avec succès !',
    successMessage: 'Merci d\'avoir postulé au programme d\'échange CELAVIE Nice. Notre équipe examinera votre candidature et vous contactera sous 48 heures.',
    submitAnotherButton: 'Soumettre une autre candidature',
    levels: {
      a1: 'Débutant / A1',
      a2: 'Élémentaire / A2',
      b1: 'Intermédiaire / B1',
      b2: 'Intermédiaire supérieur / B2',
      c1: 'Avancé / C1',
      c2: 'Maîtrise / C2',
    },
    errors: {
      firstNameRequired: 'Le prénom est obligatoire',
      lastNameRequired: 'Le nom est obligatoire',
      ageMin: 'Les candidats doivent avoir au moins 11 ans',
      schoolRequired: 'L\'établissement est obligatoire',
      emailInvalid: 'Une adresse e-mail valide est obligatoire',
      phoneInvalid: 'Un numéro de téléphone valide est obligatoire',
      countryRequired: 'Le pays de résidence est obligatoire',
      frenchLevelRequired: 'Le niveau de français est obligatoire',
      englishLevelRequired: 'Le niveau d\'anglais est obligatoire',
      parentNameRequired: 'Le nom du parent est obligatoire',
      parentPhoneRequired: 'Le téléphone du parent est obligatoire',
      essayWords: (current: number) => `La lettre doit contenir entre 300 et 500 mots (Nombre actuel : ${current})`,
      termsRequired: 'Vous devez accepter les conditions d\'utilisation',
    },
  },
};
