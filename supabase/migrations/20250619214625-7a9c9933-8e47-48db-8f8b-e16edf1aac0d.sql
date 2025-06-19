
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Allow users to view their own roles
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow initial admin creation by allowing inserts when no admin exists yet
-- or when the current user is already an admin
CREATE POLICY "Allow admin role management" 
  ON public.user_roles 
  FOR ALL
  USING (
    -- Allow if user is admin (for existing admins to manage roles)
    public.check_is_admin()
    OR 
    -- Allow if no admin exists yet (for initial admin creation)
    NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
  );
