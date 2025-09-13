import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FridaLogo from '@/components/restaurant/FridaLogo';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-6 text-primary">Términos y Condiciones</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>Bienvenido a Frida Bar Cafe. Al utilizar nuestro sitio web y nuestros servicios, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso, que junto con nuestra política de privacidad rigen la relación de Frida Bar Cafe con usted en relación con este sitio web.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">1. Uso del Servicio</h2>
            <p>El uso de este sitio web está sujeto a las siguientes condiciones de uso:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>El contenido de las páginas de este sitio web es para su información y uso general únicamente. Está sujeto a cambios sin previo aviso.</li>
              <li>Ni nosotros ni terceros ofrecemos garantía alguna en cuanto a la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales que se encuentran u ofrecen en este sitio web para un propósito particular.</li>
              <li>El uso de cualquier información o material en este sitio web es bajo su propio riesgo, para lo cual no seremos responsables.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">2. Pedidos y Pagos</h2>
            <p>Al realizar un pedido, usted se compromete a proporcionar información actual, completa y precisa. Todos los precios están en la moneda local e incluyen los impuestos aplicables, a menos que se indique lo contrario. El pago debe realizarse en el momento del pedido a través de los métodos de pago disponibles.</p>

            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">3. Política de Cancelación y Reembolso</h2>
            <p>Las cancelaciones deben realizarse dentro de un plazo razonable antes de la hora de entrega programada. Los reembolsos se procesarán de acuerdo con nuestra política de devoluciones, que puede variar según las circunstancias del pedido.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">4. Propiedad Intelectual</h2>
            <p>Este sitio web contiene material que es de nuestra propiedad o que tenemos licenciado. Este material incluye, entre otros, el diseño, la maquetación, el aspecto, la apariencia y los gráficos. La reproducción está prohibida salvo de conformidad con el aviso de derechos de autor, que forma parte de estos términos and condiciones.</p>

             <h2 className="text-2xl font-semibold mt-6 mb-4 text-foreground">5. Modificaciones de los Términos</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Su uso continuado del sitio después de cualquier cambio constituirá su aceptación de los nuevos términos.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
