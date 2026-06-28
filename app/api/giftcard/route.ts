import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const servicePrices: { [key: string]: number } = {
  'Limpieza Profunda Premium': 50000,
  'Punta de Diamante': 55000,
  'Microneedling + Exosomas': 70000,
  'Terapia Anti-Age': 55000,
  'Lifting de Pestañas + Nutrición': 35000,
  'Laminado de Cejas + Botox': 25000,
  'Microblading / Micropigmentación': 220000,
  'Maquillaje Novia': 210000,
  'Maquillaje de Fiesta': 150000,
  'Masaje Esencial': 70000,
  'Masaje Piedras Calientes': 60000,
  'Uñas Semipermanente': 35000,
  'Otro (consultar)': 0,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      nombreComprador, 
      emailComprador, 
      nombreDestinatario, 
      emailDestinatario,
      telefonoDestinatario,
      servicio,
      mensaje 
    } = body;

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    
    if (!accessToken) {
      return NextResponse.json({ error: 'MercadoPago no configurado' }, { status: 500 });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);

    const precio = servicePrices[servicio] || 0;
    
    if (precio === 0) {
      return NextResponse.json({ error: 'Por favor, seleccioná un servicio válilido o consultá por el precio.' }, { status: 400 });
    }

    const paymentData = {
      transaction_amount: precio,
      description: `Gift Card Valiente - ${servicio}`,
      payment_method_id: 'mercadopago',
      payer: {
        email: emailComprador,
        first_name: nombreComprador.split(' ')[0],
        last_name: nombreComprador.split(' ').slice(1).join(' ') || '',
      },
      metadata: {
        nombre_destinatario: nombreDestinatario,
        email_destinatario: emailDestinatario || '',
        telefono_destinatario: telefonoDestinatario || '',
        servicio: servicio,
        mensaje: mensaje || '',
        fecha_compra: new Date().toISOString(),
        validez: 30,
      },
    };

    const result = await payment.create({ body: paymentData });

    if (result.status === 'pending' || result.status === 'approved') {
      return NextResponse.json({
        status: result.status,
        init_point: result.point_of_interaction?.transaction_data?.ticket_url || result.id,
      });
    }

    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}