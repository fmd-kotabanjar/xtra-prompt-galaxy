
import { supabase } from '@/integrations/supabase/client';

export const createAdminAccount = async () => {
  try {
    console.log('Starting admin account creation...');
    
    // Check if admin already exists using the new safe function
    const { data: adminExists, error: checkError } = await supabase.rpc('is_admin');

    if (checkError) {
      console.error('Error checking existing admin:', checkError);
      // If RPC fails, try direct query as fallback
      const { data: existingAdmin, error: directCheckError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin')
        .limit(1);

      if (directCheckError) {
        console.error('Direct check also failed:', directCheckError);
        return { success: false, error: directCheckError.message };
      }

      if (existingAdmin && existingAdmin.length > 0) {
        console.log('Admin already exists (direct check)');
        return { success: false, error: 'Admin account already exists' };
      }
    } else if (adminExists) {
      console.log('Admin already exists (RPC check)');
      return { success: false, error: 'Admin account already exists' };
    }

    // Sign up the admin user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'siadminsi@admin.com',
      password: 'hahahaadmin',
      options: {
        data: {
          username: 'siadminsi'
        },
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (authError) {
      console.error('Error creating admin account:', authError);
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'User creation failed - no user returned' };
    }

    console.log('Admin user created:', authData.user.id);

    // Wait a moment to ensure user is properly created
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add admin role to user_roles table
    // The new policy allows this insert when no admin exists
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: 'admin'
      });

    if (roleError) {
      console.error('Error adding admin role:', roleError);
      
      // Try to delete the created user if role assignment fails
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
      } catch (deleteError) {
        console.error('Failed to cleanup user after role error:', deleteError);
      }
      
      return { success: false, error: roleError.message };
    }

    console.log('Admin role added successfully');
    return { success: true, userId: authData.user.id };

  } catch (error: any) {
    console.error('Unexpected error during admin creation:', error);
    return { success: false, error: error.message || 'Unexpected error occurred' };
  }
};

export const checkAdminExists = async () => {
  try {
    // First try using the RPC function
    const { data: adminExists, error: rpcError } = await supabase.rpc('is_admin');
    
    if (!rpcError) {
      return { exists: adminExists || false, error: null };
    }

    console.log('RPC failed, using direct query:', rpcError);
    
    // Fallback to direct query
    const { data, error } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (error) {
      console.error('Error checking admin existence:', error);
      return { exists: false, error: error.message };
    }

    return { exists: data && data.length > 0, error: null };
  } catch (error: any) {
    console.error('Unexpected error checking admin:', error);
    return { exists: false, error: error.message };
  }
};
