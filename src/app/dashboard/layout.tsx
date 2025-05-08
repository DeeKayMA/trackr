// Auth layout (e.g., sidebar, header)

import AppSidebar from "../../components/AppSidebar/AppSidebar";
import { SidebarProvider} from "@/components/ui/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex-1 flex flex-col relative overflow-hidden">
          {children}
        </main>
      </SidebarProvider>
    )
  }