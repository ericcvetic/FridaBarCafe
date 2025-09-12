'use client';

import { forwardRef, useMemo } from 'react';
import { menuItems, type MenuItem } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from 'lucide-react';

type MenuProps = {
  onAddToCart: (item: MenuItem) => void;
};

const Menu = forwardRef<HTMLElement, MenuProps>(({ onAddToCart }, ref) => {
  const categories = useMemo(() => {
    const categoryOrder: MenuItem['category'][] = ['Hamburguesas', 'Pizzas', 'Burritos', 'Lomos', 'Platos', 'Guarnicion', 'Bebidas'];
    const uniqueCategories = [...new Set(menuItems.map((item) => item.category))];
    uniqueCategories.sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
    return uniqueCategories;
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h3 className="mb-10 text-center font-script text-4xl font-bold uppercase tracking-wider md:text-5xl">Nuestro Menú</h3>
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-4 sm:grid-cols-4 md:grid-cols-7 mx-auto mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {menuItems.filter(item => item.category === category).map((item) => (
                  <Card key={item.id} className="group overflow-hidden border-2 border-border transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
                    <CardHeader className="p-0">
                      <div className="relative h-56 w-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          data-ai-hint={item.imageHint}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="mb-2 text-xl font-bold text-foreground">{item.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
                      <Button size="sm" onClick={() => onAddToCart(item)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
});

Menu.displayName = "Menu";

export default Menu;
