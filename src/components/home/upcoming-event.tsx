import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export function UpcomingEvent() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Próximo Evento</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Noche de Vinilos</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Una noche especial dedicada al sonido clásico del vinilo. Desde clásicos del house hasta joyas olvidadas del disco.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="h-5 w-5 text-accent" /> Fecha y Hora</h3>
                  <p className="text-muted-foreground">Sábado, 28 de Septiembre, 2024 - 22:00 H</p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-accent" /> Ubicación</h3>
                  <p className="text-muted-foreground">Club Subterráneo, Calle Falsa 123, Ciudad Capital</p>
                </div>
              </li>
            </ul>
            <Button asChild className="mt-4 w-fit self-center lg:self-start bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/eventos">Ver todos los eventos</Link>
            </Button>
          </div>
          <div className="w-full h-64 md:h-96 rounded-xl bg-muted overflow-hidden border-2 border-accent/50">
             <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13264.937748897534!2d-70.65582245131657!3d-33.44359489814441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a1e7b6f7c9%3A0x868428dabd1e39a3!2sPlaza%20de%20Armas!5e0!3m2!1sen!2scl!4v1717878696881"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Placeholder"
              ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
