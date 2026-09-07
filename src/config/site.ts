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
    email: "[EMAIL_ADDRESS]",
    phone: "[PHONE_NUMBER]",
    address: "Nice, France / Online Worldwide",
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
