'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateMixDescription } from '@/ai/flows/generate-mix-description';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  mixTitle: z.string().min(1, 'El título es requerido'),
  genre: z.string().min(1, 'El género es requerido'),
  mood: z.string().min(1, 'El mood es requerido'),
  keyHighlights: z.string().min(1, 'Los highlights son requeridos'),
  djName: z.string().min(1, 'El nombre del DJ es requerido'),
  eventInfo: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function CreateMixForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const result = await generateMixDescription(data);
      setGeneratedDescription(result.description);
      toast({
        title: "Descripción generada",
        description: "Tu descripción ha sido creada con éxito.",
      });
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar la descripción. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Detalles del Mix</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mixTitle">Título del Mix</Label>
              <Input id="mixTitle" {...register('mixTitle')} />
              {errors.mixTitle && <p className="text-sm text-destructive">{errors.mixTitle.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="djName">Nombre del DJ</Label>
              <Input id="djName" {...register('djName')} />
              {errors.djName && <p className="text-sm text-destructive">{errors.djName.message}</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Género</Label>
              <Input id="genre" placeholder="Ej: Techno, House, Disco" {...register('genre')} />
              {errors.genre && <p className="text-sm text-destructive">{errors.genre.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mood">Mood</Label>
              <Input id="mood" placeholder="Ej: Energético, Relajado, Oscuro" {...register('mood')} />
              {errors.mood && <p className="text-sm text-destructive">{errors.mood.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyHighlights">Puntos Clave / Tracks Destacados</Label>
            <Textarea id="keyHighlights" {...register('keyHighlights')} />
            {errors.keyHighlights && <p className="text-sm text-destructive">{errors.keyHighlights.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventInfo">Información del Evento (Opcional)</Label>
            <Input id="eventInfo" placeholder="Ej: Grabado en vivo en Boiler Room" {...register('eventInfo')} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generando...' : <> <Wand2 className="mr-2 h-4 w-4" /> Generar Descripción </>}
          </Button>
          {generatedDescription && (
            <div className="space-y-2 pt-4">
              <Label htmlFor="generatedDescription">Descripción Generada</Label>
              <Textarea
                id="generatedDescription"
                readOnly
                value={generatedDescription}
                rows={5}
                className="bg-muted focus-visible:ring-accent"
              />
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
