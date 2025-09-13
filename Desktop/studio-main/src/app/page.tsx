'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/restaurant/Header';
import Hero from '@/components/restaurant/Hero';
import Menu from '@/components/restaurant/Menu';
import { type MenuItem } from '@/lib/data';
import Footer from '@/components/restaurant/Footer';
import FeaturedCarousel from '@/components/restaurant/FeaturedCarousel';

export type CartItem = MenuItem & { quantity: number };

export default function Home() {
  const [cart, setCart] = useState<CartItem[] | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const isInitialRender = useRef(true);

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
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            setCart([]);
        }
    } else {
      setCart([]);
    }
  }, []);


  useEffect(() => {
    // Skip the very first render to avoid overwriting the loaded cart with an empty one.
    if (isInitialRender.current) {
        if (cart !== undefined) {
          isInitialRender.current = false;
        }
        return;
    }
    // cart being undefined means it's still loading, so don't save.
    if (cart !== undefined) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const currentCart = prevCart || [];
      const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...currentCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCart((prevCart = []) => prevCart.filter((item) => item.id !== itemId));
  };
  
  const handleUpdateQuantity = (itemId: number, quantity: number) => {
     if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart((prevCart = []) => prevCart.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleOrderNowClick = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleDeliveryClick = () => {
    setIsCartOpen(true);
  };
  
  if (cart === undefined) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
            <p>Cargando...</p>
        </div>
    );
  }


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header 
        cart={cart} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveFromCart={handleRemoveFromCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <main className="flex-1">
        <Hero onOrderNowClick={handleOrderNowClick} />
        <FeaturedCarousel onAddToCart={handleAddToCart} />
        <Menu ref={menuRef} onAddToCart={handleAddToCart} />
      </main>
      <Footer onDeliveryClick={handleDeliveryClick} />
    </div>
  );
}
