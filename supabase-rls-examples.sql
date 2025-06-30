-- POLÍTICAS RLS COMUNS PARA SUPABASE

-- 1. LEITURA PÚBLICA (todos podem ver)
CREATE POLICY "Public read access" 
ON covers FOR SELECT 
USING (true);

-- 2. APENAS USUÁRIOS AUTENTICADOS
CREATE POLICY "Authenticated users only" 
ON covers FOR ALL 
USING (auth.role() = 'authenticated');

-- 3. APENAS O PRÓPRIO USUÁRIO (precisa de coluna user_id)
CREATE POLICY "Users can only see their own data" 
ON covers FOR ALL 
USING (auth.uid() = user_id);

-- 4. ADMINISTRADORES E PROPRIETÁRIOS
CREATE POLICY "Admins and owners" 
ON covers FOR ALL 
USING (
  auth.uid() = user_id OR 
  auth.jwt() ->> 'role' = 'admin'
);

-- 5. LEITURA PÚBLICA + ESCRITA AUTENTICADA
-- Leitura
CREATE POLICY "Public read" 
ON covers FOR SELECT 
USING (true);

-- Inserção
CREATE POLICY "Authenticated insert" 
ON covers FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Atualização apenas do próprio conteúdo
CREATE POLICY "Update own content" 
ON covers FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Deleção apenas do próprio conteúdo
CREATE POLICY "Delete own content" 
ON covers FOR DELETE 
USING (auth.uid() = user_id);

-- COMANDOS ÚTEIS:

-- Ver políticas existentes
SELECT * FROM pg_policies WHERE tablename = 'covers';

-- Ativar RLS
ALTER TABLE covers ENABLE ROW LEVEL SECURITY;

-- Desativar RLS
ALTER TABLE covers DISABLE ROW LEVEL SECURITY;

-- Remover uma política
DROP POLICY "policy_name" ON covers;
