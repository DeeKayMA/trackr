// Jobs page on the dashboard - this is where users can view and manage their job applications
//Data table with job applications
//kanban board with job applications

// (server component) is where we'll fetch data and render our table.

import Header from "../components/Header/Header";
import { Job, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Job[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      company: "Pixar",
      position: "Front End Developer",
      status: "applied",
      applicationDate: "2023-10-01",
      location: "Los Angeles, CA",
      jobType: "full-time",
      link: "https://www.pixar.com",
      notes: "Great company culture",
      salary: 120000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    // ...
  ];
}

// export default function Jobs() {
//     return (
//        <div className="flex flex-col w-full">
//           <Header title="Jobs" />
//           <h1 className="text-3xl  font-bold underline">Job Content</h1>
//         </div>
//     );
// }

export default async function Jobs() {
  const data = await getData();

  return (
    <div className="flex flex-col w-full">
      <Header title="Jobs" />
      <div className="container mx-auto p-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
