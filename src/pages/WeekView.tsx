
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import ContentTipSheet from '@/components/ContentTipSheet';

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

const WeekView = () => {
  const { weekNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentTipOpen, setContentTipOpen] = useState(false);
  const [contentTipDay, setContentTipDay] = useState<number | null>(null);

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

  const handleContentTip = (day: number) => {
    setContentTipDay(day);
    setContentTipOpen(true);
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
          <div className="flex-1 order-1 lg:order-2">
            {selectedTask ? (
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

      {/* Content Tip Sheet */}
      <ContentTipSheet
        isOpen={contentTipOpen}
        onClose={() => setContentTipOpen(false)}
        day={contentTipDay || 1}
      />
    </div>
  );
};

export default WeekView;
