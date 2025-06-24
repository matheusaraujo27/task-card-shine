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
import { Trophy } from 'lucide-react';
import { Case } from '@/components/ui/cases-with-infinite-scroll';

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
      const { data: dashboardDataRaw, error: dashboardError } = await supabase
        .from('user_dashboard')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (dashboardError) {
        console.error('Dashboard error:', dashboardError);
        // Set empty dashboard data if none exists
        setDashboardData({});
      } else {
        // Parse the JSON data properly
        const parsedDashboardData: DashboardData = {
          colors: dashboardDataRaw?.colors as Record<string, any> || {},
          platform_strategy: dashboardDataRaw?.platform_strategy as Record<string, any> || {},
          scores: dashboardDataRaw?.scores as Record<string, any> || {},
          profile_highlights: (dashboardDataRaw?.profile_highlights as Array<any>) || [],
          motivation_quote: dashboardDataRaw?.motivation_quote || '',
          strategy_text: dashboardDataRaw?.strategy_text || '',
          instructions_text: dashboardDataRaw?.instructions_text || '',
          context_text: dashboardDataRaw?.context_text || '',
          sample_activities: (dashboardDataRaw?.sample_activities as Array<any>) || [],
          key_data: dashboardDataRaw?.key_data as Record<string, any> || {}
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

  const getWeekActivitiesCount = (weekNumber: number) => {
    const weekTasks = tasks.filter(task => 
      task.day >= (weekNumber - 1) * 7 + 1 && task.day <= weekNumber * 7
    );
    return weekTasks.length;
  };

  const handleWeekClick = (week: number) => {
    navigate(`/week/${week}`);
  };

  // Prepare week data for the carousel
  const weekCards = [1, 2, 3, 4, 5, 6, 7].map((week) => ({
    week,
    activities: getWeekActivitiesCount(week),
    progress: getWeekProgress(week),
    onWeekClick: handleWeekClick,
  }));

  // Default profile highlights when no data exists
  const defaultProfileHighlights = [
    {
      icon: "🎯",
      title: "Seu Objetivo Principal",
      content: "Adicionando dados do formulário..."
    },
    {
      icon: "📋",
      title: "Sua Expertise", 
      content: "Adicionando dados do formulário..."
    },
    {
      icon: "⚡",
      title: "Seus Pontos Fortes",
      content: "Adicionando dados do formulário..."
    },
    {
      icon: "💖",
      title: "Sua Motivação",
      content: "Adicionando dados do formulário..."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Use profile highlights from database or default ones
  const profileHighlights = dashboardData?.profile_highlights && dashboardData.profile_highlights.length > 0 
    ? dashboardData.profile_highlights 
    : defaultProfileHighlights;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="text-xs sm:text-sm bg-white text-slate-800">
                  {profile?.display_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg font-semibold truncate">{profile?.display_name || 'User'}</h1>
                <p className="text-xs sm:text-sm text-gray-300 truncate">
                  {dashboardData?.strategy_text || "Adicionando dados do formulário..."}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                onClick={() => toast({ title: "Ranking", description: "Feature coming soon!" })}
              >
                <Trophy size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">1808 pts</span>
                <span className="xs:hidden">1808</span>
              </Button>
              <Button onClick={handleSignOut} variant="outline" className="text-white border-white hover:bg-white hover:text-slate-800 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2">
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Profile Section */}
        <div className="mb-4 sm:mb-6">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-br-full opacity-10"></div>
            <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500 rounded-br-full"></div>
            <CardContent className="p-4 sm:p-6 relative">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-base sm:text-lg">
                    {profile?.display_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
                    Seu Perfil Personalizado, {profile?.display_name?.split(' ')[0] || 'Usuário'}
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Highlights Grid */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {profileHighlights.map((highlight, index) => {
              const cornerColors = ['from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600', 'from-pink-500 to-pink-600'];
              const solidCornerColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'];
              return (
                <Card key={index} className="bg-white shadow-sm border border-gray-200 rounded-xl relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-br ${cornerColors[index % cornerColors.length]} rounded-br-full opacity-10`}></div>
                  <div className={`absolute top-0 left-0 w-8 h-8 ${solidCornerColors[index % solidCornerColors.length]} rounded-br-full`}></div>
                  <CardContent className="p-3 sm:p-4 relative">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center text-sm sm:text-base">
                      <span className="mr-2">{highlight.icon}</span>
                      {highlight.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {highlight.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="mb-6 sm:mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-br-full opacity-20"></div>
            <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500 rounded-br-full"></div>
            <CardContent className="p-4 sm:p-6 relative">
              <blockquote className="text-sm sm:text-base italic text-blue-800 font-medium leading-relaxed">
                {dashboardData?.motivation_quote || `"${profile?.display_name?.split(' ')[0] || 'Usuário'}, sua jornada de transformação será a base para construir uma autoridade digital que impacta vidas." 💙`}
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Guide */}
        <div className="mb-6 sm:mb-8">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-br-full opacity-10"></div>
            <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500 rounded-br-full"></div>
            <CardContent className="p-4 sm:p-6 relative">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Como Usar Este Guia Personalizado
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {dashboardData?.instructions_text || "Adicionando dados do formulário..."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="mb-6 sm:mb-8">
          <Card className="bg-white shadow-sm border border-gray-200 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-br-full opacity-10"></div>
            <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500 rounded-br-full"></div>
            <CardHeader className="pb-2 sm:pb-3 relative">
              <CardTitle className="text-base sm:text-lg">Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Tasks Completed</span>
                  <span>{completedTasks} of {totalTasks}</span>
                </div>
                <Progress value={progressPercentage} className="h-1.5 sm:h-2" />
                <p className="text-xs sm:text-sm text-gray-600">
                  {progressPercentage.toFixed(0)}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weeks Section with Infinite Scroll Carousel */}
        <div>
          <Case weeks={weekCards} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
