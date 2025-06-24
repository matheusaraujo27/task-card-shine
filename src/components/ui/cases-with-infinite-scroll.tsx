
"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000); // Slower animation for better UX

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">
            Acesse seu Plano de Atividades
          </h3>
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {weeks.map((weekData) => (
                <CarouselItem 
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/7" 
                  key={weekData.week}
                >
                  <div 
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white border-2 border-blue-200 hover:border-blue-400 rounded-lg p-3 sm:p-4 text-center shadow-sm"
                    onClick={() => weekData.onWeekClick(weekData.week)}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 drop-shadow-sm">
                      S{weekData.week}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 font-medium">
                      {weekData.activities} atividades
                    </p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${weekData.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      {weekData.progress.toFixed(0)}% concluído
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Case };
