'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  { src: "https://placehold.co/800x600.png", alt: "DJ mezclando en vivo", hint: "dj mixing" },
  { src: "https://placehold.co/800x600.png", alt: "Pista de baile llena", hint: "crowd dancing" },
  { src: "https://placehold.co/800x600.png", alt: "Equipo de DJ", hint: "dj equipment" },
  { src: "https://placehold.co/800x600.png", alt: "Luces de neón en un club", hint: "neon club" },
  { src: "https://placehold.co/800x600.png", alt: "DJ con auriculares", hint: "dj headphones" },
];

export function ImageCarousel() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
          Galería de Momentos
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden border-2 border-transparent hover:border-accent transition-colors">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        data-ai-hint={image.hint}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-accent border-accent hover:bg-accent hover:text-accent-foreground" />
          <CarouselNext className="text-accent border-accent hover:bg-accent hover:text-accent-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
