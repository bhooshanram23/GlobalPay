import { Plus, CreditCard, Link as LinkIcon, Calendar, FileText, MoreHorizontal, ExternalLink, QrCode, ChevronRight } from 'lucide-react';
import { View } from '../App';
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

const PAYMENT_TOOLS = [
  { 
    id: 'checkout', 
    title: 'Smart Checkout', 
    description: 'Highly-optimized payment pages with conversion tools.', 
    icon: CreditCard,
    status: 'Active',
    metrics: '92% Conversion'
  },
  { 
    id: 'links', 
    title: 'Payment Links', 
    description: 'Share a URL to collect payments instantly anywhere.', 
    icon: LinkIcon,
    status: 'Active',
    metrics: '₹1.2M Collected'
  },
  { 
    id: 'subscriptions', 
    title: 'Subscriptions', 
    description: 'Automate recurring billing and global tax collection.', 
    icon: Calendar,
    status: 'BETA',
    metrics: '12 Active Plans'
  },
  { 
    id: 'invoices', 
    title: 'Invoicing', 
    description: 'Professional invoices with built-in international rails.', 
    icon: FileText,
    status: 'Active',
    metrics: '42 Issued'
  },
];

interface PaymentsProps {
  currentView: View;
  onCreateLink: () => void;
}

import { useTranslation } from 'react-i18next';

export function Payments({ currentView, onCreateLink }: PaymentsProps) {
  const { t } = useTranslation();
  
  const paymentTools = [
    { 
      id: 'checkout', 
      title: t('smart_checkout'), 
      description: 'Highly-optimized payment pages with conversion tools.', 
      icon: CreditCard,
      status: 'Active',
      metrics: '92% Conversion'
    },
    { 
      id: 'links', 
      title: t('payment_links'), 
      description: 'Share a URL to collect payments instantly anywhere.', 
      icon: LinkIcon,
      status: 'Active',
      metrics: '₹1.2M Collected'
    },
    { 
      id: 'subscriptions', 
      title: t('subscriptions'), 
      description: 'Automate recurring billing and global tax collection.', 
      icon: Calendar,
      status: 'BETA',
      metrics: '12 Active Plans'
    },
    { 
      id: 'invoices', 
      title: t('invoicing'), 
      description: 'Professional invoices with built-in international rails.', 
      icon: FileText,
      status: 'Active',
      metrics: '42 Issued'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display">{t('collect_payments')}</h1>
          <p className="text-xs text-gray-500 font-medium">{t('payment_desc')}</p>
        </div>
        <button 
          onClick={onCreateLink}
          className="bg-accent-emerald text-white px-5 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-accent-emerald/90 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          {t('create')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {paymentTools.map((tool) => (
           <div key={tool.id} className="glass-card p-5 rounded-xl border border-gray-100 hover:border-accent-emerald transition-all group cursor-pointer">
             <div className="flex justify-between items-start mb-6">
               <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-accent-emerald/10 transition-colors">
                 <tool.icon className="w-5 h-5 text-primary-navy group-hover:text-accent-emerald transition-colors" />
               </div>
               <span className={cn(
                 "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                 tool.status === 'BETA' ? "bg-primary-navy text-white" : "bg-accent-emerald/10 text-accent-emerald"
               )}>
                 {tool.status}
               </span>
             </div>
             <h3 className="font-bold text-sm text-primary-navy mb-1">{tool.title}</h3>
             <p className="text-[11px] text-gray-500 leading-relaxed mb-6 font-medium">{tool.description}</p>
             <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{tool.metrics}</span>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-accent-emerald transition-all translate-x-0 group-hover:translate-x-1" />
             </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-sm">Recent Active Links</h3>
             <button className="text-[10px] font-bold text-accent-emerald hover:underline">View All</button>
           </div>
           
           <div className="space-y-3">
             <LinkItem title="Freelance Dev - Project X" amount="2,400.00" currency="INR" hits="142" />
             <LinkItem title="SaaS Annual Licensing" amount="12,000.00" currency="INR" hits="89" />
             <LinkItem title="B2B Consulting Hours" amount="450.00" currency="EUR" hits="12" />
           </div>
        </div>

        <div className="bg-primary-dark rounded-xl p-6 text-white relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <QrCode className="w-24 h-24" />
           </div>
           <h3 className="font-bold text-sm mb-2 relative z-10">Mobile QR Payments</h3>
           <p className="text-white/50 text-xs mb-6 relative z-10 leading-relaxed">
             Generate localized QR codes for instant UPI or SEPA payments in your retail outlets.
           </p>
           <button className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold py-2 rounded-lg transition-all border border-white/5">
             Generate QR Code
           </button>
        </div>
      </div>
    </motion.div>
  );
}

function LinkItem({ title, amount, currency, hits }: { title: string; amount: string; currency: string; hits: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
          <ExternalLink className="w-4 h-4 text-accent-emerald" />
        </div>
        <div>
           <p className="text-xs font-bold text-primary-navy leading-none mb-1">{title}</p>
           <p className="text-[10px] text-gray-400 font-medium">Link ID: active_092j_k2</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-primary-navy mb-1">{amount} {currency}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{hits} Unique Visits</p>
      </div>
    </div>
  );
}
