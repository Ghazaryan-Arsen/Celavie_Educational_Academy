import React from 'react';
import { Link } from 'react-router-dom';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SERVICES } from '../data/mockData';
import { Languages, TrendingUp, Globe, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Languages':
        return <Languages className="w-8 h-8 text-black" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-black" />;
      case 'Globe':
        return <Globe className="w-8 h-8 text-black" />;
      case 'Briefcase':
      default:
        return <Briefcase className="w-8 h-8 text-black" />;
    }
  };

  return (
    <div>
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Services' }]} />
        </div>
      </div>

      <SectionWrapper bg="white" className="py-16 md:py-20">
        <div className="max-w-3xl text-left space-y-4">
          <Badge variant="secondary" className="uppercase font-bold">
            Comprehensive Offerings
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-[rgb(38,38,38)] leading-tight">
            Our Educational & Cultural Services
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            CELAVIE Educational Academy provides structured language training, Social Media Marketing academies, summer immersion programs in France, and customized corporate training solutions.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-[8px] border border-[rgba(0,0,0,0.08)] shadow-xs flex flex-col justify-between text-left hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-14 h-14 rounded-lg bg-[rgba(0,0,0,0.04)] flex items-center justify-center mb-6">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[rgba(0,0,0,0.06)] mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Key Features
                  </span>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs md:text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-black shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {service.slug === 'nice-exchange' ? (
                  <Link to="/nice-exchange">
                    <Button variant="accent" className="w-full font-bold">
                      Explore Nice Exchange <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : service.slug === 'smm-academy' ? (
                  <Link to="/courses/smm/starter">
                    <Button variant="primary" className="w-full font-bold">
                      Explore SMM Tiers <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button variant="outline" className="w-full font-bold">
                      Register Interest <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};
