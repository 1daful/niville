'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateProfile } from 'firebase/auth';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';

const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50, { message: 'Name must not be longer than 50 characters.' }),
  email: z.string().email(),
  photoURL: z.string().url().optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: '',
      email: '',
      photoURL: '',
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
    if (user) {
      form.reset({
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user, loading, router, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    if (!user) return;

    try {
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const getInitials = (name: string | null | undefined) => {
    return name ? name.split(' ').map(n => n[0]).join('') : 'U';
  }

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
        <div className="max-w-3xl mx-auto grid gap-6">
          <div className="grid gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and profile information.</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here. This is a mock-up and will not persist data.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={form.watch('photoURL') ?? ''} alt={form.watch('displayName')} />
                      <AvatarFallback className="text-3xl">
                        {getInitials(form.watch('displayName')) || <UserIcon size={36}/>}
                      </AvatarFallback>
                    </Avatar>
                     <Button type="button" variant="outline">Change Photo</Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
