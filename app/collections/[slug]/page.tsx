import { client } from '@/lib/sanity';
import ArtworkList from '@/components/ArtworkList'; // Предполагаем, что у тебя есть компонент списка картин

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

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-5xl font-serif text-center mb-8">{data.title}</h1>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">{data.description}</p>
      
      {/* Здесь используем твой компонент для вывода сетки картин */}
      <ArtworkList artworks={data.artworks} />
    </main>
  );
}