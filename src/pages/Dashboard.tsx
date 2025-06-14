
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface Profile {
  username: string | null;
  credit_balance: number;
  subscription_tier: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username, credit_balance, subscription_tier')
            .eq('id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // Ignore error for no rows found
            throw error;
          }

          if (data) {
            setProfile(data);
          }
        } catch (error: any) {
          toast({
            title: 'Error fetching profile',
            description: error.message,
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    if (!authLoading && user) {
      fetchProfile();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <div className="container py-8 text-center">Loading...</div>;
  }
  
  if (!user) {
    return null; // Should be redirected by the effect
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome, {profile?.username || user.email}</h1>
      <p className="text-muted-foreground mb-8">This is your personal dashboard.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Credit Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{profile?.credit_balance ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Claimed Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have not claimed any prompts yet.</p>
            <Button className="mt-4" onClick={() => navigate('/browse')}>Browse Prompts</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Update your account information.</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/settings')}>Go to Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
