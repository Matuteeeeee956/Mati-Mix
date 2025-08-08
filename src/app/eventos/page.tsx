import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, PlusCircle, Ticket } from "lucide-react";
import Link from "next/link";
import { eventsService, type Event } from "@/lib/events";


const EventCard = ({ event }: { event: Event }) => {
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


export default async function EventsPage() {
  const upcomingEvents = await eventsService.getUpcomingEvents();
  const pastEvents = await eventsService.getPastEvents();

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
