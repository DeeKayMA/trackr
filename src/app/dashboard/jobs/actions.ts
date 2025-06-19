import { supabaseBrowser } from "@/lib/supabase/supabase";
import { JobApplicationValues } from "@/types"; 

export async function addJob(values: JobApplicationValues, userId: string) {
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
