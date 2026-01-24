import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// TODO: Replace with your API types
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Check for existing session from your API
    // Example: check localStorage for token and validate with your API
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // TODO: Validate token with your API
          // const response = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
          // if (response.ok) {
          //   const userData = await response.json();
          //   setUser(userData);
          //   setSession({ user: userData, access_token: token });
          // }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // localStorage.setItem('auth_token', data.token);
      // setUser(data.user);
      // setSession({ user: data.user, access_token: data.token });

      console.log('TODO: Implement signIn with your API', { email, password });
      return { error: new Error('API not configured. Implement signIn with your API.') };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      console.log('TODO: Implement signUp with your API', { email, password });
      return { error: new Error('API not configured. Implement signUp with your API.') };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    // TODO: Call your API to invalidate the session
    // await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('auth_token');
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
