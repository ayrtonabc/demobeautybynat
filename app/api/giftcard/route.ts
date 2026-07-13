import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const servicePrices: { [key: string]: number } = {
  'Przedłużanie rzęs 1:1 (klasyka)': 18000,
  'Volume Light / Medium / Mega': 21000,
  'Efekt Kim Kardashian / Eyeliner': 22000,
  'Laminacja i geometria brwi': 12000,
  'Henna pudrowa brwi': 11000,
  'Fryzura okolicznościowa': 25000,
  'Makijaż okolicznościowy': 25000,
};

const PHYSICAL_CARD_FEE = 1500; // 15 zł por tarjeta física + envío a retirar

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
      monto,        // monto en centavos (para Gift Card abierta)
      tipoEntrega,  // 'digital' | 'fisica'
      mensaje,
    } = body;

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ error: 'MercadoPago no configurado' }, { status: 500 });
    }

    // Validar monto
    let precioCentavos: number;
    let descripcion: string;

    if (servicio && servicio !== 'open') {
      // Gift Card de servicio específico
      const precioServicio = servicePrices[servicio];
      if (!precioServicio) {
        return NextResponse.json({ error: 'Servicio no válido' }, { status: 400 });
      }
      precioCentavos = precioServicio;
      descripcion = `Gift Card Beauty By Nat — ${servicio}`;
    } else if (monto && typeof monto === 'number' && monto >= 5000) {
      // Gift Card abierta (monto en centavos, mínimo 50 zł)
      precioCentavos = Math.round(monto);
      descripcion = `Gift Card Beauty By Nat — Voucher abierto`;
    } else {
      return NextResponse.json({ error: 'Selecciona un servicio o un monto válido (mín. 50 zł)' }, { status: 400 });
    }

    // Sumar fee de tarjeta física
    if (tipoEntrega === 'fisica') {
      precioCentavos += PHYSICAL_CARD_FEE;
    }

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);

    const paymentData: any = {
      transaction_amount: precioCentavos / 100, // MercadoPago espera en pesos
      description: descripcion,
      payment_method_id: 'mercadopago',
      payer: {
        email: emailComprador,
        first_name: nombreComprador.split(' ')[0],
        last_name: nombreComprador.split(' ').slice(1).join(' ') || '',
      },
      metadata: {
        tipo: 'giftcard',
        nombre_destinatario: nombreDestinatario,
        email_destinatario: emailDestinatario || '',
        telefono_destinatario: telefonoComprador || '',
        servicio: servicio || 'open',
        monto_gift: servicio ? servicePrices[servicio] : monto,
        tipo_entrega: tipoEntrega,
        mensaje: mensaje || '',
        fecha_compra: new Date().toISOString(),
        validez: 365, // 1 año
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