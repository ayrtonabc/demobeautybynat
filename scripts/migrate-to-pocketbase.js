/**
 * Script de Migración de Contenido Estático a PocketBase
 * Valiente Estudio de Belleza
 * 
 * Este script migra todo el contenido estático del frontend a PocketBase
 * para que pueda ser editado desde el panel CMS.
 * 
 * Uso: node scripts/migrate-to-pocketbase.js
 */

const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pb.fullwork.pl';
const TENANT_ID = 'valiente-estetica';

const WEBSITE_ID = TENANT_ID;

// Contenido de la página principal (homepage)
const homePageContent = [
  // Hero Section
  { section_key: 'hero_location', content_value: 'Cinco Saltos · Río Negro', page_path: '/' },
  { section_key: 'hero_title', content_value: 'Belleza que cuida tu esencia', page_path: '/' },
  { section_key: 'hero_subtitle', content_value: 'Centro de estética premium', page_path: '/' },
  { section_key: 'hero_description', content_value: 'Belleza y cuidado personal para hombres y mujeres. Cuidamos tu piel y potenciamos tu mirada. Cada visita es un momento exclusivo para vos.', page_path: '/' },
  { section_key: 'hero_button_primary', content_value: 'Reservar turno', page_path: '/' },
  { section_key: 'hero_button_secondary', content_value: 'Ver Servicios', page_path: '/' },
  
  // Featured Section
  { section_key: 'featured_subtitle', content_value: 'Nuestros Tratamientos', page_path: '/' },
  { section_key: 'featured_title', content_value: 'Servicios que transforman', page_path: '/' },
  { section_key: 'featured_description', content_value: 'Ofrecemos una amplia gama de tratamientos estéticos realizados por profesionales altamente capacitados.', page_path: '/' },
  { section_key: 'featured_button', content_value: 'Ver Todos los Servicios', page_path: '/' },
  
  // Philosophy Section
  { section_key: 'philosophy_title', content_value: 'Nuestra Filosofía', page_path: '/' },
  { section_key: 'philosophy_stat1_number', content_value: '15+', page_path: '/' },
  { section_key: 'philosophy_stat1_label', content_value: 'Años de Experiencia', page_path: '/' },
  { section_key: 'philosophy_stat2_number', content_value: '5000+', page_path: '/' },
  { section_key: 'philosophy_stat2_label', content_value: 'Clientes Satisfechos', page_path: '/' },
  { section_key: 'philosophy_stat3_number', content_value: '30+', page_path: '/' },
  { section_key: 'philosophy_stat3_label', content_value: 'Tratamientos Disponibles', page_path: '/' },
  
  // Premium Experience
  { section_key: 'premium_title', content_value: 'Experiencia Premium', page_path: '/' },
  
  // Testimonials
  { section_key: 'testimonials_title', content_value: 'Lo que dicen nuestros clientes', page_path: '/' },
  
  // Instagram
  { section_key: 'instagram_title', content_value: 'Síguenos en Instagram', page_path: '/' },
  
  // Gift Card
  { section_key: 'gift_title', content_value: 'Regalá una experiencia', page_path: '/' },
  
  // Contact
  { section_key: 'contact_title', content_value: 'Visitanos en Cinco Saltos', page_path: '/' },
];

// Contenido de la página de servicios
const serviciosPageContent = [
  { section_key: 'page_title', content_value: 'Servicios', page_path: '/servicios' },
  { section_key: 'page_description', content_value: 'Tratamientos faciales, corporales, manicura, maquillaje y más.', page_path: '/servicios' },
];

// Contenido de la página de galería
const galeriaPageContent = [
  { section_key: 'page_title', content_value: 'Nuestro trabajo', page_path: '/galeria' },
  { section_key: 'page_description', content_value: 'Resultados reales de clientas reales. Mirá las transformaciones.', page_path: '/galeria' },
];

// Contenido de la página de blog
const blogPageContent = [
  { section_key: 'page_title', content_value: 'Consejos y tendencias', page_path: '/blog' },
  { section_key: 'page_description', content_value: 'Información sobre cuidado personal, tratamientos estéticos y todo lo que necesitás saber para cuidar tu piel.', page_path: '/blog' },
];

// Contenido de la página de nosotros
const nosotrosPageContent = [
  { section_key: 'page_title', content_value: 'Valiente Estudio de Belleza', page_path: '/nosotros' },
  { section_key: 'page_description', content_value: 'Un espacio integral de estética, salud cutánea y bienestar.', page_path: '/nosotros' },
  { section_key: 'mission', content_value: 'Ofrecer un espacio integral de estética, salud cutánea y bienestar donde cada persona encuentre un diagnóstico personalizado y tratamientos de vanguardia.', page_path: '/nosotros' },
  { section_key: 'vision', content_value: 'Consolidarnos como el estudio de belleza referente en la zona.', page_path: '/nosotros' },
];

// Testimonios
const testimonials = [
  { name: 'Milena Valiente', quote: 'El espacio es increíblemente hermoso, todo ahí te transmite tranquilidad. Perfecto para relajarse y disfrutar. Me encantaron mis pestañas y mi piel se ve radiante. Gracias por los mimos!!!', rating: 5, source: 'Google', review_date: '2026-05-15' },
  { name: 'Carolina Rodriguez', quote: 'Excelente! Me sentí muy cómoda y cuidada!', rating: 5, source: 'Google', review_date: '2026-05-22' },
  { name: 'Silvana Aedo', quote: 'Hermoso lugar, cómodo, cálido y con una atención personalizada. Las pestañas me quedaron divinas y super naturales.', rating: 5, source: 'Google', review_date: '2026-05-15' },
  { name: 'Rocio Soule', quote: 'Experiencia 10/10 desde que entras hasta que salis! Hermoso lugar, la amabilidad y el profesionalismo un lujo. Volveré', rating: 5, source: 'Google', review_date: '2026-05-15' },
  { name: 'Valeria Haag', quote: 'Excelente servicio! Me realice un maquillaje de fiesta impecable. Super agradecida con la atención.', rating: 5, source: 'Google', review_date: '2026-05-15' },
  { name: 'Ladchmi', quote: 'Aparte de brindarte la mejor atención, te brinda amor, confianza y te dedican un tiempo solo para vos.', rating: 5, source: 'Google', review_date: '2026-05-15' },
];

// Servicios
const services = [
  { name: 'Limpieza Profunda Premium', description: 'Higiene cutánea profunda, remoción de células muertas y extracción de impurezas para devolverle la oxigenación y luminosidad natural al rostro.', duration: '1.30 hs', price: '$50.000', category: 'tratamientos_faciales', featured: true, image_url: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Punta de Diamante', description: 'Microdermoabrasión mecánica controlada para pulir la piel, suavizar imperfecciones, atenuar líneas de expresión superficiales y mejorar la textura general.', duration: '1.30 hs', price: '$55.000', category: 'tratamientos_faciales', featured: true, image_url: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Microneedling + Exosomas', description: 'Terapia de inducción de colágeno mediante micro-punciones combinada con tecnología avanzada en regeneración celular (exosomas) para tratar cicatrices, poros abiertos, flacidez y envejecimiento global.', duration: '1.30 hs', price: '$70.000', category: 'tratamientos_faciales', featured: false, image_url: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Terapia Anti-Age: Vitalidad & Firmeza', description: 'Estimular el tono muscular facial, reactivar la microcirculación y aportar activos tensores y antioxidantes para un efecto lifting y rejuvenecedor inmediato.', duration: '1.30 hs', price: '$55.000', category: 'tratamientos_faciales', featured: false, image_url: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Tratamiento de Melasmas', description: 'Despigmentación progresiva y controlada de las manchas hormonales o solares, inhibiendo la producción excesiva de melanina y unificando el tono de la piel.', duration: 'Consultar', price: '$50.000', category: 'tratamientos_faciales', featured: false, image_url: 'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Lifting de Pestañas + Nutrición', description: 'Elevar, curvar y alargar las pestañas naturales desde la raíz, complementado con un baño de nutrición profunda.', duration: '60 min', price: '$35.000', category: 'pestanas', featured: false, image_url: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Laminado de Cejas + Botox', description: 'Redireccionar, alisar y ordenar los pelitos rebels de las cejas para lograr un efecto visual de mayor volumen, grosor y prolijidad.', duration: '60 min', price: '$25.000', category: 'cejas', featured: false, image_url: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Perfilado de Cejas con pinza', description: 'Diseñar la forma perfecta de las cejas según la morfología del rostro de la clienta, retirando los excedentes con precisión milimétrica.', duration: '60 min', price: '$25.000', category: 'cejas', featured: false, image_url: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Microblading / Micropigmentación', description: 'Diseño y sombreado o trazado de cejas pelo por pelo mediante maquillaje semipermanente para rellenar espacios, dar simetría y realzar la mirada a largo plazo.', duration: '2.30 hs', price: '$220.000', category: 'micropigmentacion', featured: false, image_url: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Hidratación de Labios', description: 'Revitalizar, suavizar y rellenar sutilmente las líneas finas de los labios mediante una hidratación ultra profunda, ideal para labios resecos o agrietados.', duration: '1.30 hs', price: '$45.000', category: 'tratamientos_faciales', featured: false, image_url: 'https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Maquillaje Profesional', description: 'Maquillaje personalizado para eventos especiales, fiestas, casamientos o cualquier ocasión que merezca lucir radiante.', duration: '90 min', price: '$80.000', category: 'maquillaje', featured: false, image_url: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Masaje Relajante', description: 'Experiencia transformadora de pies a cabeza con aromaterapia. Alivia tensiones y estrés en un ambiente de calma absoluta.', duration: '90 min', price: '$60.000', category: 'masajes', featured: false, image_url: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

// Galería de imágenes (projects)
const galleryImages = [
  { title: 'Tratamiento Facial', image_url: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Limpieza Profunda', image_url: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Skin Care', image_url: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Tratamiento Corporal', image_url: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Mesoterapia', image_url: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Depilación', image_url: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Láser', image_url: 'https://images.pexels.com/photos/3985335/pexels-photo-3985355.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Nuestro Espacio', image_url: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'espacio' },
  { title: 'Peeling', image_url: 'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'tratamientos' },
  { title: 'Ambiente', image_url: 'https://images.pexels.com/photos/3998000/pexels-photo-3998000.jpeg?auto=compact&cs=tinysrgb&w=1200', category: 'espacio' },
];

// Artículos del blog
const blogPosts = [
  { title: 'Cómo cuidar tu piel en cada estación del año', excerpt: 'Los cambios de temperatura afectan nuestra piel de diferentes maneras. Te compartimos los secretos para mantenerla radiante todo el año.', image_url: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Cuidado de la Piel', content: 'Contenido del artículo...' },
  { title: 'Todo lo que necesitas saber sobre el lifting de pestañas', excerpt: 'El lash lifting es uno de los tratamientos más solicitados. Descubrí cómo funciona y qué resultados podés esperar.', image_url: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Tratamientos', content: 'Contenido del artículo...' },
  { title: 'Microneedling: el secreto para una piel renovada', excerpt: 'Este tratamiento estimula la producción de colágeno de forma natural. Te contamos todo sobre sus beneficios.', image_url: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Tratamientos', content: 'Contenido del artículo...' },
  { title: 'Rutina de skincare según tu tipo de piel', excerpt: 'No todas las pieles son iguales. Aprendé a identificar la tuya y construite una rutina efectiva.', image_url: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Cuidado de la Piel', content: 'Contenido del artículo...' },
  { title: 'Tendencias en maquillaje para esta temporada', excerpt: 'Desde looks naturales hasta expresiones más audaces. Las tendencias que están marcando época.', image_url: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Maquillaje', content: 'Contenido del artículo...' },
  { title: 'Beneficios de la limpieza facial profunda', excerpt: 'Más allá de lo estético, una limpieza profesional tiene beneficios para la salud de tu piel.', image_url: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Tratamientos', content: 'Contenido del artículo...' },
];

// Configuración del sitio
const siteSettings = {
  business_name: 'Valiente Estudio de Belleza',
  business_description: 'Centro de estética premium en Cinco Saltos, Río Negro. Belleza y cuidado personal para hombres y mujeres.',
  phone: '+54 9 299 471-6807',
  whatsapp: '542994716807',
  email: 'hola@valientebelleza.com.ar',
  address: '9 de Julio 181, Cinco Saltos, Río Negro',
  instagram: 'https://www.instagram.com/valienteestudiodebelleza/',
  facebook: 'https://www.facebook.com/p/Valiente-Estudio-de-Belleza-61587077702119/',
  opening_hours: 'Lunes a Viernes: 9:00 - 20:00 | Sábado: 9:00 - 14:00 | Domingo: Cerrado',
};

async function migrateToPocketBase() {
  console.log('🚀 Iniciando migración de contenido a PocketBase...');
  console.log(`📡 Conectando a: ${PB_URL}`);
  console.log(`🏢 Tenant ID: ${WEBSITE_ID}`);
  console.log('');

  try {
    // 1. Migrar Site Settings
    console.log('📝 Migrando configuración del sitio...');
    const settingsResponse = await fetch(`${PB_URL}/api/collections/site_settings/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...siteSettings,
        website_id: WEBSITE_ID,
      }),
    });
    
    if (settingsResponse.ok) {
      const settingsData = await settingsResponse.json();
      console.log('✅ Site Settings migrado (ID:', settingsData.id, ')');
    } else {
      console.log('⚠️ Site Settings ya existe o error:', settingsResponse.status);
    }

    // 2. Migrar Contenido de Páginas (site_content)
    console.log('\n📝 Migrando contenido de páginas...');
    const allPageContent = [
      ...homePageContent,
      ...serviciosPageContent,
      ...galeriaPageContent,
      ...blogPageContent,
      ...nosotrosPageContent,
    ];

    for (const content of allPageContent) {
      const contentResponse = await fetch(`${PB_URL}/api/collections/site_content/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...content,
          website_id: WEBSITE_ID,
          language_code: 'es',
        }),
      });
      
      if (contentResponse.ok) {
        console.log(`  ✅ ${content.section_key} (${content.page_path})`);
      }
    }

    // 3. Migrar Testimonios
    console.log('\n⭐ Migrando testimonios...');
    for (const testimonial of testimonials) {
      const testimonialResponse = await fetch(`${PB_URL}/api/collections/testimonials/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testimonial,
          website_id: WEBSITE_ID,
        }),
      });
      
      if (testimonialResponse.ok) {
        console.log(`  ✅ ${testimonial.name}`);
      }
    }

    // 4. Migrar Servicios
    console.log('\n💅 Migrando servicios...');
    for (const service of services) {
      const serviceResponse = await fetch(`${PB_URL}/api/collections/shop_products/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...service,
          website_id: WEBSITE_ID,
        }),
      });
      
      if (serviceResponse.ok) {
        console.log(`  ✅ ${service.name}`);
      }
    }

    // 5. Migrar Galería (projects)
    console.log('\n🖼️ Migrando galería...');
    for (const image of galleryImages) {
      const imageResponse = await fetch(`${PB_URL}/api/collections/projects/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...image,
          website_id: WEBSITE_ID,
          language_code: 'es',
        }),
      });
      
      if (imageResponse.ok) {
        console.log(`  ✅ ${image.title}`);
      }
    }

    // 6. Migrar Blog Posts
    console.log('\n📰 Migrando artículos del blog...');
    for (const post of blogPosts) {
      const postResponse = await fetch(`${PB_URL}/api/collections/blog_posts/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...post,
          slug: post.title.toLowerCase().replace(/\s+/g, '-'),
          website_id: WEBSITE_ID,
          language_code: 'es',
          published: true,
          author: 'Valiente Estudio de Belleza',
        }),
      });
      
      if (postResponse.ok) {
        console.log(`  ✅ ${post.title}`);
      }
    }

    // 7. Configurar Idiomas
    console.log('\n🌐 Configurando idiomas...');
    const languagesResponse = await fetch(`${PB_URL}/api/collections/website_languages/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        website_id: WEBSITE_ID,
        translation_status: 'published',
      }),
    });
    
    if (languagesResponse.ok) {
      console.log('  ✅ Español configurado');
    }

    console.log('\n🎉 ¡Migración completada exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - Site Settings: 1 registro`);
    console.log(`   - Contenido de páginas: ${allPageContent.length} registros`);
    console.log(`   - Testimonios: ${testimonials.length} registros`);
    console.log(`   - Servicios: ${services.length} registros`);
    console.log(`   - Galería: ${galleryImages.length} registros`);
    console.log(`   - Blog Posts: ${blogPosts.length} registros`);
    console.log('\n💡 Ahora podés editar todo el contenido desde el panel CMS en /cms');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  migrateToPocketBase();
}

module.exports = { migrateToPocketBase };