import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/image';

export default function ArtworkList({ artworks }: { artworks: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((item: any) => (
        <Link href={`/gallery/${item.slug?.current}`} key={item._id} className="group">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
            {item.images && item.images[0] && (
              <Image 
                src={urlFor(item.images[0]).url()} 
                alt={item.title || 'Artwork'} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            )}
            
            {/* Плашка SOLD поверх картинки, если картина продана */}
            {item.isSold && (
              <div className="absolute top-4 right-4 bg-stone-900/90 text-white text-xs tracking-widest uppercase font-medium px-3 py-1 rounded shadow-md backdrop-blur-sm">
                SOLD
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-baseline">
            <h2 className="font-serif text-xl">{item.title}</h2>
            {/* Если хотите выводить статус или цену справа от названия */}
            {item.isSold && (
              <span className="text-xs tracking-wider uppercase text-stone-500 font-medium">
                Sold
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}