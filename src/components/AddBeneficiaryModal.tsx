import React, { useState } from 'react';
import { X, Globe, Landmark, User, Building2, Check, ShieldCheck, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface AddBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (beneficiary: any) => void;
}

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', fields: ['routing', 'accountNumber'] },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', fields: ['sortCode', 'accountNumber'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', fields: ['transitNumber', 'institutionNumber', 'accountNumber'] },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', fields: ['bsbNumber', 'accountNumber'] },
  { code: 'EU', name: 'Eurozone', flag: '🇪🇺', fields: ['iban', 'swift'] },
  { code: 'IN', name: 'India', flag: '🇮🇳', fields: ['ifsc', 'accountNumber'] },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', fields: ['bankCode', 'accountNumber'] },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', fields: ['bankCode', 'branchCode', 'accountNumber'] },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', fields: ['iban'] },
];

export function AddBeneficiaryModal({ isOpen, onClose, onSuccess }: AddBeneficiaryModalProps) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'individual' | 'business'>('business');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    accountNumber: '',
    routing: '',
    sortCode: '',
    ifsc: '',
    iban: '',
    swift: '',
    bankCode: '',
    bankName: '',
    city: '',
    address: '',
    transitNumber: '',
    institutionNumber: '',
    bsbNumber: '',
    branchCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.bankName) {
      alert('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate API
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        bank: formData.bankName,
        iban: formData.iban || formData.accountNumber,
        routing: formData.routing || formData.ifsc || formData.sortCode || formData.bsbNumber || formData.transitNumber,
        country: selectedCountry.code,
        flag: selectedCountry.flag,
        type: type
      });
      onClose();
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '', email: '', accountNumber: '', routing: '', sortCode: '',
      ifsc: '', iban: '', swift: '', bankCode: '', bankName: '',
      city: '', address: '',
      transitNumber: '', institutionNumber: '', bsbNumber: '', branchCode: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-navy/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-primary-navy tracking-tight font-display">Add Payout Target</h2>
                <div className="flex items-center gap-3 mt-1.5">
                   <div className="flex gap-1.5">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={cn("w-8 h-1 rounded-full transition-all duration-500", step >= i ? "bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-gray-200")} />
                      ))}
                   </div>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Step {step} / 3</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Entity Classification</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setType('business')}
                          className={cn(
                            "p-5 rounded-2xl border-2 transition-all text-left flex flex-col items-start gap-1 group relative overflow-hidden",
                            type === 'business' ? "border-primary-navy bg-primary-navy/5" : "border-gray-100 hover:border-gray-200"
                          )}
                        >
                          <div className={cn("p-2 rounded-lg transition-colors mb-2", type === 'business' ? "bg-primary-navy text-white" : "bg-gray-100 text-gray-400")}>
                            <Building2 className="w-5 h-5" />
                          </div>
                          <p className={cn("text-xs font-bold uppercase tracking-wider", type === 'business' ? "text-primary-navy" : "text-gray-400")}>Business Entity</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed">Companies, Vendors, or LLP</p>
                          {type === 'business' && <div className="absolute top-2 right-2 w-2 h-2 bg-accent-emerald rounded-full" />}
                        </button>
                        <button 
                          onClick={() => setType('individual')}
                          className={cn(
                            "p-5 rounded-2xl border-2 transition-all text-left flex flex-col items-start gap-1 group relative overflow-hidden",
                            type === 'individual' ? "border-primary-navy bg-primary-navy/5" : "border-gray-100 hover:border-gray-200"
                          )}
                        >
                          <div className={cn("p-2 rounded-lg transition-colors mb-2", type === 'individual' ? "bg-primary-navy text-white" : "bg-gray-100 text-gray-400")}>
                            <User className="w-5 h-5" />
                          </div>
                          <p className={cn("text-xs font-bold uppercase tracking-wider", type === 'individual' ? "text-primary-navy" : "text-gray-400")}>Private Individual</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed">Contractors or Personnel</p>
                          {type === 'individual' && <div className="absolute top-2 right-2 w-2 h-2 bg-accent-emerald rounded-full" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="space-y-4 mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Select Operational Region</label>
                        <div className="relative group">
                          <Search className="w-5 h-5 text-gray-300 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-accent-emerald transition-colors" />
                          <input 
                            type="text"
                            placeholder="Search countries, regions, or ISO codes..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4.5 text-sm font-bold text-primary-navy focus:outline-none focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all shadow-sm placeholder:text-gray-300"
                          />
                          {countrySearch && (
                            <button 
                              onClick={() => setCountrySearch('')}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         {COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.toLowerCase().includes(countrySearch.toLowerCase())).map(country => (
                           <button
                             key={country.code}
                             onClick={() => setSelectedCountry(country)}
                             className={cn(
                               "flex items-center gap-4 p-4 rounded-2xl border transition-all relative group text-left",
                               selectedCountry.code === country.code ? "bg-white border-accent-emerald shadow-lg shadow-accent-emerald/5 ring-1 ring-accent-emerald/20 scale-[1.02] z-10" : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                             )}
                           >
                             <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                               {country.flag}
                             </div>
                             <div className="flex flex-col">
                               <span className="text-[11px] font-bold text-primary-navy uppercase tracking-tight leading-tight">{country.name}</span>
                               <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em]">{country.code} • Local Payouts</span>
                             </div>
                             {selectedCountry.code === country.code && (
                               <div className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 bg-accent-emerald rounded-full flex items-center justify-center text-white shadow-md ring-4 ring-white">
                                 <Check className="w-3.5 h-3.5" strokeWidth={3} />
                               </div>
                             )}
                           </button>
                         ))}
                         {COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).length === 0 && (
                            <div className="col-span-2 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                               < Globe className="w-10 h-10 text-gray-200 mx-auto mb-3 animate-pulse" />
                               <h4 className="text-xs font-bold text-primary-navy uppercase tracking-widest mb-1">Global Gateway Not Found</h4>
                               <p className="text-[10px] text-gray-400 font-medium">We're expanding rapidly. Contact support for offline settlement.</p>
                            </div>
                         )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                     <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-primary-navy uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-2">
                           <User className="w-3.5 h-3.5 text-accent-emerald" />
                           Profile Specifics
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="group focus-within:translate-x-1 transition-transform">
                            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Legal {type === 'business' ? 'Company' : 'Full'} Identity</label>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all outline-none font-medium shadow-sm"
                              placeholder={type === 'business' ? "e.g. Acme Corporation" : "e.g. Johnathan Smith"}
                            />
                          </div>
                          <div className="group focus-within:translate-x-1 transition-transform">
                            <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Correspondence Email</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all outline-none font-medium shadow-sm"
                              placeholder="billing@entity.com"
                            />
                          </div>
                        </div>
                     </div>

                     <div className="space-y-4 pt-4">
                        <h3 className="text-[10px] font-bold text-primary-navy uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-2">
                           <MapPin className="w-3.5 h-3.5 text-accent-emerald" />
                           Registered Address
                        </h3>
                        <div className="grid grid-cols-12 gap-4">
                           <div className="col-span-12">
                             <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Street Residence</label>
                             <input 
                               type="text" 
                               name="address"
                               value={formData.address}
                               onChange={handleInputChange}
                               className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all outline-none font-medium shadow-sm"
                               placeholder="123 Financial District"
                             />
                           </div>
                           <div className="col-span-7">
                             <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Locality / City</label>
                             <input 
                               type="text" 
                               name="city"
                               value={formData.city}
                               onChange={handleInputChange}
                               className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all outline-none font-medium shadow-sm"
                             />
                           </div>
                           <div className="col-span-5">
                             <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Nation</label>
                             <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-2xl px-5 py-3.5">
                               <span className="text-base">{selectedCountry.flag}</span>
                               <span className="text-sm font-bold text-gray-500">{selectedCountry.name}</span>
                             </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                     <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-primary-navy uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-2">
                           <Landmark className="w-3.5 h-3.5 text-accent-emerald" />
                           Bank Particulars
                        </h3>
                        <div className="group focus-within:translate-x-1 transition-transform">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5 ml-1">Custodial Institution Name</label>
                          <input 
                            type="text" 
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all outline-none font-medium shadow-sm"
                            placeholder="e.g. JPMorgan Chase"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {selectedCountry.fields.map((field) => (
                            <div key={field} className="group focus-within:translate-x-1 transition-transform">
                              <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5 ml-1">
                                {field === 'accountNumber' ? 'Account Number' : 
                                 field === 'routing' ? 'ABA Routing Number' :
                                 field === 'sortCode' ? 'Sort Code' :
                                 field === 'ifsc' ? 'IFSC Code' :
                                 field === 'iban' ? 'Electronic IBAN' :
                                 field === 'swift' ? 'SWIFT / BIC Code' :
                                 field === 'bankCode' ? 'Bank Identifier' : 
                                 field === 'transitNumber' ? 'Transit Number' :
                                 field === 'institutionNumber' ? 'Institution ID' :
                                 field === 'bsbNumber' ? 'BSB Number' :
                                 field === 'branchCode' ? 'Branch Identifier' :
                                 field.toUpperCase()}
                              </label>
                              <input 
                                type="text" 
                                name={field}
                                //@ts-ignore
                                value={formData[field]}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-accent-emerald/20 focus:border-accent-emerald transition-all outline-none font-medium shadow-sm font-mono tracking-tight"
                                placeholder={`Enter verified ${field}`}
                              />
                            </div>
                          ))}
                        </div>
                     </div>

                     <div className="p-5 bg-primary-navy/5 rounded-2xl border border-primary-navy/10 flex gap-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-emerald/5 blur-2xl rounded-full translate-x-16 -translate-y-16" />
                        <ShieldCheck className="w-6 h-6 text-accent-emerald shrink-0 relative z-10" />
                        <div className="relative z-10">
                          <p className="text-[11px] text-primary-navy font-bold uppercase tracking-wider mb-1">Secure Payout Layer</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                            Beneficiary data is fully encrypted using AES-256. Verification happens instantly against Sanctions (OFAC) and AML lists before saving.
                          </p>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
               <button 
                 onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                 className="px-6 py-3 text-[11px] font-bold text-gray-400 hover:text-primary-navy transition-all uppercase tracking-widest flex items-center gap-2 group"
               >
                 {step > 1 && <span className="group-hover:-translate-x-1 transition-transform">←</span>}
                 {step === 1 ? 'Discard Changes' : 'Previous Step'}
               </button>
               
               <div className="flex items-center gap-4">
                  {step < 3 ? (
                    <button 
                      onClick={() => setStep(step + 1)}
                      className="bg-primary-navy text-white px-10 py-4 rounded-2xl text-[11px] font-bold shadow-xl shadow-primary-navy/10 hover:bg-opacity-90 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center gap-3"
                    >
                      Next Step
                      <span>→</span>
                    </button>
                  ) : (
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={cn(
                        "bg-accent-emerald text-white px-10 py-4 rounded-2xl text-[11px] font-bold shadow-xl shadow-accent-emerald/20 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center gap-3",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Vaulting...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5 shadow-sm" strokeWidth={3} />
                          Finalize
                        </>
                      )}
                    </button>
                  )}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

