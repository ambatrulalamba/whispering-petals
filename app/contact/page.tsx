export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto p-12">
      <h1 className="text-4xl font-serif mb-8 text-center">Contact</h1>
      
      {/* Добавляем action и method для отправки */}
      <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
        
        {/* Вставьте ваш ключ сюда */}
        <input type="hidden" name="access_key" value="50b0e5e8-e362-477a-98ff-3eb2c8c1f058" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md p-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea name="message" required rows={5} className="mt-1 block w-full border border-gray-300 rounded-md p-3"></textarea>
        </div>
        
        <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
          Send Message
        </button>
      </form>
    </main>
  );
}