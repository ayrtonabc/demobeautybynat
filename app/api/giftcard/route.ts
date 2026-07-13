import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const servicePrices: { [key: string]: number } = {
  'Przedłużanie rzęs 1:1 (klasyka)': 18000,
  'Volume Light / Medium / Mega': 21000,
  'Efekt Kim Kardashian / Eyeliner': 22000,
  'Laminacja i geometria brwi': 12000,
  'Henna pudrowa brwi': 11000,
  'Fryzura okolicznościowa': 25000,
  'Makijaż okolicznościowy': 25000,
};

const PHYSICAL_CARD_FEE = 1500; // 15 zł

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nombreComprador,
      emailComprador,
      telefonoComprador,
      nombreDestinatario,
      emailDestinatario,
      servicio,
      monto,        // monto en centavos (PLN × 100)
      tipoEntrega,  // 'digital' | 'fisica'
      mensaje,
    } = body;

    // Calcular monto total
    let precioCentavos: number;
    let descripcion: string;

    if (servicio && servicio !== 'open') {
      const precioServicio = servicePrices[servicio];
      if (!precioServicio) {
        return NextResponse.json({ error: 'Servicio no válido' }, { status: 400 });
      }
      precioCentavos = precioServicio;
      descripcion = `Gift Card Beauty By Nat — ${servicio}`;
    } else if (monto && typeof monto === 'number' && monto >= 5000) {
      precioCentavos = Math.round(monto);
      descripcion = 'Gift Card Beauty By Nat — Voucher abierto';
    } else {
      return NextResponse.json({ error: 'Selecciona un servicio o un monto válido (mín. 50 zł)' }, { status: 400 });
    }

    if (tipoEntrega === 'fisica') {
      precioCentavos += PHYSICAL_CARD_FEE;
    }

    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      // Modo dev: simular éxito
      return NextResponse.json({
        status: 'pending',
        init_point: null,
        simulated: true,
      });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' });
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'p24', 'blik'],
      customer_email: emailComprador,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'pln',
            unit_amount: precioCentavos,
            product_data: {
              name: 'Gift Card Beauty By Nat',
              description,
            },
          },
        },
      ],
      metadata: {
        tipo: 'giftcard',
        nombre_destinatario: nombreDestinatario,
        email_destinatario: emailDestinatario || '',
        telefono_comprador: telefonoComprador || '',
        servicio: servicio || 'open',
        monto_gift: String(servicio ? servicePrices[servicio] : monto),
        tipo_entrega: tipoEntrega,
        mensaje: mensaje || '',
      },
      success_url: `${siteUrl}/giftcard?payment=success&session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/giftcard?payment=cancel`,
      locale: 'pl',
    });

    return NextResponse.json({
      status: 'pending',
      init_point: session.url,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
