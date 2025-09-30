// Script para verificar e remover vinyls de teste
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zuxhgukxibznkuzhgdjb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1eGhndWt4aWJ6bmt1emhnZGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDgxMTgsImV4cCI6MjA2NjMyNDExOH0.pjnmT5aTg9hQOXBh5SgfAKSGYdZZl-JfvLEn11hieqQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listarERemoverTestes() {
  console.log('🔍 Listando todos os vinyls...');
  
  try {
    // Listar todos os covers
    const { data: covers, error: listError } = await supabase
      .from('covers')
      .select('*')
      .order('id');
    
    if (listError) {
      console.error('❌ Erro ao listar:', listError);
      return;
    }
    
    console.log('📋 Total de vinyls encontrados:', covers?.length);
    
    if (covers) {
      covers.forEach((cover, index) => {
        console.log(`${index + 1}. ID: ${cover.id} | Title: "${cover.Title}" | Artist: "${cover.Artist}" | URL: ${cover.url}`);
      });
      
      // Identificar vinyls de teste (baseado em padrões comuns)
      const testVinyls = covers.filter(cover => 
        cover.Title?.toLowerCase().includes('test') ||
        cover.Artist?.toLowerCase().includes('test') ||
        cover.url?.includes('test') ||
        cover.url?.includes('bell-ringing') ||
        cover.url?.includes('soundjay.com') ||
        cover.Title?.toLowerCase().includes('album') ||
        cover.Artist?.toLowerCase().includes('artist')
      );
      
      console.log('\n🧪 Vinyls de teste identificados:');
      testVinyls.forEach((vinyl, index) => {
        console.log(`${index + 1}. ID: ${vinyl.id} | Title: "${vinyl.Title}" | Artist: "${vinyl.Artist}"`);
      });
      
      if (testVinyls.length > 0) {
        console.log(`\n🗑️ Removendo ${testVinyls.length} vinyls de teste...`);
        
        for (const vinyl of testVinyls) {
          const { error: deleteError } = await supabase
            .from('covers')
            .delete()
            .eq('id', vinyl.id);
          
          if (deleteError) {
            console.error(`❌ Erro ao remover ${vinyl.Title}:`, deleteError);
          } else {
            console.log(`✅ Removido: "${vinyl.Title}" por ${vinyl.Artist}`);
          }
        }
        
        console.log('\n✨ Limpeza concluída!');
      } else {
        console.log('\n✅ Nenhum vinyl de teste encontrado.');
      }
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

listarERemoverTestes();