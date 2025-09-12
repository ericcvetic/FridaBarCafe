import { Button } from '@/components/ui/button';
import { Bike, Phone, MapPin } from 'lucide-react';
import FridaLogo from './FridaLogo';
import Link from 'next/link';

type FooterProps = {
  onDeliveryClick: () => void;
};

export default function Footer({ onDeliveryClick }: FooterProps) {
  return (
    <footer className="mt-auto w-full border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo and About */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-4 flex items-center gap-3">
              <FridaLogo className="h-9 w-9 text-primary" />
              <h3 className="font-script text-2xl font-bold tracking-wider text-foreground">
                FRIDA BAR CAFE
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Sabores auténticos de México, con la pasión de Frida.
            </p>
          </div>

          {/* Delivery Button */}
          <div className="flex flex-col items-center justify-center md:col-span-2">
             <Button 
              size="lg" 
              className="bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 w-full max-w-sm"
              onClick={onDeliveryClick}
            >
              <Bike className="mr-2 h-6 w-6" />
              Servicio de Delivery
            </Button>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col items-center text-center md:items-end md:text-right">
             <h4 className="mb-4 font-script text-xl font-semibold uppercase tracking-wider">Contacto</h4>
             <div className="space-y-2 text-sm text-muted-foreground">
                <a href="tel:+123456789" className="flex items-center justify-center gap-2 transition-colors hover:text-primary md:justify-end">
                  <Phone className="h-4 w-4" />
                  <span>+1 (234) 567-89</span>
                </a>
                <p className="flex items-center justify-center gap-2 md:justify-end">
                  <MapPin className="h-4 w-4" />
                  <span>123 Calle Ficticia, Ciudad</span>
                </p>
             </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
           <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
             <Link href="/terms" className="transition-colors hover:text-primary">Términos y Condiciones</Link>
             <span className="hidden sm:inline">|</span>
             <Link href="/privacy" className="transition-colors hover:text-primary">Política de Privacidad</Link>
             <span className="hidden sm:inline">|</span>
             <Link href="/legal" className="transition-colors hover:text-primary">Avisos Legales</Link>
           </div>
           <p className="mt-4">&copy; {new Date().getFullYear()} Frida Bar Cafe. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
