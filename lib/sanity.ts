import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '0hdekzit',
  dataset: 'production',
  apiVersion: '2026-06-15',
  useCdn: false,
  perspective: 'published',
});