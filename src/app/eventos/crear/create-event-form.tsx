'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateEventDescription } from '@/ai/flows/generate-event-description';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { eventsService } from '@/lib/events';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  eventName: z.string().min(1, 'El nombre del evento es requerido'),
  eventDate: z.string().min(1, 'La fecha es requerida'),
  eventTime: z.string().min(1, 'La hora es requerida'),
  eventLocation: z.string().min(1, 'La ubicación es requerida'),
  musicGenre: z.string().min(1, 'El género es requerido'),
  djName: z.string().min(1, 'El nombre del DJ es requerido'),
  additionalDetails: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function CreateEventForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const result = await generateEventDescription(data);
      
      const newEvent = {
        name: data.eventName,
        date: new Date(`${data.eventDate}T${data.eventTime}`).toISOString(),
        location: data.eventLocation,
        description: result.eventDescription,
      };

      await eventsService.addEvent(newEvent);

      toast({
        title: "Evento Creado",
        description: "El nuevo evento ha sido añadido a la lista.",
      });
      
      reset();
      router.push('/eventos');

    } catch (error) {
      console.error('Error generating description or creating event:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el evento. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Nombre del Evento</Label>
              <Input id="eventName" {...register('eventName')} />
              {errors.eventName && <p className="text-sm text-destructive">{errors.eventName.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="djName">Nombre del DJ</Label>
              <Input id="djName" {...register('djName')} />
              {errors.djName && <p className="text-sm text-destructive">{errors.djName.message}</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Fecha</Label>
              <Input id="eventDate" type="date" {...register('eventDate')} />
              {errors.eventDate && <p className="text-sm text-destructive">{errors.eventDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Hora</Label>
              <Input id="eventTime" type="time" {...register('eventTime')} />
              {errors.eventTime && <p className="text-sm text-destructive">{errors.eventTime.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventLocation">Ubicación</Label>
            <Input id="eventLocation" placeholder="Ej: Club Subterráneo, Calle Falsa 123" {...register('eventLocation')} />
            {errors.eventLocation && <p className="text-sm text-destructive">{errors.eventLocation.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="musicGenre">Género de Música</Label>
            <Input id="musicGenre" placeholder="Ej: Techno, House" {...register('musicGenre')} />
            {errors.musicGenre && <p className="text-sm text-destructive">{errors.musicGenre.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalDetails">Detalles Adicionales (Opcional)</Label>
            <Textarea id="additionalDetails" {...register('additionalDetails')} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creando evento...' : <> <Wand2 className="mr-2 h-4 w-4" /> Generar y Crear Evento </>}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
