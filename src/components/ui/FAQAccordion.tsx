import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface FAQAccordionItem {
  id?: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQAccordionItem[];
  allowMultiple?: boolean;
}

const FAQ_TRANSLATIONS: Record<string, Record<string, { question: string; answer: string }>> = {
  'faq-1': {
    en: {
      question: 'Are classes held online or in-person?',
      answer: 'Our standard language and SMM courses are delivered via interactive live online sessions with recorded access. The Nice Exchange program includes an immersive in-person experience in Nice, France.',
    },
    hy: {
      question: 'Դասերն անցկացվում են առցա՞նց, թե՞ առկա։',
      answer: 'Մեր ստանդարտ լեզվի և SMM դասընթացներն անցկացվում են ինտերակտիվ առցանց ֆորմատով՝ տեսագրությունների հասանելիությամբ։ Նիցցայի ծրագիրն ներառում է առկա ուսուցում Ֆրանսիայի Նիցցա քաղաքում։',
    },
    ru: {
      question: 'Занятия проходят онлайн или очно?',
      answer: 'Наши стандартные языковые и SMM курсы проходят в формате интерактивных онлайн-уроков с записью. Программа обмена в Ницце включает очное погружение во Франции.',
    },
    fr: {
      question: 'Les cours ont-ils lieu en ligne ou en présentiel ?',
      answer: 'Nos cours de langues et SMM sont dispensés lors de sessions interactives en ligne avec accès aux enregistrements. Le programme d\'échange à Nice comprend une expérience en présentiel à Nice, France.',
    },
  },
  'faq-2': {
    en: {
      question: 'Will I receive a certificate upon completion?',
      answer: 'Yes! All students who successfully complete their course requirements, assignments, and attendance receive an official CELAVIE Educational Academy Certificate of Completion.',
    },
    hy: {
      question: 'Կստանա՞մ արդյոք ավարտական վկայական։',
      answer: 'Այո՛։ Բոլոր ուսանողները, ովքեր հաջողությամբ ավարտում են դասընթացը, ստանում են CELAVIE Կրթական Ակադեմիայի պաշտոնական ավարտական վկայական։',
    },
    ru: {
      question: 'Получу ли я сертификат об окончании?',
      answer: 'Да! Все студенты, успешно завершившие курс, получают официальный сертификат Академии CELAVIE.',
    },
    fr: {
      question: 'Recevrai-je un certificat à la fin du cours ?',
      answer: 'Oui ! Tous les étudiants qui terminent avec succès leur formation reçoivent un certificat officiel de l\'Académie Éducative CELAVIE.',
    },
  },
  'faq-3': {
    en: {
      question: 'What payment options are available?',
      answer: 'We support major credit/debit cards via Stripe, direct bank transfers, and flexible monthly payment plans upon request.',
    },
    hy: {
      question: 'Վճարման ի՞նչ տարբերակներ են հասանելի։',
      answer: 'Մենք ընդունում ենք բանկային քարտեր, ուղղակի բանկային փոխանցումներ և առաջարկում ենք ապառիկ վճարման պլաններ։',
    },
    ru: {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем банковские карты, прямые банковские переводы и предлагаем гибкую рассрочку.',
    },
    fr: {
      question: 'Quelles sont les options de paiement disponibles ?',
      answer: 'Nous acceptons les cartes bancaires, les virements bancaires directs et proposons des paiements échelonnés.',
    },
  },
  'faq-4': {
    en: {
      question: 'Who is eligible for the Nice Exchange program?',
      answer: 'The program is open to students aged 11 and above. Applicants under 18 must provide parent or guardian consent during the application process.',
    },
    hy: {
      question: 'Ո՞վ կարող է դիմել Նիցցայի փոխանակման ծրագրին։',
      answer: 'Ծրագրին կարող են դիմել 11 տարեկանից բարձր ուսանողները։ Մինչև 18 տարեկան դիմորդների համար պահանջվում է ծնողի համաձայնությունը։',
    },
    ru: {
      question: 'Кто может участвовать в программе обмена в Ницце?',
      answer: 'Программа открыта для студентов от 11 лет и старше. Заявителям до 18 лет требуется согласие родителей.',
    },
    fr: {
      question: 'Qui peut participer au programme d\'échange à Nice ?',
      answer: 'Le programme est ouvert aux étudiants à partir de 11 ans. Les candidats de moins de 18 ans doivent fournir l\'accord parental.',
    },
  },
  'faq-5': {
    en: {
      question: 'Can I upgrade my SMM course tier later?',
      answer: 'Absolutely. You can start with SMM Starter and upgrade to Pro or Expert at any time by paying the price difference.',
    },
    hy: {
      question: 'Կարո՞ղ եմ հետագայում փոխել SMM դասընթացի մակարդակը։',
      answer: 'Անշուշտ։ Դուք կարող եք սկսել SMM Starter-ով և ցանկացած պահի անցնել Pro կամ Expert մակարդակի։',
    },
    ru: {
      question: 'Могу ли я позже повысить уровень курса SMM?',
      answer: 'Конечно. Вы можете начать с уровня SMM Starter и в любое время перейти на Pro или Expert.',
    },
    fr: {
      question: 'Puis-je changer de niveau SMM plus tard ?',
      answer: 'Absolument. Vous pouvez commencer avec SMM Starter et passer à Pro ou Expert à tout moment.',
    },
  },
};

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, allowMultiple = false }) => {
  const { language } = useLanguage();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="space-y-3 w-full">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const localized = item.id ? FAQ_TRANSLATIONS[item.id]?.[language] : undefined;
        const question = localized?.question || item.question;
        const answer = localized?.answer || item.answer;

        return (
          <div
            key={index}
            className="border border-[rgba(0,0,0,0.1)] rounded-[8px] bg-white overflow-hidden transition-all shadow-xs"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left font-semibold text-[rgb(38,38,38)] hover:bg-[rgba(0,0,0,0.02)] transition focus:outline-none focus:ring-2 focus:ring-[rgb(0,0,0)]"
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg pr-4">{question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-5 md:px-5 text-sm md:text-base text-gray-600 border-t border-[rgba(0,0,0,0.05)] pt-3 leading-relaxed">
                {answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
