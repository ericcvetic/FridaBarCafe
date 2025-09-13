import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { type CartItem } from '@/app/page';

// Agrega tus credenciales
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN! 
});

const preference = new Preference(client);

export async function POST(request: Request) {
  try {
    const { cart } = await request.json();

    if (!process.env.MP_ACCESS_TOKEN) {
      return NextResponse.json({ error: 'Falta la credencial de Mercado Pago (ACCESS TOKEN).' }, { status: 500 });
    }

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }

    const items = cart.map((item: CartItem) => ({
      id: item.id.toString(),
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: 'ARS', // Cambia a tu moneda local
      picture_url: item.image,
      description: item.description,
    }));
    
    const body = {
      items: items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/`, // URL a la que volver tras el pago
        failure: `${process.env.NEXT_PUBLIC_URL}/`,
        pending: `${process.env.NEXT_PUBLIC_URL}/`,
      },
      auto_return: 'approved' as const,
    };

    const result = await preference.create({ body });

    return NextResponse.json({ id: result.id, init_point: result.init_point });

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Ocurrió un error inesperado al crear la preferencia.' }, { status: 500 });
  }
}
