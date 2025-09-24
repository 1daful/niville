'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { BarChart, DollarSign, Users, Activity } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getDashboardData } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

// Define types for our dashboard data
type SummaryData = {
  totalSpending: number;
  spendingChange: number;
  totalTransactions: number;
  transactionChange: number;
  servicesUsedCount: number;
  services: string;
};

type ChartData = {
  month: string;
  spending: number;
}[];

type TransactionData = {
  service: string;
  provider: string;
  amount: number;
  date: string;
}[];


export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<{
    summary: SummaryData;
    spendingChart: ChartData;
    recentTransactions: TransactionData;
  } | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if(user) {
      setDataLoading(true);
      const data: any = await getDashboardData();
      setDashboardData(data);
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/sign-in');
    }
  }, [user, authLoading, router]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartConfig = {
    spending: {
      label: 'Spending',
      color: 'hsl(var(--primary))',
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };


  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="grid gap-1">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Welcome Back, {user.displayName || user.email?.split('@')[0] || 'User'}!
                    </h1>
                    <p className="text-muted-foreground">
                    Here&apos;s a summary of your account activity.
                    </p>
                </div>
                <Button onClick={() => router.push('/#products')}>Make a Payment</Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Spending
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    {dataLoading ? <Skeleton className="h-8 w-3/4" /> : <>
                      <div className="text-2xl font-bold">{formatCurrency(dashboardData?.summary.totalSpending ?? 0)}</div>
                      <p className="text-xs text-muted-foreground">
                          +{dashboardData?.summary.spendingChange}% from last month
                      </p>
                    </>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Transactions
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    {dataLoading ? <Skeleton className="h-8 w-1/2" /> : <>
                      <div className="text-2xl font-bold">+{dashboardData?.summary.totalTransactions}</div>
                      <p className="text-xs text-muted-foreground">
                          +{dashboardData?.summary.transactionChange} since last week
                      </p>
                     </>}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Services Used</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    {dataLoading ? <Skeleton className="h-8 w-1/4" /> : <>
                      <div className="text-2xl font-bold">{dashboardData?.summary.servicesUsedCount}</div>
                      <p className="text-xs text-muted-foreground">
                          {dashboardData?.summary.services}
                      </p>
                    </>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Profile</CardTitle>
                     <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">&nbsp;</div>
                        <Button size="sm" className="w-full" onClick={() => router.push('/dashboard/profile')}>View Profile</Button>
                    </CardContent>
                </Card>
            </div>
          <div className="grid gap-6 lg:grid-cols-2">
             <Card>
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoading ? <Skeleton className="h-[250px] w-full" /> : 
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <RechartsBarChart data={dashboardData?.spendingChart} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                     <YAxis hide={true} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} hideLabel />}
                    />
                    <Bar
                      dataKey="spending"
                      fill="var(--color-spending)"
                      radius={8}
                    />
                  </RechartsBarChart>
                </ChartContainer>
                }
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex-row justify-between items-center'>
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" onClick={fetchData}>Refresh</Button>
              </CardHeader>
              <CardContent>
                 {dataLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData?.recentTransactions && dashboardData.recentTransactions.length > 0 ? (
                      dashboardData.recentTransactions.map((tx, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="font-medium">{tx.service}</div>
                            <div className="text-sm text-muted-foreground">
                              {tx.provider}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{formatCurrency(tx.amount)}</TableCell>
                          <TableCell>{tx.date}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center h-24">
                          No recent transactions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
