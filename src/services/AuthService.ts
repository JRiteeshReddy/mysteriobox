
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Special handling for unconfirmed email
        if (error.message === "Email not confirmed") {
          // Attempt to resend confirmation email
          await supabase.auth.resend({
            type: 'signup',
            email: email,
          });
          
          throw new Error("Email not confirmed. We've sent another confirmation email. Please check your inbox.");
        }
        throw error;
      }
      
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
      // For development purpose, we'll bypass email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This won't work in production without proper setup
          emailRedirectTo: window.location.origin,
          data: {
            email_confirmed: true // Metadata to track confirmation status
          }
        }
      });
      
      if (error) throw error;
      
      // Save email for future logins
      localStorage.setItem('lastLoginEmail', email);
      
      // Special handling for email confirmation
      if (data?.user?.identities?.length === 0) {
        throw new Error("This email is already registered. Please log in instead.");
      }
      
      // If we got here, try to log the user in directly
      const loginResult = await AuthService.login(email, password);
      if (!loginResult.success) {
        toast({
          title: "Sign up successful",
          description: "Please check your email to confirm your account, then log in.",
          duration: 5000,
        });
      } else {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully. Welcome to MysterioBox!",
          duration: 3000,
        });
      }
      
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
