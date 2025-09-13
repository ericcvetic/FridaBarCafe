'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, CircleDollarSign, ArrowLeft } from 'lucide-react';
import FridaLogo from '@/components/restaurant/FridaLogo';
import { type CartItem } from '@/app/page';
import { useToast } from "@/hooks/use-toast";

const DELIVERY_FEE = 5.00;

const MercadoPagoLogo = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      fill="none"
    >
      <path
        fill="#00B1EA"
        d="M23.999 4C12.954 4 4 12.953 4 24s8.954 20 20 20 20-8.953 20-20S35.045 4 24 4Z"
      ></path>
      <path
        fill="#fff"
        d="M24.233 13.333c-5.836 0-10.428 4.02-10.428 8.858v10.476h4.526v-9.3c0-2.88 2.21-5.187 4.966-5.187 2.755 0 4.814 2.308 4.814 5.187v9.3h4.526V22.19c0-4.837-4.439-8.857-9.399-8.857Z"
      ></path>
    </svg>
  );

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[] | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart from localStorage on initial client render
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          setCart([]);
        }
      } catch (e) {
        console.error("Could not parse cart from localStorage", e);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, []);
  
  const handlePayment = async () => {
    if (!cart) return;

    if (paymentMethod === 'mercadopago') {
      setIsProcessing(true);
      try {
        const response = await fetch('/api/create-preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al crear la preferencia de pago.');
        }

        const preference = await response.json();
        if (preference.id && preference.init_point) {
            // Redirigir al usuario al checkout de Mercado Pago
            window.location.href = preference.init_point;
        } else {
            throw new Error('No se recibió la URL de pago de Mercado Pago.');
        }
      } catch (error) {
        console.error('Error in payment process:', error);
        toast({
          variant: "destructive",
          title: "Error de Pago",
          description: error instanceof Error ? error.message : "Ocurrió un error inesperado al procesar el pago.",
        });
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Lógica para otros métodos de pago
      toast({
        title: "Pedido Confirmado",
        description: `Tu pedido con ${paymentMethod} ha sido procesado con éxito.`,
      })
    }
  };

  if (cart === undefined) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
            <p>Cargando carrito...</p>
        </div>
    );
  }

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartTotal = cartSubtotal + DELIVERY_FEE;

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
              Volver al Menú
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de tu Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={48} height={48} className="rounded-md object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-semibold">${cartSubtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Servicio de Delivery</p>
                    <p className="font-semibold">${DELIVERY_FEE.toFixed(2)}</p>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <p>Total</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Información y Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección de Entrega</Label>
                  <Input id="address" placeholder="Tu dirección completa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono de Contacto</Label>
                  <Input id="phone" type="tel" placeholder="Tu número de teléfono" />
                </div>
                
                <Separator />

                <div className="space-y-4">
                    <Label>Método de Pago</Label>
                    <RadioGroup defaultValue="card" className="space-y-2" onValueChange={setPaymentMethod}>
                        <Label className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="card" id="card" />
                            <CreditCard className="h-5 w-5 text-primary" />
                            <span>Tarjeta de Crédito/Débito</span>
                        </Label>
                        <Label className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="mercadopago" id="mercadopago" />
                            <MercadoPagoLogo className="h-5 w-5" />
                            <span>Mercado Pago</span>
                        </Label>
                        <Label className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <Landmark className="h-5 w-5 text-primary" />
                            <span>Transferencia Bancaria</span>
                        </Label>
                         <Label className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value="cash" id="cash" />
                            <CircleDollarSign className="h-5 w-5 text-primary" />
                            <span>Efectivo</span>
                        </Label>
                    </RadioGroup>
                </div>

                <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing || cart.length === 0}>
                  {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
