import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function FeaturedMix() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left lg:gap-10">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Mix Destacado</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Viaje Nocturno Vol. 3</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:mx-0">
            Sumérgete en una hora de deep house y techno melódico. Una selección de tracks que te transportarán a través de paisajes sonoros únicos.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/mixes">
              <PlayCircle className="mr-2 h-5 w-5" />
              Escuchar ahora
            </Link>
          </Button>
        </div>
        <Image
          src="https://placehold.co/600x600.png"
          alt="Portada del Mix"
          data-ai-hint="album cover"
          width={600}
          height={600}
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
