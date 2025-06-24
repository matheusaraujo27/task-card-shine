
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

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

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchWeekTasks();
  }, [user, weekNumber]);

  const fetchWeekTasks = async () => {
    try {
      if (!user) return;

      // For now, we'll show all tasks for week 1 (days 1-7)
      const { data: tasksData, error } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('day', 1)
        .lte('day', 7)
        .order('day', { ascending: true });

      if (error) {
        console.error('Tasks error:', error);
      } else {
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
        return 'bg-pink-500';
      case 'linkedin':
        return 'bg-blue-600';
      case 'youtube':
        return 'bg-red-600';
      case 'geral':
      case 'general':
        return 'bg-gray-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
      case 'fácil':
        return 'bg-green-500';
      case 'medium':
      case 'médio':
        return 'bg-yellow-500';
      case 'hard':
      case 'difícil':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedTask = selectedDay ? tasks.find(task => task.day === selectedDay) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading week tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-gray-700 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Perfil
            </Button>
            <h1 className="text-2xl font-bold">Semana {weekNumber}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-300 mb-8">
          Passe o mouse sobre uma carta para ver o resumo. Clique para ver a atividade completa.
        </p>

        <div className="flex gap-8">
          {/* Left Sidebar - Days */}
          <div className="w-80">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const task = tasks.find(t => t.day === day);
                const isSelected = selectedDay === day;
                
                return (
                  <Card 
                    key={day}
                    className={`cursor-pointer transition-all duration-200 border-2 ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-400' 
                        : 'bg-gray-800 border-gray-600 hover:border-blue-500'
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Dia {day}</span>
                        {task?.platform && (
                          <Badge className="text-xs text-white bg-blue-500">
                            {task.platform}
                          </Badge>
                        )}
                      </div>
                      {task && (
                        <div className="text-sm text-gray-300">
                          {task.title}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Content - Task Details */}
          <div className="flex-1">
            {selectedTask ? (
              <Card className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-xl">
                      {selectedTask.title} - Dia {selectedTask.day}
                    </CardTitle>
                    <div className="flex gap-2">
                      {selectedTask.platform && (
                        <Badge 
                          className={`${getPlatformColor(selectedTask.platform)} text-white`}
                        >
                          {selectedTask.platform}
                        </Badge>
                      )}
                      {selectedTask.difficulty && (
                        <Badge 
                          className={`${getDifficultyColor(selectedTask.difficulty)} text-white`}
                        >
                          {selectedTask.difficulty}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-4 text-lg">{selectedTask.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    {selectedTask.time && (
                      <span className="flex items-center">
                        ⏱️ {selectedTask.time}
                      </span>
                    )}
                    {selectedTask.completed && (
                      <span className="text-green-400">✅ Completed</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="p-12 text-center">
                  <p className="text-gray-400 text-lg">
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
