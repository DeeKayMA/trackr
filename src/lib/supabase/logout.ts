import { supabase } from "@/lib/supabase/supabase";


export const signOut  = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Error signing out:", error.message)
  } else {
    await supabase.auth.signOut({ scope: 'local' })
  }
}