# Frontend Engineering Exercise

## Table of Contents
- [The Brief](#the-brief)
- [Requirements](#requirements)
- [Optional Enhancements](#optional-enhancements)
- [Time & Submission](#time--submission)
- [Getting Started](#getting-started)
- [Data](#data)

## The Brief

Build a web-based charting interface for an energy analyst to visualize hourly energy generation data for 2030.

**Data Structure:**
- Rows: Technology carriers (Solar, Wind, Gas, etc.)
- Columns: Hourly timestamps (Jan 1 - Dec 31, 2030)
- Values: Energy generation in MW

## Requirements

### Core Features
- Parse and load the CSV file
- Display a **stacked area chart** showing energy over time
- Add **hover tooltips** with values
- Make it **responsive** and **styled with Tailwind CSS**
- Include **time range controls** (zoom, slider, daily/weekly toggles)

### Suggested Libraries
- [Recharts](https://recharts.org/)
- [Visx](https://airbnb.io/visx)
- [D3.js](https://d3js.org/)
- [ShadCN Area Chart](https://ui.shadcn.com/charts/area)

## Optional Enhancements

- **UX**: Different chart types, filters, improved legends
- **Performance**: Data downsampling, virtualization
- **Accessibility**: Keyboard navigation, contrast, alt text

## Time & Submission

- **Time limit:** 4 hours
- **Submission:** GitHub repo or ZIP
- **Presentation:** 1-hour walkthrough session

## Getting Started

```bash
npm install
npm run dev
```

**Tech Stack:**
- React + TypeScript
- Tailwind CSS
- Vite

## Data

[energy_balance.csv](attachment:4927a044-2441-4ffa-8bd9-8031d771e9bc:energy_balance.csv)
