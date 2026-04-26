import { Search, Filter, Download, MoreHorizontal, ArrowUpRight, ArrowDownLeft, Clock, AlertCircle, RefreshCcw } from 'lucide-react';
import { View, UserMode } from '../App';
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

const TX_DATA = [
  { id: 'TXN-829202', name: 'Stripe UK Ltd', date: 'Oct 24, 2023', amount: 1450.00, currency: 'INR', status: 'Success', type: 'in', method: 'Bank Transfer', division: 'Retail' },
  { id: 'TXN-829101', name: 'Upwork Escrow', date: 'Oct 23, 2023', amount: 3210.00, currency: 'INR', status: 'Pending', type: 'in', method: 'Wire', division: 'Engineering' },
  { id: 'TXN-829004', name: 'Adobe Systems', date: 'Oct 22, 2023', amount: -52.99, currency: 'INR', status: 'Success', type: 'out', method: 'Card', division: 'Marketing' },
  { id: 'TXN-828991', name: 'Amazon Web Services', date: 'Oct 21, 2023', amount: -240.12, currency: 'INR', status: 'Success', type: 'out', method: 'Card', division: 'Infrastructure' },
  { id: 'TXN-828882', name: 'Zomato Payout', date: 'Oct 20, 2023', amount: 12000.00, currency: 'INR', status: 'Failed', type: 'in', method: 'UPI', division: 'Operations' },
  { id: 'TXN-828773', name: 'DigitalOcean', date: 'Oct 19, 2023', amount: -15.00, currency: 'INR', status: 'Refunded', type: 'out', method: 'Card', division: 'Infrastructure' },
];

interface TransactionsProps {
  currentView: View;
  userMode: UserMode;
}

export function Transactions({ currentView, userMode }: TransactionsProps) {
  const isEnterprise = userMode === 'enterprise';
  const filteredData = TX_DATA.filter(tx => {
    if (currentView === 'pending') return tx.status === 'Pending';
    if (currentView === 'failed') return tx.status === 'Failed';
    if (currentView === 'refunds') return tx.status === 'Refunded';
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy capitalize">
            {isEnterprise ? `Institutional ${currentView.replace('-', ' ')}` : currentView.replace('-', ' ')}
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            {isEnterprise ? 'Audit-ready consolidated ledger for institutional fund movement.' : 'Manage and track your global movement of funds.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-gray-600 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
            <Filter className="w-3.5 h-3.5" />
            Advanced Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-white bg-primary-navy rounded-lg hover:bg-primary-navy/90 shadow-sm transition-all text-nowrap">
            <Download className="w-3.5 h-3.5" />
            {isEnterprise ? 'Download Audit Log (XLS)' : 'Export Statement'}
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder={isEnterprise ? "Query by trace ID, GL code..." : "Search by ID, name or amount..."}
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-accent-emerald transition-all font-medium"
            />
          </div>
          {isEnterprise && (
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
              <span className="w-2 h-2 rounded-full bg-accent-emerald" />
              Live Sync Enabled
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left high-density-table">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-3 font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                  {isEnterprise ? 'Subsidiary / Counterparty' : 'Transaction'}
                </th>
                {isEnterprise && <th className="px-6 py-3 font-bold text-gray-400 uppercase tracking-wider text-[10px]">Division</th>}
                <th className="px-6 py-3 font-bold text-gray-400 uppercase tracking-wider text-[10px]">Method</th>
                <th className="px-6 py-3 font-bold text-gray-400 uppercase tracking-wider text-[10px]">Date</th>
                <th className="px-6 py-3 font-bold text-gray-400 uppercase tracking-wider text-[10px]">Amount</th>
                <th className="px-6 py-3 font-bold text-gray-400 uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px]">
              {filteredData.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px]",
                        tx.type === 'in' ? "bg-accent-emerald/10 text-accent-emerald" : "bg-gray-100 text-gray-700"
                      )}>
                        {tx.type === 'in' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-primary-navy">{tx.name}</span>
                        <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">{tx.id}</span>
                      </div>
                    </div>
                  </td>
                  {isEnterprise && (
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                        {tx.division}
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <span className="text-gray-600 font-semibold">{tx.method}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{tx.date}</td>
                  <td className={cn(
                    "px-6 py-4 font-bold text-sm",
                    tx.type === 'in' ? "text-accent-emerald" : "text-primary-navy"
                  )}>
                    {tx.type === 'in' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount), tx.currency)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-primary-navy transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
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

function StatusBadge({ status }: { status: string }) {
  const styles = {
    Success: "bg-accent-emerald/10 text-accent-emerald",
    Pending: "bg-status-amber/10 text-status-amber",
    Failed: "bg-status-red/10 text-status-red",
    Refunded: "bg-primary-navy/10 text-primary-navy",
  };
  
  const icons = {
    Success: <RefreshCcw className="w-2.5 h-2.5" />,
    Pending: <Clock className="w-2.5 h-2.5" />,
    Failed: <AlertCircle className="w-2.5 h-2.5" />,
    Refunded: <RefreshCcw className="w-2.5 h-2.5 rotate-180" />,
  };

  return (
    <span className={cn(
      "px-2 py-0.5 text-[9px] font-bold rounded-full inline-flex items-center gap-1.5 uppercase tracking-wider",
      styles[status as keyof typeof styles]
    )}>
      {icons[status as keyof typeof icons]}
      {status}
    </span>
  );
}
