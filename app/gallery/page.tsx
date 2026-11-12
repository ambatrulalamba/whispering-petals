export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/image';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gallery — Botanical Watercolor Art | Whispering Petals',
  description: 'Explore original botanical watercolor artworks, hand-painted floral studies by Olena.',
  alternates: {
    canonical: 'https://whisperingpetals.net/gallery',
  },
  openGraph: {
    title: 'Gallery — Whispering Petals',
    description: 'Explore original botanical watercolor artworks by Olena.',
    url: 'https://whisperingpetals.net/gallery',
    siteName: 'Whispering Petals',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function GalleryPage() {
  const artworks = await client.fetch(`*[_type == "artwork"] | order(_createdAt desc)`);

  return (
    <main className="p-8 md:p-20 w-full bg-[#FAFAF9] min-h-screen">
      {/* Заголовок галереи в стиле высокой моды / арт-бутика */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-gray-900 mb-4">Botanical Portfolio</h1>
        <p className="text-gray-500 font-sans tracking-widest text-sm uppercase">Original Watercolors by Olena</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
        {artworks.map((item: any) => {
          const hasValidImage = item.images && item.images[0] && (item.images[0].asset || item.images[0]._ref);
          const imageUrl = hasValidImage ? urlFor(item.images[0]).url() : null;

          return (
            <Link 
              href={item.slug?.current ? `/gallery/${item.slug.current}` : '#'} 
              key={item._id} 
              className="group block"
            >
              {/* «Рама» / Контейнер карточки с эффектом паспарту */}
              <div className="relative bg-white p-4 md:p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] group-hover:-translate-y-1">
                
                {/* Окно изображения с пропорциями */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50">
                  {imageUrl && (
                    <Image 
                      src={imageUrl} 
                      alt={item.title || 'Artwork'} 
                      fill 
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  )}
                  
                  {/* Деликатный оверлей при наведении для дорогого эффекта */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Текстовый блок под картиной в изысканном стиле */}
                <div className="mt-6 flex items-baseline justify-between px-2">
                  <h2 className="text-2xl font-serif font-medium text-gray-900 group-hover:text-stone-700 transition-colors">
                    {item.title}
                  </h2>
                  
                  {/* Мелкие технические детали (год или статус), если есть */}
                  {item.year && (
                    <span className="text-xs tracking-widest text-gray-400 uppercase font-sans">
                      {item.year}
                    </span>
                  )}
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}