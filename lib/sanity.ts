import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '0hdekzit', // Узнать можно на manage.sanity.io
  dataset: 'production',
  apiVersion: '2026-06-15',
  useCdn: false,
});