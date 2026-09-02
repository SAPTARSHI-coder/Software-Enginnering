# Week 5 — Barry Boehm's COCOMO Cost & Effort Estimation Model

## 📄 Deliverable Document
- **File**: [`Week5_COCOMO_Model.docx`](./Week5_COCOMO_Model.docx)
- **Format**: Microsoft Word Document (`.docx`)
- **Typography & Styling**: Strict **Times New Roman**, pure black text (`#000000`), bold black section headings, academic comparison tables.

## 🧮 Sizing & Mathematical Derivations
- **System Size**: Calibrated to **7,225 Source Lines of Code (7.225 KLOC)**.
- **Effective Project Schedule**: **0.5 Months** (accelerated 2-week academic sprint).

### Mathematical Results Across Modes

| Metric | Organic Mode | Semi-Detached Mode | Embedded Mode |
| :--- | :---: | :---: | :---: |
| **Effort ($E$)** | $2.4 \times (7.225)^{1.05} = \mathbf{19.142\text{ PM}}$ | $3.0 \times (7.225)^{1.12} = \mathbf{27.480\text{ PM}}$ | $3.6 \times (7.225)^{1.20} = \mathbf{38.629\text{ PM}}$ |
| **Nominal Dev Time ($D$)** | $2.5 \times (19.142)^{0.38} = \mathbf{7.675\text{ Mos}}$ | $2.5 \times (27.480)^{0.35} = \mathbf{7.973\text{ Mos}}$ | $2.5 \times (38.629)^{0.32} = \mathbf{8.049\text{ Mos}}$ |
| **Nominal Staff ($S$)** | $\frac{19.142}{7.675} = \mathbf{2.494\text{ Persons}}$ | $\frac{27.480}{7.973} = \mathbf{3.447\text{ Persons}}$ | $\frac{38.629}{8.049} = \mathbf{4.799\text{ Persons}}$ |
| **Effective Dev Time** | $0.5\text{ Months}$ | $0.5\text{ Months}$ | $0.5\text{ Months}$ |
| **Effective Staff ($S_{\text{eff}}$)** | $\frac{19.142}{0.5} = \mathbf{38.284\text{ Persons}}$ | $\frac{27.480}{0.5} = \mathbf{54.960\text{ Persons}}$ | $\frac{38.629}{0.5} = \mathbf{77.257\text{ Persons}}$ |

### Key Takeaways
Under an accelerated 0.5-month delivery schedule, software concurrency scales inversely with schedule duration ($S_{\text{eff}} = E / 0.5$). Across Semi-Detached and Embedded modes, this mathematically dictates an effective engineering capacity of **38 to 77 team members**, illustrating the dramatic human-resource inflation caused by aggressive schedule compression on a 7,225 LOC production codebase.
