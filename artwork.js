JavaScript
export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'series', title: 'Series/Collection', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'year', title: 'Year', type: 'number' },
    { name: 'size', title: 'Size', type: 'string' },
    { name: 'materials', title: 'Materials', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' }
  ]
}