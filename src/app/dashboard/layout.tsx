// Auth layout (e.g., sidebar, header)

import AppSidebar from "../../components/AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full overflow-x-hidden">
      <Header />
      <main className="w-full flex-1 flex flex-col">
        {children}
      </main>
      </div>
    </SidebarProvider>
  );
}
