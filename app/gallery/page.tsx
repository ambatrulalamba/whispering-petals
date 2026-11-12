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
  // Сортировка: сначала по году от новых к старым (2026 -> 2025 -> 2024), затем по дате создания
  const artworks = await client.fetch(`*[_type == "artwork"] | order(year desc, _createdAt desc)`);

  return (
    <main className="px-6 py-16 md:px-16 md:py-24 w-full bg-[#FAFAF8] min-h-screen">
      {/* Заголовок галереи */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-stone-900 mb-3">
          Botanical Portfolio
        </h1>
        <p className="text-stone-400 font-sans tracking-[0.2em] text-xs uppercase">
          Original Watercolors by Olena
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">
        {artworks.map((item: any) => {
          const hasValidImage = item.images && item.images[0] && (item.images[0].asset || item.images[0]._ref);
          const imageUrl = hasValidImage ? urlFor(item.images[0]).url() : null;

          return (
            <Link 
              href={item.slug?.current ? `/gallery/${item.slug.current}` : '#'} 
              key={item._id} 
              className="group block"
            >
              {/* Музейное паспарту без скруглений */}
              <div className="relative bg-[#F4F1EB] p-4 md:p-6 rounded-none border border-stone-300/50 transition-all duration-500 group-hover:border-stone-400">
                
                {/* Изображение без скруглений */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-stone-100">
                  {imageUrl && (
                    <Image 
                      src={imageUrl} 
                      alt={item.title || 'Artwork'} 
                      fill 
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                    />
                  )}
                </div>

                {/* Подпись под картиной */}
                <div className="mt-6 px-1 flex items-baseline justify-between">
                  <h2 className="text-xl font-serif font-normal text-stone-800 tracking-wide group-hover:text-stone-600 transition-colors">
                    {item.title}
                  </h2>
                  {item.year && (
                    <span className="text-[11px] tracking-widest text-stone-400 font-sans uppercase">
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