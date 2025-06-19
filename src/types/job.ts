export type JobFormData = {
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
  frequency?: string;
  notes?: string;
  url?: string;
};

export type JobFormProps = JobFormData & {
  submitName?: string;
  onSubmit?: (values: JobFormData) => void;
};