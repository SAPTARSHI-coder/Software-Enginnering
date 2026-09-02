'use client';

import React from 'react';
import { useStock } from '../context/StockContext';
import {
  LayoutDashboard,
  Boxes,
  Truck,
  FileSpreadsheet,
  ArrowLeftRight,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

export function Sidebar() {
  const { activeTab, setActiveTab, alerts, stats } = useStock();

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'inventory', label: 'Inventory Matrix', icon: Boxes, badge: `${stats.totalItems}` },
    { id: 'suppliers', label: 'Vendor Directory', icon: Truck, badge: null },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: FileSpreadsheet, badge: stats.pendingOrdersCount > 0 ? `${stats.pendingOrdersCount}` : null },
    { id: 'movements', label: 'Transaction Audit', icon: ArrowLeftRight, badge: null },
    { id: 'alerts', label: 'Reorder Radar', icon: AlertTriangle, badge: alerts.length > 0 ? `${alerts.length}` : null, isAlert: alerts.length > 0 },
    { id: 'reports', label: 'Valuation & Analytics', icon: BarChart3, badge: null },
  ];

  return (
    <aside className="w-64 bg-[#10151E] border-r border-white/10 p-5 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider px-3 block mb-2 font-mono">
            Navigation Console
          </span>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D49B37] to-[#B27D1B] text-black shadow-lg shadow-[#D49B37]/15 font-bold'
                      : 'text-gray-300 hover:bg-[#151C27] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : item.isAlert ? 'text-red-400' : 'text-[#D49B37]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-black/30 text-white'
                          : item.isAlert
                          ? 'bg-red-950 text-red-300 border border-red-500/40'
                          : 'bg-[#1C2636] text-[#F8DA96]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System Health Card */}
        <div className="p-4 rounded-2xl bg-[#0D1117] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <span>Audit Status</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Synchronized
            </span>
          </div>
          <div className="text-xs text-gray-300 leading-snug">
            All 20 physical SKUs reconciled with active ledger records.
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 font-mono">
        <div>COCOMO Model: Basic 81</div>
        <div className="text-[#F8DA96]">Effective Staff: 6–7 Devs</div>
      </div>
    </aside>
  );
}
