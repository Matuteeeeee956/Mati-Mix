import { CreateMixForm } from './create-mix-form';

export default function CreateMixPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Generador de Descripciones de Mix</h1>
        <p className="text-muted-foreground">
          Completa los detalles de tu mix y deja que la IA cree una descripción atractiva para ti.
        </p>
      </div>
      <CreateMixForm />
    </div>
  );
}
