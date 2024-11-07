import { ResourceInfo } from '~/data/enums';
import Database from '~/server/utils/database';

export default defineEventHandler<Promise<SnippetData[]>>(async event => {
  const client = Database.getInstance();
  const { type, id } = getQuery(event);
  const { snippetField } = ResourceInfo[type as string] ?? {};
  if (!snippetField) {
    return [];
  }

  const query = `
    SELECT
      l1.value,
      a.exact_text,
      a.start_position,
      a.end_position,
      l2.value AS prev_text,
      l3.value AS next_text,
      b.name AS book_name,
      b.temporal_coverage,
      au.name AS author_name,
      au.slug AS author_slug,
      e.position AS page_number
    FROM line l1
    JOIN annotation a ON l1.id = a.source_id
    LEFT JOIN line l2 ON l1.position = l2.position + 1 AND l1.block_id = l2.block_id
    LEFT JOIN line l3 ON l1.position = l3.position - 1 AND l1.block_id = l3.block_id
    INNER JOIN block p ON l1.block_id = p.id
    INNER JOIN entry e ON p.entry_id = e.id
    INNER JOIN book b ON e.book_id = b.id
    INNER JOIN author au ON b.about_id = au.id
    WHERE a.${snippetField} = '${atob(id as string)}'`;
  const resources = await client.query(query);

  return resources.map(row => {
    const exactText = row.exact_text;
    const highlight = `<span class="highlight">${exactText}</span>`;
    const middle = `${row.value.slice(0, row.start_position)}${highlight}${row.value.slice(row.end_position)}`;
    const prev = row.prev_text || '';
    const next = row.next_text || '';
    const snippet = `${prev} ${middle} ${next}`;
    return {
      headerTitle: row.book_name,
      headerSubtitle: row.temporal_coverage || '',
      content: snippet,
      link: `/dagboeken/${row.author_slug}?page=${row.page_number}`,
      linkText: `Lees dagboek van ${row.author_name.split(' ')[0]}`,
    } as SnippetData;
  });
});
