import { Github, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} Sonidos Selectos. Todos los derechos reservados.
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-accent" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-accent" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-accent" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
