import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage, useT } from '../i18n/useLanguage';
import { LANGUAGE_COURSES, SMM_COURSES } from '../data/mockData';
import { SITE_URL, LOGO_PATH } from '../config/site';

const pages: Record<string, [string, string]> = {
  '/': ['Languages, SMM & International Programs', 'Explore language courses, SMM training and the Nice Exchange program at CELAVIE Educational Academy in Yerevan.'],
  '/about': ['About Us', 'Discover CELAVIE Educational Academy and its approach to language learning, digital skills and cultural exchange.'],
  '/services': ['Courses & Programs', 'Explore language courses, SMM training and the Nice Exchange program at CELAVIE Educational Academy in Yerevan.'],
  '/contact': ['Contact CELAVIE Academy', 'Contact CELAVIE in Yerevan, Kentron, Kajaznuni 1. Call 095 400 288 for course and application enquiries.'],
  '/privacy': ['Privacy Policy', 'Read how CELAVIE uses information provided through course registrations and Nice Exchange applications.'],
  '/terms': ['Terms of Service', 'Read the conditions for course enrollment and participation in the CELAVIE Nice Exchange program.'],
  '/nice-exchange': ['Nice Exchange Program', 'Discover the CELAVIE Nice Exchange program in France and submit your application.'],
  '/register': ['Course Registration', 'Choose a CELAVIE language or SMM course, enter your details and submit your registration.'],
};
export function PageMetadata() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const t = useT();
  const path = pathname.replace(/\/+$/, '') || '/';
  const course = LANGUAGE_COURSES.find(c => path === `/courses/${c.slug}`) ?? SMM_COURSES.find(c => path === `/courses/smm/${c.tier}`);
  const page = course ? [course.title, course.subtitle] : pages[path];
  const title = `${t(page?.[0] ?? 'Page not found')} | CELAVIE`;
  const description = t(page?.[1] ?? 'The page you requested could not be located.');
  const isKnownPage = !!page;
  useEffect(() => {
    document.title = title;
    const meta = (key: string, value: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute, key); document.head.append(tag); }
      tag.content = value;
    };
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;
    meta('description', description);
    meta('robots', isKnownPage ? 'index, follow' : 'noindex, follow');
    meta('og:title', title, true); meta('og:description', description, true);
    meta('og:url', url, true); meta('og:type', 'website', true);
    meta('og:site_name', 'CELAVIE Educational Academy', true);
    meta('og:locale', { hy: 'hy_AM', en: 'en_US', ru: 'ru_RU', fr: 'fr_FR' }[language], true);
    meta('twitter:card', 'summary'); meta('twitter:title', title); meta('twitter:description', description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (isKnownPage) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
      canonical.href = url;
    } else canonical?.remove();
    let schema = document.head.querySelector<HTMLScriptElement>('#academy-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'academy-schema'; schema.type = 'application/ld+json'; document.head.append(schema); }
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: 'CELAVIE Educational Academy', url: `${SITE_URL}/`, logo: SITE_URL + LOGO_PATH, telephone: '+37495400288', address: { '@type': 'PostalAddress', streetAddress: 'Kajaznuni 1, Kentron', addressLocality: 'Yerevan', addressCountry: 'AM' } });
  }, [title, description, language, path, isKnownPage]);
  return null;
}
