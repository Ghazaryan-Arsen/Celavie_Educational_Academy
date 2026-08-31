import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TESTIMONIAL_TRANSLATIONS: Record<string, Record<string, { role: string; comment: string; courseName: string }>> = {
  1: {
    en: {
      role: 'Student, Nice Exchange Program',
      comment: 'The Nice Exchange program transformed my confidence completely. Learning French in classrooms is one thing, but practicing on the French Riviera while staying with a host family was unforgettable!',
      courseName: 'French Language Mastery',
    },
    hy: {
      role: 'Ուսանող, Նիցցայի ծրագիր',
      comment: 'Նիցցայի փոխանակման ծրագիրն ամբողջովին փոխեց իմ ինքնավստահությունը։ Ֆրանսերեն սովորելը դասասենյակում մի բան է, իսկ Ֆրանսիական Ռիվիերայում հյուրընկալ ընտանիքում ապրելով պրակտիկա անցնելն՝ անմոռանալի։',
      courseName: 'Ֆրանսերենի Կատարյալ Տիրապետում',
    },
    ru: {
      role: 'Студент, Программа обмена в Ницце',
      comment: 'Программа обмена в Ницце полностью изменила мою уверенность. Изучение французского в классе — это одно, но практика на Лазурном Берегу с проживанием в семье — незабываемо!',
      courseName: 'Изучение Французского Языка',
    },
    fr: {
      role: 'Étudiante, Programme d\'Échange à Nice',
      comment: 'Le programme d\'échange à Nice a complètement transformé ma confiance. Apprendre le français en classe est une chose, mais pratiquer sur la Côte d\'Azur en logeant dans une famille d\'accueil était inoubliable !',
      courseName: 'Maîtrise de la Langue Française',
    },
  },
  2: {
    en: {
      role: 'SMM Freelancer',
      comment: 'CELAVIE Academy\'s SMM Pro course gave me the exact tools I needed to start taking on paid ad clients. Within 2 months of graduation, I landed three monthly retainers!',
      courseName: 'SMM Pro: Growth & Paid Advertising',
    },
    hy: {
      role: 'SMM Ֆրիլանսեր',
      comment: 'CELAVIE Ակադեմիայի SMM Pro դասընթացն ինձ տվեց այն բոլոր գործիքները, որոնք անհրաժեշտ էին վճարովի գովազդի հաճախորդներ ներգրավելու համար։ Ավարտելուց 2 ամիս անց ես ունեի 3 ամսական պատվեր։',
      courseName: 'SMM Pro: Աճ և Գովազդ (Meta Ads)',
    },
    ru: {
      role: 'SMM Фрилансер',
      comment: 'Курс SMM Pro в Академии CELAVIE дал мне именно те инструменты, которые были нужны для работы с клиентами по таргетированной рекламе. Через 2 месяца после окончания я получил 3 постоянных клиента!',
      courseName: 'SMM Pro: Рост и Таргетированная Реклама',
    },
    fr: {
      role: 'SMM Freelance',
      comment: 'Le cours SMM Pro de l\'Académie CELAVIE m\'a donné exactement les outils dont j\'avais besoin pour gérer des clients en publicité payante. En 2 mois, j\'ai décroché 3 contrats mensuels !',
      courseName: 'SMM Pro : Croissance & Publicité Payante',
    },
  },
  3: {
    en: {
      role: 'Marketing Manager',
      comment: 'The focus on business English and executive presentation skills was top-tier. I passed my IELTS with 8.0 and earned a promotion at work.',
      courseName: 'English Global Communication',
    },
    hy: {
      role: 'Մարքեթինգի Մենեջեր',
      comment: 'Գործարար անգլերենի և շնորհանդեսների հմտությունների վրա կենտրոնացումը բարձր մակարդակի վրա էր։ Ես հանձնեցի IELTS-ը 8.0 միավորով և առաջխաղացում ստացա աշխատանքում։',
      courseName: 'Անգլերեն Միջազգային Հաղորդակցություն',
    },
    ru: {
      role: 'Маркетинг-менеджер',
      comment: 'Фокус на деловом английском и навыках презентаций был на высшем уровне. Я сдала IELTS на 8.0 и получила повышение на работе.',
      courseName: 'Английский для Международного Общения',
    },
    fr: {
      role: 'Responsable Marketing',
      comment: 'L\'accent mis sur l\'anglais des affaires et les compétences de présentation était excellent. J\'ai obtenu 8.0 au IELTS et j\'ai eu une promotion au travail.',
      courseName: 'Communication Globale en Anglais',
    },
  },
  4: {
    en: {
      role: 'Agency Founder',
      comment: 'The framework taught in the SMM Expert tier saved me years of trial and error. The SOPs and client acquisition blueprints are worth ten times the price.',
      courseName: 'SMM Expert: Agency Mastery',
    },
    hy: {
      role: 'Գործակալության Հիմնադիր',
      comment: 'SMM Expert մակարդակում ուսուցանվող համակարգն ինձ խնայեց տարիների փորձերն ու սխալները։ Հաճախորդների ներգրավման պլանները տասնապատիկ արժեք ունեն։',
      courseName: 'SMM Expert: Գործակալություն և CMO',
    },
    ru: {
      role: 'Основатель Агентства',
      comment: 'Методология курса SMM Expert сберегла мне годы проб и ошибок. Регламенты и шаблоны привлечения клиентов стоят в десять раз больше цены курса.',
      courseName: 'SMM Expert: Агентство и CMO',
    },
    fr: {
      role: 'Fondateur d\'Agence',
      comment: 'La méthodologie enseignée dans le niveau SMM Expert m\'a fait gagner des années d\'essais et d\'erreurs. Les modèles d\'acquisition de clients valent dix fois le prix du cours.',
      courseName: 'SMM Expert : Agence & CMO Mastery',
    },
  },
};

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { language } = useLanguage();
  const localized = TESTIMONIAL_TRANSLATIONS[testimonial.id]?.[language];

  const role = localized?.role || testimonial.role;
  const comment = localized?.comment || testimonial.comment;
  const courseName = localized?.courseName || testimonial.courseName;

  return (
    <div className="bg-white rounded-[8px] border border-[rgba(0,0,0,0.08)] p-6 shadow-xs flex flex-col justify-between h-full relative group hover:border-[rgba(0,0,0,0.2)] transition-all">
      <Quote className="w-8 h-8 text-[rgba(0,0,0,0.05)] absolute top-4 right-4 group-hover:text-[rgba(0,0,0,0.1)] transition-colors" />

      <div>
        <div className="flex items-center space-x-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        <p className="text-sm md:text-base text-gray-700 italic leading-relaxed mb-6">
          "{comment}"
        </p>
      </div>

      <div className="flex items-center space-x-3 pt-4 border-t border-[rgba(0,0,0,0.05)]">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
          loading="lazy"
        />
        <div>
          <h4 className="text-sm font-bold text-[rgb(38,38,38)] leading-tight">{testimonial.name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
          <span className="text-[10px] text-gray-400 font-medium block">{courseName}</span>
        </div>
      </div>
    </div>
  );
};
