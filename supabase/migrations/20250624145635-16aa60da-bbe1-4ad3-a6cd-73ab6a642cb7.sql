
-- Create a table for detailed daily content
CREATE TABLE public.user_daily_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day INTEGER NOT NULL,
  content_type TEXT NOT NULL, -- 'reels', 'carousel', 'youtube', etc.
  title TEXT NOT NULL,
  strategic_analysis TEXT,
  scenes JSONB DEFAULT '[]'::jsonb, -- Array of scene objects
  slides JSONB DEFAULT '[]'::jsonb, -- Array of slide objects for carousels
  video_structure JSONB DEFAULT '{}'::jsonb, -- Object for video structure
  audio_suggestion TEXT,
  caption_description TEXT,
  cta_text TEXT,
  hashtags TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one content per day per user
  UNIQUE(user_id, day)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_daily_content ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own daily content" 
  ON public.user_daily_content 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own daily content" 
  ON public.user_daily_content 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily content" 
  ON public.user_daily_content 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily content" 
  ON public.user_daily_content 
  FOR DELETE 
  USING (auth.uid() = user_id);
