
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Chrome, Mail, Lock, User } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter.' }),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(1, { message: 'Password wajib diisi.' }),
});

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        
        // Handle specific errors with friendly messages
        let errorMessage = error.message;
        if (error.message.includes('already registered')) {
          errorMessage = 'Email sudah terdaftar. Silakan login atau gunakan email lain.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Format email tidak valid.';
        } else if (error.message.includes('Password')) {
          errorMessage = 'Password tidak memenuhi kriteria keamanan.';
        }
        
        toast({ 
          title: 'Gagal Daftar', 
          description: errorMessage, 
          variant: 'destructive' 
        });
      } else {
        toast({ 
          title: 'Berhasil!', 
          description: 'Silakan cek email Anda untuk konfirmasi pendaftaran.' 
        });
        signUpForm.reset();
      }
    } catch (err) {
      console.error('Unexpected signup error:', err);
      toast({ 
        title: 'Error', 
        description: 'Terjadi kesalahan tidak terduga saat mendaftar.', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        console.error('Login error:', error);
        
        // Handle specific errors with friendly messages
        let errorMessage = error.message;
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email atau password salah. Silakan coba lagi.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Email belum dikonfirmasi. Silakan cek email Anda.';
        }
        
        toast({ 
          title: 'Gagal Login', 
          description: errorMessage, 
          variant: 'destructive' 
        });
      } else {
        toast({ 
          title: 'Berhasil!', 
          description: 'Login berhasil!' 
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      toast({ 
        title: 'Error', 
        description: 'Terjadi kesalahan tidak terduga saat login.', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: `${window.location.origin}/dashboard` 
        },
      });
      
      if (error) {
        console.error('Google login error:', error);
        let errorMessage = error.message;
        if (error.message.includes('provider is not enabled')) {
          errorMessage = 'Login Google belum diaktifkan. Silakan hubungi administrator.';
        }
        toast({ 
          title: 'Gagal Login Google', 
          description: errorMessage, 
          variant: 'destructive' 
        });
      }
    } catch (err) {
      console.error('Unexpected Google login error:', err);
      toast({ 
        title: 'Error', 
        description: 'Terjadi kesalahan tidak terduga dengan login Google.', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Selamat Datang
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Masuk atau daftar untuk melanjutkan
          </p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Masuk
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Daftar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Masuk ke Akun</CardTitle>
                <CardDescription>Masukkan email dan password Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField 
                      control={loginForm.control} 
                      name="email" 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="nama@email.com" 
                              className="h-11"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={loginForm.control} 
                      name="password" 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Masukkan password"
                              className="h-11"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11 text-lg" disabled={loading}>
                      {loading ? 'Memproses...' : 'Masuk'}
                    </Button>
                  </form>
                </Form>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Atau masuk dengan
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full h-11" 
                  onClick={handleGoogleLogin} 
                  disabled={loading}
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Buat Akun Baru</CardTitle>
                <CardDescription>Daftar untuk memulai menggunakan aplikasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                    <FormField 
                      control={signUpForm.control} 
                      name="email" 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="nama@email.com" 
                              className="h-11"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField 
                      control={signUpForm.control} 
                      name="password" 
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Minimal 6 karakter"
                              className="h-11"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-11 text-lg" disabled={loading}>
                      {loading ? 'Membuat akun...' : 'Daftar'}
                    </Button>
                  </form>
                </Form>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Atau daftar dengan
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full h-11" 
                  onClick={handleGoogleLogin} 
                  disabled={loading}
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Dengan mendaftar, Anda menyetujui syarat dan ketentuan kami</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
