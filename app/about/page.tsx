import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto p-12">
      <h1 className="text-4xl font-serif mb-12">About</h1>
      
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">        {/* Колонка с фото */}
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/your-photo.jpg" // Замени на путь к своему файлу в папке public
            alt="About me"
            fill
            className="object-cover"
          />
        </div>

        {/* Колонка с текстом */}
        <div className="text-lg text-gray-700 leading-relaxed space-y-6">
          <p>
            Welcome to Whispering Petals. This gallery showcases my journey with botanical watercolor illustrations, where I focus on precision, subtle color layering, and the delicate, often overlooked beauty of the natural world.          </p>
          <p>I believe that every petal tells a story, and through my work, I aim to capture those fleeting moments of grace and color on paper—turning ephemeral blooms into lasting memories. I am deeply inspired by the quiet elegance of nature; the intricate geometry of a leaf, the soft curve of a budding flower, and the poetic dance of light on a dew-kissed surface. There is an unspoken language in a single blossom, and I find a profound aesthetic wonder in every detail, from the vibrant veins of a leaf to the velvety texture of a fully unfurled rose.</p>
          <p>In a world that often rushes forward, my art is an invitation to pause. I strive to share this beauty so that we might all slow down for a heartbeat, breathe in the stillness, and remember just how exquisitely beautiful life truly is.</p>
          <p>
            I believe that every petal tells a story, and through my work, I aim to 
            capture those fleeting moments of grace and color on paper.
          </p>
        </div>
      </div>
    </main>
  );
}