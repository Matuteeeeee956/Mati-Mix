'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Waves } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/mixes', label: 'Mixes' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/contacto', label: 'Contacto' },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          onClick={() => inSheet && setIsOpen(false)}
          className={cn(
            "justify-start text-foreground/80 hover:text-foreground w-full",
            !inSheet && "w-auto justify-center",
            pathname === link.href && "text-accent font-semibold border-b-2 border-accent rounded-none"
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Waves className="h-6 w-6 text-accent" />
          <span>Sonidos Selectos</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks />
        </nav>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks inSheet />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
