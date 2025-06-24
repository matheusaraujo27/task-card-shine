
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Cards Dashboard</h1>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    {profile?.display_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {profile?.display_name || 'User'}
                  </h2>
                  {profile?.title && (
                    <p className="text-lg text-gray-700 mb-2">{profile.title}</p>
                  )}
                  {profile?.subtitle && (
                    <p className="text-gray-600 mb-3">{profile.subtitle}</p>
                  )}
                  <div className="flex gap-2">
                    {profile?.archetype && (
                      <Badge variant="secondary">{profile.archetype}</Badge>
                    )}
                    {profile?.focus && (
                      <Badge variant="outline">{profile.focus}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
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

        {/* Motivation Quote */}
        {dashboardData?.motivation_quote && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-gray-700 text-center">
                  "{dashboardData.motivation_quote}"
                </blockquote>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Highlights */}
        {dashboardData?.profile_highlights && dashboardData.profile_highlights.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.profile_highlights.map((highlight: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{highlight.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-gray-600">{highlight.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Weeks Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Learning Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((week) => {
              const weekProgress = getWeekProgress(week);
              const isAvailable = week === 1; // For now, only week 1 is available
              
              return (
                <Card 
                  key={week} 
                  className={`cursor-pointer transition-all duration-200 ${
                    isAvailable 
                      ? 'hover:shadow-lg hover:scale-105' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => isAvailable && navigate(`/week/${week}`)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      S{week}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Semana {week}
                    </h4>
                    {isAvailable ? (
                      <div className="space-y-2">
                        <Progress value={weekProgress} className="h-2" />
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
