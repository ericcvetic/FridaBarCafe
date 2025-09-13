"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Menu as MenuIcon, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import type { CartItem } from "@/app/page";
import Image from "next/image";
import FridaLogo from "./FridaLogo";
import Link from "next/link";

type HeaderProps = {
  cart: CartItem[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveFromCart: (itemId: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

export default function Header({ cart, onUpdateQuantity, onRemoveFromCart, isCartOpen, setIsCartOpen }: HeaderProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-8">
      <div className="flex items-center gap-3">
        <FridaLogo className="h-9 w-9 text-primary" />
        <h1 className="font-script text-3xl font-bold tracking-wider text-foreground">
          FRIDA BAR CAFE
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button>
              <ShoppingCart />
              <span className="ml-2 hidden md:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                  {cartCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Tu Carrito ({cartCount})</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto py-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground">Tu carrito está vacío.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center gap-2">
                           <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3"/></Button>
                           <span>{item.quantity}</span>
                           <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3"/></Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive" onClick={() => onRemoveFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <SheetFooter className="mt-auto flex-col gap-4 border-t pt-4">
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                <SheetClose asChild>
                  <Link href="/checkout" className="w-full">
                    <Button className="w-full">Proceder al Pago</Button>
                  </Link>
                </SheetClose>
              </SheetFooter>
            )}
          </SheetContent>
        </Sheet>

        <Button variant="ghost" className="md:hidden">
          <MenuIcon />
          <span className="sr-only">Menú</span>
        </Button>
      </div>
    </header>
  );
}
