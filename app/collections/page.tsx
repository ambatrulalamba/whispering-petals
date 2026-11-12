export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/image';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Collections — Botanical Watercolor Art | Whispering Petals',
  description: 'Explore curated collections of original botanical watercolor artworks by Olena.',
  alternates: {
    canonical: 'https://whisperingpetals.net/collections',
  },
  openGraph: {
    title: 'Collections — Whispering Petals',
    description: 'Explore curated collections of original botanical watercolor artworks by Olena.',
    url: 'https://whisperingpetals.net/collections',
    siteName: 'Whispering Petals',
    locale: 'en_US',
    type: 'website',
  },
};

async function getCollections() {
  return await client.fetch(`*[_type == "collection"]{
    _id, title, slug, description, coverImage
  }`);
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <main className="px-6 py-16 md:px-16 md:py-24 w-full bg-[#FAFAF8] min-h-screen">
      
      {/* Заголовок в едином изысканном стиле */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-stone-900 mb-3">
          Collections
        </h1>
        <p className="text-stone-400 font-sans tracking-[0.2em] text-xs uppercase">
          Curated Series by Olena
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {collections.map((col: any) => (
          <Link href={`/collections/${col.slug.current}`} key={col._id} className="group block">
            
            {/* Музейное паспарту #F8F4F5 без скруглений */}
            <div className="relative bg-[#F8F4F5] p-4 md:p-5 rounded-none border border-stone-300/40 transition-all duration-500 group-hover:border-stone-400">
              
              {/* Контейнер изображения без скруглений */}
              <div className="aspect-[4/3] relative overflow-hidden rounded-none bg-stone-100 mb-6">
                {col.coverImage && (
                  <Image 
                    src={urlFor(col.coverImage).url()} 
                    alt={col.title} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                  />
                )}
              </div>

              {/* Название и описание коллекции */}
              <h2 className="text-xl font-serif font-normal text-stone-800 tracking-wide mb-2 group-hover:text-stone-600 transition-colors">
                {col.title}
              </h2>
              
              {col.description && (
                <p className="text-stone-500 text-sm font-sans font-light leading-relaxed">
                  {col.description.substring(0, 80)}...
                </p>
              )}

            </div>

          </Link>
        ))}
      </div>
    </main>
  );
}