'use client';

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PlusCircle } from "lucide-react"
import { menuItems, type MenuItem } from "@/lib/data"

type FeaturedCarouselProps = {
  onAddToCart: (item: MenuItem) => void;
};

const featuredItemIds = [1, 10, 13, 15];

export default function FeaturedCarousel({ onAddToCart }: FeaturedCarouselProps) {
    const featuredItems = menuItems.filter(item => featuredItemIds.includes(item.id));
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-card/50">
            <div className="container mx-auto px-4">
                 <h3 className="mb-10 text-center font-script text-4xl font-bold uppercase tracking-wider md:text-5xl">Platillos Destacados</h3>
                 <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {featuredItems.map((item) => (
                            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="p-1">
                                <Card className="group overflow-hidden border-2 border-border transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
                                    <CardContent className="p-0">
                                        <div className="relative h-56 w-full">
                                            <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            data-ai-hint={item.imageHint}
                                            />
                                        </div>
                                    </CardContent>
                                    <div className="p-4">
                                        <h4 className="text-xl font-bold text-foreground">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground h-10">{item.description}</p>
                                    </div>
                                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                                        <p className="text-xl font-bold text-primary">${item.price.toFixed(2)}</p>
                                        <Button size="sm" onClick={() => onAddToCart(item)}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Agregar
                                        </Button>
                                    </CardFooter>
                                </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-12 hidden sm:flex" />
                    <CarouselNext className="mr-12 hidden sm:flex" />
                </Carousel>
            </div>
        </section>
    )
}
