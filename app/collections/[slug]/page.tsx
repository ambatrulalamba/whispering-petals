export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { client } from '@/lib/sanity';
import ArtworkList from '@/components/ArtworkList';
import Link from 'next/link';

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Получаем коллекцию и все её картины
  const data = await client.fetch(`
    *[_type == "collection" && slug.current == $slug][0]{
      title,
      description,
      "artworks": *[_type == "artwork" && collection._ref in *[_type=="collection" && slug.current == $slug]._id]
    }
  `, { slug });

  if (!data) {
    return (
      <main className="px-6 py-24 min-h-screen bg-[#FAFAF8] text-center">
        <h1 className="text-2xl font-serif text-stone-800">Collection not found</h1>
        <Link href="/collections" className="inline-block mt-6 text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors">
          ← Back to Collections
        </Link>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 md:px-16 md:py-24 w-full bg-[#FAFAF8] min-h-screen">
      
      {/* Навигация назад к списку коллекций */}
      <div className="max-w-6xl mx-auto mb-12">
        <Link 
          href="/collections" 
          className="text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-2"
        >
          <span>←</span> Back to Collections
        </Link>
      </div>

      {/* Заголовок и описание коллекции в едином стиле */}
      <div className="max-w-4xl mx-auto mb-20 text-center">
        <h1 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-stone-900 mb-6">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-stone-600 font-sans font-light leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
            {data.description}
          </p>
        )}
      </div>
      
      {/* Вывод сетки картин через ваш компонент */}
      <div className="max-w-6xl mx-auto">
        <ArtworkList artworks={data.artworks} />
      </div>

    </main>
  );
}