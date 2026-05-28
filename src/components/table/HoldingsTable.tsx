'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Holding } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useTaxStore, SortField } from "@/store/useTaxStore";
import { motion } from "framer-motion";
import { ArrowUpDown, Search } from "lucide-react";
import { useMemo } from "react";

interface HoldingsTableProps {
  holdings: Holding[];
}

export const HoldingsTable = ({ holdings }: HoldingsTableProps) => {
  const { 
    sellAmounts, 
    setSellAmount, 
    selectAllHoldings, 
    deselectAllHoldings,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    setSort
  } = useTaxStore();

  const filteredAndSortedHoldings = useMemo(() => {
    let result = [...holdings];
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(h => 
        h.asset.coinName.toLowerCase().includes(q) || 
        h.asset.coin.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let aVal: any = 0;
      let bVal: any = 0;

      if (sortField === 'asset') {
        aVal = a.asset.coinName;
        bVal = b.asset.coinName;
      } else if (sortField === 'holdings') {
        aVal = a.holdings.totalHoldings;
        bVal = b.holdings.totalHoldings;
      } else if (sortField === 'averageBuyPrice') {
        aVal = a.averageBuyPrice;
        bVal = b.averageBuyPrice;
      } else if (sortField === 'currentPrice') {
        aVal = a.currentPrice;
        bVal = b.currentPrice;
      } else if (sortField === 'stcg') {
        aVal = a.stcg.gain;
        bVal = b.stcg.gain;
      } else if (sortField === 'ltcg') {
        aVal = a.ltcg.gain;
        bVal = b.ltcg.gain;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [holdings, searchQuery, sortField, sortOrder]);

  const allSelected = filteredAndSortedHoldings.length > 0 && 
    filteredAndSortedHoldings.every(h => sellAmounts[h.id] === h.holdings.totalHoldings);

  const toggleAll = () => {
    if (allSelected) {
      deselectAllHoldings();
    } else {
      selectAllHoldings();
    }
  };

  const getRecommendation = (holding: Holding) => {
    if (holding.stcg.gain < 0 || holding.ltcg.gain < 0) return { label: "Good to Harvest", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" };
    if (holding.stcg.gain > 0) return { label: "Hold", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" };
    return { label: "Watchlist", color: "bg-blue-500/20 text-blue-500 border-blue-500/30" };
  };

  const SortableHead = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 transition-colors group"
      onClick={() => setSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={`w-3 h-3 transition-opacity ${sortField === field ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-50'}`} />
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search assets..." 
            className="pl-10 bg-card border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-md overflow-hidden shadow-lg shadow-black/5">
        <Table>
          <TableHeader className="bg-muted/30 sticky top-0 backdrop-blur-md z-10">
            <TableRow>
              <TableHead className="w-[50px] text-center">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
              </TableHead>
              <SortableHead field="asset">Asset</SortableHead>
              <SortableHead field="holdings">Holdings</SortableHead>
              <SortableHead field="averageBuyPrice">Avg Buy Price</SortableHead>
              <SortableHead field="currentPrice">Current Price</SortableHead>
              <SortableHead field="stcg">ST Gain</SortableHead>
              <SortableHead field="ltcg">LT Gain</SortableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead className="text-right">Sell Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedHoldings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                  No assets match your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedHoldings.map((holding) => {
                const isHarvested = !!sellAmounts[holding.id];
                const rec = getRecommendation(holding);
                
                return (
                  <TableRow 
                    key={holding.id}
                    data-state={isHarvested ? "selected" : undefined}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="text-center">
                      <Checkbox 
                        checked={sellAmounts[holding.id] === holding.holdings.totalHoldings}
                        onCheckedChange={(checked) => {
                          setSellAmount(holding.id, checked ? holding.holdings.totalHoldings : 0);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={holding.asset.logo} 
                          alt={holding.asset.coinName} 
                          className="w-8 h-8 rounded-full bg-background p-1 border shadow-sm"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">{holding.asset.coinName}</span>
                          <span className="text-xs text-muted-foreground">{holding.asset.coin}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{holding.holdings.totalHoldings}</TableCell>
                    <TableCell>{formatCurrency(holding.averageBuyPrice)}</TableCell>
                    <TableCell>{formatCurrency(holding.currentPrice)}</TableCell>
                    <TableCell className={holding.stcg.gain > 0 ? "text-emerald-500" : holding.stcg.gain < 0 ? "text-red-500" : ""}>
                      <div className="flex flex-col">
                        <span>{formatCurrency(holding.stcg.gain)}</span>
                        <span className="text-xs text-muted-foreground opacity-70">Bal: {holding.stcg.balance}</span>
                      </div>
                    </TableCell>
                    <TableCell className={holding.ltcg.gain > 0 ? "text-emerald-500" : holding.ltcg.gain < 0 ? "text-red-500" : ""}>
                      <div className="flex flex-col">
                        <span>{formatCurrency(holding.ltcg.gain)}</span>
                        <span className="text-xs text-muted-foreground opacity-70">Bal: {holding.ltcg.balance}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${rec.color} shadow-sm border`}>
                        {rec.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Input
                          type="number"
                          min={0}
                          max={holding.holdings.totalHoldings}
                          step={0.01}
                          value={sellAmounts[holding.id] || ''}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setSellAmount(holding.id, isNaN(val) ? 0 : Math.min(val, holding.holdings.totalHoldings));
                          }}
                          className={`w-24 h-8 text-right bg-background/50 ${isHarvested ? 'border-primary ring-1 ring-primary/20' : ''}`}
                          placeholder="0.00"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
