import createImageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);