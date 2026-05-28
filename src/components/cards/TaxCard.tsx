import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComputedGains, CapitalGains } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TaxCardProps {
  title: string;
  originalGains: CapitalGains | null;
  computedGains: ComputedGains | null;
  isHarvested?: boolean;
}

const ValueRow = ({ label, value, isLoss = false, type = 'pre' }: { label: string; value: number; isLoss?: boolean, type?: 'pre' | 'post' }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    <motion.span 
      key={value}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`font-medium flex items-center gap-1 ${
        isLoss && value > 0 
          ? "text-red-500" 
          : !isLoss && value > 0 
            ? (type === 'post' ? "text-blue-500" : "text-green-500") 
            : ""
      }`}
    >
      {isLoss && value > 0 && <TrendingDown className="w-4 h-4" />}
      {!isLoss && value > 0 && <TrendingUp className="w-4 h-4" />}
      {formatCurrency(value)}
    </motion.span>
  </div>
);

export const TaxCard = ({ title, originalGains, computedGains, isHarvested, type = 'pre' }: TaxCardProps) => {
  if (!originalGains || !computedGains) return null;

  const baseGradient = type === 'pre' 
    ? 'from-zinc-500/5 via-transparent to-transparent' 
    : 'from-blue-500/10 via-transparent to-blue-500/5';
    
  const borderClass = isHarvested 
    ? 'border-primary/50' 
    : type === 'post' 
      ? 'border-blue-500/20' 
      : 'border-white/10';

  return (
    <Card className={`w-full h-full relative overflow-hidden backdrop-blur-md bg-card/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors duration-500 ${borderClass}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isHarvested ? 'from-primary/10 via-primary/5 to-transparent' : baseGradient} pointer-events-none transition-colors duration-500`} />
      
      {isHarvested && (
        <div className="absolute top-0 right-0 p-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(var(--primary),0.3)] animate-pulse">
            Harvesting Active
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Short-Term</h4>
          <ValueRow label="Profits" value={originalGains.shortTerm.profits} type={type} />
          <ValueRow label="Losses" value={originalGains.shortTerm.losses} isLoss type={type} />
          <div className="pt-2 border-t">
            <ValueRow label="Net Short-Term Gains" value={computedGains.shortTermNet} type={type} />
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Long-Term</h4>
          <ValueRow label="Profits" value={originalGains.longTerm.profits} type={type} />
          <ValueRow label="Losses" value={originalGains.longTerm.losses} isLoss type={type} />
          <div className="pt-2 border-t">
            <ValueRow label="Net Long-Term Gains" value={computedGains.longTermNet} type={type} />
          </div>
        </div>

        <div className="pt-4 mt-4 border-t-2 border-dashed border-muted">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Realised Capital Gains</span>
            <motion.span 
              key={computedGains.realisedGains}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-bold text-xl"
            >
              {formatCurrency(computedGains.realisedGains)}
            </motion.span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
