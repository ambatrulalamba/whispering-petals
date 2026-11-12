export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/image';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const artwork = await client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0]{
      title,
      description,
      "imageUrl": images[0].asset->url,
      materials,
      size,
      year
    }`,
    { slug }
  );

  if (!artwork) {
    return {
      title: 'Artwork | Whispering Petals',
      description: 'Botanical watercolor art portfolio by Olena.',
    };
  }

  const siteUrl = 'https://whisperingpetals.net';
  const pageUrl = `${siteUrl}/gallery/${slug}`;
  const imageUrl = artwork.imageUrl ? urlFor(artwork.imageUrl).width(1200).height(630).url() : '';
  
  const description = artwork.description 
    ? artwork.description.slice(0, 150) + '...'
    : `Original botanical watercolor artwork "${artwork.title}" (${artwork.year || ''}). Hand-painted botanical art.`;

  return {
    title: `${artwork.title} | Whispering Petals`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${artwork.title} — Whispering Petals`,
      description,
      url: pageUrl,
      siteName: 'Whispering Petals',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: artwork.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} | Whispering Petals`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = await client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0]{
      title,
      description,
      "imageUrl": images[0].asset->url,
      size,
      materials,
      year,
      price,
      isSold
    }`,
    { slug }
  );

  if (!artwork) {
    return (
      <main className="px-6 py-24 min-h-screen bg-[#FAFAF8] text-center">
        <h1 className="text-2xl font-serif text-stone-800">Artwork not found</h1>
        <Link href="/gallery" className="inline-block mt-6 text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors">
          ← Back to Gallery
        </Link>
      </main>
    );
  }

  const hasValidImage = artwork.images && artwork.images[0] && (artwork.images[0].asset || artwork.images[0]._ref);
  const imageUrl = hasValidImage ? urlFor(artwork.images[0]).url() : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    'name': artwork.title,
    'image': imageUrl,
    'artist': {
      '@type': 'Person',
      'name': 'Olena',
    },
    'artMedium': artwork.materials || 'Watercolor on paper',
    'artForm': 'Painting',
    'size': artwork.size,
    'dateCreated': artwork.year,
    'description': artwork.description,
    'offers': {
      '@type': 'Offer',
      'price': artwork.price || 'Upon request',
      'priceCurrency': 'GBP',
      'availability': artwork.isSold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="px-6 py-16 md:px-16 md:py-24 w-full bg-[#FAFAF8] min-h-screen">
        <div className="max-w-5xl mx-auto">
          
          {/* Навигация назад */}
          <div className="mb-12">
            <Link 
              href="/gallery" 
              className="text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-2"
            >
              <span>←</span> Back to Gallery
            </Link>
          </div>

          {/* Главный блок показа картины в едином стиле с галереей */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Картинка в паспарту #F8F4F5 без скруглений */}
            <div className="lg:col-span-7 bg-[#F8F4F5] p-4 md:p-6 rounded-none border border-stone-300/40">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-stone-100">
                {imageUrl && (
                  <Image 
                    src={imageUrl} 
                    alt={artwork.title || 'Artwork'} 
                    fill 
                    priority
                    className="object-cover" 
                  />
                )}
              </div>
            </div>

            {/* Описание и характеристики в строгом галерейном стиле */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-light text-stone-900 mb-4 tracking-wide">
                  {artwork.title}
                </h1>

                {artwork.year && (
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-8 font-sans">
                    Year: {artwork.year}
                  </p>
                )}

                {artwork.description && (
                  <div className="prose prose-stone text-stone-600 font-sans font-light leading-relaxed mb-8 text-sm">
                    <p>{artwork.description}</p>
                  </div>
                )}

                {/* Характеристики работы */}
                <div className="border-t border-stone-200/80 pt-6 space-y-3 text-xs uppercase tracking-widest text-stone-500">
                  {artwork.materials && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">Medium</span>
                      <span className="text-stone-800 font-normal">{artwork.materials}</span>
                    </div>
                  )}
                  {artwork.size && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">Dimensions</span>
                      <span className="text-stone-800 font-normal">{artwork.size}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-stone-400">Status</span>
                    <span className="text-stone-800 font-normal">
                      {artwork.isSold ? 'Sold' : 'Available'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}