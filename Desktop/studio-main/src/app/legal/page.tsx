import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FridaLogo from '@/components/restaurant/FridaLogo';

export default function LegalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
       <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center justify-center border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-8">
        <div className="flex items-center gap-3">
          <FridaLogo className="h-9 w-9 text-primary" />
          <h1 className="font-script text-3xl font-bold tracking-wider text-foreground">
            FRIDA BAR CAFE
          </h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl flex-1 py-12 px-4">
        <div className="mb-8">
            <Link href="/" passHref>
                <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
                </Button>
            </Link>
        </div>
        <div className="prose prose-invert mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-primary">Avisos Legales</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>Este aviso legal rige el uso del sitio web de Frida Bar Cafe.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">1. Información de la Empresa</h2>
            <p>
                <strong>Nombre de la empresa:</strong> Frida Bar Cafe<br/>
                <strong>Dirección:</strong> 123 Calle Ficticia, Ciudad, País<br/>
                <strong>Email:</strong> contacto@fridabarcafe.com<br/>
                <strong>Teléfono:</strong> +1 (234) 567-89
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">2. Propiedad Intelectual e Industrial</h2>
            <p>Todos los derechos de propiedad intelectual del contenido de este sitio web y su diseño gráfico son propiedad exclusiva de Frida Bar Cafe. El uso no autorizado de esta información, así como los perjuicios ocasionados en los derechos de propiedad intelectual e industrial de Frida Bar Cafe, dará lugar al ejercicio de las acciones que legalmente correspondan y, en su caso, a las responsabilidades que de dicho ejercicio se deriven.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">3. Exclusión de Responsabilidad</h2>
            <p>Frida Bar Cafe no se hace responsable de los posibles daños o perjuicios que se pudieran derivar de interferencias, omisiones, interrupciones, virus informáticos, averías telefónicas o desconexiones en el funcionamiento operativo de este sistema electrónico, motivadas por causas ajenas a Frida Bar Cafe.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">4. Legislación Aplicable</h2>
            <p>Con carácter general las relaciones entre Frida Bar Cafe con los Usuarios de sus servicios telemáticos, presentes en la web, se encuentran sometidas a la legislación y jurisdicción locales.</p>

            <p className="mt-6">Los usuarios de esta web son conscientes de todo lo expuesto y lo aceptan voluntariamente.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
