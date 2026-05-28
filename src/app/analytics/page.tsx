'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

const mockPerformanceData = [
  { month: 'Jan', value: 8500000 },
  { month: 'Feb', value: 9200000 },
  { month: 'Mar', value: 8900000 },
  { month: 'Apr', value: 10500000 },
  { month: 'May', value: 10100000 },
  { month: 'Jun', value: 11200000 },
  { month: 'Jul', value: 12500000 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-24">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Analytics</h1>
        <p className="text-muted-foreground">Historical performance and tax optimization metrics.</p>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="w-full h-full relative overflow-hidden backdrop-blur-md bg-card/60 border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle>Historical Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(val) => `₹${(val / 1000000).toFixed(1)}M`} />
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(Number(value))}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
