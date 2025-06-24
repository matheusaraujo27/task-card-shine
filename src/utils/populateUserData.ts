
import { supabase } from '@/integrations/supabase/client';

export const populateAnaPatriciaData = async () => {
  try {
    // First, let's get the user by email
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.error('Error fetching users:', usersError);
      return;
    }

    const anaUser = users?.find(user => user.email === 'anapatriciavelloso@yahoo.com.br');
    
    if (!anaUser) {
      console.error('User not found');
      return;
    }

    console.log('Found user:', anaUser.id);

    // Update profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: anaUser.id,
        student_name: 'ANA_PATRICIA_DE_SOUZA_VELLOSO',
        display_name: 'Ana Patricia',
        title: 'Transformando Vidas através da Terapia e Mentoria',
        subtitle: '🏥 Saúde + Transformação: Criando Impacto através do Método Próprio de Terapia Breve',
        archetype: 'health_professional',
        focus: 'Mentora de Transformação'
      });

    if (profileError) {
      console.error('Error updating profile:', profileError);
      return;
    }

    // Update dashboard data
    const { error: dashboardError } = await supabase
      .from('user_dashboard')
      .upsert({
        user_id: anaUser.id,
        colors: {
          primary: '#27ae60',
          secondary: '#2ecc71',
          accent: '#2c3e50'
        },
        platform_strategy: {
          instagram: 60,
          linkedin: 25,
          youtube: 15,
          priority: 'instagram'
        },
        scores: {
          digital: 0,
          speaking: 5,
          mentoring: 0,
          book: 0
        },
        profile_highlights: [
          {
            icon: '🎯',
            title: 'Seu Objetivo Principal',
            content: 'Criar Uma Mentoria de sucesso de high ticket estruturada e com alta demanda, baseada no Método que utilizo para Transformação de vidas e reconexão com a identidade.'
          },
          {
            icon: '🏥',
            title: 'Sua Expertise',
            content: 'Mais de 10 anos na área da saúde, criadora de método próprio de Terapia Breve, especialista em transformação de vidas e autoconhecimento, gestora de clínica familiar'
          },
          {
            icon: '🏆',
            title: 'Seus Pontos Fortes',
            content: 'Posicionamento Digital (0/10 - iniciando), Experiência em Palestras (5/10), Método próprio desenvolvido, empresa de sucesso criada aos 22 anos, resiliência na pandemia'
          },
          {
            icon: '💝',
            title: 'Sua Motivação',
            content: 'Quero ser lembrada por ter ajudado muitas pessoas a transformarem suas vidas e entenderam que elas tem este poder dentro delas. Quero ser lembrada pelo impacto que minha ação gerou nas pessoas.'
          }
        ],
        motivation_quote: 'Ana Patricia, sua jornada de superação na pandemia e seu método próprio de transformação será a base para construir uma mentoria de alto impacto que transforma vidas e inspira mulheres.',
        strategy_text: 'Este plano foi adaptado especificamente para sua transição de terapeuta experiente para mentora digital, priorizando Instagram para educação em saúde e humanização, LinkedIn para networking médico e autoridade, e YouTube para conteúdo educativo e casos de transformação.',
        instructions_text: 'Ana Patricia, suas atividades foram personalizadas baseadas no seu perfil de profissional da saúde com foco em transformação de vidas através do seu método próprio. Priorizamos Instagram (60%) para educação em saúde e humanização, LinkedIn (25%) para networking médico e autoridade e YouTube (15%) para conteúdo educativo e casos de transformação.',
        context_text: 'Cada atividade considera sua experiência em gestão de clínica, seu método de terapia breve e seu desejo de impactar mulheres através do autoconhecimento.',
        sample_activities: [],
        key_data: {
          experience: 'Mais de 10 anos',
          segment: 'Área da Saúde',
          current_work: 'Gestora de clínica familiar, criadora de método próprio de Terapia Breve',
          major_achievements: 'Empresa de sucesso criada aos 22 anos, método próprio desenvolvido, resiliência durante pandemia, especialização em PNL e Hipnose',
          turning_point: 'Superação na pandemia que fortaleceu sua resiliência e método de transformação',
          legacy: 'Ajudar muitas pessoas a transformarem suas vidas e entenderem que têm este poder dentro delas'
        }
      });

    if (dashboardError) {
      console.error('Error updating dashboard:', dashboardError);
      return;
    }

    // Add sample tasks
    const tasks = [
      {
        user_id: anaUser.id,
        day: 1,
        title: 'Perfil: Mentora de Transformação',
        description: 'Configure perfil destacando "Nascida para Brilhar" + "Método Próprio" + "Espelho da Coragem" + "Transformação de Vida"',
        time: '45 min',
        difficulty: 'Fácil',
        platform: 'Instagram',
        type: 'profile_setup',
        completed: false
      },
      {
        user_id: anaUser.id,
        day: 2,
        title: 'Story: "Espelho da Coragem"',
        description: 'Apresentação pessoal: "Sou Ana Patricia, criei método próprio de terapia breve transformadora"',
        time: '15 min',
        difficulty: 'Médio',
        platform: 'Instagram',
        type: 'content_creation',
        completed: false
      },
      {
        user_id: anaUser.id,
        day: 3,
        title: 'Canal: "Jornada do Autoconhecimento"',
        description: 'Configure canal focado em transformação de vida e reconexão com identidade',
        time: '60 min',
        difficulty: 'Fácil',
        platform: 'YouTube',
        type: 'channel_setup',
        completed: false
      },
      {
        user_id: anaUser.id,
        day: 4,
        title: 'Mapeamento de Mulheres em Transformação',
        description: 'Identifique 20 perfis de mulheres buscando autoconhecimento e transformação',
        time: '30 min',
        difficulty: 'Fácil',
        platform: 'Instagram',
        type: 'networking',
        completed: false
      },
      {
        user_id: anaUser.id,
        day: 5,
        title: 'Post: "O Amor Move Montanhas"',
        description: 'Primeiro post: "Como descobri força interior que não imaginava ter durante a pandemia"',
        time: '30 min',
        difficulty: 'Fácil',
        platform: 'Instagram',
        type: 'content_creation',
        completed: false
      },
      {
        user_id: anaUser.id,
        day: 6,
        title: 'Artigo: "Método de Terapia Breve"',
        description: 'Expertise: "Como desenvolvi método próprio de transformação e reconexão"',
        time: '20 min',
        difficulty: 'Médio',
        platform: 'LinkedIn',
        type: 'content_creation',
        completed: false
      },
      {
        user_id: anaUser.id,
        day: 7,
        title: 'Estrutura de Mentoria: Mulheres Corajosas',
        description: 'Defina formato: 1h/semana, temas (autoconhecimento, transformação), investimento R$2000/mês',
        time: '60 min',
        difficulty: 'Médio',
        platform: 'Geral',
        type: 'business_structure',
        completed: false
      }
    ];

    const { error: tasksError } = await supabase
      .from('user_tasks')
      .upsert(tasks);

    if (tasksError) {
      console.error('Error updating tasks:', tasksError);
      return;
    }

    console.log('Successfully populated Ana Patricia\'s data!');
    return { success: true };

  } catch (error) {
    console.error('Error in populateAnaPatriciaData:', error);
    return { error };
  }
};
