
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful!",
        description: "Welcome back to MysterioBox.",
        duration: 3000,
      });
      
      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
        duration: 5000,
      });
      return { success: false, error };
    }
  },
  
  signUp: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully. Welcome to MysterioBox!",
        duration: 3000,
      });
      
      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
        duration: 5000,
      });
      return { success: false, error };
    }
  },
  
  checkSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
};
