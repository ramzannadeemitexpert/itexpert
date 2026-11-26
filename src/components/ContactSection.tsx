import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  COMPANY_INFO,
  ServiceItem,
} from '../data/services';

interface ContactSectionProps {
  services: ServiceItem[];
  preselectedService: ServiceItem | null;
}

const BUDGET_RANGES = [
  'Under $50 (Quick Fix)',
  '$50 – $150 (Standard Build)',
  '$150 – $400 (Full Web / Store)',
  '$400+ (Custom App / Retainer)',
];

export function ContactSection({
  services,
  preselectedService,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState(
    services[0]?.title || 'Full-Stack Web Applications & Custom Portals'
  );
  const [budget, setBudget] = useState(BUDGET_RANGES[1]);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedBrief, setSubmittedBrief] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<'whatsapp' | 'email' | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setSelectedServiceTitle(preselectedService.title);
    }
  }, [preselectedService]);

  const handleCopy = async (value: string, field: 'whatsapp' | 'email') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback ignored in restricted clipboard contexts
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanContact = contact.trim();
    const cleanNotes = notes.trim();

    if (cleanName.length < 2) {
      setFormError('Please enter your name or company name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = cleanContact.replace(/\D/g, '');
    if (!emailPattern.test(cleanContact) && phoneDigits.length < 7) {
      setFormError('Please provide a valid email address or phone/WhatsApp number.');
      return;
    }

    if (cleanNotes.length < 10) {
      setFormError('Please include a brief summary of your project requirements (at least 10 characters).');
      return;
    }

    setFormError('');
    const compiledMessage = [
      `Hello ${COMPANY_INFO.name} (${COMPANY_INFO.founder}),`,
      `Name: ${cleanName}`,
      `Contact: ${cleanContact}`,
      `Service: ${selectedServiceTitle}`,
      `Budget: ${budget}`,
      `Requirements: ${cleanNotes}`,
    ].join('\n');

    setSubmittedBrief(compiledMessage);
  };

  const whatsappDirectUrl = submittedBrief
    ? buildWhatsAppUrl(submittedBrief)
    : buildWhatsAppUrl(
        `Hello ${COMPANY_INFO.name}, I'd like to discuss "${selectedServiceTitle}" (${budget}).`
      );

  const mailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${selectedServiceTitle}`
  )}&body=${encodeURIComponent(submittedBrief || '')}`;

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#FAFAFB]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-blue-800 tracking-wide mb-2">
              Direct Contact &amp; Booking
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              style={{ textWrap: 'balance' }}
            >
              Start Your Project on WhatsApp or Fiverr
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              Reach {COMPANY_INFO.name} directly for custom quotes, urgent technical troubleshooting, or structured milestone orders through our verified Fiverr studio.
            </p>

            <div className="space-y-4 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                <div className="min-w-0">
                  <span className="block text-xs text-slate-500 mb-0.5">
                    WhatsApp Business Line
                  </span>
                  <a
                    href={COMPANY_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-semibold font-mono-tabular text-slate-900 hover:text-blue-800 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                    <span>{COMPANY_INFO.whatsappDisplay}</span>
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(COMPANY_INFO.whatsappDisplay, 'whatsapp')}
                    className="p-2 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    aria-label="Copy WhatsApp number"
                    title={`Copy ${COMPANY_INFO.whatsappDisplay}`}
                  >
                    {copiedField === 'whatsapp' ? (
                      <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    ) : (
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                  <a
                    href={COMPANY_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    Chat Now
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                <div className="min-w-0">
                  <span className="block text-xs text-slate-500 mb-0.5">
                    Fiverr Profile &amp; Escrow Orders
                  </span>
                  <a
                    href={COMPANY_INFO.fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-900 hover:text-blue-800 transition-colors truncate block"
                  >
                    fiverr.com/{COMPANY_INFO.fiverrHandle}
                  </a>
                </div>
                <a
                  href={COMPANY_INFO.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Visit Fiverr</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="flex items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                <div className="min-w-0">
                  <span className="block text-xs text-slate-500 mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-blue-800 transition-colors truncate max-w-full"
                  >
                    <Mail className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                    <span className="truncate">{COMPANY_INFO.email}</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(COMPANY_INFO.email, 'email')}
                  className="p-2 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                  aria-label="Copy email address"
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Project Scope &amp; Instant WhatsApp Brief
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete your brief below to generate a structured message for WhatsApp ({COMPANY_INFO.whatsappDisplay}) or email.
            </p>

            {submittedBrief ? (
              <div className="space-y-5">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                  <p className="text-sm font-semibold text-emerald-950 mb-1">
                    Project brief ready to send
                  </p>
                  <p className="text-xs text-emerald-900">
                    Choose your preferred channel below to dispatch this brief directly to {COMPANY_INFO.name}.
                  </p>
                </div>

                <pre className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono-tabular text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {submittedBrief}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Send via Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedBrief(null)}
                    className="px-3 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Edit Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {formError && (
                  <div
                    role="alert"
                    className="p-3 text-xs font-medium text-red-800 bg-red-50 border border-red-200 rounded-lg"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-xs font-medium text-slate-700 mb-1.5"
                    >
                      Your Name / Business
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ahmed Khan"
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-contact"
                      className="block text-xs font-medium text-slate-700 mb-1.5"
                    >
                      Email or WhatsApp Number
                    </label>
                    <input
                      id="lead-contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="you@company.com or 03XX..."
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="lead-service"
                      className="block text-xs font-medium text-slate-700 mb-1.5"
                    >
                      Service Required
                    </label>
                    <select
                      id="lead-service"
                      value={selectedServiceTitle}
                      onChange={(e) => setSelectedServiceTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.index}. {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-budget"
                      className="block text-xs font-medium text-slate-700 mb-1.5"
                    >
                      Estimated Budget
                    </label>
                    <select
                      id="lead-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                    >
                      {BUDGET_RANGES.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lead-notes"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    Project Details &amp; Timeline
                  </label>
                  <textarea
                    id="lead-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share your website URL, required features, or technical issue..."
                    className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                    required
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Typical reply within {COMPANY_INFO.responseWindow}.
                  </span>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                  >
                    Prepare Project Brief
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
