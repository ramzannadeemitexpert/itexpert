import heroStudioImg from '../assets/images/hero_it_studio_1795666959973.jpg';
import serviceWebImg from '../assets/images/service_web_engineering_1795666960032.jpg';
import serviceCloudImg from '../assets/images/service_cloud_infrastructure_1795666961052.jpg';
import serviceDesignImg from '../assets/images/service_brand_ui_design_1795666960451.jpg';

export type ServiceCategory = 'Web & Apps' | 'IT & Systems' | 'Design & Growth';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  deliverables: string[];
  startingPrice: string;
  turnaround: string;
  fiverrUrl: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface EngagementTier {
  id: string;
  name: string;
  audience: string;
  price: string;
  cadence: string;
  turnaround: string;
  scope: string[];
  ctaLabel: string;
}

export interface DeliveryOutcome {
  id: string;
  metric: string;
  context: string;
  clientType: string;
  summary: string;
}

export const HERO_STUDIO_IMAGE = heroStudioImg;

export const COMPANY_INFO = {
  name: 'IT Expert',
  founder: 'Ramzan Nadeem',
  logoUrl: './assets/aistudio/ChatGPT_Image_Sep_2__2026__09_33_08_PM_d16513fb.png',
  fiverrHandle: 'rnitexpert',
  fiverrUrl: 'https://www.fiverr.com/rnitexpert',
  whatsappDisplay: '03288571879',
  whatsappFormatted: '+92 328 8571879',
  whatsappLink: 'https://wa.me/923288571879',
  email: 'ramzannadeemitexpert@gmail.com',
  responseWindow: 'Under 2 Hours',
};

export function buildWhatsAppUrl(message: string): string {
  return `${COMPANY_INFO.whatsappLink}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'fullstack-web',
    index: '01',
    title: 'Full-Stack Web Applications & Custom Portals',
    category: 'Web & Apps',
    summary:
      'Production-ready business websites, client dashboards, and SaaS portals engineered with React, Next.js, Node.js, and relational or cloud databases.',
    deliverables: [
      'Responsive UI built for desktop and mobile',
      'REST API integration and authentication',
      'Database schema setup and cloud deployment',
      'Clean source code with handover documentation',
    ],
    startingPrice: '$120',
    turnaround: '4–7 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
    image: serviceWebImg,
    imageAlt: 'Laptop displaying clean full-stack web architecture and structured TypeScript code',
    featured: true,
  },
  {
    id: 'wordpress-ecommerce',
    index: '02',
    title: 'WordPress, WooCommerce & Shopify Storefronts',
    category: 'Web & Apps',
    summary:
      'Conversion-ready company sites and online stores with payment gateway integration, speed optimization, and intuitive content management.',
    deliverables: [
      'Custom theme layout and mobile checkout polish',
      'Payment gateway and shipping zone configuration',
      'Core Web Vitals speed tuning and SSL hardening',
    ],
    startingPrice: '$75',
    turnaround: '3–5 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
  },
  {
    id: 'it-infrastructure',
    index: '03',
    title: 'IT Support, Server Setup & Cloud Administration',
    category: 'IT & Systems',
    summary:
      'Remote system diagnostics, Linux/Windows server configuration, domain DNS/SSL troubleshooting, and business email setup with zero guesswork.',
    deliverables: [
      'VPS, cPanel, and cloud hosting migration',
      'DNS records, SPF/DKIM/DMARC business email setup',
      'Malware cleanup, backups, and firewall rules',
    ],
    startingPrice: '$40',
    turnaround: '24 Hours',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
    image: serviceCloudImg,
    imageAlt: 'Enterprise network rack and structured cabling inside a clean data facility',
  },
  {
    id: 'ui-ux-design',
    index: '04',
    title: 'UI/UX Product Design & Brand Systems',
    category: 'Design & Growth',
    summary:
      'High-clarity interface wireframes, interactive Figma prototypes, and cohesive visual brand kits designed for fast engineering handoff.',
    deliverables: [
      'Desktop and mobile Figma component library',
      'Clickable user flows for stakeholder sign-off',
      'Export-ready typography, color tokens, and assets',
    ],
    startingPrice: '$65',
    turnaround: '2–4 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
    image: serviceDesignImg,
    imageAlt: 'Digital tablet with UI layout grid and architectural wireframe notebook',
  },
  {
    id: 'automation-api',
    index: '05',
    title: 'Workflow Automation, Scripts & API Integrations',
    category: 'IT & Systems',
    summary:
      'Connect CRMs, Google Workspace, WhatsApp webhooks, payment providers, and spreadsheets to eliminate repetitive manual data entry.',
    deliverables: [
      'Custom Node.js or Python integration scripts',
      'Webhook pipelines and automated report delivery',
      'Error handling and rate-limit safe retries',
    ],
    startingPrice: '$55',
    turnaround: '2–3 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
  },
  {
    id: 'seo-maintenance',
    index: '06',
    title: 'Technical SEO, Bug Fixes & Ongoing Maintenance',
    category: 'Design & Growth',
    summary:
      'Structured metadata audits, broken-layout fixes, database cleanup, and monthly site care so your digital storefront stays fast and searchable.',
    deliverables: [
      'On-page schema markup, sitemaps, and meta audit',
      'JavaScript/CSS bug resolution and plugin updates',
      'Monthly uptime checks and performance reports',
    ],
    startingPrice: '$35',
    turnaround: '24–48 Hours',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
    featured: true,
  },
];

export const ENGAGEMENT_TIERS: EngagementTier[] = [
  {
    id: 'tier-fix',
    name: 'Single Task & Quick Fix',
    audience: 'Ideal for urgent bug fixes, DNS/SSL issues, or single-page updates',
    price: '$35',
    cadence: 'per task',
    turnaround: 'Same Day – 48h',
    scope: [
      'Root-cause diagnosis before any changes',
      'Clean fix tested across desktop and mobile',
      'Direct WhatsApp or Fiverr progress updates',
      '7-day post-delivery support guarantee',
    ],
    ctaLabel: 'Book Quick Fix',
  },
  {
    id: 'tier-build',
    name: 'Complete Project Delivery',
    audience: 'Built for businesses launching a full website, store, or custom web app',
    price: '$150',
    cadence: 'starting milestone',
    turnaround: '5–10 Business Days',
    scope: [
      'Architecture plan & UI milestone approval',
      'Full front-end, backend & database setup',
      'Production deployment with SSL & speed tuning',
      'Admin walkthrough & complete source handover',
    ],
    ctaLabel: 'Start Project Build',
  },
  {
    id: 'tier-retainer',
    name: 'Dedicated IT Retainer',
    audience: 'For growing teams needing reliable weekly engineering and IT support',
    price: '$320',
    cadence: 'per month',
    turnaround: 'Priority 2h SLA',
    scope: [
      'Scheduled backups, security & plugin updates',
      'Up to 15 hours of monthly feature work or fixes',
      'Server monitoring & email deliverability care',
      'Direct WhatsApp line (03288571879) priority access',
    ],
    ctaLabel: 'Discuss Retainer',
  },
];

export const DELIVERY_OUTCOMES: DeliveryOutcome[] = [
  {
    id: 'outcome-1',
    metric: '1.1s LCP',
    context: 'Load time down from 4.8s after WooCommerce optimization',
    clientType: 'Retail E-Commerce Storefront',
    summary:
      'Replaced bloated page-builder scripts, configured server caching, and compressed catalog media without altering visual layout.',
  },
  {
    id: 'outcome-2',
    metric: '99.98% Uptime',
    context: 'Zero downtime across cloud migration and DNS cutover',
    clientType: 'B2B Logistics Portal',
    summary:
      'Migrated legacy shared hosting to a hardened VPS with automated daily snapshots, SSL renewal, and DKIM/DMARC email authentication.',
  },
  {
    id: 'outcome-3',
    metric: '12 hrs/wk Saved',
    context: 'Automated invoice & WhatsApp order notifications',
    clientType: 'Regional Service Business',
    summary:
      'Built a lightweight webhook bridge syncing web lead forms directly into Google Sheets and formatted team alerts.',
  },
];
