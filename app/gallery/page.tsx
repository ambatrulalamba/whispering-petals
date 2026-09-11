import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/image';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const artworks = await client.fetch(`*[_type == "artwork"]`);

  return (
    <main className="p-8 md:p-16 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        {artworks.map((item: any) => {
          // Проверяем, что внутри картинки реально есть asset (ссылка на файл)
          const hasValidImage = item.images && item.images[0] && (item.images[0].asset || item.images[0]._ref);
          const imageUrl = hasValidImage ? urlFor(item.images[0]).url() : null;

          return (
            <Link 
              href={item.slug?.current ? `/gallery/${item.slug.current}` : '#'} 
              key={item._id} 
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl bg-gray-100">
                {imageUrl && (
                  <Image 
                    src={imageUrl} 
                    alt={item.title || 'Artwork'} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                )}
              </div>
              <h2 className="mt-6 text-2xl font-serif font-medium">{item.title}</h2>
            </Link>
          );
        })}
      </div>
    </main>
  );
}