// Resource page on the dashboard
import { ProfileForm } from "@/components/Forms/ProfileForm";

export default function Analytics() {
    return (
       <div className="flex flex-col w-full">
          <div className="max-w-2xl w-full mx-auto my-8 px-4 flex flex-col gap-8">
            <h1 className="text-3xl font-bold">Account Details</h1>
            <ProfileForm/>
          </div>
          
        </div>
    );
}