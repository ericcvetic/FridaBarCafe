import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FridaLogo from '@/components/restaurant/FridaLogo';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-6 text-primary">Política de Privacidad</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>Esta política de privacidad establece cómo Frida Bar Cafe utiliza y protege cualquier información que usted proporciona cuando utiliza este sitio web.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">1. Información que Recopilamos</h2>
            <p>Podemos recopilar la siguiente información:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Nombre e información de contacto, incluyendo dirección de correo electrónico.</li>
              <li>Información demográfica como código postal, preferencias e intereses.</li>
              <li>Información relevante para encuestas de clientes y/o ofertas.</li>
              <li>Información de pago y dirección para procesar sus pedidos.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">2. Uso de la Información</h2>
            <p>Utilizamos esta información para entender sus necesidades y proporcionarle un mejor servicio, y en particular por las siguientes razones:</p>
             <ul className="list-disc list-inside space-y-2">
              <li>Mantenimiento de registros internos.</li>
              <li>Mejorar nuestros productos y servicios.</li>
              <li>Procesar sus pedidos y gestionar la entrega.</li>
              <li>Enviar correos electrónicos promocionales sobre nuevos productos, ofertas especiales u otra información que pensemos que puede resultarle interesante.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">3. Seguridad</h2>
            <p>Estamos comprometidos a garantizar que su información esté segura. Con el fin de prevenir el acceso o la divulgación no autorizados, hemos implementado procedimientos físicos, electrónicos y administrativos adecuados para salvaguardar y asegurar la información que recopilamos en línea.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">4. Cookies</h2>
            <p>Una cookie es un pequeño archivo que pide permiso para ser colocado en el disco duro de su ordenador. Una vez que usted acepta, el archivo se añade y la cookie ayuda a analizar el tráfico web o le permite saber cuándo visita un sitio en particular. Utilizamos cookies de registro de tráfico para identificar qué páginas se están utilizando. Esto nos ayuda a analizar datos sobre el tráfico de la página web y mejorar nuestro sitio web para adaptarlo a las necesidades del cliente.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">5. Control de su Información Personal</h2>
            <p>No venderemos, distribuiremos ni cederemos su información personal a terceros a menos que tengamos su permiso o estemos obligados por ley a hacerlo. Puede solicitar detalles de la información personal que tenemos sobre usted en virtud de la Ley de Protección de Datos. Si cree que cualquier información que tenemos sobre usted es incorrecta o está incompleta, por favor, póngase en contacto con nosotros.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
