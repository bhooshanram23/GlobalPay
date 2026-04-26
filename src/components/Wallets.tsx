import { Copy, Share2, Plus, Info, CheckCircle2 } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

const WALLETS = [
  { 
    id: 'inr', 
    name: 'Indian Rupee', 
    code: 'INR', 
    flag: '🇮🇳', 
    balance: 12500000.42, 
    bank: 'HDFC Bank Ltd', 
    acc: 'XXXX XXXX 8292', 
    ifsc: 'HDFC0001234',
    primary: true 
  },
  { 
    id: 'usd', 
    name: 'US Dollar', 
    code: 'USD', 
    flag: '🇺🇸', 
    balance: 12450.40, 
    bank: 'JP Morgan Chase', 
    acc: '8291029302', 
    swift: 'CHASEUS33',
    routing: '021000021'
  },
  { 
    id: 'eur', 
    name: 'Euro', 
    code: 'EUR', 
    flag: '🇪🇺', 
    balance: 820.15, 
    bank: 'Deutsche Bank', 
    acc: 'DE82 1002 0291 0292', 
    iban: 'DE82100202910292'
  },
  { 
    id: 'gbp', 
    name: 'British Pound', 
    code: 'GBP', 
    flag: '🇬🇧', 
    balance: 0.00, 
    bank: 'Barclays PLC', 
    acc: '82910291', 
    sortCode: '20-00-00'
  },
];

export function Wallets() {
  const [selectedId, setSelectedId] = useState('inr');
  const activeWallet = WALLETS.find(w => w.id === selectedId) || WALLETS[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-navy mb-1 tracking-tight">Multi-Currency Wallets</h1>
          <p className="text-gray-500 text-sm">Manage your global accounts and receive funds locally.</p>
        </div>
        <button className="flex items-center gap-2 bg-accent-emerald text-primary-navy px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all active:scale-95 shadow-sm shadow-accent-emerald/20 self-start">
          <Plus className="w-4 h-4" />
          Add Wallet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Wallet List */}
        <div className="lg:col-span-4 space-y-3">
          {WALLETS.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => setSelectedId(wallet.id)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all relative overflow-hidden group",
                selectedId === wallet.id 
                  ? "bg-white border-accent-emerald shadow-lg shadow-accent-emerald/5 ring-1 ring-accent-emerald" 
                  : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wallet.flag}</span>
                  <div>
                    <p className="text-sm font-bold text-primary-navy">{wallet.name}</p>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{wallet.code}</p>
                  </div>
                </div>
                {wallet.primary && (
                  <span className="px-2 py-0.5 bg-accent-emerald/10 text-accent-emerald text-[10px] font-bold rounded uppercase tracking-wider">Primary</span>
                )}
              </div>
              <h4 className="text-xl font-bold font-display text-primary-navy">
                {formatCurrency(wallet.balance, wallet.code)}
              </h4>
              {selectedId === wallet.id && (
                <div className="absolute right-0 bottom-0 p-2 text-accent-emerald">
                  <CheckCircle2 className="w-5 h-5 fill-accent-emerald/10" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Wallet Details */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-3xl">
                {activeWallet.flag}
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-primary-navy">{activeWallet.name} Details</h3>
                <p className="text-sm text-gray-500">Your local account details for receiving {activeWallet.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-gray-400 hover:text-primary-navy hover:bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 text-sm font-bold text-white bg-primary-navy rounded-xl hover:bg-primary-navy/90 transition-all flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy All
              </button>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 flex-1">
            <DetailItem label="Account Holder" value="Bhooshan Ram" />
            <DetailItem label="Bank Name" value={activeWallet.bank} />
            <DetailItem label="Account Number" value={activeWallet.acc} copyable />
            
            {activeWallet.id === 'inr' && (
              <DetailItem label="IFSC Code" value={activeWallet.ifsc} copyable />
            )}
            
            {activeWallet.id === 'usd' && (
              <>
                <DetailItem label="SWIFT/BIC" value={activeWallet.swift} copyable />
                <DetailItem label="Routing Number" value={activeWallet.routing} copyable />
              </>
            )}
            
            {activeWallet.id === 'eur' && (
              <DetailItem label="IBAN" value={activeWallet.iban} copyable />
            )}

            {activeWallet.id === 'gbp' && (
              <DetailItem label="Sort Code" value={activeWallet.sortCode} copyable />
            )}
          </div>

          <div className="p-6 bg-accent-emerald/5 mx-8 mb-8 rounded-xl border border-accent-emerald/10 flex gap-4">
             <div className="p-2 bg-white rounded-lg self-start shadow-sm border border-accent-emerald/10">
               <Info className="w-4 h-4 text-accent-emerald" />
             </div>
             <div className="text-sm">
               <p className="font-bold text-primary-navy mb-1">Important Notice</p>
               <p className="text-gray-600 leading-relaxed">
                 Use these details to receive domestic transfers in {activeWallet.code}. Funds will be credited to your GlobalPay wallet within 2-4 hours of arrival. For international SWIFT transfers, please use your USD account details.
               </p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetailItem({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  return (
    <div className="space-y-1 relative group">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-primary-navy font-mono">{value}</p>
        {copyable && (
          <button className="text-accent-emerald opacity-0 group-hover:opacity-100 transition-opacity">
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
