import { Users, UserCheck, ShieldAlert, Star, Filter, Search, MoreVertical, Mail, Phone, ExternalLink } from 'lucide-react';
import { View } from '../App';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const CUSTOMERS = [
  { id: '1', name: 'Alex Johnson', email: 'alex@j.com', country: 'US', status: 'Verified', spending: '$12,450', segment: 'Enterprise' },
  { id: '2', name: 'Sarah Miller', email: 'sarah@m.io', country: 'UK', status: 'Pending', spending: '$4,200', segment: 'SMB' },
  { id: '3', name: 'Takashi K', email: 'tk@n.jp', country: 'JP', status: 'Verified', spending: '$28,900', segment: 'Enterprise' },
  { id: '4', name: 'Elena Rossi', email: 'rossi@e.it', country: 'IT', status: 'Flagged', spending: '$0', segment: 'High Risk' },
];

export function Customers() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy">Global Customers</h1>
          <p className="text-xs text-gray-500 font-medium">Manage your international payer relationships and risk profiles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-gray-600 bg-white border border-gray-100 rounded-lg">
            Import CRM
          </button>
          <button className="bg-primary-navy text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm">
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InsightCard label="Active Customers" value="1,242" icon={Users} color="indigo" />
        <InsightCard label="Verified KYC" value="98.2%" icon={UserCheck} color="emerald" />
        <InsightCard label="High Risk Flag" value="03 Cases" icon={ShieldAlert} color="red" />
        <InsightCard label="Retention" value="+12%" icon={Star} color="amber" />
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" placeholder="Filter by email or name..." className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-accent-emerald transition-all" />
          </div>
          <button className="p-2 text-gray-400 hover:text-primary-navy bg-white border border-gray-200 rounded-lg">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left high-density-table">
            <thead>
              <tr>
                <th className="px-6 py-3">Customer Entity</th>
                <th className="px-6 py-3">Region</th>
                <th className="px-6 py-3">KYC Status</th>
                <th className="px-6 py-3">Total Volume</th>
                <th className="px-6 py-3">Segment</th>
                <th className="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-[10px]">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                       <p className="font-bold text-primary-navy leading-none mb-0.5">{customer.name}</p>
                       <p className="text-[9px] text-gray-400 font-medium">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-xs">{customer.country === 'US' ? '🇺🇸' : customer.country === 'UK' ? '🇬🇧' : customer.country === 'JP' ? '🇯🇵' : '🇮🇹'}</span>
                       <span className="font-semibold text-gray-600">{customer.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider",
                      customer.status === 'Verified' ? "bg-accent-emerald/10 text-accent-emerald" : 
                      customer.status === 'Pending' ? "bg-status-amber/10 text-status-amber" : "bg-status-red/10 text-status-red"
                    )}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary-navy">{customer.spending}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                       <div className={cn(
                         "w-1.5 h-1.5 rounded-full",
                         customer.segment === 'Enterprise' ? "bg-indigo-500" : customer.segment === 'SMB' ? "bg-accent-emerald" : "bg-status-red"
                       )} />
                       <span className="font-medium text-gray-500">{customer.segment}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-primary-navy opacity-0 group-hover:opacity-100 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function InsightCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  const colors: any = {
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-accent-emerald bg-accent-emerald/10",
    red: "text-status-red bg-status-red/10",
    amber: "text-status-amber bg-status-amber/10",
  };
  
  return (
    <div className="glass-card p-5 rounded-xl flex items-center gap-4">
       <div className={cn("p-3 rounded-lg shrink-0", colors[color])}>
         <Icon className="w-5 h-5" />
       </div>
       <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
          <h4 className="text-lg font-bold text-primary-navy leading-none">{value}</h4>
       </div>
    </div>
  );
}
