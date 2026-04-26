import { Plus, Link as LinkIcon, MoreHorizontal, ExternalLink, Copy, Search, Filter, Eye, MousePointerClick, Calendar, Globe, CheckCircle2 } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

const LINKS_DATA = [
  // ... existing data
];

interface PaymentLinksProps {
  onCreateLink: () => void;
}

export function PaymentLinks({ onCreateLink }: PaymentLinksProps) {
  const [search, setSearch] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display">Payment Links</h1>
          <p className="text-xs text-gray-500 font-medium">Create a link and start accepting global payments in minutes.</p>
        </div>
        <button 
          onClick={onCreateLink}
          className="bg-accent-emerald text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-accent-emerald/20 hover:bg-accent-emerald/90 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Create Payment Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Total Collected" value="$14,250.00" sub="Across 4 active links" icon={Globe} />
        <StatsCard label="Avg. Conversion" value="12.4%" sub="+2.1% from last month" icon={MousePointerClick} />
        <StatsCard label="Active Visits" value="1,492" sub="Real-time global traffic" icon={Eye} />
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search links..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-accent-emerald transition-all"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 text-gray-400 hover:text-primary-navy bg-white border border-gray-200 rounded-lg">
              <Filter className="w-3.5 h-3.5" />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort: Newest</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left high-density-table">
            <thead>
              <tr>
                <th className="px-6 py-3">Link Details</th>
                <th className="px-6 py-3">Performance</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {LINKS_DATA.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-primary-navy shrink-0">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-primary-navy leading-none mb-1">{link.title}</p>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">{link.id}</span>
                           <span className="w-1 h-1 bg-gray-200 rounded-full" />
                           <span className="text-[9px] text-gray-400 font-medium">Created {link.created}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <div className="flex flex-col">
                         <span className="text-primary-navy font-bold">{link.visits}</span>
                         <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tight">Visits</span>
                       </div>
                       <div className="w-px h-6 bg-gray-100" />
                       <div className="flex flex-col">
                         <span className="text-accent-emerald font-bold">{link.payments}</span>
                         <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tight">Sales</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary-navy">
                    {formatCurrency(link.amount, link.currency)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider",
                      link.status === 'Active' ? "bg-accent-emerald/10 text-accent-emerald" : 
                      link.status === 'Disabled' ? "bg-gray-100 text-gray-400" : "bg-status-red/10 text-status-red"
                    )}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="p-1.5 text-gray-400 hover:text-accent-emerald bg-white border border-gray-100 rounded-lg shadow-sm" title="Copy Link">
                         <Copy className="w-3.5 h-3.5" />
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-primary-navy bg-white border border-gray-100 rounded-lg shadow-sm" title="Preview">
                         <ExternalLink className="w-3.5 h-3.5" />
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-primary-navy">
                         <MoreHorizontal className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="bg-primary-navy rounded-2xl p-6 text-white flex gap-6 items-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-accent-emerald opacity-5 blur-3xl group-hover:opacity-10 transition-opacity" />
           <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
             <Globe className="w-7 h-7 text-accent-emerald" />
           </div>
           <div>
              <h3 className="font-bold text-sm mb-1">Global Payout Rules</h3>
              <p className="text-white/50 text-[11px] font-medium leading-relaxed">
                Automatically split payments from your links into multiple currencies to hedge against FX risk.
              </p>
              <button className="mt-4 text-[10px] font-bold text-accent-emerald hover:underline uppercase tracking-wider">Configure Rules</button>
           </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex gap-6 items-center">
           <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
             <CheckCircle2 className="w-7 h-7 text-primary-navy" />
           </div>
           <div>
              <h3 className="font-bold text-sm mb-1 text-primary-navy">No-Code Landing Pages</h3>
              <p className="text-gray-500 text-[11px] font-medium leading-relaxed">
                Customize colors, fonts, and branding for each payment link to provide a consistent checkout experience.
              </p>
              <button className="mt-4 text-[10px] font-bold text-primary-navy hover:underline uppercase tracking-wider">Theme Editor</button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatsCard({ label, value, sub, icon: Icon }: { label: string; value: string; sub: string; icon: any }) {
  return (
    <div className="glass-card p-5 rounded-xl flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-lg text-primary-navy">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
        <div className="flex items-end gap-2">
           <h4 className="text-lg font-bold text-primary-navy leading-none">{value}</h4>
           <span className="text-[9px] font-bold text-accent-emerald mb-0.5">{sub}</span>
        </div>
      </div>
    </div>
  );
}
