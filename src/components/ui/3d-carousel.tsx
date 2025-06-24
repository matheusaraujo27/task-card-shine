
"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

interface WeekCard {
  week: number
  activities: number
  progress: number
  isAvailable: boolean
}

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (week: number) => void
    controls: any
    cards: WeekCard[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 800 : 1200
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`week-${card.week}`}
              className={`absolute flex h-full origin-center items-center justify-center rounded-xl p-2 ${
                card.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => card.isAvailable && handleClick(card.week)}
            >
              <motion.div
                className="w-full h-32 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center border-2 border-blue-200"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  S{card.week}
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  {card.activities} atividades
                </p>
                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {card.progress.toFixed(0)}% concluído
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

function WeekCarousel({ 
  weeks, 
  onWeekClick 
}: { 
  weeks: WeekCard[]
  onWeekClick: (week: number) => void 
}) {
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (week: number) => {
    onWeekClick(week)
  }

  return (
    <motion.div layout className="relative">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={weeks}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { WeekCarousel };
