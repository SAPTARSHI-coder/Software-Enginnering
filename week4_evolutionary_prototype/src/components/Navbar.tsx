'use client';

import React from 'react';
import { useStock } from '../context/StockContext';
import { Package, Bell, ShieldCheck, Sparkles, PlusCircle } from 'lucide-react';

export function Navbar() {
  const { stats, alerts, setActiveTab } = useStock();

  return (
    <>
      {/* Announcement Strip */}
      <div className="bg-[#10151E] text-[#E5AC46] text-xs py-2 px-4 border-b border-[#D49B37]/20 text-center font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-gray-300 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kolkata Central Warehouse Operations • Node-01 Live Sync</span>
          </div>
          <div className="mx-auto md:mx-0 flex items-center gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F8DA96]" />
            <span className="text-white font-medium">
              Software Engineering Week 4: <strong>Evolutionary Prototype Application</strong>
            </span>
            <span className="text-[10px] bg-[#992B15] text-[#FFF0B8] border border-[#D49B37]/40 px-2 py-0.5 rounded-full font-mono uppercase">
              1,059 LOC Calibrated
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-gray-400">
            <span className="text-emerald-400 font-mono">Valuation: ₹{stats.totalValuation.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Main Top Header */}
      <header className="sticky top-0 z-30 bg-[#0A0D12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#992B15] via-[#B83A1B] to-[#D49B37] p-0.5 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#0A0D12] rounded-2xl flex items-center justify-center">
              <Package className="w-5 h-5 text-[#F8DA96]" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-bold tracking-tight text-white">StockMate Pro</span>
              <span className="text-xs font-serif text-[#D49B37] font-medium tracking-wide">স্টক মেট</span>
            </div>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase font-mono">
              Enterprise Stock Maintenance System
            </p>
          </div>
        </div>

        {/* Action Controls & Notifications */}
        <div className="flex items-center gap-3">
          {/* Reorder Radar Alert Indicator */}
          <button
            onClick={() => setActiveTab('alerts')}
            className={`relative p-2.5 rounded-xl border transition flex items-center gap-2 ${
              alerts.length > 0
                ? 'bg-[#201012] border-red-500/40 text-red-400 hover:bg-red-950/40'
                : 'bg-[#151C27] border-white/10 text-gray-300 hover:text-white'
            }`}
            title="Active Reorder Alerts"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="bg-[#992B15] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-red-400/40">
                {alerts.length}
              </span>
            )}
          </button>

          {/* Quick Action: New Stock Item */}
          <button
            onClick={() => setActiveTab('inventory')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D49B37] via-[#E5AC46] to-[#B27D1B] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D49B37]/20 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Inventory</span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-[#1C2636] border border-[#D49B37]/40 flex items-center justify-center text-xs font-bold text-[#F8DA96]">
              SS
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-white leading-none">Saptarshi S.</div>
              <div className="text-[10px] text-gray-400 leading-none mt-1">Lead Operations Architect</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
