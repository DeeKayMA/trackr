// Jobs page on the dashboard - this is where users can view and manage their job applications
//Data table with job applications
//kanban board with job applications
import Header from "../components/Header";

export default function Jobs() {
    return (
       <div className="flex flex-col w-full">
          <Header title="Jobs" />
          <h1 className="text-3xl  font-bold underline">Job Content</h1>
        </div>
    );
}