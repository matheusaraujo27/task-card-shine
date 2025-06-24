
-- First, let's see what content already exists for Day 3
SELECT * FROM public.user_daily_content 
WHERE user_id = '4ce63888-29b0-4387-881e-f9c54e41c3dc' AND day = 3;

-- Since we can't have multiple entries for the same day, let's update the existing Day 3 entry
-- or delete it first and then insert our new content
DELETE FROM public.user_daily_content 
WHERE user_id = '4ce63888-29b0-4387-881e-f9c54e41c3dc' AND day = 3;

-- Now insert the carousel content for Day 3
INSERT INTO public.user_daily_content (user_id, day, content_type, title, strategic_analysis, slides, caption_description, cta_text, hashtags) VALUES
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 3, 'carousel', 
'Criei uma empresa de sucesso com 22 anos. Estas foram as lições.', 
'Ana Patrícia, sua história como jovem empreendedora é um ativo incrível que mostra ousadia e experiência (Linha da Vida). Este conteúdo te posiciona como Sábia e Governanta, alguém com uma longa trajetória de sucesso e aprendizado. Conecta-se com mulheres mais jovens que estão começando e com mulheres mais velhas que buscam a coragem para empreender.',
'[
  {
    "slide": 1,
    "type": "cover",
    "visual": "Uma foto antiga da Ana Patrícia, mais jovem, em seu primeiro negócio (se tiver). Se não, uma foto atual com a legenda \"Desde os 22 anos...\"",
    "title": "Eu criei uma empresa de sucesso com 22 anos",
    "subtitle": "3 lições que aprendi na prática e que servem para qualquer negócio hoje"
  },
  {
    "slide": 2,
    "type": "lesson1",
    "visual": "Ícone de um produto ou serviço com um \"selo de qualidade\"",
    "title": "LIÇÃO #1: EXCELÊNCIA É O MELHOR MARKETING",
    "content": "No começo, eu não tinha dinheiro para investir em divulgação. Meu único marketing era a entrega impecável. Um cliente satisfeito se torna seu melhor vendedor. A reputação precede o faturamento."
  },
  {
    "slide": 3,
    "type": "lesson2",
    "visual": "Ícone de uma pessoa apertando a mão de várias outras",
    "title": "LIÇÃO #2: RELACIONAMENTOS VALEM MAIS QUE CONTRATOS",
    "content": "Construí minha primeira empresa na base da confiança e do networking. Clientes, fornecedores, parceiros. Aprenda a ouvir, a servir e a criar conexões genuínas. Pessoas fazem negócios com pessoas que elas gostam e confiam."
  },
  {
    "slide": 4,
    "type": "lesson3",
    "visual": "Ícone de um cofre com um coração dentro",
    "title": "LIÇÃO #3: SEU MAIOR ATIVO É SEU NOME",
    "content": "Empresas podem falir, produtos podem ficar obsoletos, mas sua reputação e sua credibilidade são para sempre. Cuidar do seu nome e dos seus valores é o investimento mais seguro que você pode fazer na sua carreira."
  },
  {
    "slide": 5,
    "type": "connection",
    "visual": "Foto atual da Ana Patrícia, olhando para a foto antiga dela",
    "title": "AQUELA GAROTA OUSADA AINDA VIVE EM MIM...",
    "content": "...hoje, com mais sabedoria e a mesma vontade de realizar. A experiência me ensinou que os princípios para construir algo de valor não mudam com o tempo."
  },
  {
    "slide": 6,
    "type": "cta",
    "visual": "Foto da Ana Patrícia com um olhar de mentora",
    "title": "Qual o sonho que você precisa ter a ousadia de começar hoje?",
    "content": "A coragem de começar é o que separa o sonho da realidade.\n\nSe você precisa de um plano para tirar seu projeto do papel, comente \"PLANO\"."
  }
]'::jsonb,
'Lembro como se fosse hoje da coragem (e do medo!) de abrir minha primeira empresa com apenas 22 anos. Aprendi na marra lições que nenhuma faculdade ensina. Hoje, aplico os mesmos princípios de excelência, relacionamento e integridade em tudo o que faço. A ousadia de começar é o seu superpoder. Use-o.',
'Se você precisa de um plano para tirar seu projeto do papel, comente "PLANO"',
'#Empreendedorismo #LiderançaFeminina #Negócios #Carreira #Ousadia #MulheresEmpreendedoras');
