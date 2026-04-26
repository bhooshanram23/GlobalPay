import { Terminal, Key, Webhook, ShieldCheck, Copy, RefreshCw, Plus, ExternalLink, Activity, AppWindow, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const API_KEYS = [
  { id: 'pk_live_01H82', name: 'Production Key', lastUsed: '2m ago', status: 'Active', allowedIps: ['182.16.0.1', '182.16.0.2'] },
  { id: 'pk_test_01H83', name: 'Test Environment', lastUsed: '1h ago', status: 'Active', allowedIps: [] },
];

import { useTranslation } from 'react-i18next';

export function DeveloperTools() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'keys' | 'webhooks' | 'logs'>('keys');
  const [keys, setKeys] = useState(API_KEYS);
  const [editingIps, setEditingIps] = useState<string | null>(null);
  const [tempIps, setTempIps] = useState('');

  const handleEditClick = (keyId: string) => {
    const key = keys.find(k => k.id === keyId);
    setTempIps(key?.allowedIps.join('\n') || '');
    setEditingIps(keyId);
  };

  const handleSaveIps = () => {
    const ipList = tempIps.split('\n').map(ip => ip.trim()).filter(ip => ip !== '');
    setKeys(keys.map(k => k.id === editingIps ? { ...k, allowedIps: ipList } : k));
    setEditingIps(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-navy font-display">{t('dev_settings')}</h1>
          <p className="text-xs text-gray-500 font-medium">{t('dev_desc')}</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-4 py-2 text-[11px] font-bold text-white bg-primary-navy rounded-xl hover:bg-primary-navy/90 transition-all flex items-center gap-2">
             <Plus className="w-3.5 h-3.5" />
             {t('create_api_key')}
           </button>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-gray-100 mb-2">
        {['Keys', 'Webhooks', 'Logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase() as any)}
            className={cn(
              "pb-3 text-xs font-bold uppercase tracking-widest transition-all relative",
              activeTab === tab.toLowerCase() ? "text-primary-navy" : "text-gray-400 hover:text-primary-navy"
            )}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <motion.div layoutId="devTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-emerald" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'keys' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl overflow-hidden">
             <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-primary-navy uppercase tracking-wider">Secret API Keys</h3>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-accent-emerald/10 text-accent-emerald rounded-full">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span className="text-[9px] font-bold uppercase">IP Restricted</span>
                  </div>
                </div>
                <span className="text-[9px] text-gray-400 font-bold uppercase">PCI Compliant Storage</span>
             </div>
             <div className="divide-y divide-gray-50">
                {keys.map((key) => (
                  <div key={key.id} className="p-5 flex flex-col gap-4 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-primary-navy">
                          <Key className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary-navy mb-0.5 whitespace-nowrap">{key.name}</p>
                          <div className="flex items-center gap-2">
                             <code className="text-[10px] bg-gray-50 px-2 py-0.5 rounded font-mono text-gray-500">
                               {key.id}••••••••••••
                             </code>
                             <button className="text-gray-300 hover:text-accent-emerald transition-colors"><Copy className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Last Used</p>
                            <p className="text-[11px] font-bold text-primary-navy">{key.lastUsed}</p>
                         </div>
                         <button className="p-2 text-gray-300 hover:text-status-red transition-colors opacity-0 group-hover:opacity-100">
                           <RefreshCw className="w-3.5 h-3.5" />
                         </button>
                      </div>
                    </div>

                    <div className="ml-13 flex flex-wrap items-center gap-3">
                       <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                         <ShieldCheck className="w-3 h-3" />
                         IP Allowlist:
                       </div>
                       <div className="flex flex-wrap gap-2">
                         {key.allowedIps.length > 0 ? (
                            key.allowedIps.map(ip => (
                              <span key={ip} className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-mono rounded border border-gray-100">{ip}</span>
                            ))
                         ) : (
                           <span className="text-[10px] text-gray-400 italic">No restrictions (Not recommended)</span>
                         )}
                         <button 
                          onClick={() => handleEditClick(key.id)}
                          className="px-2 py-1 bg-white border border-dashed border-gray-200 text-gray-400 text-[10px] font-bold rounded hover:border-accent-emerald hover:text-accent-emerald transition-all"
                         >
                           + Edit Restrictions
                         </button>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Terminal className="w-5 h-5" /></div>
                 <h4 className="font-bold text-sm text-primary-navy">SDK Documentation</h4>
               </div>
               <p className="text-xs text-gray-500 leading-relaxed font-medium">Learn how to integrate GlobalPay into your website or mobile app using our official libraries.</p>
               <button className="text-[10px] font-bold text-primary-navy uppercase tracking-widest hover:underline flex items-center gap-2">
                 Quick Start Guide <ExternalLink className="w-3 h-3" />
               </button>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-accent-emerald/10 text-accent-emerald rounded-lg"><Webhook className="w-5 h-5" /></div>
                 <h4 className="font-bold text-sm text-primary-navy">Test Mode</h4>
               </div>
               <p className="text-xs text-gray-500 leading-relaxed font-medium">Use test environment keys to simulate transactions without moving real funds.</p>
               <div className="flex items-center gap-2 text-[10px] font-bold text-accent-emerald uppercase tracking-widest">
                 <Activity className="w-3 h-3 animate-pulse" />
                 Simulation Active
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'webhooks' && (
        <div className="glass-card rounded-2xl p-12 flex flex-col items-center text-center space-y-4">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2">
             <Webhook className="w-10 h-10 text-gray-300" />
           </div>
           <h3 className="font-bold text-lg text-primary-navy leading-tight">No endpoints configured</h3>
           <p className="text-sm text-gray-500 max-w-sm font-medium">Configure a webhook URL to receive real-time notifications for payment successes, refunds, and more.</p>
           <button className="mt-4 px-6 py-2.5 bg-primary-navy text-white text-xs font-bold rounded-xl shadow-lg shadow-primary-navy/20 flex items-center gap-2">
             <Plus className="w-4 h-4" /> Add Endpoint
           </button>
        </div>
      )}

      {/* IP Editing Modal */}
      <AnimatePresence>
        {editingIps && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingIps(null)}
              className="fixed inset-0 z-[70] bg-primary-navy/40 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-emerald/10 text-accent-emerald rounded-lg">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-navy text-sm">IP Restrictions</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Secure Access</p>
                    </div>
                  </div>
                  <button onClick={() => setEditingIps(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-primary-navy">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    By allowlisting IP addresses, you ensure that only requests originating from these locations can use this API key.
                  </p>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Allowed IP Addresses</label>
                    <textarea 
                      placeholder="Enter one IP per line (e.g. 192.168.1.1)"
                      value={tempIps}
                      onChange={(e) => setTempIps(e.target.value)}
                      className="w-full h-32 bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent-emerald transition-all"
                    />
                  </div>

                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex gap-3">
                    <Activity className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-indigo-600/70 font-medium leading-normal">
                      Note: Static IPs are required for reliable allowlisting. Dynamic IPs may block your integration if they change.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                  <button 
                    onClick={() => setEditingIps(null)}
                    className="flex-1 py-2 text-xs font-bold text-gray-500 hover:text-primary-navy transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveIps}
                    className="flex-1 py-2 bg-primary-navy text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-navy/10 hover:bg-opacity-90 active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
