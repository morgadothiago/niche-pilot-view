-- Allow admins to insert agents for any user
CREATE POLICY "Admins can create agents for any user"
ON public.agents
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Allow admins to delete any agent
CREATE POLICY "Admins can delete any agent"
ON public.agents
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to view all agents
CREATE POLICY "Admins can view all agents"
ON public.agents
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));