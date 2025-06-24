
-- Insert Day 4: Reels content
INSERT INTO public.user_daily_content (user_id, day, content_type, title, strategic_analysis, scenes, audio_suggestion, caption_description, cta_text, hashtags) VALUES
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 4, 'reels', 
'A mulher que você quer ser já existe dentro de você.', 
'Ana Patrícia, este Reels é uma pílula de empoderamento. A Linguagem é direta, inspiradora e fala sobre identidade, um dos pilares do seu trabalho. Você se posiciona como a Maga que ajuda a revelar o que já existe, e não como alguém que "conserta". Isso é muito poderoso para o seu Público-Alvo de mulheres que buscam se reconectar com a própria força.',
'[
  {
    "scene": 1,
    "duration": "0-5s",
    "action": "O Gancho: Close nos olhos da Ana Patrícia, que olha diretamente para a câmera com intensidade e serenidade",
    "audio": "(Música inspiradora e suave) A mulher forte, corajosa e bem-sucedida que você tanto admira e sonha em ser...",
    "text_overlay": "A mulher que você sonha em ser..."
  },
  {
    "scene": 2,
    "duration": "6-12s",
    "action": "A Revelação: A câmera se afasta um pouco. Ana Patrícia coloca a mão sobre o próprio coração",
    "audio": "...não está em um futuro distante. Ela não é uma meta a ser alcançada. Ela já existe. Ela está aí dentro.",
    "text_overlay": "...já existe dentro de você."
  },
  {
    "scene": 3,
    "duration": "13-20s",
    "action": "O Bloqueio: Imagens simbólicas de camadas sendo sobrepostas em uma foto: medos, crenças limitantes, opiniões dos outros",
    "audio": "Ela só está escondida. Soterrada por camadas de medo, pelas vozes dos outros, pelas crenças que te disseram que você não era boa o suficiente.",
    "text_overlay": "Ela só está soterrada."
  },
  {
    "scene": 4,
    "duration": "21-27s",
    "action": "O Chamado: Cenas de mulheres fortes e bem-sucedidas (podem ser suas clientes, amigas ou imagens de banco de imagens)",
    "audio": "Meu trabalho não é te transformar em outra pessoa. Meu trabalho é te ajudar a remover essas camadas, a limpar o entulho, para que a mulher que você nasceu para ser possa finalmente brilhar.",
    "text_overlay": "Meu trabalho é te ajudar a remover o entulho."
  },
  {
    "scene": 5,
    "duration": "28-34s",
    "action": "O CTA: Ana Patrícia sorri, de forma acolhedora",
    "audio": "Você está pronta para se reencontrar? Para deixar sua verdadeira identidade vir à tona? Comente IDENTIDADE e dê o primeiro passo.",
    "text_overlay": "Pronta para se reencontrar? Comente \"IDENTIDADE\"."
  }
]'::jsonb,
'"Confident" - Demi Lovato (versão acústica ou instrumental, para ser inspiradora sem ser agressiva)',
'Pare de procurar lá fora a força que já mora aí dentro. A jornada do autoconhecimento não é sobre se tornar alguém novo, mas sobre se lembrar de quem você sempre foi, antes que o mundo te dissesse quem você deveria ser. Vamos juntas nessa jornada de reconexão.',
'Comente "IDENTIDADE"',
'#Identidade #Autoconhecimento #ForçaFeminina #EmpoderamentoFeminino #Autoestima #Transformação');

-- Insert Day 5: Carousel content
INSERT INTO public.user_daily_content (user_id, day, content_type, title, strategic_analysis, slides, caption_description, cta_text, hashtags) VALUES
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 5, 'carousel', 
'As Lições de Liderança que Aprendi com Hollywood', 
'Ana Patrícia, você se inspira em grandes filmes de superação. Vamos usar isso a seu favor! Este conteúdo é uma forma leve e inteligente de compartilhar seus valores e sua visão de liderança, sem precisar se expor diretamente. Você atua como a Sábia que extrai conhecimento de fontes inesperadas (Mundo/Personagens da cultura pop), conectando-se com seu público de forma cultural e inspiradora.',
'[
  {
    "slide": 1,
    "type": "cover",
    "visual": "Uma imagem estilizada com claquete, rolo de filme e pipoca, com a foto da Ana Patrícia no centro",
    "title": "As 3 Lições de Liderança que Aprendi com Hollywood",
    "subtitle": "O que grandes filmes nos ensinam sobre superar desafios na vida real"
  },
  {
    "slide": 2,
    "type": "lesson1",
    "visual": "Uma cena icônica do filme Gladiador ou Duelo de Titãs",
    "title": "LIÇÃO DE GLADIADOR: A FORÇA ESTÁ NA ARENA",
    "content": "A verdadeira liderança não é sobre ter o plano perfeito, mas sobre ter a coragem de entrar na arena e lutar, mesmo ferido. É a resiliência no meio do caos que forja os verdadeiros líderes."
  },
  {
    "slide": 3,
    "type": "lesson2",
    "visual": "Uma cena marcante de Estrelas Além do Tempo",
    "title": "LIÇÃO DE ESTRELAS ALÉM DO TEMPO: OUSE DESAFIAR O SISTEMA",
    "content": "Liderar, muitas vezes, é ser a primeira pessoa a acreditar em algo que ninguém mais vê. É sobre quebrar barreiras, questionar o sempre foi assim e criar novas possibilidades com sua competência e visão."
  },
  {
    "slide": 4,
    "type": "lesson3",
    "visual": "Uma cena do filme Intocáveis, mostrando a conexão entre os personagens",
    "title": "LIÇÃO DE INTOCÁVEIS: CONEXÃO HUMANA É O MAIOR ATIVO",
    "content": "No fim do dia, liderança é sobre pessoas. É sobre enxergar o potencial no outro, criar pontes de empatia e entender que as conexões verdadeiras são a base de qualquer projeto de sucesso."
  },
  {
    "slide": 5,
    "type": "synthesis",
    "visual": "Foto da Ana Patrícia, com um olhar pensativo e inspirador",
    "title": "O QUE ISSO SIGNIFICA PARA NÓS?",
    "content": "Que as ferramentas para liderar nossa própria vida – resiliência, ousadia e empatia – já estão dentro de nós. As grandes histórias apenas nos lembram do poder que temos."
  },
  {
    "slide": 6,
    "type": "cta",
    "visual": "Uma imagem com um balão de diálogo",
    "title": "E você, qual filme te ensinou uma grande lição de vida?",
    "content": "Adoro aprender com histórias!\n\nDeixe sua recomendação nos comentários e vamos criar a nossa lista de inspirações."
  }
]'::jsonb,
'Sempre fui apaixonada por filmes que contam grandes histórias de superação. Mais do que entretenimento, eles são verdadeiras aulas de liderança, resiliência e propósito. Essas são 3 das lições que levo para minha vida e meu trabalho. Qual filme te marcou e por quê? Me conta aqui! 👇',
'Deixe sua recomendação nos comentários',
'#Liderança #Inspiração #Cinema #LiçõesDeVida #Resiliencia #Empatia');

-- Insert Day 6: Reels content
INSERT INTO public.user_daily_content (user_id, day, content_type, title, strategic_analysis, scenes, audio_suggestion, caption_description, cta_text, hashtags) VALUES
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 6, 'reels', 
'Coragem não é ausência de medo.', 
'Ana Patrícia, vamos usar sua Linguagem e inspirações (como Brené Brown) para criar um conteúdo que é ao mesmo tempo um mantra e uma confissão. Este Reels ataca sua própria dor (medo do digital) e a do seu público (medo de arriscar, de mudar). Você se posiciona como a Sábia que entende a natureza da coragem e a Heroína que a pratica, mesmo desconfortável.',
'[
  {
    "scene": 1,
    "duration": "0-5s",
    "action": "O Gancho: Close no rosto da Ana Patrícia. Ela respira fundo, com uma expressão que mistura nervosismo e decisão",
    "audio": "(Som de um coração batendo) Todos os dias eu sinto medo. Medo de errar, de ser julgada, de não ser boa o suficiente.",
    "text_overlay": "Eu sinto medo todos os dias."
  },
  {
    "scene": 2,
    "duration": "6-13s",
    "action": "O Mito: Imagens de super-heróis de filmes, pessoas pulando de paraquedas, etc",
    "audio": "A gente cresceu achando que coragem era não sentir medo. Que os fortes não hesitam. E essa é a maior mentira que nos contaram.",
    "text_overlay": "A mentira que nos contaram sobre a CORAGEM."
  },
  {
    "scene": 3,
    "duration": "14-21s",
    "action": "A Verdade: A cena volta para Ana Patrícia. Ela agora olha firme para a câmera, com convicção",
    "audio": "A verdade é que coragem é sentir o medo até o último fio de cabelo... e ir mesmo assim. É a ação que você toma apesar do medo.",
    "text_overlay": "Coragem é AÇÃO apesar do medo."
  },
  {
    "scene": 4,
    "duration": "22-28s",
    "action": "Sua Prova (Linha da Vida): Flash rápido de uma imagem simbólica da pandemia, e depois ela, hoje, sorrindo e palestrando (Cenário)",
    "audio": "Foi com medo que eu liderei minha família e minha empresa na crise. É com medo que eu estou aqui, falando com você. A gente não espera o medo passar. A gente leva ele junto.",
    "text_overlay": "Eu não esperei o medo passar. Eu fui com ele."
  },
  {
    "scene": 5,
    "duration": "29-35s",
    "action": "O CTA: Ana Patrícia dá um sorriso encorajador",
    "audio": "Qual é o passo que você precisa dar hoje, mesmo com medo? Comente CORAGEM para firmar esse compromisso com você mesma.",
    "text_overlay": "Qual seu próximo passo? Comente \"CORAGEM\"."
  }
]'::jsonb,
'"Unstoppable" - Sia (uma música sobre força interior e resiliência)',
'Crescer exige coragem. E coragem não é a ausência de medo, é a decisão de agir apesar dele. Todos os dias eu escolho ser maior que meus medos para cumprir minha missão. E você? Qual medo você vai vencer hoje?',
'Comente "CORAGEM"',
'#Coragem #BrenéBrown #Vulnerabilidade #LiderançaFeminina #ForçaInterior #Medo');
