'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const AIInsights = () => {
  return (
    <Card className="w-full h-full relative overflow-hidden backdrop-blur-md bg-card/60 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          AI Tax Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Health Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Portfolio Health</span>
            <span className="font-bold text-emerald-400">85/100</span>
          </div>
          <Progress value={85} className="h-2 bg-muted/50 [&>div]:bg-gradient-to-r [&>div]:from-emerald-600 [&>div]:to-emerald-400" />
        </div>

        {/* Fear & Greed */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fear & Greed Index</span>
            <span className="font-bold text-yellow-400">62 - Greed</span>
          </div>
          <Progress value={62} className="h-2 bg-muted/50 [&>div]:bg-gradient-to-r [&>div]:from-yellow-600 [&>div]:to-yellow-400" />
        </div>

        {/* Smart Recommendations */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex gap-3 items-start bg-primary/5 p-3 rounded-lg border border-primary/10">
            <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">Consider harvesting your ADA losses now before the EOY rally to offset your upcoming BTC gains.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex gap-3 items-start bg-destructive/5 p-3 rounded-lg border border-destructive/10">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">Wash Sale Rule Warning: You recently purchased ETH. Avoid harvesting ETH for 30 days.</p>
          </motion.div>
        </div>

      </CardContent>
    </Card>
  );
};
