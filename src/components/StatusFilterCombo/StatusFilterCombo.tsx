"use client";

import * as React from "react";

import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  CirclePlus,
  CheckCircle2Icon,
  PhoneCallIcon,
  HandshakeIcon,
  XCircleIcon,
  BookmarkIcon,
  LoaderIcon,
  Undo,
  ListFilter, 
  Archive
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "Saved",
    label: "Saved",
  },
  {
    value: "Applied",
    label: "Applied",
  },
  {
    value: "Interview",
    label: "Interview",
  },
  {
    value: "Offer",
    label: "Offer",
  },
  {
    value: "Rejected",
    label: "Rejected",
  },
  {
    value: "Withdrawn",
    label: "Withdrawn",
  },
  {
    value: "Archived",
    label: "Archived",
  },
];

const statusMap = {
  Saved: {
    icon: <BookmarkIcon />,
  },
  Applied: {
    icon: <CheckCircle2Icon />,
  },
  Interview: {
    icon: <PhoneCallIcon />,
  },
  Offer: {
    icon: <HandshakeIcon />,
  },
  Rejected: {
    icon: <XCircleIcon />,
  },
  Withdrawn: {
    icon: <Undo />,
  },
  Archived: {
    icon: <Archive />,
  },
};

type StatusKey = keyof typeof statusMap;

function isStatusKey(status: string): status is StatusKey {
  return status in statusMap;
}

type StausFilterComboProps = {
  setColumnFilter: (value: string | undefined) => void;
};

export function StausFilterCombo({ setColumnFilter }: StausFilterComboProps) {
  // Load from localStorage if available
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jobs_selectedStatus");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  // Save to localStorage whenever it changes
  React.useEffect(() => {
    if (selectedStatus) {
      localStorage.setItem("jobs_selectedStatus", JSON.stringify(selectedStatus));
    } else {
      localStorage.removeItem("jobs_selectedStatus");
    }
  }, [selectedStatus]);

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className=" border-dashed justify-start">
            <ListFilter />
            {selectedStatus ? (
              <>
                Status{" "}
                <div
                  data-orientation="vertical"
                  role="none"
                  className="shrink-0 bg-border w-[1px] mx-2 h-4"
                ></div>{" "}
                <Badge variant="secondary">{selectedStatus.label}</Badge>
              </>
            ) : (
              <>Status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            setColumnFilter={setColumnFilter}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="border-dashed justify-start ">
          <CirclePlus />
          {selectedStatus ? (
            <div className="flex flex-row">
              Status
              {/* Divider  */}
              <div
                data-orientation="vertical"
                role="none"
                className="shrink-0 bg-border w-[1px] mx-2 h-4"
              ></div>
              <Badge variant="secondary">{selectedStatus.label}</Badge>
            </div>
          ) : (
            <>Status</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            setColumnFilter={setColumnFilter}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  setColumnFilter,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  setColumnFilter: (value: string | undefined) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter by status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="">
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                const selected =
                  statuses.find((status) => status.value === value) || null;
                setSelectedStatus(selected);
                setColumnFilter(selected?.value);
                setOpen(false);
              }}
            >
              {/* Checkbox, multi-filter selct - future development*/}

              {isStatusKey(status.value) ? (
                statusMap[status.value].icon
              ) : (
                <LoaderIcon />
              )}

              {status.label}
              {/* Add count here - future development */}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      {/* Make this only visible if a status is selected */}
      <div className="">
        <CommandSeparator />
        <CommandItem
          onSelect={() => {
            setSelectedStatus(null);
            setColumnFilter(undefined);
          }}
        >
          <span className="w-full text-center">Clear Filter</span>
        </CommandItem>
      </div>
    </Command>
  );
}
