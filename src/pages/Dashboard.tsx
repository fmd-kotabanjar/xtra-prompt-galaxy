
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useAdminRole } from '@/hooks/useAdminRole';
import PromptRequestForm from '@/components/dashboard/PromptRequestForm';
import PromptRequestList from '@/components/dashboard/PromptRequestList';
import { Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, refetch } = useProfile();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || profileLoading || adminLoading) {
    return <div className="container py-8 text-center">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }

  const isUnlimited = profile?.subscription_tier === 'unlimited';

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-4xl font-bold">Welcome, {profile?.username || user.email}</h1>
        {isAdmin && (
          <Badge variant="destructive" className="px-3 py-1">
            <Shield className="w-4 h-4 mr-2" />
            Administrator
          </Badge>
        )}
        {isUnlimited && !isAdmin && (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1">
            Unlimited User
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground mb-8">This is your personal dashboard.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Credit Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {isUnlimited ? '∞' : (profile?.credit_balance ?? 0)}
            </p>
            {isUnlimited && (
              <p className="text-sm text-muted-foreground mt-2">Unlimited credits</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Type</CardTitle>
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <Badge variant="destructive">Administrator</Badge>
            ) : (
              <Badge variant={isUnlimited ? 'default' : 'secondary'}>
                {profile?.subscription_tier || 'free'}
              </Badge>
            )}
            {isAdmin && (
              <p className="text-sm text-muted-foreground mt-2">Full system access</p>
            )}
            {isUnlimited && !isAdmin && (
              <p className="text-sm text-muted-foreground mt-2">All prompts included (read-only)</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Browse Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {isUnlimited || isAdmin
                ? 'Access all prompts for free.' 
                : 'Discover amazing prompts for your projects.'
              }
            </p>
            <Button onClick={() => navigate('/browse')}>Browse Prompts</Button>
          </CardContent>
        </Card>
      </div>

      {/* Admin Panel Access - Only for Admins */}
      {isAdmin && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Administrator Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Kelola database prompt dan user sebagai administrator.
            </p>
            <Button variant="destructive" asChild>
              <Link to="/admin">
                <Shield className="w-4 h-4 mr-2" />
                Buka Admin Panel
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Prompt Request - Only for Unlimited Users (not admins) */}
      {isUnlimited && !isAdmin && (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-8">
          <PromptRequestForm onRequestSubmitted={refetch} />
          <PromptRequestList />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Update your account information.</p>
          <Button variant="outline" onClick={() => navigate('/dashboard/settings')}>
            Go to Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
