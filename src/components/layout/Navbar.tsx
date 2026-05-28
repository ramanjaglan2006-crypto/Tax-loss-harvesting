'use client';

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTaxStore } from "@/store/useTaxStore";

export const Navbar = () => {
  const { userProfile } = useTaxStore();

  return (
    <header className="sticky top-0 z-30 w-full h-16 flex items-center justify-between px-4 md:px-8 bg-background/50 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex relative w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search assets, transactions..." 
            className="pl-10 bg-muted/50 border-border/50 focus-visible:ring-primary/30 rounded-full h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
        </button>
        <div className="h-8 w-[1px] bg-border/50 hidden sm:block"></div>
        <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-muted transition-colors">
          <Avatar className="w-8 h-8 border border-border/50 bg-primary/20">
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
              {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium leading-none">{userProfile.firstName} {userProfile.lastName}</span>
            <span className="text-xs text-muted-foreground mt-1">Premium Plan</span>
          </div>
        </div>
      </div>
    </header>
  );
};
