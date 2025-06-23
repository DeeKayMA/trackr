// (client component) will contain our <DataTable /> component.
"use client";
import * as React from "react";

import { StausFilterCombo } from "@/components/StatusFilterCombo/StatusFilterCombo";
import { useJobStore } from "@/lib/store/useJobStore";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { useEffect } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DeleteSelectedJobs } from "@/components/CRUD/DeleteSelectedJobs/DeleteSelectedJobs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Settings2,
  X
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function formatColumnId(id: string): string {
  if (id.toLowerCase() === "url") return "URL";
  if (id.toLowerCase() === "salary_min") return "Salary";
  return id
    .replace(/[_-]/g, " ") // underscores/hyphens to spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // space before uppercase
    .split(" ")
    .map((word) =>
      word.toLowerCase() === "url"
        ? "URL"
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      company: true,
      position: true,
      location: true,
      job_type: false,
      work_model: false,
      salary: true,
      status: true,
      date_applied: false,
      closing_date: true,
      url: true,
      notes: true,
    });

  const [rowSelection, setRowSelection] = React.useState({});

  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const { refresh } = useRefreshStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const setSelectedJobIds = useJobStore((state) => state.setSelectedJobIds);
  const ids = useJobStore((state) => state.selectedJobIds);
  const selectedRows = table.getSelectedRowModel().rows

  useEffect(() => {
    const selectedIDs = table
      .getSelectedRowModel()
      .rows.map((row) => Number((row.original as { id: string | number }).id))
      .filter((id) => !isNaN(id));

    setSelectedJobIds(selectedIDs);
  }, [selectedRows, setSelectedJobIds]);

  useEffect(() => {
    if (refresh) {
      setRowSelection({}); // ✅ Clear all checkboxes
    }
  }, [refresh]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 py-4">
        {/* Searchbar */}
        <div className="relative lg:max-w-sm w-full min-w-[40px]">
          <Input
            placeholder="Search..."
            value={globalFilter || ""}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="pr-10 "
          />
          {/* If global filter has a value, show the clear button */}
          {globalFilter && (
            <Button
              type="button"
              onClick={() => table.setGlobalFilter("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <X />
            </Button>
          )}
        </div>
        {/* Status Filter Checkboxes */}
        <StausFilterCombo
          setColumnFilter={(value) =>
            table.getColumn("status")?.setFilterValue(value)
          }
        />
        {/* City Filter */}
        
        {/* Delete Button */}
        <DeleteSelectedJobs ids={ids}/>

        {/* Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="lg:ml-auto md:ml-auto">
              <Settings2 /> Customise Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                if (
                  column.id !== "actions" &&
                  column.id !== "id" &&
                  column.id !== "salary_max" &&
                  column.id !== "frequency"
                ) {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {formatColumnId(column.id)}
                    </DropdownMenuCheckboxItem>
                  );
                }
                return null;
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Add new job */}
      </div>
      {/*Table*/}
      <div className=" rounded-md border relative flex flex-col gap-4 overflow-auto px-4">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col lg:flex-row justify-end space-x-2 py-4">
        {/* Rows selected */}
        <div className="flex-1 text-sm text-muted-foreground lg:mb-0 mb-4">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        {/* Pagination Right Content */}
        <div className="flex w-full items-center gap-8 lg:w-fit">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page x of x  */}
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          {/* Back and next page buttons  */}
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* End of pagination */}
    </div>
  );
}
