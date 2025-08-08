import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Download, Play, PlusCircle } from "lucide-react";
import Link from "next/link";

const mixes = [
  {
    title: "Viaje Nocturno Vol. 3",
    genre: "Deep House / Melodic Techno",
    description: "Sumérgete en una hora de deep house y techno melódico. Una selección de tracks que te transportarán a través de paisajes sonoros únicos.",
  },
  {
    title: "Ritmos de la Jungla",
    genre: "Jungle / Drum & Bass",
    description: "Una sesión energética llena de breaks clásicos y bajos profundos. Pura energía para la pista de baile.",
  },
  {
    title: "Atardecer en la Playa",
    genre: "Balearic / Chillout",
    description: "El soundtrack perfecto para una puesta de sol. Sonidos relajados y atmósferas envolventes para desconectar.",
  },
];

export default function MixesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Mis Mixes</h1>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/mixes/crear">
            <PlusCircle className="mr-2 h-4 w-4" />
            Generar Descripción
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mixes.map((mix, index) => (
          <Card key={index} className="flex flex-col bg-card hover:border-primary/50 border-2 border-transparent transition-all">
            <CardHeader>
              <CardTitle>{mix.title}</CardTitle>
              <CardDescription>{mix.genre}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{mix.description}</p>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-center p-4">
                <p className="text-muted-foreground text-sm">Aquí iría el reproductor de SoundCloud/Mixcloud</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Play className="mr-2 h-4 w-4" />
                Reproducir
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
