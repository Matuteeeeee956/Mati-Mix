import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, PlusCircle, Ticket } from "lucide-react";
import Link from "next/link";

const upcomingEvents = [
  {
    name: "Noche de Vinilos",
    date: "2024-09-28T22:00:00",
    location: "Club Subterráneo, Ciudad Capital",
    description: "Una noche especial dedicada al sonido clásico del vinilo. Desde clásicos del house hasta joyas olvidadas del disco."
  },
  {
    name: "Warehouse Rave",
    date: "2024-10-12T23:00:00",
    location: "Bodega Industrial 7, Distrito Industrial",
    description: "Techno industrial y acid en un auténtico almacén. Prepárate para una noche intensa y sin concesiones."
  },
];

const pastEvents = [
  {
    name: "Sunset Rooftop Party",
    date: "2024-08-15T18:00:00",
    location: "Terraza del Sol, Hotel Vista",
    description: "Despedimos el verano con una sesión de house y disco mientras el sol se pone sobre la ciudad."
  },
];

const EventCard = ({ event }: { event: typeof upcomingEvents[0] }) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="flex flex-col bg-card hover:border-primary/50 border-2 border-transparent transition-all">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription className="flex items-center pt-2">
          <Calendar className="mr-2 h-4 w-4 text-accent" /> {formattedDate} - {formattedTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="mr-2 h-4 w-4" /> {event.location}
        </div>
        <p className="text-sm">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Ticket className="mr-2 h-4 w-4" />
          Obtener Tickets
        </Button>
      </CardFooter>
    </Card>
  );
};


export default function EventsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Eventos</h1>
        <Button asChild>
          <Link href="/eventos/crear">
            <PlusCircle className="mr-2 h-4 w-4" />
            Generar Descripción
          </Link>
        </Button>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Próximos Eventos</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-6">Eventos Pasados</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event, index) => (
            <Card key={index} className="opacity-60 flex flex-col bg-card border-2 border-transparent">
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription className="flex items-center pt-2">
                  <Calendar className="mr-2 h-4 w-4" /> {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="mr-2 h-4 w-4" /> {event.location}
                </div>
                <p className="text-sm">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
