
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
      
      // Save email for future logins
      localStorage.setItem('lastLoginEmail', email);
      
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
  },
  
  signOut: async () => {
    try {
      // Before signing out, save the current user's email
      const { data } = await supabase.auth.getUser();
      if (data.user?.email) {
        localStorage.setItem('lastLoginEmail', data.user.email);
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
        duration: 3000,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
        duration: 5000,
      });
      return { success: false, error };
    }
  }
};
