import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Task {
  id: string;
  day: number;
  title: string;
  description?: string;
  time?: string;
  difficulty?: string;
  platform?: string;
  type?: string;
  completed: boolean;
}

interface DailyContent {
  id: string;
  day: number;
  content_type: string;
  title: string;
  strategic_analysis?: string;
  scenes?: any[];
  slides?: any[];
  video_structure?: any;
  audio_suggestion?: string;
  caption_description?: string;
  cta_text?: string;
  hashtags?: string;
}

const WeekView = () => {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentTipOpen, setContentTipOpen] = useState(false);
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchWeekTasks();
  }, [user, weekNumber]);

  const fetchWeekTasks = async () => {
    try {
      if (!user || !weekNumber) return;

      const week = parseInt(weekNumber);
      const startDay = (week - 1) * 7 + 1;
      const endDay = week * 7;

      console.log(`Fetching tasks for week ${week}, days ${startDay}-${endDay}`);

      const { data: tasksData, error } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('day', startDay)
        .lte('day', endDay)
        .order('day', { ascending: true });

      if (error) {
        console.error('Tasks error:', error);
      } else {
        console.log('Fetched tasks:', tasksData);
        setTasks(tasksData || []);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyContent = async (day: number) => {
    try {
      setContentLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('user_daily_content')
        .select('*')
        .eq('user_id', user!.id)
        .eq('day', day)
        .single();

      if (fetchError) {
        console.error('Error fetching daily content:', fetchError);
        setDailyContent(null);
      } else {
        setDailyContent(data as DailyContent);
      }
    } catch (error) {
      console.error('Error:', error);
      setDailyContent(null);
    } finally {
      setContentLoading(false);
    }
  };

  const getPlatformColor = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return 'bg-pink-500 hover:bg-pink-600';
      case 'linkedin':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'youtube':
        return 'bg-red-600 hover:bg-red-700';
      case 'geral':
      case 'general':
        return 'bg-gray-600 hover:bg-gray-700';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
      case 'fácil':
        return 'bg-green-500 hover:bg-green-600';
      case 'medium':
      case 'médio':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'hard':
      case 'difícil':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleContentTip = async (day: number) => {
    if (contentTipOpen && dailyContent?.day === day) {
      setContentTipOpen(false);
      return;
    }
    
    await fetchDailyContent(day);
    setContentTipOpen(true);
  };

  const getContentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'reels':
        return 'bg-gradient-to-r from-pink-500 to-purple-600';
      case 'carousel':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600';
      case 'youtube':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'profile_setup':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'stories':
        return 'bg-gradient-to-r from-orange-500 to-amber-600';
      case 'content_creation':
        return 'bg-gradient-to-r from-indigo-500 to-purple-600';
      case 'article':
        return 'bg-gradient-to-r from-slate-600 to-gray-700';
      case 'planning':
        return 'bg-gradient-to-r from-teal-500 to-cyan-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getContentTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'reels': 'REELS',
      'carousel': 'CARROSSEL',
      'youtube': 'YOUTUBE',
      'profile_setup': 'PERFIL',
      'stories': 'STORIES',
      'content_creation': 'POST',
      'article': 'ARTIGO',
      'planning': 'PLANEJAMENTO'
    };

    return typeMap[type.toLowerCase()] || type.toUpperCase();
  };

  const renderScenes = (scenes: any[]) => {
    if (!scenes || scenes.length === 0) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Roteiro de Cenas</h4>
        {scenes.map((scene, index) => (
          <Card key={index} className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-sm">
                Cena {scene.scene} ({scene.duration})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-blue-600 font-medium">Ação/Visual:</span>
                <p className="text-gray-700 text-sm mt-1">{scene.action}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">Narração:</span>
                <p className="text-gray-700 text-sm mt-1">{scene.audio}</p>
              </div>
              <div>
                <span className="text-yellow-600 font-medium">Texto na Tela:</span>
                <p className="text-gray-700 text-sm mt-1">{scene.text_overlay}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderSlides = (slides: any[]) => {
    if (!slides || slides.length === 0) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Lâminas do Carrossel</h4>
        {slides.map((slide, index) => (
          <Card key={index} className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-sm">
                Lâmina {slide.slide} - {slide.type}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-blue-600 font-medium">Visual:</span>
                <p className="text-gray-700 text-sm mt-1">{slide.visual}</p>
              </div>
              {slide.title && (
                <div>
                  <span className="text-green-600 font-medium">Título:</span>
                  <p className="text-gray-700 text-sm mt-1">{slide.title}</p>
                </div>
              )}
              {slide.subtitle && (
                <div>
                  <span className="text-yellow-600 font-medium">Subtítulo:</span>
                  <p className="text-gray-700 text-sm mt-1">{slide.subtitle}</p>
                </div>
              )}
              {slide.content && (
                <div>
                  <span className="text-purple-600 font-medium">Conteúdo:</span>
                  <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{slide.content}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderVideoStructure = (videoStructure: any) => {
    if (!videoStructure || !videoStructure.sections) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">
          Estrutura do Vídeo ({videoStructure.duration})
        </h4>
        {videoStructure.sections.map((section: any, index: number) => (
          <Card key={index} className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-gray-900 text-sm">
                {section.title} ({section.duration})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-blue-600 font-medium">Visual:</span>
                <p className="text-gray-700 text-sm mt-1">{section.visual}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">Narração:</span>
                <p className="text-gray-700 text-sm mt-1">{section.narration}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const selectedTask = selectedDay ? tasks.find(task => task.day === selectedDay) : null;
  const week = parseInt(weekNumber || '1');
  const weekDays = Array.from({ length: 7 }, (_, i) => (week - 1) * 7 + i + 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Carregando atividades da semana...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center py-3 sm:py-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-gray-700 hover:bg-gray-100 mr-2 sm:mr-4 px-2 sm:px-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Voltar ao Perfil</span>
              <span className="xs:hidden">Voltar</span>
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 drop-shadow-sm">
              Semana {weekNumber}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base font-medium text-center sm:text-left">
          Passe o mouse sobre uma carta para ver o resumo. Clique para ver a atividade completa.
        </p>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Left Sidebar - Days */}
          <div className="w-full lg:w-80 order-2 lg:order-1">
            <div className="space-y-3">
              {weekDays.map((day) => {
                const task = tasks.find(t => t.day === day);
                const isSelected = selectedDay === day;
                
                return (
                  <Card 
                    key={day}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-2 relative group ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-400 shadow-lg ring-2 ring-blue-200' 
                        : 'bg-white border-gray-200 hover:border-blue-300 shadow-sm'
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-bold text-sm sm:text-base drop-shadow-sm ${
                          isSelected ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          Dia {day}
                        </span>
                        {task?.platform && (
                          <Badge className={`text-xs text-white transition-colors ${getPlatformColor(task.platform)}`}>
                            {task.platform}
                          </Badge>
                        )}
                      </div>
                      {task ? (
                        <div className={`text-xs sm:text-sm mb-3 font-medium ${
                          isSelected ? 'text-blue-600' : 'text-gray-700'
                        }`}>
                          {task.title}
                        </div>
                      ) : (
                        <div className="text-xs sm:text-sm text-gray-500 mb-3 italic">
                          Nenhuma atividade disponível
                        </div>
                      )}
                      
                      {/* Content Tip Button */}
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContentTip(day);
                          }}
                          className="text-xs bg-gray-50 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors shadow-sm"
                        >
                          <Lightbulb className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Dica de Conteúdo</span>
                          <span className="sm:hidden">Dica</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Content - Task Details */}
          <div className="flex-1 order-1 lg:order-2 space-y-4">
            {selectedTask ? (
              <>
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <CardTitle className="text-gray-900 text-lg sm:text-xl font-bold drop-shadow-sm leading-tight">
                        {selectedTask.title} - Dia {selectedTask.day}
                      </CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        {selectedTask.platform && (
                          <Badge 
                            className={`text-white transition-colors shadow-sm ${getPlatformColor(selectedTask.platform)}`}
                          >
                            {selectedTask.platform}
                          </Badge>
                        )}
                        {selectedTask.difficulty && (
                          <Badge 
                            className={`text-white transition-colors shadow-sm ${getDifficultyColor(selectedTask.difficulty)}`}
                          >
                            {selectedTask.difficulty}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-700">
                    <p className="mb-4 text-sm sm:text-lg leading-relaxed font-medium">
                      {selectedTask.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs sm:text-sm">
                      {selectedTask.time && (
                        <span className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
                          ⏱️ {selectedTask.time}
                        </span>
                      )}
                      {selectedTask.completed && (
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded-md font-medium">
                          ✅ Concluído
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Expandable Content Tip Section */}
                <Collapsible open={contentTipOpen} onOpenChange={setContentTipOpen}>
                  <CollapsibleTrigger asChild>
                    <Card className="bg-white border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Lightbulb className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                              Dica de Conteúdo - Dia {selectedTask.day}
                            </h3>
                            {dailyContent && (
                              <Badge className={`${getContentTypeColor(dailyContent.content_type)} text-white shadow-lg`}>
                                {getContentTypeLabel(dailyContent.content_type)}
                              </Badge>
                            )}
                          </div>
                          {contentTipOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        {!contentTipOpen && (
                          <p className="text-sm text-gray-600 mt-2">
                            Clique para ver detalhes do conteúdo sugerido
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <Card className="bg-white border-gray-200 shadow-lg mt-2">
                      <CardContent className="p-4 sm:p-6">
                        {contentLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-600">Carregando conteúdo...</span>
                          </div>
                        ) : dailyContent ? (
                          <div className="space-y-6">
                            {/* Strategic Analysis */}
                            {dailyContent.strategic_analysis && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Análise Estratégica</h4>
                                <p className="text-gray-700 leading-relaxed">{dailyContent.strategic_analysis}</p>
                              </div>
                            )}

                            {/* Content Structure */}
                            {dailyContent.scenes && dailyContent.scenes.length > 0 && renderScenes(dailyContent.scenes)}
                            {dailyContent.slides && dailyContent.slides.length > 0 && renderSlides(dailyContent.slides)}
                            {dailyContent.video_structure && renderVideoStructure(dailyContent.video_structure)}

                            {/* Audio Suggestion */}
                            {dailyContent.audio_suggestion && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                  🎵 Áudio Sugerido
                                </h4>
                                <p className="text-gray-700 leading-relaxed">{dailyContent.audio_suggestion}</p>
                              </div>
                            )}

                            {/* Caption Description */}
                            {dailyContent.caption_description && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Descrição para Legenda</h4>
                                <p className="text-gray-700 leading-relaxed">{dailyContent.caption_description}</p>
                              </div>
                            )}

                            {/* CTA */}
                            {dailyContent.cta_text && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Call to Action</h4>
                                <p className="text-gray-700 leading-relaxed">{dailyContent.cta_text}</p>
                              </div>
                            )}

                            {/* Hashtags */}
                            {dailyContent.hashtags && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Hashtags</h4>
                                <p className="text-blue-600 leading-relaxed">{dailyContent.hashtags}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-600">
                              Nenhum conteúdo detalhado foi encontrado para este dia ainda.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </>
            ) : (
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Lightbulb className="h-12 w-12 sm:h-16 sm:w-16 mx-auto opacity-50" />
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg font-medium">
                    Selecione um dia para ver os detalhes da atividade
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
