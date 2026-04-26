import { Users, Banknote, Clock, CheckCircle2, ChevronRight, UserPlus, Info, MoreHorizontal, Upload, FileText, Loader2, Search, RefreshCcw, ShieldCheck } from 'lucide-react';
import { View } from '../App';
import { cn, formatCurrency } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef } from 'react';
import { AddBeneficiaryModal } from './AddBeneficiaryModal';

const INITIAL_BENEFICIARIES = [
  { id: '1', name: 'Software Solutions Ltd', bank: 'HSBC London', iban: 'GB12HSBC123456', country: 'UK', flag: '🇬🇧', status: 'Verified' },
  { id: '2', name: 'Cloud Infra GMBH', bank: 'Deutsche Bank', iban: 'DE9210001000', country: 'DE', flag: '🇩🇪', status: 'Pending' },
  { id: '3', name: 'Marketing Pros Inc', bank: 'Chase US', routing: '021000021', country: 'US', flag: '🇺🇸', status: 'Verified' },
];

const SCHEDULED = [
  { id: 'SCH-01', recipient: 'Amazon Web Services', date: 'Nov 01, 2023', amount: 4500, currency: 'INR', frequency: 'Monthly', status: 'Active' },
  { id: 'SCH-02', recipient: 'DigitalOcean', date: 'Nov 05, 2023', amount: 15.00, currency: 'INR', frequency: 'Monthly', status: 'Paused' },
  { id: 'SCH-03', recipient: 'Software Solutions Ltd', date: 'Oct 30, 2023', amount: 12000, currency: 'EUR', frequency: 'One-time', status: 'Active' },
];

interface PayoutsProps {
  currentView: View;
}

export function Payouts({ currentView }: PayoutsProps) {
  const isBeneficiaries = currentView === 'beneficiaries';
  const isScheduled = currentView === 'scheduled-payouts';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [beneficiaries, setBeneficiaries] = useState(INITIAL_BENEFICIARIES);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshingId, setRefreshingId] = useState<string | null>(null);

  const handleRefreshStatus = (id: string) => {
    setRefreshingId(id);
    setTimeout(() => {
      setBeneficiaries(prev => prev.map(b => 
        b.id === id ? { ...b, status: 'Verified' } : b
      ));
      setRefreshingId(null);
    }, 1500);
  };

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }, 2000);
    }
  };

  const handleAddSuccess = (newBeneficiary: any) => {
    setBeneficiaries([
      { ...newBeneficiary, status: 'Verified' },
      ...beneficiaries
    ]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".csv"
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy">
             {isBeneficiaries ? 'Saved Beneficiaries' : isScheduled ? 'Scheduled Payouts' : 'Mass Payouts'}
          </h1>
          <p className="text-xs text-gray-500 font-medium">Send money to vendors, contractors or employees worldwide.</p>
        </div>
        <div className="flex items-center gap-3">
          {!isBeneficiaries && !isScheduled && (
            <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-gray-600 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
               Run History
            </button>
          )}
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold text-white bg-primary-navy rounded-xl hover:bg-primary-navy/90 shadow-lg shadow-primary-navy/10 active:scale-95 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            {isScheduled ? 'Schedule New' : 'Add Beneficiary'}
          </button>
        </div>
      </div>

      {!isBeneficiaries && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label={isScheduled ? "Active Schedules" : "Scheduled Today"} value={isScheduled ? "8 Rules" : "12 Payments"} amount={isScheduled ? "Recurring & One-time" : "$12,450.00"} />
          <StatCard label="Success Rate" value="99.98%" amount="Last 30 Days" />
          <StatCard label="Avg Settlement" value="4.2 Hours" amount="Across 12 Rails" />
        </div>
      )}

      <div className="glass-card rounded-xl overflow-hidden border-gray-100 shadow-xl shadow-primary-navy/[0.02]">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30">
           <h3 className="font-bold text-sm text-primary-navy">
             {isBeneficiaries ? 'Active Recipients' : isScheduled ? 'Active Payment Rules' : 'Recent Payout Batches'}
           </h3>
           <div className="relative">
             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
             <input 
               type="text"
               placeholder="Search recipients..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-1.5 text-xs text-primary-navy w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-accent-emerald focus:border-accent-emerald transition-all"
             />
           </div>
        </div>
        
        <div className="overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
          {isScheduled ? (
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  <th className="px-6 py-4">Recipient</th>
                  <th className="px-6 py-4">Next Payment</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11px]">
                {SCHEDULED.map((sch) => (
                  <tr key={sch.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary-navy mb-0.5">{sch.recipient}</p>
                      <p className="text-[9px] text-gray-400 font-mono tracking-tight">{sch.id}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">{sch.date}</td>
                    <td className="px-6 py-4 font-bold text-primary-navy">
                      {formatCurrency(sch.amount, sch.currency)}
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2.5 py-1 bg-gray-100 rounded-lg font-bold text-[9px] text-gray-400 uppercase tracking-widest">{sch.frequency}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-gray-300 hover:text-primary-navy transition-colors">
                         <MoreHorizontal className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredBeneficiaries.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-5 hover:bg-gray-50/80 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform group-hover:shadow-md">
                      {item.flag}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary-navy leading-none mb-2 tracking-tight">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.bank}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase font-mono tracking-tight">{(item as any).iban || (item as any).routing || (item as any).accountNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex flex-col items-end min-w-[80px] sm:min-w-[140px]">
                      <p className="hidden sm:flex text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 items-center gap-1.5 opacity-60">
                        <ShieldCheck className="w-3 h-3 text-accent-emerald" />
                        Compliance Check
                      </p>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRefreshStatus(item.id); }}
                          disabled={refreshingId === item.id}
                          className={cn(
                            "p-2 rounded-xl border transition-all text-gray-400 hover:text-accent-emerald active:scale-90 shadow-sm",
                            refreshingId === item.id ? "bg-accent-emerald/10 border-accent-emerald/30" : "bg-white border-gray-100 hover:shadow-md"
                          )}
                          title="Refresh verification status"
                        >
                          <RefreshCcw className={cn("w-3.5 h-3.5", refreshingId === item.id && "animate-spin text-accent-emerald")} />
                        </button>
                        <div className={cn(
                          "flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] px-3 sm:px-5 py-2 rounded-xl border shadow-sm transition-all relative overflow-hidden",
                          item.status === 'Verified' 
                            ? "text-accent-emerald bg-accent-emerald/5 border-accent-emerald/20 shadow-accent-emerald/10" 
                            : "text-status-amber bg-status-amber/5 border-status-amber/20 shadow-status-amber/10"
                        )}>
                          {refreshingId === item.id && (
                            <motion.div 
                              className="absolute inset-0 bg-accent-emerald/10"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            />
                          )}
                          {item.status === 'Verified' ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          <span className="relative z-10">{refreshingId === item.id ? 'Verifying...' : item.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-10 w-px bg-gray-100 hidden md:block" />
                    <button className={cn(
                       "hidden sm:block px-6 py-2.5 rounded-xl text-[10px] font-bold shadow-md transition-all whitespace-nowrap active:scale-95",
                       isBeneficiaries 
                        ? "bg-primary-navy text-white hover:bg-accent-emerald hover:shadow-lg hover:shadow-accent-emerald/20 shadow-primary-navy/10" 
                        : "bg-white border border-gray-100 text-primary-navy hover:bg-gray-50 shadow-sm"
                    )}>
                      {isBeneficiaries ? 'Send' : 'History'}
                    </button>
                    <button className="text-gray-300 hover:text-primary-navy transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredBeneficiaries.length === 0 && (
                <div className="p-12 text-center">
                   <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                   <h4 className="text-sm font-bold text-primary-navy">No recipients found</h4>
                   <p className="text-xs text-gray-400 mt-1">Try adjusting your search query</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-primary-navy/5 p-8 rounded-2xl border border-primary-navy/10 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/5 blur-[100px] rounded-full -translate-x-32 -translate-y-32" />
         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl ring-1 ring-primary-navy/5 shrink-0 relative z-10 transition-transform group-hover:scale-110">
           {uploadStatus === 'uploading' ? (
             <Loader2 className="w-7 h-7 text-accent-emerald animate-spin" />
           ) : uploadStatus === 'success' ? (
             <CheckCircle2 className="w-7 h-7 text-accent-emerald" />
           ) : (
             <FileText className="w-7 h-7 text-accent-emerald" />
           )}
         </div>
         <div className="flex-1 relative z-10 text-center lg:text-left">
           <p className="text-base font-bold text-primary-navy mb-1.5 tracking-tight">Enterprise Batch Processor</p>
           <p className="text-[13px] text-gray-600 leading-relaxed font-medium max-w-3xl">
             Paying a globally distributed workforce or multiple vendors? Use our Batch Processor to upload a single CSV file and execute hundreds of local payments in USD, EUR, INR, and 50+ other currencies instantly with 0.1% FX spread. 
             <button className="ml-1 text-accent-emerald font-bold hover:underline decoration-2 underline-offset-4">Download Template</button>
           </p>
         </div>
         <button 
           onClick={handleUploadClick}
           disabled={uploadStatus === 'uploading'}
           className={cn(
             "px-8 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl relative z-10 active:scale-95",
             uploadStatus === 'uploading' ? "bg-gray-100 text-gray-400 box-content h-4" :
             uploadStatus === 'success' ? "bg-accent-emerald text-white shadow-accent-emerald/20" :
             "bg-primary-navy text-white hover:bg-primary-navy/90 hover:-translate-y-0.5 shadow-primary-navy/20"
           )}
         >
           {uploadStatus === 'uploading' ? 'Processing...' : uploadStatus === 'success' ? 'Upload Success!' : (
             <>
               <Upload className="w-4 h-4" />
               Upload CSV Batch
             </>
           )}
         </button>
      </div>

      <AddBeneficiaryModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </motion.div>
  );
}

function StatCard({ label, value, amount }: { label: string; value: string; amount: string }) {
  return (
    <div className="glass-card p-6 rounded-2xl border border-gray-100 hover:border-accent-emerald/30 transition-all hover:shadow-lg group">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 group-hover:text-accent-emerald transition-colors">{label}</p>
      <h4 className="text-xl font-bold text-primary-navy leading-none mb-1.5 tracking-tight">{value}</h4>
      <p className="text-[11px] font-bold text-accent-emerald uppercase tracking-wider bg-accent-emerald/5 inline-block px-2 py-0.5 rounded-md">{amount}</p>
    </div>
  );
}
