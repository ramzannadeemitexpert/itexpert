import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  COMPANY_INFO,
  ServiceCategory,
  ServiceItem,
} from '../data/services';

interface ServiceEditorModalProps {
  isOpen: boolean;
  editingService: ServiceItem | null;
  nextIndex: string;
  onClose: () => void;
  onSave: (service: ServiceItem) => void;
  onDelete?: (id: string) => void;
}

const CATEGORIES: ServiceCategory[] = [
  'Web & Apps',
  'IT & Systems',
  'Design & Growth',
];

export function ServiceEditorModal({
  isOpen,
  editingService,
  nextIndex,
  onClose,
  onSave,
  onDelete,
}: ServiceEditorModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Web & Apps');
  const [summary, setSummary] = useState('');
  const [deliverablesText, setDeliverablesText] = useState('');
  const [startingPrice, setStartingPrice] = useState('$50');
  const [turnaround, setTurnaround] = useState('3–5 Days');
  const [fiverrUrl, setFiverrUrl] = useState(COMPANY_INFO.fiverrUrl);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    if (editingService) {
      setTitle(editingService.title);
      setCategory(editingService.category);
      setSummary(editingService.summary);
      setDeliverablesText(editingService.deliverables.join('\n'));
      setStartingPrice(editingService.startingPrice);
      setTurnaround(editingService.turnaround);
      setFiverrUrl(editingService.fiverrUrl || COMPANY_INFO.fiverrUrl);
    } else {
      setTitle('');
      setCategory('Web & Apps');
      setSummary('');
      setDeliverablesText(
        'Clean implementation tested on desktop and mobile\nDirect WhatsApp & Fiverr milestone updates\nSource files & post-delivery support'
      );
      setStartingPrice('$50');
      setTurnaround('3 Days');
      setFiverrUrl(COMPANY_INFO.fiverrUrl);
    }
    setError('');
  }, [isOpen, editingService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedSummary = summary.trim();
    if (!trimmedTitle || !trimmedSummary) {
      setError('Please enter both a service title and a concise description.');
      return;
    }

    const parsedDeliverables = deliverablesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (parsedDeliverables.length === 0) {
      setError('Please include at least one deliverable line.');
      return;
    }

    const safeUrl = fiverrUrl.trim() || COMPANY_INFO.fiverrUrl;

    onSave({
      id: editingService?.id || `gig-${Date.now()}`,
      index: editingService?.index || nextIndex,
      title: trimmedTitle,
      category,
      summary: trimmedSummary,
      deliverables: parsedDeliverables,
      startingPrice: startingPrice.trim() || '$50',
      turnaround: turnaround.trim() || '3 Days',
      fiverrUrl: safeUrl,
      image: editingService?.image,
      imageAlt: editingService?.imageAlt,
      featured: editingService?.featured,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-editor-title"
    >
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3
            id="service-editor-title"
            className="text-base font-semibold text-slate-900"
          >
            {editingService ? 'Edit Service / Fiverr Gig' : 'Add Fiverr Gig to Catalog'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div
              role="alert"
              className="p-3 text-xs font-medium text-red-800 bg-red-50 border border-red-200 rounded-lg"
            >
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="gig-title"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Service Title
            </label>
            <input
              id="gig-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Custom React & Node.js Web Application"
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="gig-category"
                className="block text-xs font-medium text-slate-700 mb-1.5"
              >
                Category
              </label>
              <select
                id="gig-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="gig-price"
                className="block text-xs font-medium text-slate-700 mb-1.5"
              >
                Starting Price
              </label>
              <input
                id="gig-price"
                type="text"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="$75"
                className="w-full px-3 py-2 text-sm font-mono-tabular text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div>
              <label
                htmlFor="gig-turnaround"
                className="block text-xs font-medium text-slate-700 mb-1.5"
              >
                Delivery Time
              </label>
              <input
                id="gig-turnaround"
                type="text"
                value={turnaround}
                onChange={(e) => setTurnaround(e.target.value)}
                placeholder="3–5 Days"
                className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="gig-summary"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Service Description
            </label>
            <textarea
              id="gig-summary"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe the concrete business outcome and technical scope..."
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div>
            <label
              htmlFor="gig-deliverables"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Key Deliverables (one per line)
            </label>
            <textarea
              id="gig-deliverables"
              rows={3}
              value={deliverablesText}
              onChange={(e) => setDeliverablesText(e.target.value)}
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div>
            <label
              htmlFor="gig-url"
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Direct Fiverr Gig URL
            </label>
            <input
              id="gig-url"
              type="url"
              value={fiverrUrl}
              onChange={(e) => setFiverrUrl(e.target.value)}
              placeholder="https://www.fiverr.com/rnitexpert/..."
              className="w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <div>
              {editingService && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(editingService.id);
                    onClose();
                  }}
                  className="px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Remove Service
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Save Service
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
