import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/image';
import Link from 'next/link';
import Image from 'next/image';

async function getCollections() {
  return await client.fetch(`*[_type == "collection"]{
    _id, title, slug, description, coverImage
  }`);
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-sans uppercase tracking-widest text-center mb-16">Collections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {collections.map((col: any) => (
          <Link href={`/collections/${col.slug.current}`} key={col._id} className="group">
            <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-6 bg-gray-100">
              {col.coverImage && (
                <Image 
                  src={urlFor(col.coverImage).url()} 
                  alt={col.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              )}
            </div>
            <h2 className="text-2xl font-serif">{col.title}</h2>
            <p className="text-gray-500 mt-2 text-sm italic">{col.description?.substring(0, 80)}...</p>
          </Link>
        ))}
      </div>
    </main>
  );
}