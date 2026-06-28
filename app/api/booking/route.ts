import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      name, 
      phone, 
      date, 
      time, 
      serviceName,
      servicePrice,
      serviceDuration 
    } = body;

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!accessToken) {
      return NextResponse.json({ error: 'MercadoPago no configurado' }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);

    const paymentData = {
      transaction_amount: servicePrice,
      description: `Reserva: ${serviceName} - ${date} ${time}`,
      payment_method_id: 'mercadopago',
      payer: {
        email: `cliente_${phone}@valiente.com`,
        first_name: name.split(' ')[0],
        last_name: name.split(' ').slice(1).join(' ') || '',
      },
      metadata: {
        nombre: name,
        telefono: phone,
        fecha: date,
        hora: time,
        servicio: serviceName,
        precio: servicePrice,
        duracion: serviceDuration,
      },
    };

    const result = await payment.create({ body: paymentData });

    if (result.status === 'pending' || result.status === 'approved') {
      return NextResponse.json({
        status: result.status,
        init_point: result.point_of_interaction?.transaction_data?.ticket_url || `https://www.mercadopago.com.ar/checkout/v1/payment-screen/${result.id}`,
      });
    }

    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}