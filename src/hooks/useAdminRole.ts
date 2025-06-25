
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useAdminRole = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('Checking admin role for user:', user.id);

        // First try using the RPC function
        const { data: rpcResult, error: rpcError } = await supabase.rpc('is_admin');
        
        if (rpcError) {
          console.error('RPC error, falling back to direct query:', rpcError);
          
          // Fallback to direct query
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .limit(1);

          if (roleError) {
            console.error('Error checking admin role:', roleError);
            setError(roleError.message);
            setIsAdmin(false);
          } else {
            const adminStatus = roleData && roleData.length > 0;
            console.log('Admin status (direct query):', adminStatus);
            setIsAdmin(adminStatus);
          }
        } else {
          console.log('Admin status (RPC):', rpcResult);
          setIsAdmin(rpcResult || false);
        }
      } catch (error: any) {
        console.error('Unexpected error checking admin role:', error);
        setError(error.message);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminRole();
    }
  }, [user, authLoading]);

  return { 
    isAdmin, 
    loading: loading || authLoading, 
    error,
    refetch: () => {
      if (user && !authLoading) {
        setLoading(true);
        // Re-trigger the effect by setting a dummy state change
        setError(null);
      }
    }
  };
};
