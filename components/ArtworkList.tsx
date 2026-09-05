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
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            )}
          </div>
          <h2 className="mt-4 font-serif text-xl">{item.title}</h2>
        </Link>
      ))}
    </div>
  );
}