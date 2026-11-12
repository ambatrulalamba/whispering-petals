import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity'; // замените на ваш рабочий импорт, если используется @lib/sanity

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://whisperingpetals.net';

  // Получаем все картины из базы
  const artworks = await client.fetch(`*[_type == "artwork"]{ "slug": slug.current, _updatedAt }`);
  
  const artworkUrls = artworks.map((item: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/gallery/${item.slug}`,
    lastModified: new Date(item._updatedAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Статические страницы сайта
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...artworkUrls];
}