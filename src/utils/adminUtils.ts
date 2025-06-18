
import { supabase } from '@/integrations/supabase/client';

export const createAdminAccount = async () => {
  try {
    // Sign up the admin user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'siadminsi',
      password: 'hahahaadmin',
      options: {
        data: {
          username: 'siadminsi'
        }
      }
    });

    if (authError) {
      console.error('Error creating admin account:', authError);
      return { success: false, error: authError.message };
    }

    if (authData.user) {
      // Add admin role to user_roles table
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'admin'
        });

      if (roleError) {
        console.error('Error adding admin role:', roleError);
        return { success: false, error: roleError.message };
      }

      return { success: true, userId: authData.user.id };
    }

    return { success: false, error: 'User creation failed' };
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return { success: false, error: error.message };
  }
};
