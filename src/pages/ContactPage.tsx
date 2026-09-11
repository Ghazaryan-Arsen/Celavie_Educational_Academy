import { useT } from '../i18n/useLanguage';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { siteConfig, PHONE_HREF } from '../config/site';
export const ContactPage = () => { const t = useT(); return (
  <SectionWrapper bg="white" className="py-12 md:py-16">
    <Breadcrumb items={[{ label: 'Contact Us' }]} />
    <div className="grid lg:grid-cols-2 gap-12 text-left mt-8">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">{t("Contact CELAVIE Academy")}</h1>
        <p>{t("Have questions about our language courses, SMM academy, or Nice Exchange program? Our admissions team is here to assist you.")}</p>
        <div className="flex gap-3 items-center"><Phone aria-hidden="true" /><a href={PHONE_HREF}>{t(siteConfig.contact.phone)}</a></div>
        <div className="flex gap-3 items-center"><MapPin aria-hidden="true" /><p>{t(siteConfig.contact.address)}</p></div>
      </div>
      <div className="p-6 md:p-8 rounded-xl bg-gray-50 border border-gray-200 space-y-5">
        <h2 className="text-2xl font-bold">{t("Course Registration")}</h2>
        <p>{t("For questions, please call the academy. To apply for a program, use our registration form.")}</p>
        <Link className="inline-block rounded-full bg-[#2b7a85] text-white px-6 py-3" to="/register">{t("Register Now")}</Link>
        <Link className="block text-[#2b7a85] underline" to="/nice-exchange">{t("Nice Exchange Program")}</Link>
      </div>
    </div>
  </SectionWrapper>
); };
