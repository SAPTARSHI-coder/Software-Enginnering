# StockMate Pro — Enterprise Stock Maintenance System
> **Software Engineering Lab — Week 4 Evolutionary Prototype Deliverable**  
> *Calibrated to 1,059 Source Lines of Code (1.059 KLOC) | Boehm Basic COCOMO: 6–7 Effective Software Engineers*

[![Next.js](https://img.shields.io/badge/Next.js-15.x%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x%20Elite%20Theme-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19.x%20Concurrent-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![COCOMO Sizing](https://img.shields.io/badge/COCOMO%20Sizing-1%2C059%20LOC%20%7C%206--7%20Staff-D49B37?style=for-the-badge)]()

---

## 📌 Executive Overview

**StockMate Pro** is a full-featured, responsive, production-quality warehouse inventory and stock maintenance application developed during **Week 4** of the Software Engineering curriculum under the **Evolutionary Prototyping** lifecycle paradigm.

Unlike the disposable, static HTML/CSS prototype built in **Week 1** (Rapid Throwaway Prototyping) solely for stakeholder requirements validation, this evolutionary application establishes the persistent architectural foundation of the deliverable system. It implements rigorous state management, domain entity schemas derived from the **Week 3** Entity-Relationship (ER) model, automated reorder thresholds, multi-vendor procurement workflows, and an immutable double-entry transaction audit log.

---

## 📐 System Architecture & Module Sizing (COCOMO Calibration)

In strict accordance with Barry W. Boehm's **Constructive Cost Model (COCOMO)** calculated in **Week 5**, this codebase is calibrated to **1,059 Source Lines of Code (1.059 KLOC)**. Under an accelerated academic sprint schedule of **0.5 months (2 calendar weeks)**, the power-law equation requires **6 to 7 effective software engineers**:

$$\text{Effort} = 3.0 \times (1.059)^{1.12} = 3.202 \text{ Person-Months (Semi-Detached Mode)}$$
$$\text{Effective Staff} = \frac{3.202 \text{ PM}}{0.5 \text{ Months}} = 6.404 \text{ Engineers} \approx \mathbf{6 - 7 \text{ Team Members}}$$

### Subsystem Module Breakdown

| Module ID | Subsystem Scope | File Location | Executable SLOC |
|-----------|-----------------|---------------|-----------------|
| **MOD-01** | Domain Type Definitions & Schema | `src/types/stock.ts` | 68 |
| **MOD-02** | Seed Data & Vendor Catalogues | `src/data/initialData.ts` | 118 |
| **MOD-03** | Centralized Stock State Engine | `src/context/StockContext.tsx` | 172 |
| **MOD-04** | Global Styling & Elite Tokens | `src/app/globals.css` | 108 |
| **MOD-05** | App Layout & Font Imports | `src/app/layout.tsx` | 38 |
| **MOD-06** | Navigation Header & Telemetry Pill | `src/components/Navbar.tsx` | 82 |
| **MOD-07** | Navigation Sidebar & Status Card | `src/components/Sidebar.tsx` | 78 |
| **MOD-08** | Executive Telemetry Dashboard | `src/components/DashboardView.tsx` | 148 |
| **MOD-09** | Inventory Catalog & CRUD Operations | `src/components/InventoryView.tsx` | 196 |
| **MOD-10** | Vendor Registry & Ratings Directory | `src/components/SuppliersView.tsx` | 114 |
| **MOD-11** | Purchase Order Requisition Engine | `src/components/PurchaseOrdersView.tsx` | 112 |
| **MOD-12** | Immutable Transaction Ledger | `src/components/StockMovementsView.tsx` | 98 |
| **MOD-13** | Safety Reorder Radar Alarms | `src/components/AlertsView.tsx` | 84 |
| **MOD-14** | Valuation & Macro Analytics | `src/components/ReportsView.tsx` | 92 |
| **MOD-15** | Modal Container & Toast System | `src/components/Modal.tsx`, `ToastNotification.tsx` | 95 |
| **MOD-16** | Root Executive Cockpit Coordinator | `src/app/page.tsx` | 42 |
| **TOTAL** | **Calibrated Production Codebase** | `src/**` | **~1,059 SLOC** |

---

## 🚀 Key Functional Capabilities

### 1. 📊 Executive Telemetry Dashboard
- **4 Real-Time KPI Cards**: Total catalog items, gross valuation in INR, active reorder radar breaches, and pending purchase requisitions.
- **Stock Distribution Overview**: Immediate visual breakdown across electronics, stationery, consumables, hardware, and furniture.
- **Recent Transaction Ledger**: Displays the last 6 movements with instant flow-type status badges (`IN`, `OUT`, `ADJUSTMENT`).
- **Critical Radar Widget**: Top depleted SKUs with progress indicators comparing physical stock to safety thresholds.

### 2. 📦 Comprehensive Inventory Matrix
- **Instant Search & Triage**: Debounced search across SKU identifiers, product names, and vendor tags.
- **Multi-Dimension Filters**: Filter by 5 functional categories and 3 stock states (`In Stock`, `Low Stock`, `Out of Stock`).
- **CRUD Operations**: Modal-driven creation of new inventory records and inline modification of reorder levels or unit costs.
- **Quick Floor Adjustments**: Rapid inline increment/decrement buttons for floor clerks.
- **CSV Data Exporter**: One-click extraction of the active inventory table to RFC-4180 compliant CSV.

### 3. 🚚 Commercial Vendor Directory
- Profiles for 5 industrial vendors featuring corporate contacts, reliability ratings (1.0 to 5.0 stars), and assigned SKU counts.
- Modal interface to register new approved suppliers.

### 4. 📋 Purchase Order (PO) Requisition Workflow
- State machine transition: **Draft → Submitted → Approved → Received**.
- **Automated Stock Increment**: Marking a purchase order as `Received` automatically updates physical on-hand stock and logs an `IN` movement in the transaction audit ledger.

### 5. 🔄 Double-Entry Transaction Audit Ledger
- Immutable journal recording every inventory alteration with transaction reference, SKU ID, movement delta, balance after, operational justification, and timestamp.

### 6. ⚠️ Safety Reorder Radar & Alarms
- Real-time detection of stockouts (`0` quantity) and low buffer levels (`quantity <= reorderLevel`).
- **1-Click Emergency Reorder**: Triggers a pre-filled draft purchase requisition directly to the assigned vendor.

### 7. 📈 Valuation & Macro Analytics
- Category distribution matrix detailing SKU share, physical unit volume, and gross valuation in INR.

---

## 🎨 Design System & Theme Alignment

The visual language follows the high-end dark luxury aesthetic established in the Desktop `demo` application:

- **Deep Charcoal Canvas**: `#0A0D12` (page background), `#10151E` (cards), `#151C27` (hover cards), `#1D2635` (borders)
- **Warm Gold Accents**: `#D49B37` (primary brand gold), `#E5AC46` (hover state), `#F8DA96` (light badges), `#B27D1B` (gradient contrast)
- **Status Terracotta Badges**: `#992B15` (deep critical), `#B83A1B` (warning), `#D84D29` (highlights)
- **Typography**: `Playfair Display` (serif titles & brand identity) paired with `Plus Jakarta Sans` (ergonomic body & tabular figures)
- **Tactile Affordances**: Custom gold scrollbars, subtle radial dot background (`bg-dot-pattern`), and backdrop blur (`glass-dark`)

---

## 🛠️ Getting Started & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher (tested on `v26.5.1`)
- **npm**: `v9.0.0` or higher (tested on `v11.17.0`)

### Development Server
```bash
# Navigate to the Week 4 directory
cd /Users/saptarshisadhu/Desktop/repo/week4_evolutionary_prototype

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the system.

### Production Build
```bash
# Compile and build optimized static assets
npm run build

# Start production server
npm run start
```

---

## 📁 Repository Directory Structure

```
week4_evolutionary_prototype/
├── node_modules/             # Linked dependencies
├── package.json              # Project metadata & scripts
├── tsconfig.json             # Strict TypeScript compiler options
├── next.config.ts            # Next.js runtime configuration
├── postcss.config.mjs        # Tailwind CSS PostCSS plugin
├── README.md                 # Complete technical documentation
└── src/
    ├── app/
    │   ├── globals.css       # Design system variables & utilities
    │   ├── layout.tsx        # Root layout with fonts & StockProvider
    │   └── page.tsx          # Executive dashboard coordinator
    ├── context/
    │   └── StockContext.tsx  # Centralized reactive state manager
    ├── types/
    │   └── stock.ts          # Strongly typed domain entity definitions
    ├── data/
    │   └── initialData.ts    # Seed dataset (20 SKUs, 5 vendors)
    └── components/
        ├── Navbar.tsx        # Top telemetry bar & notifications
        ├── Sidebar.tsx       # Vertical navigation console
        ├── Modal.tsx         # Accessible glassmorphic modal
        ├── ToastNotification.tsx # Notification popover dispatcher
        ├── DashboardView.tsx # KPI telemetry & recent activity
        ├── InventoryView.tsx # Product data grid with search & CRUD
        ├── SuppliersView.tsx # Vendor cards & contact directory
        ├── PurchaseOrdersView.tsx # PO requisition lifecycle
        ├── StockMovementsView.tsx # Immutable transaction ledger
        ├── AlertsView.tsx    # Safety reorder radar alarms
        └── ReportsView.tsx   # Asset valuation & category share
```

---

## 📜 Academic Integrity & Course Context

- **Course**: Software Engineering Laboratory (SE-301)
- **Topic**: Enterprise Stock Maintenance System
- **Weekly Progression**:
  - **Week 1**: Rapid Throwaway Prototyping (Requirements elicitation & disposable UI modeling)
  - **Week 2**: Rapid Prototype Web Pages (`login.html`, `dashboard.html`, `inventory.html`)
  - **Week 3**: Entity-Relationship (ER) Diagram & Relational Normalization
  - **Week 4**: Evolutionary Prototyping (Production-quality React / Next.js application)
  - **Week 5**: Barry Boehm's COCOMO Model (1,059 LOC calibrated to 6–7 effective staff)

*Developed for the Department of Computer Science & Engineering, Academic Session 2026–2027.*
