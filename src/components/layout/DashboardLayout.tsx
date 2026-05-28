import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        <Navbar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
};
