import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DraggableContainer, GridBody, GridItem } from '@/components/ui/infinite-drag-scroll';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Create array of your custom cards
const cards = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  alt: `Card ${index + 1}`,
  src: "https://brcwfzwtrapbkzpolhws.supabase.co/storage/v1/object/public/cards/cardMDL.png",
}));

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: isLogin ? "Welcome back!" : "Account created successfully!",
        });
        if (isLogin) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Desktop Background - Only visible on larger screens */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <DraggableContainer variant="masonry">
          <GridBody>
            {cards.map((card) => (
              <GridItem
                key={card.id}
                className="relative h-48 w-32 xl:h-64 xl:w-40"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="pointer-events-none absolute h-full w-full object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
              </GridItem>
            ))}
          </GridBody>
        </DraggableContainer>
      </div>

      {/* Mobile/Tablet Background - Clean gradient */}
      <div className="absolute inset-0 z-0 lg:hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Login Form Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        {/* Background overlay only for desktop */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm hidden lg:block"></div>
        
        <Card className="relative w-full max-w-md bg-white/98 backdrop-blur-sm shadow-2xl border-0 lg:bg-white/95 lg:backdrop-blur-md">
          <CardHeader className="text-center space-y-2 p-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isLogin ? 'Sign in to your Cards account' : 'Start your journey with Cards'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white"
                disabled={loading}
              >
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </Button>
            </form>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
