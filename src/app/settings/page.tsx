'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useTaxStore } from "@/store/useTaxStore";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const { userProfile, setUserProfile } = useTaxStore();
  const [formData, setFormData] = useState(userProfile);

  // Sync state if userProfile changes globally
  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
    toast.success("Settings saved successfully.");
  };

  return (
    <div className="space-y-8 pb-24 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and personal information.</p>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="w-full relative overflow-hidden backdrop-blur-md bg-card/60 border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input 
                    value={formData.firstName} 
                    onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))}
                    className="bg-background/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input 
                    value={formData.lastName} 
                    onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))}
                    className="bg-background/50" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input 
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                  className="bg-background/50" 
                />
              </div>
              
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
