
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { createAdminAccount, checkAdminExists } from '@/utils/adminUtils';
import { CheckCircle, AlertCircle, Shield } from 'lucide-react';

const AdminSetup = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkForExistingAdmin = async () => {
      setCheckingAdmin(true);
      const result = await checkAdminExists();
      
      if (result.error) {
        toast({
          title: "Error",
          description: `Failed to check admin status: ${result.error}`,
          variant: "destructive",
        });
      } else {
        setAdminExists(result.exists);
      }
      
      setCheckingAdmin(false);
    };

    checkForExistingAdmin();
  }, [toast]);

  const handleCreateAdmin = async () => {
    setIsCreating(true);
    
    try {
      const result = await createAdminAccount();
      
      if (result.success) {
        toast({
          title: "Admin Account Created!",
          description: "Admin account 'siadminsi@admin.com' has been created successfully. Please check your email to confirm the account.",
        });
        setAdminExists(true);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create admin account.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Unexpected Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (checkingAdmin) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Checking Admin Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Checking if admin account already exists...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (adminExists) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Admin Setup Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Admin account already exists. You can now login with admin credentials to access the admin panel.
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Admin Email:</strong> siadminsi@admin.com</p>
            <p><strong>Admin Password:</strong> hahahaadmin</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Setup Admin Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No admin account found. Create the initial admin account to manage the system.
          </AlertDescription>
        </Alert>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>The admin account will be created with:</p>
          <div className="bg-muted p-3 rounded">
            <p><strong>Email:</strong> siadminsi@admin.com</p>
            <p><strong>Password:</strong> hahahaadmin</p>
          </div>
          <p className="text-xs text-orange-600">
            ⚠️ Please change the password after first login for security.
          </p>
        </div>
        
        <Button 
          onClick={handleCreateAdmin} 
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? 'Creating Admin Account...' : 'Create Admin Account'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
