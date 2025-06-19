// (client component) will contain our column definitions.
"use client";

import { useState } from "react";

import { DeleteJobDialog } from "@/components/CRUD/DeleteJobDialog/DeleteJobDialog";
import { UpdateJobDialog } from "@/components/CRUD/UpdateJobDialog/UpdateJobDialog";
import { NotesDialog } from "@/components/NotesDialog/NotesDialog";
import { useUserStore } from "@/lib/store/useUserStore";
import { ColumnDef } from "@tanstack/react-table";
import { JobRowActions } from "@/components/JobRowActions/JobRowActions"


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";

import {
  ArrowUpDown,
  BookmarkIcon,
  CheckCircle2Icon,
  HandshakeIcon,
  LoaderIcon,
  MoreHorizontal,
  PhoneCallIcon,
  Undo,
  XCircleIcon
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { convertFromUTC } from "@/lib/utils/dateutils";

export type Job = {
  id: string;
  company: string;
  position: string;
  status: string;
  date_applied: string | null;
  closing_date: string | null;
  location: string | null;
  work_model: string | null;
  job_type: string | null;
  url: string | null;
  notes: string | null;
  salary_min: number | null;
  salary_max: number | null;
  frequency: string | null;
  onJobUpdated?: () => void;
};

const arrowUpDown = "h-2 w-2";
const sortButton = "-ml-3 text-muted-foreground text-sm";

const statusMap = {
  Saved: {
    icon: <BookmarkIcon className="text-slate-500 dark:text-slate-400" />,
  },
  Applied: {
    icon: <CheckCircle2Icon className="text-blue-500 dark:text-blue-400" />,
  },
  Interview: {
    icon: <PhoneCallIcon className="text-yellow-500 dark:text-yellow-400" />,
  },
  Offer: {
    icon: <HandshakeIcon className="text-green-500 dark:text-green-400" />,
  },
  Rejected: {
    icon: <XCircleIcon className="text-red-500 dark:text-red-400" />,
  },
  Withdrawn: {
    icon: <Undo className="text-red-500 dark:text-red-400" />,
  },
};

type StatusKey = keyof typeof statusMap;

function isStatusKey(status: string): status is StatusKey {
  return status in statusMap;
}




//Format the salary
function formatSalaryParts(num: number | null): {
  value: string;
  unit: string;
} {
  if (num === null || isNaN(num)) return { value: "", unit: "" };
  if (num >= 1_000_000)
    return {
      value: (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1),
      unit: "m",
    };
  if (num >= 1_000)
    return {
      value: Math.round(num / 1_000).toString(), // always integer for k
      unit: "k",
    };
  return { value: num.toString(), unit: "" };
}

//Truncate long words
function truncate(input: string | null, maxLength: number): string {
  if (!input) return "";
  return input.length > maxLength ? input.slice(0, maxLength) + "…" : input;
}






export const columns: ColumnDef<Job>[] = [
  
  //Select
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //Position
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Position</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return truncate(row.original.position, 40);
    },
  },
  // Company
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Company</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return truncate(row.original.company, 20);
    },
  },
  //Job Type
  {
    accessorKey: "job_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Job Type</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
  },
  //Work Model
  {
    accessorKey: "work_model",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Work Model</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
  },
  //Location
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Location</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return truncate(row.original.location, 15);
    },
  },
  //Salary
  {
    accessorKey: "salary_min",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Salary</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const currency = useUserStore((state) => state.currency);
      const salaryMin = row.original.salary_min;
      const salaryMax = row.original.salary_max;
      const frequency = row.original.frequency;
      


      if (salaryMin !== null && salaryMax !== null) {
        const minParts = formatSalaryParts(salaryMin);
        const maxParts = formatSalaryParts(salaryMax);

        if (minParts.unit === maxParts.unit && minParts.unit) {
          return (
            <div>
              {currency}{minParts.value}–{maxParts.value}
              {minParts.unit} {frequency}
            </div>
          );
        }

        return (
          <div>
            {currency}{minParts.value}
            {minParts.unit} {frequency} – {currency}{maxParts.value}
            {maxParts.unit} {frequency}
          </div>
        );
      }

      if (salaryMin !== null) {
        const minParts = formatSalaryParts(salaryMin);
        return (
          <div>
            {currency}{minParts.value}
            {minParts.unit} {frequency}
          </div>
        );
      }

      if (salaryMax !== null) {
        const maxParts = formatSalaryParts(salaryMax);
        return (
          <div>
            {currency}{maxParts.value}
            {maxParts.unit} {frequency}
          </div>
        );
      }

      return null;
    },
  },
  //Status
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Status</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-4"
      >
        {isStatusKey(row.original.status) ? (
          statusMap[row.original.status]?.icon
        ) : (
          <LoaderIcon />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  //Date Applied
  {
    accessorKey: "date_applied",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Date Applied</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw = row.getValue<string | null>("date_applied");
      if (!raw) return <span>-</span>;

      const localDate = convertFromUTC(raw);

      const formatted = localDate.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <span>{formatted}</span>;
    },
  },
  //Closing Date
  {
    accessorKey: "closing_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={sortButton}
        >
          <p>Closing Date</p>
          <ArrowUpDown className={arrowUpDown} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw = row.getValue<string | null>("closing_date");
      if (!raw) return <span>-</span>;

      const localDate = convertFromUTC(raw);

      const formatted = localDate.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <span>{formatted}</span>;
    },
  },
  //Notes
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue<string>("notes");
      return notes ? <span>{truncate(notes, 40)}</span> : <span></span>;
    },
  },
  //Link
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      let url = row.getValue<string>("url");
      if (!url) return <span>No Link</span>;

      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }

      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 flex flex-row items-center"
        >
          Go to job ↗{/* <ExternalLink className="ml-2 h-4 w-4" /> */}
        </a>
      );
    },
  },
  //ID
  {
    accessorKey: "id",
    header: () => null,
    cell: () => null,
    enableHiding: true,
    enableColumnFilter: false,
    enableSorting: false, // or undefined
  },
  //Salaray Max
  {
    accessorKey: "salary_max",
    header: () => null,
    cell: () => null,
    enableHiding: true,
    enableColumnFilter: false,
    enableSorting: false,
  },
  //Frequency
  {
    accessorKey: "frequency",
    header: () => null,
    cell: () => null,
    enableHiding: true,
    enableColumnFilter: false,
    enableSorting: false,
  },
  //Actions
  {
    id: "actions",
    cell: ({ row }) => { <JobRowActions row={row}/>
     
    },
  },
];
