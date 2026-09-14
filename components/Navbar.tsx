import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full pt-6 pb-4 px-4 flex flex-col items-center border-b border-gray-100 mb-8">
      {/* Заголовок сайта по центру */}
      <Link href="/" className="text-2xl md:text-3xl font-sans font-normal uppercase tracking-widest text-gray-800 mb-6 text-center">
        Whispering Petals
      </Link>

      {/* Навигационное меню с адаптивным переносом на мобильных */}
      <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-3 text-xs sm:text-sm font-medium text-gray-600">
        <Link href="/" className="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">HOME</Link>
        <Link href="/gallery" className="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">GALLERY</Link>
        <Link href="/about" className="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">ABOUT</Link>
        <Link href="/collections" className="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">COLLECTIONS</Link>
        <Link href="/contact" className="px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">CONTACT</Link>
      </nav>
    </header>
  );
}