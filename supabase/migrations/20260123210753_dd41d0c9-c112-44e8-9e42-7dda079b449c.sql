-- Remove a política que permite usuários atualizarem suas próprias assinaturas (nome exato da tabela)
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscriptions;