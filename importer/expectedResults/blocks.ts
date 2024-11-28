export default {
  block: ['id', 'type', 'image_id', 'dimensions'],
  line: ['id', 'block_id', 'position'],
  image: ['id', 'content_url', 'thumbnail_url'],
} as const;
