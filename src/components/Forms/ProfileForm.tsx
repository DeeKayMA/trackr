"use client";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { useUserStore } from "@/lib/store/useUserStore";




const formSchema = z.object({
  profile_img: z.string().optional(),
  username: z.string().min(0).max(50).optional(),
  daily_goal: z.string().min(0).max(3).optional(),
  weekly_goal: z.string().min(0).max(3).optional(),
  currency: z.string().min(0).max(50),
});

export function ProfileForm() {
  const [userId, setUserId] = useState<string | null | undefined>(null);
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const { refresh, setRefresh } = useRefreshStore();
  const { setCurrency, setDailyGoal, setWeeklyGoal } = useUserStore();
  
  // const setCurrency = useUserStore((state) => state.setCurrency);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      profile_img: "",
      daily_goal: "",
      weekly_goal: "",
      currency: "£ - British Pound (GBP)",
    },
  });

  

  useEffect(() => {

    const loadProfile = async () => {
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
      }

      if (data) {
        form.reset(data); // ✅ Prefill the form
        setCurrency(data.currency.trim().split(" ")[0]); // optional: format symbol
        setDailyGoal(data.daily_goal || "");
        setWeeklyGoal(data.weekly_goal || "");
      }

      setLoading(false);
    };

    loadProfile();
  }, [form]);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabaseBrowser.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
        setEmail(data.user.email);
      } else {
        console.error("User fetch error:", error);
      }
    };
    getUser();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId || !email) {
      toast.error("User not logged in");
      return;
    }

    const patch = {
      ...values,
      user_id: userId,
      email: email,
    };

    const { data, error } = await supabaseBrowser
      .from("Account Details")
      .upsert(patch, {
        onConflict: "user_id", // ensures update instead of insert
      });

    if (error) {
      console.log(error);
    } else {
      console.log("Job added!", data);
      toast("Profile Updated", {
        description: "Your account details have been updated",
      });
      setRefresh(true)
      setCurrency(values.currency.trim().split(" ")[0]);
      setDailyGoal(values.daily_goal || "");
      setWeeklyGoal(values.weekly_goal || "");

      
    }
  };

  if (loading) {
    return (
      <p className="text-center text-muted-foreground">Loading profile...</p>
    );
  } else {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Job hunter 345" {...field} />
                </FormControl>
                <FormDescription>This is your display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile_img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.profileimage.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The URL for your profile image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="daily_goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Goal</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  How many job application do you want to submit per day
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weekly_goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weekly Goal</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  How many job application do you want to submit per week
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Frequency  */}
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="$ - USD">$ - US Dollar (USD)</SelectItem>
                    <SelectItem value="€ - EUR">€ - Euro (EUR)</SelectItem>
                    <SelectItem value="¥ - JPY">¥ - Japanese Yen (JPY)</SelectItem>
                    <SelectItem value="£ - GBP">£ - British Pound (GBP)</SelectItem>
                    <SelectItem value="$ -AUD">$ - Australian Dollar (AUD)</SelectItem>
                    <SelectItem value="$ - CAD">$ - Canadian Dollar (CAD)</SelectItem>
                    <SelectItem value="CHF">CHF - Swiss Franc (CHF)</SelectItem>
                    <SelectItem value="¥ - CNY">¥ - Chinese Yuan (CNY)</SelectItem>
                    <SelectItem value="$ - HKD">$ - Hong Kong Dollar (HKD)</SelectItem>
                    <SelectItem value="$ - NZD">$ - New Zealand Dollar (NZD)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The currency you want to use on the platform
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save</Button>
        </form>
      </Form>
    );
  }
}
