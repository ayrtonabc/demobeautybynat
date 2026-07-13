import Hero from '@/components/sections/Hero';
import FeaturedTreatments from '@/components/sections/FeaturedTreatments';
import GiftCard from '@/components/sections/GiftCard';
import Philosophy from '@/components/sections/Philosophy';
import PremiumExperience from '@/components/sections/PremiumExperience';
import Testimonials from '@/components/sections/Testimonials';
import InstagramSection from '@/components/sections/InstagramSection';
import ContactSection from '@/components/sections/ContactSection';
import { fetchPageData, getServices } from '@/lib/cms';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const pageData = await fetchPageData('/', 'es');

    return {
        title: 'Beauty By Nat · Natalia Dominiak | Rzęsy, brwi, fryzury i makijaż w Rokietnicy',
        description:
            'Beauty By Nat — kameralne studio urody w Rokietnicy k. Poznania. Rzęsy, brwi, fryzury okolicznościowe i makijaż.',
    };
}

export default async function Home() {
    const [pageData, cmsServices] = await Promise.all([
        fetchPageData('/', 'es'),
        getServices(),
    ]);

    // Mapear servicios del CMS al formato que espera FeaturedTreatments
    const services = cmsServices.length > 0
        ? cmsServices.map((s: any) => ({
            name: s.name,
            description: s.description || '',
            duration: s.duration || '',
            imageUrl: s.image_url || 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
            price: s.price || 'Na zapytanie',
            popular: s.featured || false,
        }))
        : null;
    
    return (
        <>
            <Hero pageData={pageData} />
            <FeaturedTreatments cmsServices={services as any} />
            <GiftCard pageData={pageData} />
            <Philosophy pageData={pageData} />
            <PremiumExperience pageData={pageData} />
            <Testimonials />
            <InstagramSection pageData={pageData} />
            <ContactSection pageData={pageData} />
        </>
    );
}