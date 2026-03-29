# mf-portfolio-xray

# 🔬 MF Portfolio X-Ray — AI Investment Intelligence

> **ET AI Hackathon 2026 | Problem Statement 6: AI for the Indian Investor**

India has 14 crore+ demat accounts, but most retail investors are flying blind — holding overlapping funds, bleeding expense ratios, and missing tax-saving opportunities. **MF Portfolio X-Ray** is a multi-agent AI system that turns a raw CAMS/KFintech statement into an actionable intelligence report in under 10 seconds.

---

## 🎯 What It Does

Upload your mutual fund statement → Our **5-agent AI pipeline** instantly delivers:

| Agent | Function |
|-------|----------|
| 📄 **Parser Agent** | Extracts fund data from CAMS/KFintech PDFs |
| 📊 **NAV Agent** | Fetches latest NAV, computes true XIRR per fund |
| 🔍 **Overlap Agent** | Runs pairwise top-holding overlap analysis |
| ⚠️ **Risk Agent** | Evaluates concentration risk & expense ratio drag |
| 🧠 **Strategy Agent** | Generates personalized rebalancing recommendations |

---

## 📸 Screenshots

### Portfolio Overview
- KPI cards: Invested, Current Value, Total Gain, Expense Drag
- Animated Health Score gauge (0–100)
- Category allocation donut chart
- Fund-wise XIRR comparison bars

### Overlap Detection
- Pairwise holding overlap heatmap
- Common stock identification across fund pairs
- Redundancy cost quantification

### AI Rebalancing Plan
- Severity-tagged recommendations (warning / info / success)
- Projected annual savings breakdown
- Tax harvesting opportunities

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/mf-portfolio-xray.git
cd mf-portfolio-xray
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Try Sample Portfolios
The app includes 3 pre-built portfolios to demo without uploading a file:
- 🛡️ **Conservative** — 3 funds, Large Cap + Value heavy
- 🚀 **Aggressive** — 5 funds, Small & Mid Cap heavy  
- ⚠️ **Overlap-Heavy** — 6 funds, high redundancy (best for seeing the overlap detection in action)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Interface                     │
│   Upload Zone → Agent Pipeline View → Dashboard      │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────▼──────────────┐
        │     Orchestration Layer      │
        │   Sequential Agent Pipeline  │
        └──────────────┬──────────────┘
                       │
   ┌───────┬───────┬───┴────┬──────────┐
   ▼       ▼       ▼        ▼          ▼
┌──────┐┌──────┐┌───────┐┌──────┐┌─────────┐
│Parser││ NAV  ││Overlap││ Risk ││Strategy │
│Agent ││Agent ││Agent  ││Agent ││ Agent   │
└──┬───┘└──┬───┘└──┬────┘└──┬───┘└────┬────┘
   │       │       │        │         │
   ▼       ▼       ▼        ▼         ▼
 Extract  XIRR   Pairwise  Health   Rebalance
 Funds    Calc   Holdings  Score    Plan
                 Compare   + Risk
                           Rating
```

### Agent Details

1. **Parser Agent** — Reads CAMS/KFintech PDF statements, extracts fund names, folio numbers, units, NAV, invested amounts, and transaction history.

2. **NAV Agent** — Maps each fund to current NAV data, computes true XIRR (not simple CAGR) accounting for SIP timing and lumpsum entries.

3. **Overlap Agent** — Fetches top-10 holdings for each fund, runs O(n²) pairwise comparison to identify portfolio redundancy.

4. **Risk Agent** — Evaluates category concentration, expense ratio drag (in absolute rupees/year), market-cap tilt, and generates a composite health score.

5. **Strategy Agent** — Synthesizes outputs from all prior agents into actionable recommendations: fund consolidation, expense optimization, tax harvesting, and rebalancing targets.

---

## 📊 Impact Model

| Metric | Estimate | Assumptions |
|--------|----------|-------------|
| **Expense Ratio Savings** | ₹3,000–15,000/yr | Switching overlapping regular plans to direct; avg portfolio ₹10–20L |
| **Overlap Elimination** | ₹2,000–8,000/yr | Consolidating 2 redundant funds saves one layer of expense ratio |
| **Tax Harvesting** | Up to ₹12,500/yr | Utilizing ₹1.25L LTCG exemption before March 31 |
| **Time Saved** | ~4 hours/quarter | vs. manual portfolio review using spreadsheets |
| **Total Addressable Market** | 14 Cr+ demat accounts | Most retail investors have no portfolio analytics tool |

**Conservative estimate:** ₹5,000–35,000/yr saved per investor using this tool.

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Tailwind-style inline CSS** — Zero build dependency styling
- **Custom SVG engine** — Donut charts, health gauge, overlap heatmaps
- **Pure JS analysis engine** — XIRR computation, overlap detection, risk scoring

---

## 📁 Submission Checklist

- [x] GitHub Repository with source code and README
- [x] 3-Minute Pitch Video
- [x] Architecture Document (see above)
- [x] Impact Model with quantified estimates

---

## 👥 Team

Built for **ET AI Hackathon 2026** — Problem Statement 6: AI for the Indian Investor

---

## 📜 License

MIT License — built for the hackathon, open for the community.
