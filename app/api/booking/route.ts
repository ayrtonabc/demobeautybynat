import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      date,
      time,
      serviceName,
      servicePrice,
      serviceDuration,
    } = body;

    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecret) {
      // Modo dev: simular éxito de pago sin Stripe configurado
      return NextResponse.json({
        status: 'pending',
        init_point: null,
        simulated: true,
      });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' });

    const amountInGrosz = Math.round(Number(servicePrice) * 100); // PLN zł → grosze
    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/rezerwacje?payment=success&session={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/rezerwacje?payment=cancel`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'p24', 'blik'], // tarjeta + Przelewy24 + BLIK (Polonia)
      customer_email: email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'pln',
            unit_amount: amountInGrosz,
            product_data: {
              name: `Rezerwacja: ${serviceName}`,
              description: `${date} ${time} (${serviceDuration})`,
            },
          },
        },
      ],
      metadata: {
        tipo: 'booking',
        nombre: name,
        telefono: phone,
        fecha: date,
        hora: time,
        servicio: serviceName,
        precio: String(servicePrice),
        duracion: serviceDuration,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
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
