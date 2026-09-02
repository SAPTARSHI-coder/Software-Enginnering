'use client';

import React from 'react';
import { useStock } from '../context/StockContext';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

export function ReportsView() {
  const { products, stats, movements } = useStock();

  // Category breakdown calculation
  const categorySummary = products.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { count: 0, totalQty: 0, totalVal: 0 };
    }
    acc[p.category].count += 1;
    acc[p.category].totalQty += p.quantity;
    acc[p.category].totalVal += p.quantity * p.price;
    return acc;
  }, {} as Record<string, { count: number; totalQty: number; totalVal: number }>);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Inventory Valuation & Analytics
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Macro-level economic asset breakdown across product categories and warehouse velocity.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#10151E] border border-[#D49B37]/30 shadow-xl">
          <span className="text-xs text-gray-400 font-semibold block">Total Catalog Valuation</span>
          <span className="text-2xl sm:text-3xl font-mono font-black text-white mt-1 block">
            ₹{stats.totalValuation.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Across {stats.totalQuantity} total inventory units</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl">
          <span className="text-xs text-gray-400 font-semibold block">Average SKU Unit Cost</span>
          <span className="text-2xl sm:text-3xl font-mono font-black text-[#F8DA96] mt-1 block">
            ₹{Math.round(stats.totalValuation / Math.max(1, stats.totalQuantity)).toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-gray-400 mt-1 block">Moving weighted average</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl">
          <span className="text-xs text-gray-400 font-semibold block">Logged Transaction Events</span>
          <span className="text-2xl sm:text-3xl font-mono font-black text-white mt-1 block">
            {movements.length}
          </span>
          <span className="text-[11px] text-[#F8DA96] font-mono mt-1 block">Audit ledger event volume</span>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="rounded-2xl bg-[#10151E] border border-white/10 overflow-hidden shadow-2xl space-y-3 p-5">
        <h3 className="text-base font-serif font-bold text-white">Category Distribution Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151C27] border-b border-white/10 text-gray-300 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Catalog SKU Count</th>
                <th className="py-3 px-4">Physical Units</th>
                <th className="py-3 px-4">Gross Valuation (₹)</th>
                <th className="py-3 px-4 text-right">Valuation Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {Object.entries(categorySummary).map(([cat, data]) => {
                const share = stats.totalValuation > 0 ? Math.round((data.totalVal / stats.totalValuation) * 100) : 0;
                return (
                  <tr key={cat} className="hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4 font-bold text-white">{cat}</td>
                    <td className="py-3 px-4 font-mono">{data.count} SKUs</td>
                    <td className="py-3 px-4 font-mono font-semibold">{data.totalQty} units</td>
                    <td className="py-3 px-4 font-mono text-[#F8DA96]">₹{data.totalVal.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">{share}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
