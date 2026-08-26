import React, { useState } from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { siteConfig } from '../config/site';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div>
      <div className="bg-gray-50 border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Contact Us' }]} />
        </div>
      </div>

      <SectionWrapper bg="white" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <Badge variant="secondary" className="uppercase font-bold mb-3">
                Get In Touch
              </Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-black">
                Contact CELAVIE Academy
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
                Have questions about our language courses, SMM academy, or Nice Exchange program? Our admissions team is here to assist you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Email Support</h4>
                  <p className="text-xs text-gray-500 mb-1">Send us an email anytime</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-semibold text-blue-600 hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Phone & WhatsApp</h4>
                  <p className="text-xs text-gray-500 mb-1">Mon - Fri: 09:00 - 18:00 CET</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-sm font-semibold text-blue-600 hover:underline">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">Academy Address</h4>
                  <p className="text-xs text-gray-500 mb-1">French Riviera Headquarters</p>
                  <p className="text-sm font-semibold text-gray-800">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-[8px] border border-[rgba(0,0,0,0.06)] space-y-2">
              <h4 className="text-sm font-bold text-black">Admissions Office Hours</h4>
              <p className="text-xs text-gray-600">Monday — Friday: 9:00 AM – 6:00 PM CET</p>
              <p className="text-xs text-gray-600">Saturday: 10:00 AM – 2:00 PM CET</p>
              <p className="text-xs text-gray-400 pt-1">Response time: Usually within 24 hours.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 rounded-[8px] border border-[rgba(0,0,0,0.1)] shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">Message Received!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Thank you for reaching out. An admissions counselor will respond to your inquiry shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-black mb-4">Send Us a Message</h3>

                  <Input
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marie Curie"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. marie@example.com"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +33 6 12 34 56 78"
                    />
                  </div>

                  <Select
                    label="Inquiry Topic"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    options={[
                      { value: 'general', label: 'General Information' },
                      { value: 'language', label: 'Language Courses Enrollment' },
                      { value: 'smm', label: 'SMM Academy Inquiry' },
                      { value: 'nice-exchange', label: 'Nice Exchange Program' },
                      { value: 'payment', label: 'Payment & Tuition Plan' },
                    ]}
                  />

                  <Textarea
                    label="Your Message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                  />

                  <Button variant="primary" size="lg" className="w-full font-bold" disabled={loading}>
                    {loading ? 'Sending Message...' : 'Submit Inquiry'} <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};
