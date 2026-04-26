import { 
  ShieldCheck, AlertCircle, CheckCircle2, Clock, FileSearch, ShieldAlert, 
  MoreHorizontal, UserCheck, Search, Filter, Globe, Settings, History, 
  Check, ChevronRight, Activity, Zap, Bell
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ENTITIES = [
  { id: 'KYC-829', entity: 'Stellar Logistics Ltd', risk: 'Low', status: 'Verified', date: 'Oct 24, 2023', type: 'Merchant' },
  { id: 'KYC-830', entity: 'Digital Ocean Labs', risk: 'Medium', status: 'Pending Review', date: 'Oct 23, 2023', type: 'Vendor' },
  { id: 'KYC-831', entity: 'Nexa Soft Solutions', risk: 'High', status: 'Under Investigation', date: 'Oct 21, 2023', type: 'Merchant' },
  { id: 'KYC-832', entity: 'Urban Design Inc', risk: 'Low', status: 'Verified', date: 'Oct 15, 2023', type: 'Affiliate' },
];

const RECENT_ALERTS = [
  { id: 'ALR-01', title: 'Suspicious Transaction Pattern', level: 'Critical', source: 'AI Engine', time: '12m ago', details: 'Multiple high-value outbound transfers within 5 minutes to high-risk geography (Zone 4).' },
  { id: 'ALR-02', title: 'Address Mismatch (MIL-102)', level: 'Warning', source: 'AML Guard', time: '1h ago', details: 'The provided corporate address does not match historical records or government registry records.' },
  { id: 'ALR-03', title: 'Volume Milestone: $1M Limit', level: 'Info', source: 'System', time: '4h ago', details: 'Monthly transaction volume has exceeded $1M. Secondary verification required for tier increase.' },
];

type ComplianceTab = 'overview' | 'screening' | 'aml' | 'logs';

export function ComplianceAndRisk() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ComplianceTab>('overview');
  const [screeningQuery, setScreeningQuery] = useState('');
  const [isScreening, setIsScreening] = useState(false);
  const [screenedResult, setScreenedResult] = useState<any | null>(null);

  const performScreening = () => {
    setIsScreening(true);
    // Simulate API call
    setTimeout(() => {
      setIsScreening(false);
      setScreenedResult({
        name: screeningQuery,
        timestamp: new Date().toLocaleTimeString(),
        matchScore: 0.12,
        status: 'Clear',
        lists: ['OFAC', 'EU Cons.', 'UK OFSI', 'UN Security Council'],
        details: 'No significant matches found in major sanctions or PEP lists. Entity verified against 42 global databases.'
      });
    }, 1500);
  };

  const tabs: { id: ComplianceTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Command Center', icon: Activity },
    { id: 'screening', label: 'Sanctions Screening', icon: Globe },
    { id: 'aml', label: 'Monitor Rules', icon: Settings },
    { id: 'logs', label: 'Audit Trail', icon: History },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display tracking-tight flex items-center gap-3">
             {t('risk_disputes')}
             <span className="px-2 py-0.5 bg-accent-emerald/10 text-accent-emerald text-[9px] font-bold rounded uppercase tracking-widest border border-accent-emerald/20">
               Enterprise OS
             </span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">Monitoring your global operations with real-time KYC/AML orchestration.</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                 "flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap",
                 activeTab === tab.id 
                   ? "bg-white text-primary-navy shadow-sm" 
                   : "text-gray-400 hover:text-gray-600"
               )}
             >
               <tab.icon className="w-3.5 h-3.5" />
               <span className="hidden sm:inline uppercase tracking-wider">{tab.label}</span>
             </button>
           ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <RiskStat label="Verification Efficiency" value="94.2%" sub="Auto-cleared" icon={UserCheck} />
              <RiskStat label="AML Coverage" value="100.0%" sub="Live Globally" icon={ShieldAlert} />
              <RiskStat label="Fraud Prevention" value="Blocked $24.8k" sub="Last 7 Days" icon={ShieldCheck} />
              <RiskStat label="Compliance Health" value="A+" sub="Optimized" icon={Zap} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 glass-card rounded-2xl overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                  <h3 className="font-bold text-sm text-primary-navy">Entities Under Review</h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <button className="text-primary-navy underline decoration-accent-emerald underline-offset-8">Active Cases</button>
                    <button className="hover:text-primary-navy transition-colors">Archived</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left high-density-table">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Entity Name</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Risk Tier</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Verified On</th>
                        <th className="px-6 py-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-[11px]">
                      {ENTITIES.map((entity) => (
                        <tr key={entity.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-primary-navy">
                                <FileSearch className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="font-bold text-primary-navy mb-0.5">{entity.entity}</p>
                                <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{entity.id} • {entity.type}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider",
                              entity.risk === 'Low' ? "bg-accent-emerald/10 text-accent-emerald" :
                              entity.risk === 'Medium' ? "bg-status-amber/10 text-status-amber" : "bg-status-red/10 text-status-red"
                            )}>
                              {entity.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 font-bold text-primary-navy">
                              <div className={cn(
                                "w-1.5 h-1.5 rounded-full animate-pulse",
                                entity.status === 'Verified' ? "bg-accent-emerald" : "bg-status-amber"
                              )} />
                              {entity.status}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 font-medium">{entity.date}</td>
                          <td className="px-6 py-4">
                            <button className="p-1 text-gray-300 hover:text-primary-navy">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-sm text-primary-navy">System Alerts</h3>
                    <Bell className="w-4 h-4 text-status-red" />
                  </div>
                  <div className="space-y-4">
                    {RECENT_ALERTS.map((alert) => (
                      <div key={alert.id} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-1">
                          <span className={cn(
                            "text-[8px] font-bold uppercase tracking-[0.2em] px-1.5 py-0.5 rounded",
                            alert.level === 'Critical' ? "bg-status-red/10 text-status-red" : 
                            alert.level === 'Warning' ? "bg-status-amber/10 text-status-amber" : "bg-primary-navy/10 text-primary-navy"
                          )}>
                            {alert.level}
                          </span>
                          <span className="text-[9px] text-gray-400 font-bold">{alert.time}</span>
                        </div>
                        <p className="text-xs font-bold text-primary-navy mb-1 group-hover:text-accent-emerald transition-colors">{alert.title}</p>
                        <p className="text-[10px] text-gray-400 line-clamp-1 mb-2 leading-relaxed">{alert.details}</p>
                        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider tabular-nums">Source: {alert.source}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-2.5 bg-gray-50 text-primary-navy text-[10px] font-bold rounded-lg hover:bg-gray-100 border border-gray-100 uppercase tracking-[0.2em]">
                    Manage All Alerts
                  </button>
                </div>

                <div className="bg-primary-navy rounded-2xl p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                    <Zap className="w-24 h-24" />
                  </div>
                  <p className="text-[10px] font-bold text-accent-emerald uppercase tracking-[0.2em] mb-4">AI Compliance</p>
                  <h4 className="text-lg font-bold mb-2 leading-tight">Optimizing screening throughput by 42%</h4>
                  <p className="text-white/40 text-xs leading-relaxed mb-6 font-medium">
                    Our neural network is processing identity documents with high precision, reducing manual review queues.
                  </p>
                  <button className="text-[10px] font-bold flex items-center gap-2 hover:text-accent-emerald transition-colors group">
                    Compliance Roadmap <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'screening' && (
          <motion.div
            key="screening"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto border-dashed border-2 border-gray-100">
               <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-accent-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Globe className="w-8 h-8 text-accent-emerald" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-navy mb-2 leading-[1.1]">Sanctions Screening (Real-time)</h3>
                  <p className="text-xs text-gray-500 font-medium font-sans">Search beneficiaries against 400+ international watchlists including OFAC, EU, UN, and HMT.</p>
               </div>

               <div className="relative group mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-emerald transition-colors" />
                  <input 
                    type="text" 
                    value={screeningQuery}
                    onChange={(e) => setScreeningQuery(e.target.value)}
                    placeholder="Enter Beneficiary Name or Entity ID..." 
                    className="w-full bg-gray-50 rounded-xl pl-12 pr-4 py-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent-emerald/20 transition-all border border-gray-100"
                  />
               </div>

               <button 
                onClick={performScreening}
                disabled={!screeningQuery || isScreening}
                className={cn(
                  "w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  isScreening ? "bg-gray-100 text-gray-400" : "bg-primary-navy text-white hover:bg-primary-navy/90 active:scale-95"
                )}
               >
                 {isScreening ? 'Processing Watchlists...' : 'Conduct Real-time Screen'}
               </button>

               {screenedResult && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="mt-8 p-6 bg-accent-emerald/5 rounded-2xl border border-accent-emerald/10"
                 >
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-accent-emerald/10">
                       <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                          <h4 className="font-bold text-sm text-primary-navy">Verification Result</h4>
                       </div>
                       <span className="text-[10px] font-bold text-gray-400">{screenedResult.timestamp}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                       <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Entity</p>
                          <p className="text-xs font-bold text-primary-navy">{screenedResult.name}</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Risk Status</p>
                          <div className="flex items-center gap-1.5 text-accent-emerald font-bold text-xs uppercase">
                            <ShieldCheck className="w-3 h-3" />
                            {screenedResult.status}
                          </div>
                       </div>
                    </div>

                    <div className="mb-4">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Watchlists Screened</p>
                       <div className="flex flex-wrap gap-2">
                          {screenedResult.lists.map((l: string) => (
                            <span key={l} className="px-2 py-1 bg-white border border-accent-emerald/10 rounded text-[9px] font-bold text-primary-navy">{l}</span>
                          ))}
                       </div>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium bg-white/50 p-3 rounded-lg border border-accent-emerald/5">
                      {screenedResult.details}
                    </p>
                 </motion.div>
               )}
            </div>
          </motion.div>
        )}

        {activeTab === 'aml' && (activeTab as any) && (
          <motion.div
            key="aml"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-primary-navy rounded-lg text-white">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm text-primary-navy">Global AML Policy</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Enforcement</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <ThresholdRule 
                   label="Max Single Outbound Transfer" 
                   value="$50,000" 
                   desc="Transactions exceeding this limit trigger immediate manual board review." 
                   limit="50000"
                 />
                 <ThresholdRule 
                   label="Daily Velocity Cap (per Merchant)" 
                   value="$250,000" 
                   desc="Total daily volume allowed before automatic suspension of payouts." 
                   limit="250000"
                 />
                 <ThresholdRule 
                   label="High-Risk Geography Multiplier" 
                   value="2.5x" 
                   desc="Increase risk weighting for entities originating from Zone 3/4 countries." 
                   limit="2.5"
                 />
              </div>
            </div>

            <div className="space-y-6">
               <div className="glass-card rounded-2xl p-6 bg-gray-50 border-none">
                  <h4 className="font-bold text-xs text-primary-navy uppercase tracking-widest mb-4">Risk Level Thresholds</h4>
                  <div className="space-y-3">
                     {['Low', 'Medium', 'High', 'Critical'].map((level, i) => (
                       <div key={level} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 group hover:border-accent-emerald transition-all cursor-pointer">
                          <div className="flex items-center gap-3">
                             <div className={cn(
                               "w-2 h-2 rounded-full",
                               level === 'Low' && "bg-accent-emerald",
                               level === 'Medium' && "bg-status-amber",
                               level === 'High' && "bg-status-red",
                               level === 'Critical' && "bg-primary-navy",
                             )} />
                             <span className="text-xs font-bold text-primary-navy">{level} Risk</span>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400">{80 - (i * 20)}% Match</span>
                       </div>
                     ))}
                  </div>
                  <button className="w-full mt-6 py-3 bg-primary-navy text-white text-[10px] font-bold rounded-xl hover:bg-primary-navy/90 uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-navy/20">
                     <Check className="w-3.5 h-3.5" /> Save Rule Set
                  </button>
               </div>

               <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                     <AlertCircle className="w-4 h-4 text-status-amber" />
                     <h4 className="font-bold text-[10px] uppercase tracking-widest text-primary-navy">Backtest Environment</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-4 leading-relaxed font-medium font-sans">
                     Test these rules against your historical data to see the projected false-positive rate. Average drift: 0.12%.
                  </p>
                  <button className="w-full py-2.5 bg-gray-100 text-primary-navy text-[10px] font-bold rounded-lg hover:bg-gray-200 uppercase tracking-wider transition-all">
                     Run Simulation
                  </button>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div
            key="logs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
               <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-gray-400" />
                  <h3 className="font-bold text-sm text-primary-navy">System Audit Trail</h3>
               </div>
               <div className="flex items-center gap-2">
                  <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-primary-navy transition-colors">
                     <Filter className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-600 uppercase tracking-wider hover:bg-gray-50 transition-all">
                     Export Logs
                  </button>
               </div>
            </div>
            <div className="divide-y divide-gray-50">
               {[
                 { action: 'AML Threshold Updated', user: 'b.ram@globalpay.io', time: '2h ago', level: 'Info', target: 'Policy-82' },
                 { action: 'Sanctions Screen Performed', user: 'System (API)', time: '4h ago', level: 'Success', target: 'Bene-1029' },
                 { action: 'Manual Verification', user: 'j.smith@compliance', time: '1d ago', level: 'Action', target: 'KYC-831' },
                 { action: 'Batch Risk Re-scoring', user: 'Risk Engine v4', time: '2d ago', level: 'Info', target: 'Global Portfolio' },
                 { action: 'API Key Revoked (Threat)', user: 'Security Bot', time: '3d ago', level: 'Alert', target: 'pk_prod_921' },
               ].map((log, i) => (
                 <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "w-1.5 h-8 rounded-full",
                         log.level === 'Alert' ? "bg-status-red" : 
                         log.level === 'Success' ? "bg-accent-emerald" : 
                         log.level === 'Action' ? "bg-status-amber" : "bg-primary-navy/20"
                       )} />
                       <div>
                          <p className="text-xs font-bold text-primary-navy mb-0.5">{log.action}</p>
                          <div className="flex items-center gap-3 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                             <span>{log.user}</span>
                             <span className="w-1 h-1 bg-gray-200 rounded-full" />
                             <span>Target: {log.target}</span>
                          </div>
                       </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter tabular-nums">{log.time}</span>
                 </div>
               ))}
            </div>
            <div className="p-4 bg-gray-50/30 text-center border-t border-gray-50">
               <button className="text-[10px] font-bold text-primary-navy hover:underline underline-offset-4 uppercase tracking-widest text-sans transition-all">
                  Load Full Historical Ledger
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function RiskStat({ label, value, sub, icon: Icon }: { label: string; value: string; sub: string; icon: any }) {
  return (
    <div className="glass-card p-5 rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-primary-navy/5 transition-all group cursor-default">
       <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 bg-gray-50 rounded-xl text-primary-navy group-hover:bg-primary-navy group-hover:text-white transition-all">
             <Icon className="w-4 h-4" />
          </div>
          <MoreHorizontal className="w-3.5 h-3.5 text-gray-200 group-hover:text-gray-400" />
       </div>
       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
       <h4 className="text-xl font-bold text-primary-navy leading-none mb-1 font-display tracking-tight">{value}</h4>
       <p className="text-[10px] font-bold text-accent-emerald uppercase tracking-wider flex items-center gap-1.5 ring-1 ring-accent-emerald/20 px-1.5 py-0.5 rounded-md w-fit bg-accent-emerald/5">
         <Zap className="w-2.5 h-2.5" />
         {sub}
       </p>
    </div>
  );
}

function ThresholdRule({ label, value, desc, limit }: { label: string; value: string; desc: string; limit: string }) {
  return (
    <div className="group cursor-pointer">
       <div className="flex items-center justify-between mb-2">
          <h5 className="text-xs font-bold text-primary-navy group-hover:text-accent-emerald transition-colors font-sans">{label}</h5>
          <span className="text-[11px] font-mono font-bold text-primary-navy bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">{value}</span>
       </div>
       <p className="text-[10px] text-gray-400 leading-normal mb-3 font-medium">{desc}</p>
       <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-accent-emerald transition-all duration-1000" style={{ width: '45%' }} />
       </div>
    </div>
  );
}
