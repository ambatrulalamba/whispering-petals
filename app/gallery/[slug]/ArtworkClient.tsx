'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/image';
import Link from 'next/link';

export default function ArtworkClient({ artwork }: { artwork: any }) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev === artwork.images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setIndex((prev) => (prev === 0 ? artwork.images.length - 1 : prev - 1));

  return (
    <main className="max-w-4xl mx-auto p-8">
      
      <h1 className="text-3xl md:text-4xl font-sans font-normal uppercase tracking-widest text-gray-800 text-center mb-12">
        {artwork.title}
      </h1>

      {/* Блок картины: убрали aspect-ratio, используем flex для адаптивности */}
 {/* Контейнер картины с ограничением высоты */}
<div className="relative group w-full flex justify-center">
  <div className="relative w-full h-auto max-h-[70vh] flex justify-center">
    <Image 
      src={urlFor(artwork.images[index]).url()} 
      alt={artwork.title} 
      width={1200}
      height={800}
      // Добавили max-h-[70vh] и object-contain
      className="w-auto h-full max-h-[70vh] object-contain" 
      priority
    />
  </div>
  
  {/* Стрелки остаются на месте */}
  <button 
    onClick={prevSlide} 
    className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity text-2xl hover:scale-110"
  >
    ❮
  </button>
  <button 
    onClick={nextSlide} 
    className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity text-2xl hover:scale-110"
  >
    ❯
  </button>
</div>
        


      {/* Превью */}
      <div className="flex gap-4 mt-8 justify-center flex-wrap">
        {artwork.images.map((img: any, i: number) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)} 
            className={`w-16 h-16 rounded overflow-hidden border ${index === i ? 'border-gray-900' : 'border-gray-200'}`}
          >
            <Image src={urlFor(img).url()} alt="thumb" width={64} height={64} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>

      {/* Описание и кнопки */}
      <div className="mt-12 text-center max-w-2xl mx-auto space-y-4">
        <p className="text-sm uppercase tracking-widest text-gray-500">{artwork.series}</p>
        <p className="text-gray-700 italic">{artwork.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm uppercase tracking-widest mt-6 border-t pt-6">
          <p><span className="text-gray-400">Year:</span> {artwork.year}</p>
          <p><span className="text-gray-400">Size:</span> {artwork.size}</p>
          <p><span className="text-gray-400">Materials:</span> {artwork.materials}</p>
          <p className="font-bold">{artwork.price}</p>
        </div>
      </div>

      <div className="mt-16 text-center border-t pt-8">
        <Link href="/gallery" className="text-gray-500 hover:text-black uppercase tracking-widest text-sm">
          ← Back to Gallery
        </Link>
      </div>
    </main>
  );
}