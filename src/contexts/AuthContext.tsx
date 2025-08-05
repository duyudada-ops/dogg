import React, { createContext, useContext, useEffect, useState } from 'react';

// Mock Supabase client until integration is fully set up
const mockSupabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: (callback: (event: string, session: any) => void) => ({ 
      data: { subscription: { unsubscribe: () => {} } } 
    }),
    signUp: async ({ email, password, options }: any) => {
      console.log('Mock sign up:', { email, password, options });
      return { error: null };
    },
    signInWithPassword: async ({ email, password }: any) => {
      console.log('Mock sign in:', { email, password });
      return { error: null };
    },
    signOut: async () => {
      console.log('Mock sign out');
      return { error: null };
    },
  },
};

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    mockSupabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = mockSupabase.auth.onAuthStateChange((event, session) => {
      // Mock auth state change listener
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await mockSupabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    
    // Mock successful signup
    const mockUser: User = {
      id: Math.random().toString(36),
      email,
      user_metadata: { full_name: fullName }
    };
    setUser(mockUser);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await mockSupabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    // Mock successful signin
    const mockUser: User = {
      id: Math.random().toString(36),
      email,
      user_metadata: { full_name: 'Dog Owner' }
    };
    setUser(mockUser);
  };

  const signOut = async () => {
    const { error } = await mockSupabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};