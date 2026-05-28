'use client';

import { useDashboardData } from "@/features/tax-harvesting/hooks/useDashboardData";
import { PortfolioCharts } from "@/components/cards/PortfolioCharts";
import { HoldingsTable } from "@/components/table/HoldingsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

export default function PortfolioPage() {
  const { isLoading, isError, holdings } = useDashboardData();

  if (isError) return <div>Failed to load portfolio.</div>;
  if (isLoading || !holdings) return <div className="space-y-8 animate-pulse"><Skeleton className="h-[400px] w-full" /></div>;

  const totalValue = holdings.reduce((sum, h) => sum + (h.holdings.totalHoldings * h.currentPrice), 0);
  const totalCost = holdings.reduce((sum, h) => sum + (h.holdings.totalHoldings * h.averageBuyPrice), 0);
  const totalGain = totalValue - totalCost;
  const gainPercentage = (totalGain / totalCost) * 100;

  return (
    <div className="space-y-8 pb-24">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Portfolio</h1>
        <p className="text-muted-foreground">Manage and review all your crypto assets.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-1 lg:col-span-2 bg-card/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Balance</h2>
          <div className="text-5xl font-bold mb-4">{formatCurrency(totalValue)}</div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">All-time Profit</span>
              <span className={`text-xl font-semibold ${totalGain >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Return</span>
              <span className={`text-xl font-semibold ${totalGain >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {totalGain >= 0 ? '+' : ''}{gainPercentage.toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-1">
          <PortfolioCharts holdings={holdings} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Asset Breakdown</h2>
        <HoldingsTable holdings={holdings} />
      </motion.div>
    </div>
  );
}
