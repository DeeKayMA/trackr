import { supabaseBrowser } from "@/lib/supabase/supabase";

export async function addJob(values: any, userId: string) {
  const valuesWithUserId = {
    ...values,
    user_id: userId,
  };

  const { data, error } = await supabaseBrowser
    .from("Job Applications")
    .insert([valuesWithUserId]);

  if (error) {
    console.log(error);
    return { success: false, error };
  } else {
    console.log("Job added!", data);
    return { success: true, data };
  }
}



// CREATE JOB
export function createJob(formData: FormData) { 
}

// UPDATE JOB
export function updateJob(formData: FormData) { }

// DELETE JOB
export function deleteJob(formData: FormData) { }

