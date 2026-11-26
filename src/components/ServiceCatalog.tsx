import { ArrowUpRight, MessageSquare, Pencil, Plus, RotateCcw } from 'lucide-react';
import {
  buildWhatsAppUrl,
  COMPANY_INFO,
  ServiceCategory,
  ServiceItem,
} from '../data/services';
import { ResilientImage } from './ResilientImage';

interface ServiceCatalogProps {
  services: ServiceItem[];
  activeCategory: 'All' | ServiceCategory;
  onCategoryChange: (cat: 'All' | ServiceCategory) => void;
  onSelectServiceForBrief: (service: ServiceItem) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (service: ServiceItem) => void;
  onResetServices: () => void;
  isCustomized: boolean;
}

const CATEGORIES: Array<'All' | ServiceCategory> = [
  'All',
  'Web & Apps',
  'IT & Systems',
  'Design & Growth',
];

export function ServiceCatalog({
  services,
  activeCategory,
  onCategoryChange,
  onSelectServiceForBrief,
  onOpenAddModal,
  onOpenEditModal,
  onResetServices,
  isCustomized,
}: ServiceCatalogProps) {
  const filtered =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-24 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-blue-800 tracking-wide mb-2">
              Services Catalog · Fiverr ({COMPANY_INFO.fiverrHandle})
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              Core IT &amp; Software Services Available for Direct Booking
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80"
              role="tablist"
              aria-label="Filter services by category"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {category === 'All' ? 'All Services' : category}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add Gig</span>
            </button>

            {isCustomized && (
              <button
                type="button"
                onClick={onResetServices}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                title="Restore default IT Expert services"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-slate-200 rounded-xl p-12 text-center bg-slate-50/50">
            <p className="text-sm text-slate-600 mb-4">
              No services listed under {activeCategory} yet.
            </p>
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add a Service</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => {
              const isWide = Boolean(service.featured) && activeCategory === 'All';
              const whatsappUrl = buildWhatsAppUrl(
                `Hi ${COMPANY_INFO.name} (${COMPANY_INFO.founder}), I would like to inquire about "${service.title}" (starting ${service.startingPrice}).`
              );

              return (
                <article
                  key={service.id}
                  className={`group flex flex-col justify-between bg-[#FAFAFB] border border-slate-200 rounded-xl p-6 transition-colors duration-150 hover:border-slate-300 ${
                    isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div>
                    {service.image && (
                      <div className="mb-5 overflow-hidden rounded-lg border border-slate-200/80 aspect-[4/3] max-h-56 w-full bg-slate-100">
                        <ResilientImage
                          src={service.image}
                          alt={service.imageAlt || service.title}
                          titleFallback={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono-tabular font-semibold text-blue-800">
                          {service.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{service.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular whitespace-nowrap">
                          {service.turnaround}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenEditModal(service)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
                        aria-label={`Edit ${service.title}`}
                        title="Edit service details or Fiverr URL"
                      >
                        <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-2.5">
                      {service.index}. {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {service.summary}
                    </p>

                    <ul className="space-y-2 mb-6 border-t border-slate-200/80 pt-4">
                      {service.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-700 leading-relaxed flex items-start gap-2.5"
                        >
                          <span
                            className="font-mono-tabular text-blue-800 font-medium select-none"
                            aria-hidden="true"
                          >
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block text-[11px] text-slate-500">
                        Starting from
                      </span>
                      <span className="text-lg font-bold font-mono-tabular text-slate-900">
                        {service.startingPrice}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectServiceForBrief(service)}
                        className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Request Quote
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={service.fiverrUrl || COMPANY_INFO.fiverrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        <span>Fiverr</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
