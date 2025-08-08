'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy server action
async function submitContactForm(data: FormValues) {
  console.log('Form data submitted:', data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you would send this to your backend/API
  return { success: true, message: 'Mensaje enviado con éxito.' };
}


const FormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'El asunto es requerido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type FormValues = z.infer<typeof FormSchema>;

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      const result = await submitContactForm(data);
      if (result.success) {
        toast({
          title: "¡Gracias!",
          description: result.message,
        });
        reset();
      } else {
        throw new Error(result.message || 'An unknown error occurred.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo enviar el mensaje. Inténtalo de nuevo.";
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Envíame un mensaje</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input id="subject" {...register('subject')} />
            {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" rows={6} {...register('message')} />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Enviando...' : <> <Send className="mr-2 h-4 w-4" /> Enviar Mensaje </>}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
