// Auth layout (e.g., sidebar, header)

import Header from "@/components/Header/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../components/AppSidebar/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full min-h-screen flex flex-col overflow-x-hidden ">
      <div className="m-0 sticky top-0 z-50"><Header /></div>
      
      <main className="w-full flex-1 flex flex-col overflow-y-auto ">
        {children}
      </main>
      </div>
    </SidebarProvider>
  );
}
