'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, Supplier, PurchaseOrder, StockMovement, Alert, Toast, StockStats, POStatus, MovementType } from '../types/stock';
import { INITIAL_PRODUCTS, INITIAL_SUPPLIERS, INITIAL_PURCHASE_ORDERS, INITIAL_MOVEMENTS } from '../data/initialData';

interface StockContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  products: Product[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  movements: StockMovement[];
  alerts: Alert[];
  toasts: Toast[];
  stats: StockStats;
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated' | 'status'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (productId: string, delta: number, type: MovementType, reason: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id' | 'productsSuppliedCount'>) => void;
  createPurchaseOrder: (po: Omit<PurchaseOrder, 'id' | 'status' | 'orderDate'>) => void;
  updatePOStatus: (id: string, status: POStatus) => void;
  dismissAlert: (alertId: string) => void;
  addToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [movements, setMovements] = useState<StockMovement[]>(INITIAL_MOVEMENTS);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (title: string, message: string, type: Toast['type'] = 'success') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const alerts = useMemo<Alert[]>(() => {
    return products
      .filter((p) => p.quantity <= p.reorderLevel)
      .map((p) => ({
        id: 'ALT-' + p.id,
        productId: p.id,
        productName: p.name,
        severity: (p.quantity === 0 ? 'critical' : 'warning') as 'critical' | 'warning',
        currentQuantity: p.quantity,
        reorderLevel: p.reorderLevel,
        timestamp: 'Real-time sync',
        isDismissed: dismissedAlerts.includes('ALT-' + p.id),
      }))
      .filter((a) => !a.isDismissed);
  }, [products, dismissedAlerts]);

  const stats = useMemo<StockStats>(() => {
    let totalQty = 0;
    let lowCount = 0;
    let outCount = 0;
    let valuation = 0;

    products.forEach((p) => {
      totalQty += p.quantity;
      valuation += p.quantity * p.price;
      if (p.quantity === 0) outCount++;
      else if (p.quantity <= p.reorderLevel) lowCount++;
    });

    const pendingOrdersCount = purchaseOrders.filter(
      (po) => po.status === 'Submitted' || po.status === 'Approved'
    ).length;

    return {
      totalItems: products.length,
      totalQuantity: totalQty,
      lowStockCount: lowCount,
      outOfStockCount: outCount,
      totalValuation: valuation,
      pendingOrdersCount,
    };
  }, [products, purchaseOrders]);

  const addProduct = (newP: Omit<Product, 'id' | 'lastUpdated' | 'status'>) => {
    const id = 'INV' + String(products.length + 1).padStart(3, '0');
    const status = newP.quantity === 0 ? 'Out of Stock' : newP.quantity <= newP.reorderLevel ? 'Low Stock' : 'In Stock';
    const product: Product = {
      ...newP,
      id,
      status,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [product, ...prev]);

    const movement: StockMovement = {
      id: 'MOV-' + (movements.length + 1001),
      productId: id,
      productName: product.name,
      type: 'IN',
      quantity: product.quantity,
      balanceAfter: product.quantity,
      reason: 'Initial Stock Creation',
      performedBy: 'Current Operator',
      timestamp: new Date().toLocaleString(),
    };
    setMovements((prev) => [movement, ...prev]);
    addToast('Product Added', `${product.name} registered into inventory catalog.`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, ...updates, lastUpdated: new Date().toISOString().split('T')[0] };
        updated.status = updated.quantity === 0 ? 'Out of Stock' : updated.quantity <= updated.reorderLevel ? 'Low Stock' : 'In Stock';
        return updated;
      })
    );
    addToast('Product Updated', `Inventory record #${id} updated successfully.`, 'info');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product Removed', `${target ? target.name : id} decommissioned from active ledger.`, 'warning');
  };

  const adjustStock = (productId: string, delta: number, type: MovementType, reason: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const newQty = Math.max(0, target.quantity + (type === 'OUT' ? -delta : delta));
    updateProduct(productId, { quantity: newQty });

    const movement: StockMovement = {
      id: 'MOV-' + (movements.length + 1001),
      productId,
      productName: target.name,
      type,
      quantity: delta,
      balanceAfter: newQty,
      reason,
      performedBy: 'Current Operator',
      timestamp: new Date().toLocaleString(),
    };
    setMovements((prev) => [movement, ...prev]);
    addToast('Stock Ledger Updated', `${target.name}: quantity adjusted to ${newQty}.`, 'info');
  };

  const addSupplier = (newS: Omit<Supplier, 'id' | 'productsSuppliedCount'>) => {
    const id = 'S' + String(suppliers.length + 1).padStart(3, '0');
    const supplier: Supplier = { ...newS, id, productsSuppliedCount: 0 };
    setSuppliers((prev) => [...prev, supplier]);
    addToast('Supplier Enrolled', `${supplier.name} added to vendor registry.`, 'success');
  };

  const createPurchaseOrder = (poData: Omit<PurchaseOrder, 'id' | 'status' | 'orderDate'>) => {
    const id = 'PO-2026-' + String(purchaseOrders.length + 1).padStart(3, '0');
    const po: PurchaseOrder = {
      ...poData,
      id,
      status: 'Submitted',
      orderDate: new Date().toISOString().split('T')[0],
    };
    setPurchaseOrders((prev) => [po, ...prev]);
    addToast('Purchase Order Raised', `Requisition ${id} created for ${po.productName}.`, 'success');
  };

  const updatePOStatus = (id: string, status: POStatus) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id !== id) return po;
        if (status === 'Received' && po.status !== 'Received') {
          adjustStock(po.productId, po.quantity, 'IN', `Delivered via PO #${po.id}`);
        }
        return { ...po, status };
      })
    );
    addToast('PO Status Updated', `Purchase order #${id} transitioned to '${status}'.`, 'info');
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId]);
  };

  return (
    <StockContext.Provider
      value={{
        activeTab,
        setActiveTab,
        products,
        suppliers,
        purchaseOrders,
        movements,
        alerts,
        toasts,
        stats,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        addSupplier,
        createPurchaseOrder,
        updatePOStatus,
        dismissAlert,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error('useStock must be used within StockProvider');
  return ctx;
}
