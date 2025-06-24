
-- Insert sample detailed content for Ana Patricia's first 3 days
INSERT INTO public.user_daily_content (user_id, day, content_type, title, strategic_analysis, scenes, audio_suggestion, caption_description, cta_text, hashtags) VALUES

-- Day 1: Reels content
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 1, 'reels', 
'Nascida para Brilhar (Mesmo quando o mundo apaga a sua luz)', 
'Ana Patrícia, você disse que o filme da sua vida poderia se chamar "Nascida para Brilhar". Este é o seu posicionamento. Vamos usar esse gancho para contar a sua história da pandemia na Linha da Vida. Você se apresenta como a Heroína que, mesmo com medo e no caos, encontrou a própria luz.',
'[
  {
    "scene": 1,
    "duration": "0-5s",
    "action": "O Gancho: Imagens simbólicas de um ambiente de negócios fechado, escuro (Cenário da pandemia). A câmera foca no rosto da Ana Patrícia, com uma expressão de preocupação.",
    "audio": "(Som de um noticiário de fundo, que se torna um zumbido) \"A pandemia chegou e, com ela, o medo. O medo de não dar conta, de ver o negócio da família parar.\"",
    "text_overlay": "O medo chegou."
  },
  {
    "scene": 2,
    "duration": "6-12s",
    "action": "A Dor: Close no rosto dela, agora mostrando cansaço, mas com um olhar que não se entrega.",
    "audio": "\"Eu me senti desestruturada emocionalmente. Pensei em desistir. Mas dentro de mim, uma voz dizia que eu não podia.\"",
    "text_overlay": "Pensei em desistir."
  },
  {
    "scene": 3,
    "duration": "13-20s",
    "action": "O Ponto de Virada: A música muda. Cenas dela em ação: liderando uma reunião por vídeo, negociando, olhando para uma foto do filho (Personagem), que é sua inspiração.",
    "audio": "\"Foi na dor que eu descobri uma força que não imaginava ter. A força de uma líder, de uma mãe. A garra de fazer acontecer, não por mim, mas por todos.\"",
    "text_overlay": "Foi na dor que descobri minha força."
  },
  {
    "scene": 4,
    "duration": "21-27s",
    "action": "A Vitória: Cenas dela hoje, sorrindo, correndo ao ar livre, palestrando (Cenários). A luz é brilhante, contrastando com o início.",
    "audio": "\"Nós não apenas sobrevivemos, nós prosperamos. Porque o amor move montanhas e a nossa força interior é inabalável quando temos um porquê.\"",
    "text_overlay": "O amor move montanhas."
  },
  {
    "scene": 5,
    "duration": "28-34s",
    "action": "O CTA: Ana Patrícia olha para a câmera, com a serenidade de quem venceu a batalha.",
    "audio": "\"Você também nasceu para brilhar, mesmo nos dias escuros. Se você precisa reencontrar essa força, comente \"BRILHAR\" e eu te ajudo a acender sua luz.\"",
    "text_overlay": "Comente \"BRILHAR\" para reencontrar sua força."
  }
]'::jsonb,
'Rise Up - Andra Day (a música é um hino de superação e resiliência)',
'A vida, às vezes, tenta apagar a nossa luz. A pandemia foi um desses momentos para mim. Mas foi na escuridão que descobri que a minha força interior brilhava mais forte. O que nos define não é a queda, mas a coragem de levantar e brilhar ainda mais. Você tem esse poder dentro de você.',
'Comente "BRILHAR" para reencontrar sua força',
'#NascidaParaBrilhar #Resiliencia #ForçaFeminina #LiderançaFeminina #Superação #Autoconhecimento'),

-- Day 2: Carousel content
('4ce63888-29b0-4387-881e-f9c54e41c3dc', 2, 'carousel', 
'O Poder da Terapia Breve: 4 Passos para Transformar sua Vida, Rápido', 
'Ana Patrícia, aqui você se posiciona como a Sábia, a criadora de um método próprio. O Público-Alvo hoje busca soluções eficazes e que respeitem seu tempo. Apresentar a "Terapia Breve" ataca diretamente essa necessidade.',
'[]'::jsonb,
'', 
'Eu acredito em processos profundos, mas também em resultados práticos. Depois de anos estudando diversas abordagens, da PNL à Física Quântica, eu criei meu próprio método de Terapia Breve para ajudar mulheres a destravarem suas vidas de forma rápida e eficaz.',
'Comente "MÉTODO" e eu te envio uma explicação sobre como a Terapia Breve pode acelerar seus resultados',
'#TerapiaBreve #Transformação #PNL #Autoconhecimento #Resultados #SaudeMental');

-- Update carousel content with slides data
UPDATE public.user_daily_content 
SET slides = '[
  {
    "slide": 1,
    "type": "cover",
    "visual": "Foto profissional da Ana Patrícia, com um olhar profundo e acolhedor",
    "title": "A vida é curta demais para terapia longa",
    "subtitle": "Como meu método de Terapia Breve pode destravar sua transformação em poucas sessões"
  },
  {
    "slide": 2,
    "type": "problem",
    "visual": "Ícone de uma pessoa presa em um labirinto, com um relógio correndo",
    "title": "O PROBLEMA: ANOS DE TERAPIA SEM RESULTADOS PRÁTICOS",
    "content": "Muitas pessoas passam anos falando sobre os mesmos problemas, mas sem um plano de ação claro para sair do lugar. Sentem-se acolhidas, mas não transformadas."
  },
  {
    "slide": 3,
    "type": "solution",
    "visual": "Um gráfico visual mostrando um caminho direto do Ponto A (Problema) ao Ponto B (Solução)",
    "title": "A SOLUÇÃO: FOCO, MÉTODO E AÇÃO",
    "content": "A Terapia Breve que desenvolvi não foca no \"porquê\" do passado, mas no \"como\" do futuro. Usamos ferramentas de PNL, Leitura Biológica e Psicologia Organizacional para criar um plano de ação focado e com prazo definido."
  },
  {
    "slide": 4,
    "type": "pillars",
    "visual": "Quatro ícones representando: 1) Diagnóstico, 2) Meta, 3) Ferramentas, 4) Ação",
    "title": "OS 4 PILARES DO MEU MÉTODO",
    "content": "1. Diagnóstico Preciso: Entender a raiz do bloqueio atual.\n2. Meta Clara: Definir o que você quer alcançar.\n3. Ferramentas Personalizadas: Entregar as técnicas exatas para você.\n4. Plano de Ação: Você sai com um passo a passo para aplicar na vida real."
  },
  {
    "slide": 5,
    "type": "result",
    "visual": "Foto de uma cliente (atriz/simbólica) com uma expressão de alívio e clareza",
    "title": "O RESULTADO: TRANSFORMAÇÃO REAL E DURADOURA",
    "content": "Meu objetivo é te dar as ferramentas para que você não precise de mim para sempre. É sobre te devolver a autoconfiança e o poder de conduzir a sua própria vida."
  },
  {
    "slide": 6,
    "type": "cta",
    "visual": "Close no rosto da Ana Patrícia, com um ar de especialista confiável",
    "title": "Cansada de esperar por uma mudança que não chega?",
    "content": "Talvez você não precise de mais tempo, mas sim do método certo.\n\nComente \"MÉTODO\" e eu te envio uma explicação sobre como a Terapia Breve pode acelerar seus resultados."
  }
]'::jsonb
WHERE day = 2 AND content_type = 'carousel' AND user_id = '4ce63888-29b0-4387-881e-f9c54e41c3dc';
