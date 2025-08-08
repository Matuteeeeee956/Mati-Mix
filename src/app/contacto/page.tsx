import { ContactForm } from './contact-form';

export default function ContactoPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contacto</h1>
        <p className="text-muted-foreground">
          ¿Tienes alguna pregunta o quieres contratarme para un evento? Llena el formulario.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
