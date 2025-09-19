'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                    <Skeleton className='h-8 w-24' />
                    <div className="flex items-center gap-4">
                        <Skeleton className='h-10 w-20' />
                        <Skeleton className='h-10 w-28' />
                    </div>
                </div>
            </header>
            <main className="flex-1 container py-8">
                <Skeleton className='h-64 w-full' />
                <div className="grid grid-cols-4 gap-4 mt-8">
                    <Skeleton className='h-48 w-full' />
                    <Skeleton className='h-48 w-full' />
                    <Skeleton className='h-48 w-full' />
                    <Skeleton className='h-48 w-full' />
                </div>
            </main>
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
