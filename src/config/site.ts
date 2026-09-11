export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  foundingYear: string;
  founderBiography: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  metrics: {
    studentsEnrolled: string;
    successRate: string;
    expertInstructors: string;
    countriesReached: string;
  };
  pricingPlaceholders: {
    currencySymbol: string;
    startingPrice: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "CELAVIE Educational Academy",
  tagline: "Empowering Minds Through Language & Digital Excellence",
  description:
    "CELAVIE Educational Academy offers premium language courses and expert Social Media Marketing (SMM) training, featuring our unique Nice Exchange program in Nice, France.",
  foundingYear: "[FOUNDING_YEAR]",
  founderBiography:
    "[FOUNDER_BIOGRAPHY]",
  contact: {
    email: "",
    phone: "095 400 288",
    address: "Yerevan, Kentron, Kajaznuni 1",
  },
  metrics: {
    studentsEnrolled: "[METRIC]",
    successRate: "98%",
    expertInstructors: "25+",
    countriesReached: "30+",
  },
  pricingPlaceholders: {
    currencySymbol: "€",
    startingPrice: "",
  },
};

export const SITE_URL = "https://celavie-educational-academy.vercel.app";
export const PHONE_HREF = "tel:+37495400288";
export const LOGO_PATH = "/celavie-logo.png";
