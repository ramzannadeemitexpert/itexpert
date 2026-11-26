import { useEffect, useState } from 'react';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import {
  buildWhatsAppUrl,
  COMPANY_INFO,
  DEFAULT_SERVICES,
  DELIVERY_OUTCOMES,
  ENGAGEMENT_TIERS,
  ServiceCategory,
  ServiceItem,
} from './data/services';
import { ResilientImage } from './components/ResilientImage';
import { ServiceCatalog } from './components/ServiceCatalog';
import { ServiceEditorModal } from './components/ServiceEditorModal';
import { ContactSection } from './components/ContactSection';

const STORAGE_KEY = 'it_expert_services_v1';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ServiceItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_SERVICES;
  });

  const [isCustomized, setIsCustomized] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });

  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategory>('All');
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (!isCustomized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch {
      // Ignore storage write errors
    }
  }, [services, isCustomized]);

  const handleSelectServiceForBrief = (service: ServiceItem) => {
    setPreselectedService(service);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveService = (saved: ServiceItem) => {
    setIsCustomized(true);
    setServices((prev) => {
      const exists = prev.some((item) => item.id === saved.id);
      if (exists) {
        return prev.map((item) => (item.id === saved.id ? saved : item));
      }
      return [...prev, saved];
    });
  };

  const handleDeleteService = (id: string) => {
    setIsCustomized(true);
    setServices((prev) => {
      const remaining = prev.filter((item) => item.id !== id);
      return remaining.map((item, idx) => ({
        ...item,
        index: String(idx + 1).padStart(2, '0'),
      }));
    });
  };

  const handleResetServices = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage remove errors
    }
    setServices(DEFAULT_SERVICES);
    setIsCustomized(false);
    setActiveCategory('All');
  };

  const nextIndex = String(services.length + 1).padStart(2, '0');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] text-slate-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 text-lg font-bold font-display tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            <img
              src={COMPANY_INFO.logoUrl}
              alt="IT Expert logo"
              className="h-10 w-10 object-contain rounded-md shrink-0"
            />
            <span>{COMPANY_INFO.name}</span>
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#services"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#packages"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Packages
            </a>
            <a
              href="#outcomes"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Outcomes
            </a>
            <a
              href="#contact"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>WhatsApp {COMPANY_INFO.whatsappDisplay}</span>
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Split Section */}
        <section className="py-16 md:py-24 border-b border-slate-200 bg-[#FAFAFB]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs font-medium text-slate-500 mb-4">
                  <span>{COMPANY_INFO.name}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>Fiverr Studio ({COMPANY_INFO.fiverrHandle})</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{COMPANY_INFO.whatsappDisplay}</span>
                </p>

                <h1
                  className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-bold tracking-tight text-slate-900 mb-6"
                  style={{ textWrap: 'balance' }}
                >
                  Reliable Web Engineering, IT Systems &amp; Digital Delivery
                </h1>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                  {COMPANY_INFO.name} builds production websites, custom web portals, and dependable server setups for growing businesses. Order securely through Fiverr or connect directly on WhatsApp.
                </p>

                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={buildWhatsAppUrl(
                      `Hello ${COMPANY_INFO.name}, I visited your website and would like to discuss a project.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>Message on WhatsApp</span>
                  </a>

                  <a
                    href={COMPANY_INFO.fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-800 hover:text-blue-800 hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>Explore Fiverr Profile</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full min-h-[280px] lg:min-h-[420px] rounded-xl border border-slate-200 overflow-hidden bg-slate-100">
                  <ResilientImage
                    src="/src/assets/images/hero_it_studio_1795666959973.jpg"
                    alt="IT Expert engineering studio workstation displaying system schematics"
                    titleFallback="IT Expert Engineering Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Full-width 4-column studio specs strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-slate-200 mt-14 pt-8">
              <div>
                <p className="text-xs text-slate-500 mb-1">Direct WhatsApp</p>
                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold font-mono-tabular text-slate-900 hover:text-blue-800 transition-colors"
                >
                  {COMPANY_INFO.whatsappDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Fiverr Storefront</p>
                <a
                  href={COMPANY_INFO.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-slate-900 hover:text-blue-800 transition-colors"
                >
                  fiverr.com/{COMPANY_INFO.fiverrHandle}
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Response Window</p>
                <p className="text-lg font-bold font-mono-tabular text-slate-900">
                  {COMPANY_INFO.responseWindow}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Active Catalog</p>
                <p className="text-lg font-bold font-mono-tabular text-slate-900">
                  {services.length} Core Services
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Catalog */}
        <ServiceCatalog
          services={services}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectServiceForBrief={handleSelectServiceForBrief}
          onOpenAddModal={() => {
            setEditingService(null);
            setIsEditorOpen(true);
          }}
          onOpenEditModal={(service) => {
            setEditingService(service);
            setIsEditorOpen(true);
          }}
          onResetServices={handleResetServices}
          isCustomized={isCustomized}
        />

        {/* Engagement Packages */}
        <section id="packages" className="py-20 md:py-24 border-b border-slate-200 bg-[#FAFAFB]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-medium text-blue-800 tracking-wide mb-2">
                Engagement Models
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3"
                style={{ textWrap: 'balance' }}
              >
                Transparent Scopes for Fixes, Builds &amp; Retainers
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every engagement begins with clear scope confirmation before work starts, whether billed through Fiverr milestones or direct invoice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ENGAGEMENT_TIERS.map((tier, idx) => {
                const isPrimary = idx === 1;
                const tierWhatsapp = buildWhatsAppUrl(
                  `Hi ${COMPANY_INFO.name}, I'm interested in the "${tier.name}" (${tier.price} ${tier.cadence}).`
                );

                return (
                  <div
                    key={tier.id}
                    className={`flex flex-col justify-between rounded-xl p-6 border ${
                      isPrimary
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-900 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs mb-4">
                        <span
                          className={`font-mono-tabular ${
                            isPrimary ? 'text-blue-300' : 'text-blue-800'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className={`font-mono-tabular ${
                            isPrimary ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {tier.turnaround}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold tracking-tight mb-2">
                        {tier.name}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed mb-6 ${
                          isPrimary ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {tier.audience}
                      </p>

                      <div
                        className={`pb-5 mb-5 border-b ${
                          isPrimary ? 'border-slate-800' : 'border-slate-200'
                        }`}
                      >
                        <span className="text-3xl font-bold font-mono-tabular">
                          {tier.price}
                        </span>
                        <span
                          className={`text-xs ml-2 ${
                            isPrimary ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {tier.cadence}
                        </span>
                      </div>

                      <ul className="space-y-2.5 mb-8">
                        {tier.scope.map((point, pointIdx) => (
                          <li
                            key={pointIdx}
                            className={`text-xs leading-relaxed flex items-start gap-2.5 ${
                              isPrimary ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            <span
                              className={`font-mono-tabular shrink-0 ${
                                isPrimary ? 'text-blue-300' : 'text-blue-800'
                              }`}
                              aria-hidden="true"
                            >
                              —
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                      <a
                        href={tierWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full text-center px-4 py-2.5 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 ${
                          isPrimary
                            ? 'bg-blue-700 text-white hover:bg-blue-600'
                            : 'bg-blue-800 text-white hover:bg-blue-900'
                        }`}
                      >
                        {tier.ctaLabel} on WhatsApp
                      </a>
                      <a
                        href={COMPANY_INFO.fiverrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full text-center px-4 py-2 text-xs font-medium rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 ${
                          isPrimary
                            ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Order via Fiverr
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Delivery Outcomes (Proof adjacent to capability claims) */}
        <section id="outcomes" className="py-20 md:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-blue-800 tracking-wide mb-2">
                  Measured Delivery
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
                  style={{ textWrap: 'balance' }}
                >
                  Engineering Benchmarks Across Recent Client Systems
                </h2>
              </div>
              <a
                href={COMPANY_INFO.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-800 hover:underline underline-offset-4 whitespace-nowrap shrink-0"
              >
                <span>View Fiverr Profile ({COMPANY_INFO.fiverrHandle})</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DELIVERY_OUTCOMES.map((outcome) => (
                <article
                  key={outcome.id}
                  className="p-6 bg-[#FAFAFB] border border-slate-200 rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs text-slate-500 mb-3">
                      {outcome.clientType}
                    </p>
                    <p className="text-3xl font-bold font-mono-tabular text-slate-900 mb-2">
                      {outcome.metric}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 mb-3">
                      {outcome.context}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {outcome.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & WhatsApp Brief Builder */}
        <ContactSection
          services={services}
          preselectedService={preselectedService}
        />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <img
              src={COMPANY_INFO.logoUrl}
              alt="IT Expert logo"
              className="h-12 w-12 object-contain rounded-lg border border-slate-200 bg-white p-0.5 shrink-0"
            />
            <div>
              <p className="text-base font-bold font-display text-slate-900">
                {COMPANY_INFO.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                <span>© {new Date().getFullYear()} {COMPANY_INFO.name}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{COMPANY_INFO.founder}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="font-mono-tabular">{COMPANY_INFO.whatsappDisplay}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <a
              href="#services"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#packages"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Packages
            </a>
            <a
              href={COMPANY_INFO.fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Fiverr ({COMPANY_INFO.fiverrHandle})
            </a>
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              WhatsApp ({COMPANY_INFO.whatsappDisplay})
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {COMPANY_INFO.email}
            </a>
          </div>
        </div>
      </footer>

      <ServiceEditorModal
        isOpen={isEditorOpen}
        editingService={editingService}
        nextIndex={nextIndex}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveService}
        onDelete={handleDeleteService}
      />
    </div>
  );
}
