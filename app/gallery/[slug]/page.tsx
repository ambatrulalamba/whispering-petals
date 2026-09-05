import { client } from '@/lib/sanity';
import ArtworkClient from './ArtworkClient';

// Серверный компонент
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Получаем данные картины
  const artwork = await client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0]`, 
    { slug }
  );

  if (!artwork) return <div className="p-12 text-center">Artwork not found.</div>;

  return <ArtworkClient artwork={artwork} />;
}