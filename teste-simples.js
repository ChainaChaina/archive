// Diagnóstico simples
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://zuxhgukxibznkuzhgdjb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1eGhndWt4aWJ6bmt1emhnZGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDgxMTgsImV4cCI6MjA2NjMyNDExOH0.pjnmT5aTg9hQOXBh5SgfAKSGYdZZl-JfvLEn11hieqQ'
);

async function testConnection() {
  console.log('🔍 Testando conexão...');
  
  try {
    const { data, error } = await supabase
      .from('covers')
      .select('count');
    
    if (error) {
      console.error('❌ Erro:', error);
    } else {
      console.log('✅ Sucesso:', data);
    }
  } catch (err) {
    console.error('❌ Erro geral:', err);
  }
}

testConnection();