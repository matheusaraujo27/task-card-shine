
-- Insert sample tasks for weeks 2-7 (days 8-49)
-- Week 2 (days 8-14)
INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  8 as day,
  'Estratégia de Conteúdo para LinkedIn' as title,
  'Desenvolva uma estratégia de conteúdo focada em autoridade para LinkedIn, definindo temas e frequência de posts.' as description,
  'LinkedIn' as platform,
  'Médio' as difficulty,
  '45 min' as time,
  'estratégia' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  9 as day,
  'Post de Valor no LinkedIn' as title,
  'Crie um post compartilhando uma experiência profissional que agregue valor ao seu público.' as description,
  'LinkedIn' as platform,
  'Fácil' as difficulty,
  '30 min' as time,
  'conteúdo' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  10 as day,
  'Stories Humanizados no Instagram' as title,
  'Compartilhe bastidores do seu trabalho através de stories, mostrando seu lado humano.' as description,
  'Instagram' as platform,
  'Fácil' as difficulty,
  '20 min' as time,
  'stories' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  11 as day,
  'Artigo Técnico LinkedIn' as title,
  'Escreva um artigo detalhado sobre um tema da sua área de expertise.' as description,
  'LinkedIn' as platform,
  'Difícil' as difficulty,
  '60 min' as time,
  'artigo' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  12 as day,
  'Engajamento Estratégico' as title,
  'Interaja estrategicamente com posts de líderes do seu setor, adicionando comentários de valor.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '25 min' as time,
  'engajamento' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  13 as day,
  'Vídeo Educativo YouTube' as title,
  'Grave um vídeo curto explicando um conceito importante da sua área.' as description,
  'YouTube' as platform,
  'Difícil' as difficulty,
  '90 min' as time,
  'vídeo' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  14 as day,
  'Reflexão Semanal' as title,
  'Faça um post reflexivo sobre os aprendizados da semana e planos futuros.' as description,
  'LinkedIn' as platform,
  'Médio' as difficulty,
  '35 min' as time,
  'reflexão' as type
FROM profiles;

-- Week 3 (days 15-21)
INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  15 as day,
  'Análise de Tendências' as title,
  'Analise e comente sobre tendências emergentes na sua área de atuação.' as description,
  'LinkedIn' as platform,
  'Médio' as difficulty,
  '40 min' as time,
  'análise' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  16 as day,
  'Carrossel Educativo Instagram' as title,
  'Crie um carrossel com dicas práticas para seu público no Instagram.' as description,
  'Instagram' as platform,
  'Médio' as difficulty,
  '50 min' as time,
  'carrossel' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  17 as day,
  'Networking Digital' as title,
  'Conecte-se com 10 profissionais relevantes e envie mensagens personalizadas.' as description,
  'LinkedIn' as platform,
  'Fácil' as difficulty,
  '30 min' as time,
  'networking' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  18 as day,
  'Live ou Webinar' as title,
  'Realize uma transmissão ao vivo discutindo um tema relevante.' as description,
  'Instagram' as platform,
  'Difícil' as difficulty,
  '75 min' as time,
  'live' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  19 as day,
  'Curadoria de Conteúdo' as title,
  'Compartilhe e comente conteúdos relevantes de outros criadores.' as description,
  'Geral' as platform,
  'Fácil' as difficulty,
  '20 min' as time,
  'curadoria' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  20 as day,
  'Tutorial YouTube' as title,
  'Crie um tutorial passo-a-passo sobre uma ferramenta ou processo.' as description,
  'YouTube' as platform,
  'Difícil' as difficulty,
  '80 min' as time,
  'tutorial' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  21 as day,
  'Avaliação de Progresso' as title,
  'Avalie seu progresso nas redes sociais e ajuste sua estratégia.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '30 min' as time,
  'avaliação' as type
FROM profiles;

-- Week 4 (days 22-28)
INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  22 as day,
  'Caso de Sucesso' as title,
  'Compartilhe um caso de sucesso detalhado da sua experiência profissional.' as description,
  'LinkedIn' as platform,
  'Médio' as difficulty,
  '45 min' as time,
  'caso' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  23 as day,
  'Reels Educativo' as title,
  'Crie um reel educativo com dicas rápidas para seu público.' as description,
  'Instagram' as platform,
  'Médio' as difficulty,
  '40 min' as time,
  'reels' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  24 as day,
  'Pesquisa de Mercado' as title,
  'Realize uma pesquisa com seu público sobre suas maiores dificuldades.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '35 min' as time,
  'pesquisa' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  25 as day,
  'Colaboração Estratégica' as title,
  'Proponha uma colaboração com outro profissional do seu setor.' as description,
  'LinkedIn' as platform,
  'Difícil' as difficulty,
  '50 min' as time,
  'colaboração' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  26 as day,
  'Stories Interativo' as title,
  'Use ferramentas interativas do Instagram (enquetes, perguntas) para engajar.' as description,
  'Instagram' as platform,
  'Fácil' as difficulty,
  '25 min' as time,
  'interativo' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  27 as day,
  'Análise de Concorrência' as title,
  'Analise estratégias de comunicação de líderes do seu setor.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '40 min' as time,
  'análise' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  28 as day,
  'Planejamento Mensal' as title,
  'Planeje o conteúdo do próximo mês baseado nos resultados obtidos.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '60 min' as time,
  'planejamento' as type
FROM profiles;

-- Week 5 (days 29-35)
INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  29 as day,
  'Tendências Futuras' as title,
  'Escreva sobre tendências futuras na sua área e como se preparar.' as description,
  'LinkedIn' as platform,
  'Difícil' as difficulty,
  '55 min' as time,
  'tendências' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  30 as day,
  'IGTV Educativo' as title,
  'Crie um vídeo longo no Instagram abordando um tema complexo.' as description,
  'Instagram' as platform,
  'Difícil' as difficulty,
  '70 min' as time,
  'igtv' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  31 as day,
  'Entrevista Expert' as title,
  'Conduza uma entrevista com um especialista da sua área.' as description,
  'YouTube' as platform,
  'Difícil' as difficulty,
  '90 min' as time,
  'entrevista' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  32 as day,
  'Feedback da Audiência' as title,
  'Colete e responda feedbacks da sua audiência de forma estratégica.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '30 min' as time,
  'feedback' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  33 as day,
  'Série de Posts' as title,
  'Inicie uma série de posts sobre um tema específico.' as description,
  'LinkedIn' as platform,
  'Médio' as difficulty,
  '45 min' as time,
  'série' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  34 as day,
  'Métricas e Análise' as title,
  'Analise suas métricas e identifique padrões de engajamento.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '40 min' as time,
  'métricas' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  35 as day,
  'Reflexão de Meio Caminho' as title,
  'Faça uma reflexão sobre sua jornada até aqui e próximos passos.' as description,
  'LinkedIn' as platform,
  'Médio' as difficulty,
  '35 min' as time,
  'reflexão' as type
FROM profiles;

-- Week 6 (days 36-42)
INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  36 as day,
  'Workshop Online' as title,
  'Organize um workshop online gratuito para sua audiência.' as description,
  'Geral' as platform,
  'Difícil' as difficulty,
  '120 min' as time,
  'workshop' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  37 as day,
  'Behind the Scenes' as title,
  'Mostre os bastidores do seu trabalho de forma autêntica.' as description,
  'Instagram' as platform,
  'Fácil' as difficulty,
  '25 min' as time,
  'bastidores' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  38 as day,
  'Posicionamento Expert' as title,
  'Publique um artigo posicionando-se como especialista em um tópico.' as description,
  'LinkedIn' as platform,
  'Difícil' as difficulty,
  '65 min' as time,
  'posicionamento' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  39 as day,
  'Q&A Session' as title,
  'Realize uma sessão de perguntas e respostas com sua audiência.' as description,
  'Instagram' as platform,
  'Médio' as difficulty,
  '45 min' as time,
  'qa' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  40 as day,
  'Conteúdo Viral' as title,
  'Crie conteúdo com potencial viral mantendo sua autoridade.' as description,
  'Geral' as platform,
  'Difícil' as difficulty,
  '50 min' as time,
  'viral' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  41 as day,
  'Parcerias Estratégicas' as title,
  'Estabeleça parcerias de conteúdo com outros profissionais.' as description,
  'LinkedIn' as platform,
  'Difícil' as difficulty,
  '60 min' as time,
  'parcerias' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  42 as day,
  'Otimização de Perfil' as title,
  'Otimize todos os seus perfis nas redes sociais baseado nos aprendizados.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '45 min' as time,
  'otimização' as type
FROM profiles;

-- Week 7 (days 43-49)
INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  43 as day,
  'Manifesto Pessoal' as title,
  'Escreva e publique seu manifesto pessoal e profissional.' as description,
  'LinkedIn' as platform,
  'Difícil' as difficulty,
  '75 min' as time,
  'manifesto' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  44 as day,
  'Documentário Pessoal' as title,
  'Crie um mini-documentário sobre sua jornada profissional.' as description,
  'YouTube' as platform,
  'Difícil' as difficulty,
  '100 min' as time,
  'documentário' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  45 as day,
  'Mentoria Reversa' as title,
  'Ofereça mentoria gratuita para alguém iniciante na sua área.' as description,
  'Geral' as platform,
  'Médio' as difficulty,
  '60 min' as time,
  'mentoria' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  46 as day,
  'Legado Digital' as title,
  'Reflita e compartilhe sobre o legado digital que quer construir.' as description,
  'LinkedIn' as platform,
  'Médio' as difficulty,
  '40 min' as time,
  'legado' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  47 as day,
  'Celebração de Conquistas' as title,
  'Celebre suas conquistas e agradeça sua comunidade.' as description,
  'Instagram' as platform,
  'Fácil' as difficulty,
  '30 min' as time,
  'celebração' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  48 as day,
  'Plano de Continuidade' as title,
  'Desenvolva um plano de continuidade para manter o crescimento.' as description,
  'Geral' as platform,
  'Difícil' as difficulty,
  '70 min' as time,
  'continuidade' as type
FROM profiles;

INSERT INTO user_tasks (user_id, day, title, description, platform, difficulty, time, type) 
SELECT 
  user_id,
  49 as day,
  'Transformação Completa' as title,
  'Documente sua transformação completa ao longo das 7 semanas.' as description,
  'LinkedIn' as platform,
  'Difícil' as difficulty,
  '80 min' as time,
  'transformação' as type
FROM profiles;
