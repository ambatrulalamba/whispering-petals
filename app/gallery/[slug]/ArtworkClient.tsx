'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/image';
import Link from 'next/link';

export default function ArtworkClient({ artwork }: { artwork: any }) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev === artwork.images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setIndex((prev) => (prev === 0 ? artwork.images.length - 1 : prev - 1));

  // Безопасное форматирование массива категорий
  const categoriesString = Array.isArray(artwork.category) 
    ? artwork.category.join(', ') 
    : (artwork.category || 'Original Painting');

  return (
    <main className="max-w-4xl mx-auto p-8">
      
      <h1 className="text-3xl md:text-4xl font-sans font-normal uppercase tracking-widest text-gray-800 text-center mb-12">
        {artwork.title}
      </h1>

      {/* Контейнер картины */}
      <div className="relative group w-full flex justify-center">
        <div className="relative w-full h-auto max-h-[70vh] flex justify-center">
          <Image 
            src={urlFor(artwork.images[index]).url()} 
            alt={artwork.title} 
            width={1200}
            height={800}
            className="w-auto h-full max-h-[70vh] object-contain" 
            priority
          />
        </div>
        
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

      {/* Описание */}
      <div className="mt-12 text-center max-w-2xl mx-auto space-y-4">
        {artwork.series && <p className="text-sm uppercase tracking-widest text-gray-500">{artwork.series}</p>}
        {artwork.description && <p className="text-gray-700 italic">{artwork.description}</p>}
      </div>

      {/* Блок характеристик и кнопки */}
      <div className="mt-8 max-w-xl mx-auto border-t pt-8 space-y-6">
        
        {/* Статус For Sale / Sold */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-gray-600">
          <span className={`w-2 h-2 rounded-full ${artwork.isSold ? 'bg-[#4a2e35]' : 'bg-emerald-600'}`}></span>
          <span>{artwork.isSold ? 'SOLD' : 'FOR SALE'}</span>
        </div>

        {/* Сетка параметров */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-xs uppercase tracking-widest">
          <div>
            <p className="text-gray-400 mb-1">Materials / Medium</p>
            <p className="text-gray-800 font-medium">{artwork.materials}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Year</p>
            <p className="text-gray-800 font-medium">{artwork.year}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Dimensions / Size</p>
            <p className="text-gray-800 font-medium">{artwork.size}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Framing</p>
            <p className="text-gray-800 font-medium">{artwork.framing || 'Unframed'}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Category</p>
            <p className="text-gray-800 font-medium">{categoriesString}</p>
          </div>
        </div>

        {/* Уникальность */}
        <div className="pt-4 border-t text-xs uppercase tracking-widest text-gray-500 text-center">
          ☆ One of a Kind · Only 1 Available
        </div>

        {/* Цена или статус и кнопка связи */}
        <div className="pt-4 border-t flex flex-col items-center space-y-4">
          {artwork.isSold ? (
            <span className="inline-block px-4 py-1.5 bg-[#4a2e35] text-white text-xs tracking-widest uppercase font-medium rounded shadow-sm">
              SOLD
            </span>
          ) : (
            <>
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Price</p>
                <p className="text-2xl font-serif text-gray-800">{artwork.price}</p>
              </div>
              <Link
                href="/contact"
                className="w-full max-w-md text-center py-3.5 px-6 border border-gray-800 text-gray-800 uppercase tracking-widest text-xs font-medium rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200 shadow-sm"
              >
                Contact to Enquire
              </Link>
            </>
          )}
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