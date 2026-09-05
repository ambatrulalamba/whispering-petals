import Link from 'next/link';

export default function Navbar() {
  return (
<nav className="w-full pt-8 pb-2 flex justify-center items-center gap-4 font-medium text-gray-600">      <Link href="/" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">HOME</Link>
      <Link href="/gallery" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">GALLERY</Link>
      <Link href="/about" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">ABOUT</Link>
      <Link href="/collections" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">COLLECTIONS</Link> 
      <Link href="/contact" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#bb8cca] hover:text-[#380645]">CONTACT</Link>
   </nav>
  );
}