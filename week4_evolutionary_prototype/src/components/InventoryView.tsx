'use client';

import React, { useState, useMemo } from 'react';
import { useStock } from '../context/StockContext';
import { Product, ProductCategory, StockStatus } from '../types/stock';
import { Modal } from './Modal';
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Boxes,
} from 'lucide-react';

export function InventoryView() {
  const { products, addProduct, updateProduct, deleteProduct, adjustStock, suppliers } = useStock();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Add Item
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Electronics');
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState('pcs');
  const [reorderLevel, setReorderLevel] = useState(15);
  const [price, setPrice] = useState(500);
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || 'S001');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.supplierName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedCategory, selectedStatus, searchQuery]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find((s) => s.id === supplierId);
    addProduct({
      name,
      category,
      quantity: Number(quantity),
      unit,
      reorderLevel: Number(reorderLevel),
      price: Number(price),
      supplierId,
      supplierName: sup ? sup.name : 'Unknown Vendor',
    });
    setIsAddModalOpen(false);
    // Reset form
    setName('');
    setQuantity(10);
    setPrice(500);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      category: editingProduct.category,
      price: Number(editingProduct.price),
      reorderLevel: Number(editingProduct.reorderLevel),
      unit: editingProduct.unit,
    });
    setEditingProduct(null);
  };

  const handleExportCSV = () => {
    const headers = 'Item ID,Product Name,Category,Quantity,Unit,Reorder Level,Unit Price,Supplier,Status\n';
    const rows = filteredProducts
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.category}",${p.quantity},"${p.unit}",${p.reorderLevel},${p.price},"${p.supplierName}","${p.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Action Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#10151E] border border-white/10 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Inventory Catalog Matrix
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Active tracking for {filteredProducts.length} of {products.length} registered SKUs.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-[#151C27] hover:bg-[#1D2635] text-xs font-semibold text-gray-200 border border-white/10 transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#D49B37]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D49B37] via-[#E5AC46] to-[#B27D1B] hover:opacity-95 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D49B37]/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search items by SKU, name, or vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#10151E] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D49B37] transition"
          />
        </div>

        {/* Category Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#10151E] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D49B37] transition"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Consumables">Consumables</option>
            <option value="Hardware">Hardware</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#10151E] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D49B37] transition"
          >
            <option value="All">All Stock Levels</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Data Table */}
      <div className="rounded-2xl bg-[#10151E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151C27] border-b border-white/10 text-gray-300 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Item SKU & Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Threshold</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Assigned Vendor</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition group">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{p.name}</div>
                    <div className="text-[11px] text-[#F8DA96] font-mono mt-0.5">
                      {p.id} • Updated {p.lastUpdated}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-lg bg-[#151C27] text-gray-300 border border-white/5 text-[11px]">
                      {p.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-white">{p.quantity}</span>
                      <span className="text-gray-400 text-[11px]">{p.unit}</span>
                      <div className="flex items-center gap-1 ml-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => adjustStock(p.id, 1, 'IN', 'Manual Floor Increment')}
                          className="p-1 rounded bg-[#1C2636] hover:bg-[#D49B37] hover:text-black text-gray-300 text-[10px]"
                          title="+1"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => adjustStock(p.id, 1, 'OUT', 'Manual Floor Decrement')}
                          className="p-1 rounded bg-[#1C2636] hover:bg-[#992B15] text-gray-300 text-[10px]"
                          title="-1"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-400">
                    {p.reorderLevel} {p.unit}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-[#F8DA96]">
                    ₹{p.price.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4 text-gray-300 max-w-[160px] truncate">
                    {p.supplierName}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'In Stock'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : p.status === 'Low Stock'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : 'bg-red-950 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded-lg bg-[#151C27] hover:bg-[#1D2635] text-gray-300 hover:text-white border border-white/5 transition"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-[#201012] hover:bg-red-950 text-red-400 hover:text-red-200 border border-red-500/20 transition"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Inventory Item"
        subtitle="Specify product attributes, packaging unit, and initial warehouse stock."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Product Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Wireless Mouse M185"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              >
                <option value="Electronics">Electronics</option>
                <option value="Stationery">Stationery</option>
                <option value="Consumables">Consumables</option>
                <option value="Hardware">Hardware</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Assigned Vendor</label>
              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              >
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Initial Qty</label>
              <input
                type="number"
                min="0"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Unit</label>
              <input
                type="text"
                placeholder="pcs / box / ream"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Reorder Level</label>
              <input
                type="number"
                min="1"
                required
                value={reorderLevel}
                onChange={(e) => setReorderLevel(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Procurement Unit Cost (₹)</label>
            <input
              type="number"
              min="0"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#1C2636] hover:bg-[#253348] text-gray-300 hover:text-white transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black font-bold uppercase tracking-wider transition shadow"
            >
              Register Product
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      {editingProduct && (
        <Modal
          isOpen={true}
          onClose={() => setEditingProduct(null)}
          title={`Edit Product: ${editingProduct.name}`}
          subtitle={`Modifying SKU ${editingProduct.id}`}
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Product Title</label>
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Consumables">Consumables</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Unit</label>
                <input
                  type="text"
                  value={editingProduct.unit}
                  onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Reorder Level</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={editingProduct.reorderLevel}
                  onChange={(e) => setEditingProduct({ ...editingProduct, reorderLevel: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Unit Cost (₹)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-[#151C27] border border-white/10 text-white focus:outline-none focus:border-[#D49B37]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl bg-[#1C2636] hover:bg-[#253348] text-gray-300 hover:text-white transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#D49B37] hover:bg-[#E5AC46] text-black font-bold uppercase tracking-wider transition shadow"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
