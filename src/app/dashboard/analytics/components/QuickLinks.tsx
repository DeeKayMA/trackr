import { Button } from "@/components/ui/button"
import { LayoutDashboard, BriefcaseBusiness, Book } from "lucide-react"
import Link from "next/link"

export const QuickLinks = () => {
    return(
        <div className="flex flex-col gap-4 w-full h-full">

            <Link href="dashboard/jobs" className="flex-1">
                <Button className="w-full h-full bg-blue-200 hover:bg-blue-300 text-neutral-950"><LayoutDashboard/>Jobs</Button>
            </Link>
            <Link href="dashboard/analytics" className="flex-1">
                <Button className="w-full h-full bg-purple-200 hover:bg-purple-300 text-neutral-950"><BriefcaseBusiness/>Analytics</Button>
            </Link>
            <Link href="dashboard/resources" className="flex-1">
                <Button className="w-full h-full bg-emerald-200 hover:bg-emerald-300 text-neutral-950"><Book/>Resources</Button>
            </Link>

            
            
            
        </div>
    )
}