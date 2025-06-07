import { supabaseBrowser } from "@/lib/supabase/supabase";
import { useUserStore } from "@/lib/store/useUserStore";

export const loadUserProfile = async () => {
  const { setCurrency, setDailyGoal, setWeeklyGoal, setUsername } = useUserStore.getState();

  const {
    data: { user },
    error: userError,
  } = await supabaseBrowser.auth.getUser();

  if (!user || userError) {
    console.error("Unable to get user", userError);
    return;
  }

  const { data, error } = await supabaseBrowser
    .from("Account Details")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching profile:", error);
    return;
  }

  if (data) {
    // Store in Zustand
    setCurrency(data.currency?.trim()?.split(" ")[0] || "");
    setDailyGoal(data.daily_goal || "");
    setWeeklyGoal(data.weekly_goal || "");
    setUsername(data.username || "");
  }
};
