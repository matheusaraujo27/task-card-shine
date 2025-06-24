import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Ranking } from 'lucide-react';

interface Profile {
  id: string;
  student_name: string;
  display_name: string;
  title?: string;
  subtitle?: string;
  archetype?: string;
  focus?: string;
  avatar_url?: string;
}

interface DashboardData {
  colors?: Record<string, any>;
  platform_strategy?: Record<string, any>;
  scores?: Record<string, any>;
  profile_highlights?: Array<{
    icon: string;
    title: string;
    content: string;
  }>;
  motivation_quote?: string;
  strategy_text?: string;
  instructions_text?: string;
  context_text?: string;
  sample_activities?: Array<any>;
  key_data?: Record<string, any>;
}

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

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      if (!user) return;

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch dashboard data
      const { data: dashboardData, error: dashboardError } = await supabase
        .from('user_dashboard')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (dashboardError) {
        console.error('Dashboard error:', dashboardError);
      } else {
        // Parse the JSON data properly
        const parsedDashboardData: DashboardData = {
          colors: dashboardData?.colors as Record<string, any> || {},
          platform_strategy: dashboardData?.platform_strategy as Record<string, any> || {},
          scores: dashboardData?.scores as Record<string, any> || {},
          profile_highlights: (dashboardData?.profile_highlights as Array<any>) || [],
          motivation_quote: dashboardData?.motivation_quote || '',
          strategy_text: dashboardData?.strategy_text || '',
          instructions_text: dashboardData?.instructions_text || '',
          context_text: dashboardData?.context_text || '',
          sample_activities: (dashboardData?.sample_activities as Array<any>) || [],
          key_data: dashboardData?.key_data as Record<string, any> || {}
        };
        setDashboardData(parsedDashboardData);
      }

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('day', { ascending: true });

      if (tasksError) {
        console.error('Tasks error:', tasksError);
      } else {
        setTasks(tasksData || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getWeekProgress = (weekNumber: number) => {
    const weekTasks = tasks.filter(task => 
      task.day >= (weekNumber - 1) * 7 + 1 && task.day <= weekNumber * 7
    );
    const completedTasks = weekTasks.filter(task => task.completed).length;
    return weekTasks.length > 0 ? (completedTasks / weekTasks.length) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="text-sm bg-white text-slate-800">
                  {profile?.display_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold">{profile?.display_name || 'User'}</h1>
                <p className="text-sm text-gray-300">Saúde + Liderança Desafiado a Bem-estar a um Novo Patamar</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
                onClick={() => toast({ title: "Ranking", description: "Feature coming soon!" })}
              >
                <Ranking size={16} />
                <span className="hidden sm:inline">Ranking: 1808 pts</span>
                <span className="sm:hidden">1808 pts</span>
              </Button>
              <Button onClick={handleSignOut} variant="outline" className="text-white border-white hover:bg-white hover:text-slate-800">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Section */}
        <div className="mb-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {profile?.display_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Seu Perfil Personalizado, {profile?.display_name?.split(' ')[0] || 'Ana'}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Highlights Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white shadow-sm border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">🎯</span>
                  Seu Objetivo Principal
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Criar uma Mentalidade de sucesso de longo prazo, estruturada à demanda, além de palestrar em projetos da sucesso.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">📋</span>
                  Sua Expertise
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mais de 10 anos de experiência em saúde, ciências das terapias e próprio da Terapia Breve, com foco em transformação e reconectar com a Identidade.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">⚡</span>
                  Seus Pontos Fortes
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Autoridade no nicho, perfil professores e transformador, Inspiradora e motivacional, com abordagem sofisticada e premium.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-l-4 border-l-pink-500">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">💖</span>
                  Sua Motivação
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ajudar pessoas a transformarem suas vidas, descobrindo o poder que têm dentro de si, e realizar projetos locais de grande impacto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <blockquote className="text-base italic text-blue-800 font-medium">
                "Ana, sua jornada de transformação e seu propósito serão a base para construir uma autoridade digital que impacta vidas e honra seu legado." 💙
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Guide */}
        <div className="mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Como Usar Este Guia Personalizado
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Suas atividades foram personalizadas com foco em mentoria. Priorizamos <strong>LinkedIn (70%)</strong> para autoridade profissional, <strong>Instagram (20%)</strong> para humanização e <strong>YouTube (10%)</strong> para conteúdo educativo.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Tasks Completed</span>
                  <span>{completedTasks} of {totalTasks}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-gray-600">
                  {progressPercentage.toFixed(0)}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weeks Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Acesse seu Plano de Atividades</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((week) => {
              const weekProgress = getWeekProgress(week);
              const isAvailable = week === 1; // For now, only week 1 is available
              
              return (
                <Card 
                  key={week} 
                  className={`cursor-pointer transition-all duration-200 ${
                    isAvailable 
                      ? 'hover:shadow-lg hover:scale-105 bg-white border-2 border-blue-200' 
                      : 'opacity-50 cursor-not-allowed bg-gray-50'
                  }`}
                  onClick={() => isAvailable && navigate(`/week/${week}`)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      S{week}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      7 atividades
                    </p>
                    {isAvailable ? (
                      <div className="space-y-2">
                        <Progress value={weekProgress} className="h-1.5" />
                        <p className="text-xs text-gray-600">
                          {weekProgress.toFixed(0)}% concluído
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">Em breve</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
