#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Análise e Conversão de Dados - Formulários para Formato Supabase
Autor: Augment Agent
Data: 2025-06-25
"""

import pandas as pd
import json
import uuid
from datetime import datetime
import re

def clean_text(text):
    """Limpa e formata texto"""
    if pd.isna(text) or text == '':
        return ""
    return str(text).strip()

def extract_scores(row):
    """Extrai scores do formulário"""
    return {
        "digital": int(row.get('De 0 a 10, o quanto você é posicionado digitalmente: ', 0)),
        "mentoring": int(row.get('De 0 a 10, o quanto você já estruturou uma Mentoria: ', 0)),
        "speaking": int(row.get('De 0 a 10, o quanto você já Palestrou: ', 0)),
        "book": int(row.get('De 0 a 10, o quanto você já escreveu um livro: ', 0))
    }

def determine_archetype(row):
    """Determina arquétipo baseado no perfil"""
    tipo = clean_text(row.get('Você é: ', '')).lower()
    if 'empresário' in tipo or 'empreendedor' in tipo:
        return 'entrepreneur'
    elif 'consultor' in tipo or 'mentor' in tipo:
        return 'consultant'
    elif 'coach' in tipo or 'palestrante' in tipo:
        return 'coach'
    else:
        return 'professional'

def determine_platform_strategy(scores):
    """Determina estratégia de plataforma baseada nos scores"""
    if scores['digital'] >= 7:
        return {"linkedin": 40, "instagram": 35, "youtube": 25, "priority": "linkedin"}
    elif scores['speaking'] >= 5:
        return {"linkedin": 50, "instagram": 30, "youtube": 20, "priority": "linkedin"}
    else:
        return {"linkedin": 45, "instagram": 35, "youtube": 20, "priority": "linkedin"}

def create_profile_highlights(row):
    """Cria highlights do perfil"""
    highlights = []
    
    # Objetivo Principal
    objetivo = clean_text(row.get('Qual é o seu objetivo com a Mentoria "Mentor de Líderes?"', ''))
    if objetivo:
        highlights.append({
            "icon": "🎯",
            "title": "Seu Objetivo Principal",
            "content": objetivo[:500] + "..." if len(objetivo) > 500 else objetivo
        })
    
    # Expertise/Trajetória
    trajetoria = clean_text(row.get('Qual sua trajetória no mercado digital? Quais foram os aprendizados, conquistas e também os desafios ou fracassos que teve? ', ''))
    if trajetoria:
        highlights.append({
            "icon": "🙏",
            "title": "Sua Expertise",
            "content": trajetoria[:500] + "..." if len(trajetoria) > 500 else trajetoria
        })
    
    # Pontos Fortes (baseado nos scores)
    scores = extract_scores(row)
    pontos_fortes = f"Posicionamento Digital ({scores['digital']}/10), Experiência em Palestras ({scores['speaking']}/10), Mentoria estruturada ({scores['mentoring']}/10), Escrita de livros ({scores['book']}/10)"
    highlights.append({
        "icon": "🏆",
        "title": "Seus Pontos Fortes",
        "content": pontos_fortes
    })
    
    # Motivação/Legado
    legado = clean_text(row.get('Qual legado deseja deixar no mundo?', ''))
    if legado:
        highlights.append({
            "icon": "💝",
            "title": "Sua Motivação",
            "content": legado
        })
    
    return highlights

def create_key_data(row):
    """Cria dados-chave do perfil"""
    return {
        "legacy": clean_text(row.get('Qual legado deseja deixar no mundo?', '')),
        "segment": clean_text(row.get('Em qual segmento?', 'Não especificado')),
        "experience": clean_text(row.get('Há quanto tempo?', 'Não especificado')),
        "current_work": clean_text(row.get('Quais produtos ou serviços você já oferece? Inclua links de vendas/redes sociais/sites', '')),
        "turning_point": "Entrada na Mentoria Mentor de Líderes",
        "major_achievements": clean_text(row.get('Quais conquistas são inegociáveis para você?', ''))
    }

def convert_excel_to_supabase_format():
    """Converte dados do Excel para formato Supabase"""
    print("🔄 Iniciando conversão dos dados...")
    
    # Ler arquivo Excel
    df = pd.read_excel('Formulários/responses.xlsx')
    print(f"📊 Carregados {len(df)} registros do Excel")
    
    converted_data = []
    
    for index, row in df.iterrows():
        try:
            # Extrair informações básicas
            nome_completo = clean_text(row.get('Qual é o seu nome completo?', ''))
            nome_display = clean_text(row.get('Como você gosta de ser chamado(a)?', ''))
            email = clean_text(row.get('E-mail para contato:', ''))
            
            if not nome_completo or not email:
                print(f"⚠️  Pulando linha {index+1}: dados incompletos")
                continue
            
            # Extrair scores
            scores = extract_scores(row)
            
            # Criar estrutura no formato Supabase
            user_data = {
                "id": str(uuid.uuid4()),
                "user_id": str(uuid.uuid4()),
                "student_name": email,  # Usando email como identificador
                "display_name": nome_display or nome_completo,
                "title": f"Desenvolvimento de Liderança - {nome_display or nome_completo}",
                "subtitle": f"🚀 Liderança + Propósito: Especialista em desenvolvimento pessoal e liderança",
                "archetype": determine_archetype(row),
                "focus": None,
                "avatar_url": None,
                "colors": {
                    "primary": "#2c3e50",
                    "secondary": "#34495e", 
                    "accent": "#27ae60"
                },
                "platform_strategy": determine_platform_strategy(scores),
                "scores": scores,
                "profile_highlights": create_profile_highlights(row),
                "motivation_quote": f"{nome_display}, sua jornada de transformação e liderança será a base para construir uma autoridade que impacta vidas através de propósito e sabedoria prática.",
                "strategy_text": "Este plano foi adaptado especificamente para sua evolução como líder, priorizando LinkedIn para networking profissional, Instagram para inspiração e YouTube para conteúdo educativo.",
                "instructions_text": f"{nome_display}, suas atividades foram personalizadas baseadas no seu perfil de liderança e objetivos específicos.",
                "context_text": "Cada atividade considera sua experiência, objetivos e potencial de impacto na vida de outras pessoas.",
                "key_data": create_key_data(row),
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat(),
                # Dados originais do formulário
                "original_form_data": {
                    "nome_completo": nome_completo,
                    "cpf": clean_text(row.get('Qual o seu CPF?', '')),
                    "data_nascimento": clean_text(row.get('Data de nascimento:', '')),
                    "telefone": clean_text(row.get('Telefone/WhatsApp:', '')),
                    "instagram": clean_text(row.get('Instagram:', '')),
                    "linkedin": clean_text(row.get('LinkedIn (opcional):', '')),
                    "endereco": {
                        "address": clean_text(row.get('Address', '')),
                        "address_line_2": clean_text(row.get('Address line 2', '')),
                        "city": clean_text(row.get('City/Town', '')),
                        "state": clean_text(row.get('State/Region/Province', '')),
                        "zip_code": clean_text(row.get('Zip/Post Code', '')),
                        "country": clean_text(row.get('Country', ''))
                    },
                    "visao_1_ano": clean_text(row.get('Como você se vê daqui 1 ano?', '')),
                    "visao_5_anos": clean_text(row.get('Como você se vê em 5 anos?', '')),
                    "visao_10_anos": clean_text(row.get('Como você se vê em 10 anos?', '')),
                    "experiencias_desejadas": clean_text(row.get('Quais experiências de vida você gostaria de viver nos próximos anos (ex: viagens, projetos, conexões)?', '')),
                    "recursos_ilimitados": clean_text(row.get('Se você tivesse recursos ilimitados, o que criaria ou realizaria?', '')),
                    "reconhecimento_futuro": clean_text(row.get('O que você gostaria que pessoas importantes dissessem sobre você em 10 anos?', ''))
                }
            }
            
            converted_data.append(user_data)
            print(f"✅ Convertido: {nome_display} ({email})")
            
        except Exception as e:
            print(f"❌ Erro na linha {index+1}: {str(e)}")
            continue
    
    print(f"🎉 Conversão concluída! {len(converted_data)} registros convertidos")
    return converted_data, df

def analyze_data_patterns(converted_data, original_df):
    """Analisa padrões nos dados"""
    print("\n📈 Analisando padrões dos dados...")
    
    analysis = {
        "total_records": len(converted_data),
        "arquetypes": {},
        "scores_analysis": {
            "digital": {"min": 10, "max": 0, "avg": 0},
            "mentoring": {"min": 10, "max": 0, "avg": 0},
            "speaking": {"min": 10, "max": 0, "avg": 0},
            "book": {"min": 10, "max": 0, "avg": 0}
        },
        "segments": {},
        "experience_levels": {},
        "geographic_distribution": {}
    }
    
    # Análise de arquétipos
    for record in converted_data:
        archetype = record['archetype']
        analysis['arquetypes'][archetype] = analysis['arquetypes'].get(archetype, 0) + 1
        
        # Análise de scores
        scores = record['scores']
        for score_type, value in scores.items():
            if value < analysis['scores_analysis'][score_type]['min']:
                analysis['scores_analysis'][score_type]['min'] = value
            if value > analysis['scores_analysis'][score_type]['max']:
                analysis['scores_analysis'][score_type]['max'] = value
        
        # Análise de segmentos
        segment = record['key_data']['segment']
        analysis['segments'][segment] = analysis['segments'].get(segment, 0) + 1
        
        # Análise de experiência
        experience = record['key_data']['experience']
        analysis['experience_levels'][experience] = analysis['experience_levels'].get(experience, 0) + 1
        
        # Análise geográfica
        country = record['original_form_data']['endereco']['country']
        analysis['geographic_distribution'][country] = analysis['geographic_distribution'].get(country, 0) + 1
    
    # Calcular médias dos scores
    for score_type in analysis['scores_analysis']:
        total = sum(record['scores'][score_type] for record in converted_data)
        analysis['scores_analysis'][score_type]['avg'] = round(total / len(converted_data), 2)
    
    return analysis

if __name__ == "__main__":
    # Executar conversão
    converted_data, original_df = convert_excel_to_supabase_format()
    
    # Analisar padrões
    analysis = analyze_data_patterns(converted_data, original_df)
    
    # Salvar dados convertidos
    with open('dados_convertidos_supabase.json', 'w', encoding='utf-8') as f:
        json.dump(converted_data, f, ensure_ascii=False, indent=2)
    
    # Salvar análise
    with open('analise_dados.json', 'w', encoding='utf-8') as f:
        json.dump(analysis, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 Arquivos salvos:")
    print(f"   - dados_convertidos_supabase.json ({len(converted_data)} registros)")
    print(f"   - analise_dados.json")
    print(f"\n🎯 Análise concluída!")
