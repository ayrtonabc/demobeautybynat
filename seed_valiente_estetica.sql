-- ============================================
-- VALIENTE ESTÉTICA - SEED DATA FOR POCKETBASE
-- ============================================
-- This script seeds the initial content for Valiente Estudio de Belleza
-- Website ID: valiente-estetica
-- ============================================

-- ============================================
-- 1. SITE SETTINGS
-- ============================================
INSERT INTO site_settings (
    id,
    website_id,
    business_name,
    business_description,
    phone,
    whatsapp,
    email,
    address,
    instagram,
    facebook,
    youtube,
    map_embed_url,
    logo_url,
    opening_hours,
    created_at,
    updated_at
) VALUES (
    'site_settings_valiente',
    'valiente-estetica',
    'Valiente Estudio de Belleza',
    'Centro de estética premium en Cinco Saltos, Río Negro. Belleza y cuidado personal para hombres y mujeres. Tratamientos faciales, masajes, manicura, maquillaje y más.',
    '+54 9 299 555 1234',
    '+5492995551234',
    'hola@valientebelleza.com.ar',
    'Av. San Martín 1234, Cinco Saltos, Río Negro, Argentina',
    'https://www.instagram.com/valienteestetica',
    'https://www.facebook.com/valienteestetica',
    '',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.1234!2d-68.1234!3d-38.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA3JzI0LjQiUyA2OMKwMDcnMjQuNCJX!5e0!3m2!1ses!2sar!4v1234567890',
    '',
    'Lunes a Viernes: 9:00 - 20:00 | Sábado: 9:00 - 14:00 | Domingo: Cerrado',
    datetime('now'),
    datetime('now')
);

-- ============================================
-- 2. WEBSITE LANGUAGES
-- ============================================
INSERT INTO website_languages (
    id,
    website_id,
    language_id,
    translation_status,
    created_at,
    updated_at
) VALUES (
    'lang_spanish',
    'valiente-estetica',
    'lang_spanish_id',
    'published',
    datetime('now'),
    datetime('now')
);

-- ============================================
-- 3. SITE CONTENT - HOME PAGE
-- ============================================

-- Hero Section
INSERT INTO site_content (
    id,
    website_id,
    page_path,
    section_key,
    content_value,
    language_code,
    created_at,
    updated_at
) VALUES
(
    'home_hero_location',
    'valiente-estetica',
    '/',
    'hero_location',
    'Cinco Saltos · Río Negro',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_hero_title',
    'valiente-estetica',
    '/',
    'hero_title',
    'Belleza que cuida tu esencia',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_hero_subtitle',
    'valiente-estetica',
    '/',
    'hero_subtitle',
    'Centro de estética premium',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_hero_description',
    'valiente-estetica',
    '/',
    'hero_description',
    'Descubre una experiencia única de cuidado personal en nuestro estúdio. Ofrecemos tratamientos faciales, corporales, manicura, maquillaje y más, siempre con productos de primera calidad y atención personalizada.',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_hero_button_primary',
    'valiente-estetica',
    '/',
    'hero_button_primary',
    'Reservar Turno',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_hero_button_secondary',
    'valiente-estetica',
    '/',
    'hero_button_secondary',
    'Ver Servicios',
    'es',
    datetime('now'),
    datetime('now')
),

-- Featured Treatments Section
(
    'home_featured_subtitle',
    'valiente-estetica',
    '/',
    'featured_subtitle',
    'Nuestros Tratamientos',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_featured_title',
    'valiente-estetica',
    '/',
    'featured_title',
    'Servicios que transforman',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_featured_description',
    'valiente-estetica',
    '/',
    'featured_description',
    'Ofrecemos una amplia gama de tratamientos estéticos realizados por profesionales altamente capacitados. Cada servicio está diseñado para realzar tu belleza natural.',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_featured_button',
    'valiente-estetica',
    '/',
    'featured_button',
    'Ver Todos los Servicios',
    'es',
    datetime('now'),
    datetime('now')
),

-- Philosophy Section
(
    'home_philosophy_title',
    'valiente-estetica',
    '/',
    'philosophy_title',
    'Nuestra Filosofía',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_text1',
    'valiente-estetica',
    '/',
    'philosophy_text1',
    'En Valiente creemos que cada persona merece sentirse única y especial. Nuestro compromisso va más allá de lo estético: cuidamos tu bienestar integral.',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_text2',
    'valiente-estetica',
    '/',
    'philosophy_text2',
    'Utilizamos únicamente productos de primera calidad, respaldados por las mejores marcas del mercado. Cada tratamiento es personalizado según tus necesidades.',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_stat1_number',
    'valiente-estetica',
    '/',
    'philosophy_stat1_number',
    '15+',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_stat1_label',
    'valiente-estetica',
    '/',
    'philosophy_stat1_label',
    'Años de Experiencia',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_stat2_number',
    'valiente-estetica',
    '/',
    'philosophy_stat2_number',
    '5000+',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_stat2_label',
    'valiente-estetica',
    '/',
    'philosophy_stat2_label',
    'Clientes Satisfechos',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_stat3_number',
    'valiente-estetica',
    '/',
    'philosophy_stat3_number',
    '30+',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_philosophy_stat3_label',
    'valiente-estetica',
    '/',
    'philosophy_stat3_label',
    'Tratamientos Disponibles',
    'es',
    datetime('now'),
    datetime('now')
),

-- Premium Experience Section
(
    'home_premium_title',
    'valiente-estetica',
    '/',
    'premium_title',
    'Experiencia Premium',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_premium_subtitle',
    'valiente-estetica',
    '/',
    'premium_subtitle',
    'Lo que nos distingue',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_premium_description',
    'valiente-estetica',
    '/',
    'premium_description',
    'En Valiente Estudio de Belleza te esperando un espacio diseñado para tu comfort y relax. Ambiente cálido, atención personalizada y resultados excepcionales.',
    'es',
    datetime('now'),
    datetime('now')
),

-- Testimonials Section
(
    'home_testimonials_title',
    'valiente-estetica',
    '/',
    'testimonials_title',
    'Lo que dicen nuestros clientes',
    'es',
    datetime('now'),
    datetime('now')
),

-- Instagram Section
(
    'home_instagram_title',
    'valiente-estetica',
    '/',
    'instagram_title',
    'Síguenos en Instagram',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_instagram_subtitle',
    'valiente-estetica',
    '/',
    'instagram_subtitle',
    '@valienteestetica',
    'es',
    datetime('now'),
    datetime('now')
),

-- Gift Card Section
(
    'home_gift_title',
    'valiente-estetica',
    '/',
    'gift_title',
    'Regala Belleza',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_gift_subtitle',
    'valiente-estetica',
    '/',
    'gift_subtitle',
    'Gift Card Available',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_gift_description',
    'valiente-estetica',
    '/',
    'gift_description',
    'Sorprende a esa persona especial con un regalo único. Nuestras gift cards son el obsequio perfecto para cualquier ocasión.',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_gift_button',
    'valiente-estetica',
    '/',
    'gift_button',
    'Comprar Gift Card',
    'es',
    datetime('now'),
    datetime('now')
),

-- Contact Section
(
    'home_contact_title',
    'valiente-estetica',
    '/',
    'contact_title',
    'Contacto',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_contact_subtitle',
    'valiente-estetica',
    '/',
    'contact_subtitle',
    'Reserva tu turno',
    'es',
    datetime('now'),
    datetime('now')
),
(
    'home_contact_description',
    'valiente-estetica',
    '/',
    'contact_description',
    'Estamos aquí para ayudarte. Contáctanos para reservar tu turno o resolver cualquier consulta.',
    'es',
    datetime('now'),
    datetime('now')
);

-- ============================================
-- 4. TESTIMONIALS
-- ============================================
INSERT INTO testimonials (
    id,
    website_id,
    name,
    quote,
    rating,
    source,
    review_date,
    profile_image,
    created_at,
    updated_at
) VALUES
(
    'testimonial_1',
    'valiente-estetica',
    'María García',
    'La mejor experiencia estética que he tenido. El trato es exquisito y los resultados son increíbles. ¡Totalmente recomendable!',
    5,
    'Google Reviews',
    '2024-01-15',
    '',
    datetime('now'),
    datetime('now')
),
(
    'testimonial_2',
    'valiente-estetica',
    'Carlos Rodríguez',
    'Llevo años haciéndome tratamientos aquí y siempre me voy más que satisfeita. El ambiente es muy agradable y el personal muy profesional.',
    5,
    'Facebook',
    '2024-02-20',
    '',
    datetime('now'),
    datetime('now')
),
(
    'testimonial_3',
    'valiente-estetica',
    'Ana Martínez',
    'Me encanta este lugar. La atención es muy personalizada y siempre me hacen sentir especial. Los productos que usan son de excelente calidad.',
    5,
    'Google Reviews',
    '2024-03-10',
    '',
    datetime('now'),
    datetime('now')
);

-- ============================================
-- 5. SERVICES / PRODUCTS
-- ============================================
INSERT INTO shop_products (
    id,
    website_id,
    name,
    description,
    price,
    category,
    featured,
    image_url,
    created_at,
    updated_at
) VALUES
(
    'service_facial_limpieza',
    'valiente-estetica',
    'Limpieza Facial Profunda',
    'Tratamiento de limpieza facial con extracción, vaporización y mascarilla. Ideal para pieles mixtas y grasas.',
    '4500',
    'tratamientos_faciales',
    true,
    'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=600',
    datetime('now'),
    datetime('now')
),
(
    'service_facial_hidratante',
    'valiente-estetica',
    'Hidratación Profunda',
    'Tratamiento intensivo de hidratación con ácido hialurónico y vitaminas. devolución el brillo natural de tu piel.',
    '5500',
    'tratamientos_faciales',
    true,
    'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=600',
    datetime('now'),
    datetime('now')
),
(
    'service_micropigmentacion',
    'valiente-estetica',
    'Micropigmentación Labios',
    'Diseño de labios con técnica de micropigmentación. Define y realza el color natural de tus labios de forma semipermanente.',
    '25000',
    'micropigmentacion',
    true,
    'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600',
    datetime('now'),
    datetime('now')
),
(
    'service_micropigmentacion Cejas',
    'valiente-estetica',
    'Micropigmentación Cejas',
    'Diseño de cejas pelo por pelo con técnica de microblading. Resultado natural y duradero.',
    '20000',
    'micropigmentacion',
    true,
    'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=600',
    datetime('now'),
    datetime('now')
),
(
    'service_manicura',
    'valiente-estetica',
    'Manicura Semipermanente',
    'Manicura con esmaltado semipermanente de alta calidad. Incluye limado, cutículas y decoración básica.',
    '3000',
    'manicura',
    true,
    'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=600',
    datetime('now'),
    datetime('now')
),
(
    'service_pedireg',
    'valiente-estetica',
    'Pediredureg Semipermanente',
    'Pediredureg con esmaltado semipermanente. Incluye limado, cutículas y decoración básica.',
    '3500',
    'pediregura',
    false,
    'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600',
    datetime('now'),
    datetime('now')
),
(
    'service_masaje_relajante',
    'valiente-estetica',
    'Masaje Relajante',
    'Masaje corporal de 60 minutos con aceites esenciales. Ideal para relieves tensiones y stress.',
    '6000',
    'masajes',
    false,
    '',
    datetime('now'),
    datetime('now')
),
(
    'service_masaje_descontracturante',
    'valiente-estetica',
    'Masaje Descontracturante',
    'Masaje de 60 minutos focalizado en contracturas y tensiones musculares. Recommended para personas con trabajo sedentario.',
    '7000',
    'masajes',
    false,
    '',
    datetime('now'),
    datetime('now')
),
(
    'service_depilacion_laser',
    'valiente-estetica',
    'Depilación Láser',
    'Sesión de depilación láser en diferentes zonas del cuerpo. Tecnología de última generación para resultados duraderos.',
    '5000',
    'depilacion',
    false,
    '',
    datetime('now'),
    datetime('now')
),
(
    'service_maquillaje',
    'valiente-estetica',
    'Maquillaje Profesional',
    'Maquillaje para eventos especiales, fiestas o bodas. Incluyebbe styling de cejas.',
    '8000',
    'maquillaje',
    false,
    'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=600',
    datetime('now'),
    datetime('now')
);

-- ============================================
-- PRINT CONFIRMATION
-- ============================================
-- SELECT 'Valiente Estética seed data inserted successfully!' as status;
