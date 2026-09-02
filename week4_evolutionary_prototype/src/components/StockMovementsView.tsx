'use client';

import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { MovementType } from '../types/stock';
import { ArrowLeftRight, Filter, Download } from 'lucide-react';

export function StockMovementsView() {
  const { movements } = useStock();
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredMovements = movements.filter((m) => {
    if (filterType === 'ALL') return true;
    return m.type === filterType;
  });

  const handleExportCSV = () => {
    const headers = 'Transaction ID,SKU ID,Product Name,Movement Type,Quantity,Balance After,Reason,Operator,Timestamp\n';
    const rows = filteredMovements
      .map(
        (m) =>
          `"${m.id}","${m.productId}","${m.productName}","${m.type}",${m.quantity},${m.balanceAfter},"${m.reason}","${m.performedBy}","${m.timestamp}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `movement_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Immutable Transaction Ledger
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Sequential audit trail recording every inventory increment, decrement, and audit reconciliation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-[#151C27] hover:bg-[#1D2635] text-xs font-semibold text-gray-200 border border-white/10 transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#D49B37]" />
            <span>Export Ledger CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {['ALL', 'IN', 'OUT', 'ADJUSTMENT'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              filterType === type
                ? 'bg-[#D49B37] text-black border-[#F8DA96] shadow'
                : 'bg-[#151C27] text-gray-400 border-white/5 hover:text-white'
            }`}
          >
            {type === 'ALL' ? 'All Movements' : type}
          </button>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl bg-[#10151E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151C27] border-b border-white/10 text-gray-300 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Transaction Ref</th>
                <th className="py-3.5 px-4">Target Product</th>
                <th className="py-3.5 px-4">Flow Type</th>
                <th className="py-3.5 px-4">Quantity Changed</th>
                <th className="py-3.5 px-4">Balance After</th>
                <th className="py-3.5 px-4">Operational Reason</th>
                <th className="py-3.5 px-4">Responsible Actor</th>
                <th className="py-3.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#F8DA96]">{m.id}</td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{m.productName}</div>
                    <div className="text-[11px] text-gray-400 font-mono">SKU: {m.productId}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        m.type === 'IN'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : m.type === 'OUT'
                          ? 'bg-red-950 text-red-300 border border-red-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {m.type}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-sm text-white">
                    {m.type === 'OUT' ? `-${m.quantity}` : `+${m.quantity}`}
                  </td>

                  <td className="py-3 px-4 font-mono text-gray-300 font-semibold">{m.balanceAfter}</td>

                  <td className="py-3 px-4 text-gray-300">{m.reason}</td>

                  <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">{m.performedBy}</td>

                  <td className="py-3 px-4 font-mono text-gray-500 text-right text-[11px]">{m.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
