
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { createAdminAccount } from '@/utils/adminUtils';

const AdminSetup = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateAdmin = async () => {
    setIsCreating(true);
    
    const result = await createAdminAccount();
    
    if (result.success) {
      toast({
        title: "Admin Account Created!",
        description: "Admin account 'siadminsi' has been created successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create admin account.",
        variant: "destructive",
      });
    }
    
    setIsCreating(false);
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Setup Admin Account</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to create the admin account with:
          <br />
          <strong>Email:</strong> siadminsi
          <br />
          <strong>Password:</strong> hahahaadmin
        </p>
        <Button 
          onClick={handleCreateAdmin} 
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? 'Creating Admin...' : 'Create Admin Account'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
