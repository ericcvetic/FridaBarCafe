import { Button } from '@/components/ui/button';
import Image from 'next/image';

type HeroProps = {
  onOrderNowClick: () => void;
};

export default function Hero({ onOrderNowClick }: HeroProps) {
  return (
    <section className="relative h-[60vh] w-full flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="https://storage.googleapis.com/stabl-media/6f131a2a-d275-4720-941c-a50e97e416a9.jpeg"
        alt="Mural de Frida Kahlo"
        fill
        className="absolute inset-0 z-0 object-cover"
        priority
        data-ai-hint="frida kahlo mural"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white p-4">
        <h2 className="font-script text-5xl font-bold uppercase tracking-widest md:text-7xl lg:text-8xl">
          Sabores de México
        </h2>
        <p className="mt-4 max-w-2xl text-lg tracking-wide text-primary md:text-xl">
          Hecha con los ingredientes más frescos, directo a tu mesa. Experimenta un sabor que nunca olvidarás.
        </p>
        <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onOrderNowClick}>
          ¡Ordena Ahora!
        </Button>
      </div>
    </section>
  );
}
