import { useT } from '../i18n/useLanguage';
import { Link } from 'react-router-dom';
export const NotFoundPage = () => { const t = useT(); return (
  <section className="px-5 py-24 text-center space-y-5">
    <p className="text-[#2b7a85] text-xl">{t("404")}</p>
    <h1 className="text-4xl font-bold">{t("Page not found")}</h1>
    <p>{t("The page you requested could not be located.")}</p>
    <Link to="/" className="inline-block rounded-full bg-[#2b7a85] text-white px-6 py-3">{t("Back to Home")}</Link>
  </section>
); };
