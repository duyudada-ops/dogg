
import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"

interface AutoCarouselProps {
  children: React.ReactNode
  autoSlideInterval?: number
  className?: string
}

export function AutoCarousel({ children, autoSlideInterval = 4000, className }: AutoCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [api, autoSlideInterval])

  return (
    <Carousel setApi={setApi} className={className} opts={{ loop: true }}>
      {children}
    </Carousel>
  )
}
