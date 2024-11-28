export default {
  book: ['id', 'author_id', 'about_id', 'name', 'description', 'temporal_coverage', 'date_created'],
  entry: ['id', 'book_id', 'position'],
} as const;
