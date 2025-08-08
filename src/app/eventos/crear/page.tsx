import { CreateEventForm } from './create-event-form';

export default function CreateEventPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Generador de Descripciones de Eventos</h1>
        <p className="text-muted-foreground">
          Proporciona los detalles del evento y la IA generará una descripción cautivadora para promocionarlo.
        </p>
      </div>
      <CreateEventForm />
    </div>
  );
}
