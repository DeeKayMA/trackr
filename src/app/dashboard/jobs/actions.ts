import { supabaseBrowser } from "@/lib/supabase/supabase";
import type { JobFormData } from "@/types/job";

export async function addJob(values: JobFormData, userId: string) {
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
