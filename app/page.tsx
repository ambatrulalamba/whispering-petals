import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 pt-4 pb-12">
      
      {/* 1. Название сайта сверху, уменьшили отступ снизу через mb-6 */}
      <h1 className="text-3xl md:text-5xl tracking-[0.2em] mb-6 text-[#380645] font-light">
        WHISPERING PETALS
      </h1>

      {/* 2. Картинка home.jpg */}
      <div className="relative w-full max-w-2xl aspect-[4/3] mb-12 shadow-xl rounded-lg overflow-hidden">
        <Image
          src="/home.jpg"
          alt="Whispering Petals Home"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 3. Текст под картинкой */}
      <div className="max-w-xl text-center space-y-6 text-gray-700">
        <p className="text-lg leading-relaxed font-light italic">
          "Where the delicate silence of nature finds its voice on paper."
        </p>
        <p className="text-lg leading-relaxed font-light">
          Welcome to my botanical sanctuary. Here, I explore the quiet grace of the natural world, 
          capturing the ephemeral beauty of every petal, bud, and leaf. 
          Each painting is a meditative study of light, texture, and the gentle rhythm 
          of life as it blooms and fades.
        </p>
      </div>

      {/* 4. Кнопка Enter Gallery */}
      <Link 
        href="/gallery" 
        className="mt-12 px-10 py-4 bg-[#bb8cca] text-[#380645] hover:opacity-90 transition-all rounded-full tracking-widest text-base uppercase inline-block font-medium"
      >
        Enter Gallery
      </Link>

    </main>
  );
}