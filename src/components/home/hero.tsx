import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="DJ en un evento"
        data-ai-hint="dj event"
        fill
        className="object-cover absolute inset-0 z-0 opacity-40"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4">
          Sonidos Selectos
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-foreground/80 mb-8">
          Explorando los ritmos que mueven el alma. Sets de DJ en vivo, mixes exclusivos y próximos eventos.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/eventos">Próximos Eventos</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Link href="/mixes">Escuchar Mixes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
