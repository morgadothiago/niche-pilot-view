import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "../types";
import { authService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoggingOut: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: (googleToken: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const refreshProfile = async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (error: unknown) {
      console.error("Failed to refresh profile", error);
      // If fetching profile fails (e.g. 401), we might want to sign out?
      // For now, keeping it simple.
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // We have a token, let's try to get me
          const userData = await authService.getProfile();
          setUser(userData);
          // We don't necessarily have the full session object here if we just refreshed,
          // but we can reconstruct a basic one or change Session type.
          // For now assuming existing token is valid access_token.
          setSession({ user: userData, access_token: token });
        }
      } catch (_error: unknown) {
        // If 401, remove token
        localStorage.removeItem("auth_token");
        setUser(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const sessionData = await authService.signIn(email, password);
      localStorage.setItem("auth_token", sessionData.access_token);
      setSession(sessionData);
      setUser(sessionData.user);
      return { error: null };
    } catch (error: unknown) {
      return { error: error instanceof Error ? error : new Error(String(error)) };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const sessionData = await authService.signUp(email, password, fullName);
      localStorage.setItem("auth_token", sessionData.access_token);
      setSession(sessionData);
      setUser(sessionData.user);
      return { error: null };
    } catch (error: unknown) {
      return { error: error instanceof Error ? error : new Error(String(error)) };
    }
  };

  const signInWithGoogle = async (googleToken: string) => {
    try {
      const sessionData = await authService.signInWithGoogle(googleToken);
      localStorage.setItem("auth_token", sessionData.access_token);
      setSession(sessionData);
      setUser(sessionData.user);
      return { error: null };
    } catch (error: unknown) {
      return { error: error instanceof Error ? error : new Error(String(error)) };
    }
  };

  const signOut = async () => {
    setIsLoggingOut(true);
    try {
      // Clear state immediately to avoid redirects back to dashboard
      localStorage.removeItem("auth_token");
      setUser(null);
      setSession(null);

      await authService.signOut();
    } catch (error: unknown) {
      console.error("Error signing out", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isLoggingOut,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
