/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { Wallets } from './components/Wallets';
import { Analytics } from './components/Analytics';
import { Transactions } from './components/Transactions';
import { PaymentLinks } from './components/PaymentLinks';
import { BillingManagement } from './components/BillingManagement';
import { RatesAndFX } from './components/RatesAndFX';
import { ComplianceAndRisk } from './components/ComplianceAndRisk';
import { Integrations } from './components/Integrations';
import { DeveloperTools } from './components/DeveloperTools';
import { Payments } from './components/Payments';
import { Payouts } from './components/Payouts';
import { Customers } from './components/Customers';
import { InternalTools } from './components/InternalTools';
import { SendMoneyModal } from './components/SendMoneyModal';
import { CreatePaymentLinkModal } from './components/CreatePaymentLinkModal';

export type UserMode = 'smb' | 'enterprise';
export type View = 
  | 'overview' 
  | 'transactions' | 'pending' | 'failed' | 'refunds'
  | 'payments' | 'links' | 'subscriptions' | 'invoices' | 'integrations'
  | 'wallets' | 'rates' | 'conversion'
  | 'payouts' | 'beneficiaries' | 'scheduled-payouts'
  | 'customers'
  | 'analytics'
  | 'ai-insights'
  | 'compliance'
  | 'settings'
  | 'developers';

export default function App() {
  const [view, setView] = useState<View>('overview');
  const [userMode, setUserMode] = useState<UserMode>('smb');
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);

  const isTransactionView = ['transactions', 'pending', 'failed', 'refunds'].includes(view);
  const isPaymentView = ['payments', 'links', 'subscriptions', 'invoices', 'integrations'].includes(view);
  const isPayoutView = ['payouts', 'beneficiaries', 'scheduled-payouts'].includes(view);
  const isInternalView = ['settings', 'developers', 'ai-insights'].includes(view);

  return (
    <div className="flex min-h-screen bg-bg-light">
      <Sidebar 
        currentView={view} 
        setView={setView} 
        userMode={userMode} 
        setUserMode={setUserMode} 
        onSendClick={() => setIsSendMoneyOpen(true)}
        onCreateLinkClick={() => setIsCreateLinkOpen(true)}
      />
      
      <div className="flex-1 flex flex-col md:ml-60 transition-all">
        <Header 
          onSendClick={() => setIsSendMoneyOpen(true)} 
          onCreateLinkClick={() => setIsCreateLinkOpen(true)}
          userMode={userMode}
        />
        
        <main className="p-6 md:p-8 flex-1">
          {view === 'overview' && <Overview userMode={userMode} />}
          {isTransactionView && view !== 'compliance' && <Transactions currentView={view} userMode={userMode} />}
          {view === 'compliance' && <ComplianceAndRisk />}
          {view === 'links' && <PaymentLinks onCreateLink={() => setIsCreateLinkOpen(true)} />}
          {view === 'subscriptions' && <BillingManagement type="subscriptions" />}
          {view === 'invoices' && <BillingManagement type="invoices" />}
          {view === 'integrations' && <Integrations />}
          {isPaymentView && !['links', 'subscriptions', 'invoices', 'integrations'].includes(view) && <Payments currentView={view} onCreateLink={() => setIsCreateLinkOpen(true)} />}
          {isPayoutView && <Payouts currentView={view} />}
          {view === 'wallets' && <Wallets />}
          {view === 'rates' && <RatesAndFX />}
          {view === 'analytics' && <Analytics userMode={userMode} />}
          {view === 'customers' && <Customers />}
          {view === 'developers' && <DeveloperTools />}
          {isInternalView && !['developers', 'compliance'].includes(view) && <InternalTools currentView={view} />}
        </main>
      </div>

      <SendMoneyModal isOpen={isSendMoneyOpen} onClose={() => setIsSendMoneyOpen(false)} />
      <CreatePaymentLinkModal isOpen={isCreateLinkOpen} onClose={() => setIsCreateLinkOpen(false)} />
    </div>
  );
}

