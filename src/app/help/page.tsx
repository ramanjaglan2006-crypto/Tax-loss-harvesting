'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HelpPage() {
  return (
    <div className="space-y-8 pb-24 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Help Center</h1>
        <p className="text-muted-foreground">Find answers to your questions and learn how to optimize your taxes.</p>
      </header>

      <div className="relative w-full max-w-lg mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="Search for articles, guides..." 
          className="pl-12 py-6 bg-card/60 backdrop-blur-md border-white/10 rounded-2xl text-lg shadow-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="w-full h-full relative overflow-hidden backdrop-blur-md bg-card/60 border-white/10 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                What is Tax Loss Harvesting?
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
              <CardDescription>Learn the basics of offsetting your capital gains.</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="w-full h-full relative overflow-hidden backdrop-blur-md bg-card/60 border-white/10 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                The Wash-Sale Rule
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
              <CardDescription>Understand how to navigate the 30-day wash-sale period.</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
