
-- Drop the problematic policy first
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create a security definer function to check admin status safely
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  );
$$;

-- Recreate the policy using the security definer function
CREATE POLICY "Admins can manage all roles" 
  ON public.user_roles 
  FOR ALL
  USING (public.check_is_admin());

-- Also update the is_admin function to use the same approach
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT public.check_is_admin();
$$;
