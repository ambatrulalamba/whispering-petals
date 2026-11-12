import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/image';

export default function ArtworkList({ artworks }: { artworks: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {artworks.map((item: any) => (
        <Link href={`/gallery/${item.slug?.current}`} key={item._id} className="group block">
          
          {/* Музейное паспарту #F8F4F5 с рамкой и без скруглений */}
          <div className="relative bg-[#F8F4F5] p-4 md:p-5 rounded-none border border-stone-300/40 transition-all duration-500 group-hover:border-stone-400">
            
            {/* Контейнер изображения без скруглений */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-stone-100">
              {item.images && item.images[0] && (
                <Image 
                  src={urlFor(item.images[0]).url()} 
                  alt={item.title || 'Artwork'} 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                />
              )}
              
              {/* Плашка SOLD поверх картинки, если картина продана */}
              {item.isSold && (
                <div className="absolute top-4 right-4 bg-stone-900/90 text-white text-xs tracking-widest uppercase font-medium px-3 py-1 rounded-none shadow-md backdrop-blur-sm">
                  SOLD
                </div>
              )}
            </div>
            
            {/* Название и статус под картиной */}
            <div className="mt-6 px-1 flex justify-between items-baseline">
              <h2 className="font-serif text-xl font-normal text-stone-800 tracking-wide group-hover:text-stone-600 transition-colors">
                {item.title}
              </h2>
              {item.isSold && (
                <span className="text-[11px] tracking-widest uppercase text-stone-400 font-sans">
                  Sold
                </span>
              )}
            </div>

          </div>
        </Link>
      ))}
    </div>
  );
}