export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
  category: 'Hamburguesas' | 'Guarnicion' | 'Bebidas' | 'Pizzas' | 'Burritos' | 'Lomos' | 'Platos';
};

export const menuItems: MenuItem[] = [
  // Hamburguesas
  {
    id: 1,
    name: 'Bonanza Clásica',
    description: 'Carne de res, queso cheddar, lechuga, tomate, y nuestra salsa secreta.',
    price: 12.99,
    image: 'https://picsum.photos/seed/burger2/600/400',
    imageHint: 'classic burger',
    category: 'Hamburguesas',
  },
  {
    id: 2,
    name: 'Explosión de Tocino',
    description: 'Doble carne, doble queso, y una generosa porción de tocino crujiente.',
    price: 15.99,
    image: 'https://picsum.photos/seed/burger3/600/400',
    imageHint: 'bacon burger',
    category: 'Hamburguesas',
  },
  {
    id: 3,
    name: 'Volcán Picante',
    description: 'Carne de res, queso pepper jack, jalapeños, y salsa de chipotle picante.',
    price: 14.50,
    image: 'https://picsum.photos/seed/burger4/600/400',
    imageHint: 'spicy burger',
    category: 'Hamburguesas',
  },
  {
    id: 4,
    name: 'Delicia de Champiñones',
    description: 'Carne de res, champiñones salteados, queso suizo y alioli de ajo.',
    price: 14.99,
    image: 'https://picsum.photos/seed/burger5/600/400',
    imageHint: 'mushroom burger',
    category: 'Hamburguesas',
  },
  // Guarnicion
  {
    id: 5,
    name: 'Papas Fritas de la Casa',
    description: 'Papas fritas crujientes y doradas, sazonadas a la perfección.',
    price: 4.99,
    image: 'https://picsum.photos/seed/fries1/600/400',
    imageHint: 'french fries',
    category: 'Guarnicion',
  },
  {
    id: 6,
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla dulces empanizados y fritos hasta quedar dorados.',
    price: 5.99,
    image: 'https://picsum.photos/seed/onionrings/600/400',
    imageHint: 'onion rings',
    category: 'Guarnicion',
  },
   // Bebidas
  {
    id: 7,
    name: 'Batido de Chocolate',
    description: 'Un batido cremoso y rico hecho con helado de chocolate premium.',
    price: 6.50,
    image: 'https://picsum.photos/seed/shake1/600/400',
    imageHint: 'chocolate milkshake',
    category: 'Bebidas',
  },
  {
    id: 8,
    name: 'Refresco',
    description: 'Tu elección de Coca-Cola, Pepsi, Sprite o Dr. Pepper.',
    price: 2.99,
    image: 'https://picsum.photos/seed/soda/600/400',
    imageHint: 'soda can',
    category: 'Bebidas',
  },
  // Pizzas
  {
    id: 9,
    name: 'Pizza Margarita',
    description: 'Salsa de tomate, mozzarella fresca, y albahaca. Un clásico italiano.',
    price: 16.99,
    image: 'https://picsum.photos/seed/pizza1/600/400',
    imageHint: 'margarita pizza',
    category: 'Pizzas',
  },
  {
    id: 10,
    name: 'Pizza Pepperoni',
    description: 'Generosamente cubierta con pepperoni y queso mozzarella derretido.',
    price: 18.50,
    image: 'https://picsum.photos/seed/pizza2/600/400',
    imageHint: 'pepperoni pizza',
    category: 'Pizzas',
  },
  // Burritos
  {
    id: 11,
    name: 'Burrito de Carne Asada',
    description: 'Carne asada tierna, arroz, frijoles, guacamole y salsa, envuelto en una tortilla de harina.',
    price: 13.99,
    image: 'https://picsum.photos/seed/burrito1/600/400',
    imageHint: 'steak burrito',
    category: 'Burritos',
  },
  {
    id: 12,
    name: 'Burrito de Pollo Adobado',
    description: 'Pollo marinado en adobo, arroz, frijoles negros y pico de gallo.',
    price: 12.99,
    image: 'https://picsum.photos/seed/burrito2/600/400',
    imageHint: 'chicken burrito',
    category: 'Burritos',
  },
  // Lomos
  {
    id: 13,
    name: 'Lomo Completo',
    description: 'Tierno lomo de res con jamón, queso, huevo, lechuga y tomate en pan francés.',
    price: 17.50,
    image: 'https://picsum.photos/seed/lomo1/600/400',
    imageHint: 'steak sandwich',
    category: 'Lomos',
  },
  {
    id: 14,
    name: 'Lomo Cheddar y Panceta',
    description: 'Lomo de res a la parrilla, cubierto con queso cheddar derretido y panceta crujiente.',
    price: 18.99,
    image: 'https://picsum.photos/seed/lomo2/600/400',
    imageHint: 'bacon steak sandwich',
    category: 'Lomos',
  },
  // Platos
  {
    id: 15,
    name: 'Milanesa Napolitana',
    description: 'Milanesa de ternera cubierta con salsa de tomate, jamón y mozzarella, con papas fritas.',
    price: 22.00,
    image: 'https://picsum.photos/seed/plato1/600/400',
    imageHint: 'milanesa napolitana',
    category: 'Platos',
  },
  {
    id: 16,
    name: 'Bife de Chorizo',
    description: 'Un corte jugoso de bife de chorizo a la parrilla, servido con ensalada mixta.',
    price: 25.50,
    image: 'https://picsum.photos/seed/plato2/600/400',
    imageHint: 'sirloin steak',
    category: 'Platos',
  },
];
