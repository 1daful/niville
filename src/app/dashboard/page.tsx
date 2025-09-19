'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // You can render a loading skeleton here
    return (
      <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}!</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">View and edit your profile information.</p>
                    <Button className="mt-4">View Profile</Button>
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">See all your past payments and transactions.</p>
                     <Button className="mt-4">View History</Button>
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Make a Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Quickly access services to pay your bills.</p>
                     <Button className="mt-4" onClick={() => router.push('/#products')}>Pay Now</Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
