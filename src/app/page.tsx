'use client';

import { useDashboardData } from "@/features/tax-harvesting/hooks/useDashboardData";
import { TaxCard } from "@/components/cards/TaxCard";
import { HoldingsTable } from "@/components/table/HoldingsTable";
import { PortfolioCharts } from "@/components/cards/PortfolioCharts";
import { AIInsights } from "@/components/cards/AIInsights";
import { useTaxStore } from "@/store/useTaxStore";
import { calculateNetCapitalGains, calculateHarvestedState, calculateSavings } from "@/calculations/taxCalculations";
import { useMemo, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, TrendingDown } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const { isLoading, isError, holdings } = useDashboardData();
  const { originalGains, sellAmounts } = useTaxStore();

  const preHarvestingComputed = useMemo(() => {
    if (!originalGains) return null;
    return calculateNetCapitalGains(originalGains);
  }, [originalGains]);

  const postHarvestingOriginal = useMemo(() => {
    if (!originalGains || !holdings) return null;
    return calculateHarvestedState(originalGains, holdings, sellAmounts);
  }, [originalGains, holdings, sellAmounts]);

  const postHarvestingComputed = useMemo(() => {
    if (!postHarvestingOriginal) return null;
    return calculateNetCapitalGains(postHarvestingOriginal);
  }, [postHarvestingOriginal]);

  const savings = useMemo(() => {
    if (!preHarvestingComputed || !postHarvestingComputed) return 0;
    return calculateSavings(preHarvestingComputed.realisedGains, postHarvestingComputed.realisedGains);
  }, [preHarvestingComputed, postHarvestingComputed]);

  useEffect(() => {
    if (savings > 0) {
      toast.success(`Harvesting active! Projected savings: ${formatCurrency(savings)}`, {
        description: "Your post-harvesting tax liability has decreased.",
        id: "savings-toast",
      });
    } else {
      toast.dismiss("savings-toast");
    }
  }, [savings]);

  if (isError) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center space-y-4">
          <TrendingDown className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold">Failed to load data</h2>
          <p className="text-muted-foreground">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (isLoading || !originalGains || !preHarvestingComputed || !postHarvestingComputed || !postHarvestingOriginal) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-64 bg-muted rounded"></div>
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
        <Skeleton className="h-[500px] w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 relative pb-24">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Overview</h1>
        <p className="text-muted-foreground">Analyze your portfolio, AI insights, and harvest losses to optimize your tax liability.</p>
      </header>

      <AnimatePresence>
        {savings > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 text-emerald-100 p-4 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-lg">
              Projected Tax Savings: <span className="font-bold text-xl">{formatCurrency(savings)}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-6 xl:gap-8">
        {/* Pre-Harvesting Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <TaxCard 
            title="Pre-Harvesting Liability" 
            originalGains={originalGains} 
            computedGains={preHarvestingComputed} 
          />
        </motion.div>
        
        {/* After-Harvesting Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <TaxCard 
            title="Post-Harvesting Liability" 
            originalGains={postHarvestingOriginal} 
            computedGains={postHarvestingComputed} 
            isHarvested={Object.keys(sellAmounts).length > 0}
            type="post"
          />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 xl:gap-8">
        {/* Portfolio Charts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="h-full">
          <PortfolioCharts holdings={holdings || []} />
        </motion.div>

        {/* AI Insights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-full">
          <AIInsights />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-4 pt-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Assets</h2>
            <p className="text-sm text-muted-foreground mt-1">Select assets to harvest and offset capital gains.</p>
          </div>
          <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {Object.keys(sellAmounts).length} active harvesting items
          </span>
        </div>
        <HoldingsTable holdings={holdings || []} />
      </motion.div>
    </div>
  );
}
