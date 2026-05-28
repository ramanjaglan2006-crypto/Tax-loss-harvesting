'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    toast.info("Generating report...", { id: "report-toast" });
    
    setTimeout(() => {
      setGenerating(false);
      toast.success("2026 Tax Report generated successfully!", { id: "report-toast" });
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Tax Reports</h1>
        <p className="text-muted-foreground">Generate and download your official capital gains reports for tax filing.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="w-full relative overflow-hidden backdrop-blur-md bg-card/60 border-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
            <CardHeader>
              <CardTitle>Current Year (2026)</CardTitle>
              <CardDescription>Generate a real-time snapshot of your 2026 tax liability.</CardDescription>
            </CardHeader>
            <CardContent>
              <button 
                onClick={handleGenerate}
                disabled={generating}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {generating ? (
                  <span className="animate-pulse">Generating...</span>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate 2026 Report
                  </>
                )}
              </button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="w-full h-full relative overflow-hidden backdrop-blur-md bg-card/60 border-white/10">
            <CardHeader>
              <CardTitle>Past Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[2025, 2024, 2023].map((year) => (
                <div key={year} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-white/5 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">FY {year} Capital Gains</span>
                  </div>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors bg-background rounded-lg border border-border/50 shadow-sm" onClick={() => toast.success(`Downloading ${year} report...`)}>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
