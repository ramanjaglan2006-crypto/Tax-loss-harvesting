# Tax Loss Harvesting Dashboard

A premium fintech web application built with Next.js 14, Tailwind CSS, and Zustand.

## 🚀 Live Demos
- **[View on Vercel (Recommended)](https://tax-loss-harvesting-git-main-ramanjaglan2006-cryptos-projects.vercel.app)**
- **[View on Render](https://tax-loss-harvesting-whnn.onrender.com)**

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui & Lucide React
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query & Axios
- **Animations**: Framer Motion

## 🏗️ Architecture Decisions

- **Separation of Concerns**: 
  - **State**: Raw data and UI states (like selections) are managed using Zustand.
  - **Business Logic**: Pure, decoupled mathematical functions compute derived state (e.g., net capital gains, post-harvesting logic). This logic does NOT reside inside React components.
  - **Components**: Separated by responsibility (`TaxCard`, `HoldingsTable`, `DashboardPage`).
- **Data Fetching**: Next.js API routes serve local JSON mocks. React Query fetches these and provides built-in caching, loading states, and error handling.
- **Performance**: Leveraging `useMemo` in the dashboard so that computations only re-run when dependencies change. React Query prevents unnecessary network polling.

## 🛠️ Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 📈 Optimization Techniques

- **Derived State Over Duplicated State**: We store only the raw API results and a `Set` of selected IDs. The post-harvesting and savings data are dynamically computed via `useMemo`.
- **Minimal Rerenders**: Zustand selectors and memoization ensure only the necessary components re-render when a checkbox is toggled.
- **Premium UX**: Framer Motion provides layout transitions for number changes and toast banners. Suspense-like loading skeletons ensure smooth perceived performance.

## 📸 Edge Cases Handled

- Negative capital gains gracefully render in red with a downward arrow.
- Indeterminate/Select All logic handles edge cases natively.
- Prevents rendering null UI states by utilizing loading skeletons.

## 🌐 Deployment

Ready to be deployed on **Vercel** with zero configuration required. Just link your GitHub repository.
