'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  const chartData = [
    { month: 'Jan', desktop: 186 },
    { month: 'Feb', desktop: 305 },
    { month: 'Mar', desktop: 237 },
    { month: 'Apr', desktop: 273 },
    { month: 'May', desktop: 209 },
    { month: 'Jun', desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: 'Spending',
      color: 'hsl(var(--primary))',
    },
  };

  if (loading || !user) {
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
                    Welcome Back, {user.email?.split('@')[0] || 'User'}!
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
                    <div className="text-2xl font-bold">₦45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
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
                    <div className="text-2xl font-bold">+23</div>
                    <p className="text-xs text-muted-foreground">
                        +12 since last week
                    </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Services Used</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">
                        Data, Airtime, Utility, Cable
                    </p>
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
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <RechartsBarChart data={chartData} accessibilityLayer>
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
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={8}
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Data Purchase</div>
                        <div className="text-sm text-muted-foreground">
                          MTN
                        </div>
                      </TableCell>
                      <TableCell className="text-right">₦2,500.00</TableCell>
                       <TableCell>2024-07-22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Utility Payment</div>
                        <div className="text-sm text-muted-foreground">
                          EKEDC
                        </div>
                      </TableCell>
                      <TableCell className="text-right">₦15,000.00</TableCell>
                      <TableCell>2024-07-20</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>
                        <div className="font-medium">Airtime Top-up</div>
                        <div className="text-sm text-muted-foreground">
                          Airtel
                        </div>
                      </TableCell>
                      <TableCell className="text-right">₦1,000.00</TableCell>
                      <TableCell>2024-07-19</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
