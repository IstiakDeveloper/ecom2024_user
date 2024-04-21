"use client";
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Slider({ sliderList }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEDN_BASE_URL + slider?.image}
                unoptimized={true}
                width={1000}
                height={400}
                alt="Slider"
                className="w-full h-[200px] md:h-[500px] object-cover rounded-2xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;
