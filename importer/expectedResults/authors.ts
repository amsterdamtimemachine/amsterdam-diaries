export default {
  author: [
    'id',
    'name',
    'description',
    'slug',
    'birth_date',
    'birth_place_id',
    'death_date',
    'death_place_id',
    'image_id',
  ],
  image: ['id', 'content_url', 'thumbnail_url'],
  resource: ['id', 'type', 'name'],
} as const;
