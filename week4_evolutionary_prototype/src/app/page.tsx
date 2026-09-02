'use client';

import React from 'react';
import { useStock } from '../context/StockContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ToastNotification } from '../components/ToastNotification';
import { DashboardView } from '../components/DashboardView';
import { InventoryView } from '../components/InventoryView';
import { SuppliersView } from '../components/SuppliersView';
import { PurchaseOrdersView } from '../components/PurchaseOrdersView';
import { StockMovementsView } from '../components/StockMovementsView';
import { AlertsView } from '../components/AlertsView';
import { ReportsView } from '../components/ReportsView';

export default function Home() {
  const { activeTab } = useStock();

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D12] text-white selection:bg-[#D49B37] selection:text-[#0A0D12]">
      {/* Toast Notification Container */}
      <ToastNotification />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Workspace Layout: Sidebar on Left + Active Content View on Right */}
      <div className="flex-1 flex flex-row w-full">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'inventory' && <InventoryView />}
          {activeTab === 'suppliers' && <SuppliersView />}
          {activeTab === 'purchase-orders' && <PurchaseOrdersView />}
          {activeTab === 'movements' && <StockMovementsView />}
          {activeTab === 'alerts' && <AlertsView />}
          {activeTab === 'reports' && <ReportsView />}
        </main>
      </div>
    </div>
  );
}
