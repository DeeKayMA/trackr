// Modal / Sidebar form to add/edit a job
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, sub } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


import { DialogClose } from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  position: z
    .string({ required_error: "Please input a job position" })
    .min(1, "Please input a job position")
    .max(50),
  company: z
    .string({ required_error: "Please input a company name" })
    .min(1, "Please input a company name")
    .max(50),
  location: z.string().min(0).max(50).optional(),
  work_model: z.string().optional(),
  job_type: z.string({
    required_error: "Please select a status for this position",
  }),
  salary_min: z.string().min(0).optional(),
  salary_max: z.string().min(0).optional(),
  status: z.string({
    required_error: "Please select a status for this position",
  }),
  date_applied: z.date().optional(),
  closing_date: z.date().optional(),
  url: z.string().optional(),
  notes: z.string().optional(),
});

type JobFormProps = {
  submitName?: string;
  onSubmit?: (values: any) => void;
  id?: string;
  company?: string;
  position?: string;
  status?: string;
  date_applied?: string | Date;
  closing_date?: string | Date;
  location?: string;
  work_model?: string;
  job_type?: string;
  salary_min?: number;
  salary_max?: number;
  notes?: string;
  url?: string;
};

export const JobForm = ({ submitName = "Submit", onSubmit, id, company, position, status, date_applied, closing_date, location, work_model, job_type, salary_min, salary_max, notes, url }: JobFormProps) => {

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: 
    
    // id?{
    //   position: "",
    //   company: "",
    //   location: "",
    //   work_model: "",
    //   job_type: "",
    //   salary_min: "",
    //   salary_max: "",
    //   status: "Saved",
    //   date_applied: undefined,
    //   url: "",
    //   notes: "",
    // } : 
    {
      position: position ?? "",
      company: company ?? "",
      location: location ?? "",
      work_model: work_model ?? "",
      job_type: job_type ?? "",
      salary_min: salary_min !== undefined && salary_min !== null ? String(salary_min) : "",
      salary_max: salary_max !== undefined && salary_max !== null ? String(salary_max) : "",
      status: status ?? "Saved",
      date_applied: date_applied ? new Date(date_applied) : undefined,
      closing_date: closing_date ? new Date(closing_date) : undefined,
      url: url ?? "",
      notes: notes ?? "",
    }
  });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//     //Put a toast here to confirm the submission
//   }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit ?? (()=> {}))} className="space-y-8">
        {/* POSITION */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Position</FormLabel>
                <p className="text-xs text-muted-foreground"> Required</p>
              </div>

              <FormControl>
                <Input placeholder="e.g. Software Engineer" {...field} />
              </FormControl>
              {/* <FormDescription>Required</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* COMPANY */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Company</FormLabel>
                <p className="text-xs text-muted-foreground"> Required</p>
              </div>
              <FormControl>
                <Input placeholder="e.g. Trackr Inc" {...field} />
              </FormControl>
              {/* <FormDescription>Required</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* STATUS */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Status</FormLabel>
                <p className="text-xs text-muted-foreground"> Required</p>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select the application status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Saved">Saved</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
        
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DATE */}
        <FormField
          control={form.control}
          name="date_applied"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <FormLabel>Date Applied</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                When did you apply for the position?
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* JOB TYPE */}
        <FormField
          control={form.control}
          name="job_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Parrt-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* LOCATION */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. London" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* WORK Model */}
        <FormField
          control={form.control}
          name="work_model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a work model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* SALARY MIN */}
        <FormField
          control={form.control}
          name="salary_min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Min</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* SALARY MAX */}
        <FormField
          control={form.control}
          name="salary_max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary Max</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DATE */}
        <FormField
          control={form.control}
          name="closing_date"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <FormLabel>Closing Date</FormLabel>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                When did you apply for the position?
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* URL */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="e.g. www.trackr.com" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is the job position
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* NOTES */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Anything you want to add about this job"
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            {submitName}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full hover:bg-primary/10"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};