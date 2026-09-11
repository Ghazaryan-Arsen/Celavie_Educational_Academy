import { useT } from '../../i18n/useLanguage';
import { LOGO_PATH } from '../../config/site';
export const BrandLogo = () => { const t = useT(); return (
  <span className="brand-logo">
    <img src={LOGO_PATH} alt={t("CELAVIE Educational Academy")} width="720" height="1280" />
  </span>
); };
