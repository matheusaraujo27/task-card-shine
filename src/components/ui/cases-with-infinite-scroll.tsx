
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface WeekData {
  week: number;
  activities: number;
  progress: number;
  onWeekClick: (week: number) => void;
}

interface CaseProps {
  weeks: WeekData[];
}

function Case({ weeks }: CaseProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animationId, setAnimationId] = useState<NodeJS.Timeout | null>(null);

  const smoothScrollNext = useCallback(() => {
    if (!api) return;
    
    const totalSlides = api.scrollSnapList().length;
    const nextIndex = (current + 1) % totalSlides;
    
    // Smooth scroll with easing
    api.scrollTo(nextIndex, true);
    setCurrent(nextIndex);
  }, [api, current]);

  const scheduleNextAnimation = useCallback(() => {
    if (isHovered) return;
    
    const timer = setTimeout(() => {
      smoothScrollNext();
    }, 4000); // Slightly longer pause for better UX
    
    setAnimationId(timer);
  }, [smoothScrollNext, isHovered]);

  useEffect(() => {
    if (!api) return;

    // Clear existing timer
    if (animationId) {
      clearTimeout(animationId);
    }

    // Schedule next animation
    scheduleNextAnimation();

    return () => {
      if (animationId) {
        clearTimeout(animationId);
      }
    };
  }, [api, current, scheduleNextAnimation, animationId]);

  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animationId) {
      clearTimeout(animationId);
      setAnimationId(null);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!isHovered && api) {
      scheduleNextAnimation();
    }
  }, [isHovered, scheduleNextAnimation, api]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center animate-fade-in">
            Acesse seu Plano de Atividades
          </h3>
          <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Carousel 
              setApi={setApi} 
              className="w-full"
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {weeks.map((weekData, index) => (
                  <CarouselItem 
                    className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/7" 
                    key={weekData.week}
                  >
                    <div 
                      className="group cursor-pointer bg-white border-2 border-blue-200 rounded-lg p-3 sm:p-4 text-center shadow-sm
                        will-change-transform
                        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                        hover:shadow-2xl hover:shadow-blue-100/50
                        hover:scale-[1.05] hover:border-blue-400 hover:-translate-y-1
                        hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30
                        active:scale-[0.98] active:transition-transform active:duration-150
                        animate-fade-in"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                      onClick={() => weekData.onWeekClick(weekData.week)}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 drop-shadow-sm
                        transition-all duration-300 ease-out
                        group-hover:text-blue-700 group-hover:scale-110 group-hover:drop-shadow-md">
                        S{weekData.week}
                      </div>
                      <p className="text-xs text-gray-600 mb-2 font-medium
                        transition-colors duration-300
                        group-hover:text-gray-700">
                        {weekData.activities} atividades
                      </p>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2
                        transition-all duration-300
                        group-hover:h-2 group-hover:shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full
                            transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                            group-hover:from-blue-600 group-hover:to-blue-700
                            group-hover:shadow-lg group-hover:shadow-blue-500/30"
                          style={{ 
                            width: `${weekData.progress}%`,
                            transform: isHovered ? 'scaleY(1.1)' : 'scaleY(1)',
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 font-medium
                        transition-all duration-300
                        group-hover:text-gray-700 group-hover:font-semibold">
                        {weekData.progress.toFixed(0)}% concluído
                      </p>
                      
                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 rounded-lg opacity-0 
                        transition-opacity duration-500
                        group-hover:opacity-100
                        bg-gradient-to-br from-blue-400/10 via-transparent to-blue-600/10
                        pointer-events-none" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Case };
