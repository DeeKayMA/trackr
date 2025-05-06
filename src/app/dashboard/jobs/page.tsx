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
      applicationDate: "02-01-2024",
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
    {
      id: "728ed52f",
      company: "Apple",
      position: "Front End Engineer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Silicon Valley, CA",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 145000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Micorsoft",
      position: "Front End Engineer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Silicon Valley, CA",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 135000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Apple",
      position: "Front End Engineer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Manchester UK",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 95000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Netflix",
      position: "Front End Engineer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "London, UK",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 135000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Google",
      position: "Front End Developer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Silicon Valley, CA",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 115000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Meta",
      position: "Front End Engineer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Los Angeles, CA",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 125000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Amazon",
      position: "Front End Developer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Hong Kong",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 145000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Nvidia",
      position: "Front End Developer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Remote",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 100000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "AirBnb",
      position: "Front End Engineer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Los Angeles, CA",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 145000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
    {
      id: "728ed52f",
      company: "Adobe",
      position: "Front End Developer",
      status: "applied",
      applicationDate: "01-01-2024",
      location: "Los Angeles, CA",
      jobType: "contract",
      link: "https://www.apple.com",
      notes: "It's Apple",
      salary: 145000,
      // source: 'LinkedIn',
      // contact: 'John Doe',
      // followUpDate: '2023-10-15',
      // interviewRounds: 2,
      // lastUpdated: '2023-10-05',
    },
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
    <div className="flex flex-col flex-1">
      <Header title="Jobs" />
      <div
        data-orientation="horizontal"
        className="container flex w-full flex-col justify-start gap-6 p-4"
      >
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
