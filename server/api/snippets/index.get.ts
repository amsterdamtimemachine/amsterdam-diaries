import { ResourceInfo } from '~/data/enums';
import Database from '~/server/utils/database';

export default defineEventHandler<Promise<SnippetData[]>>(async event => {
  const client = Database.getInstance();
  const { type, id, limit } = getQuery(event);
  const { snippetField } = ResourceInfo[type as string] ?? {};
  if (!snippetField) {
    return [];
  }

  const query = `
    SELECT DISTINCT ON (au.id)
      l1.id,
      l1.position,
      l1.value,
      a.id,
      a.exactText,
      a.startposition,
      a.endposition,
      l2.id AS prev_id,
      l2.value AS prev_text,
      l3.id AS next_id,
      l3.value AS next_text,
      b.name AS book_name,
      b.temporalcoverage,
      au.name AS author_name,
      au.slug AS author_slug,
      e.position AS page_number
    FROM line l1
    JOIN annotation a ON l1.id = a.sourceId
    LEFT JOIN Line l2 ON l1.position = l2.position + 1 AND l1.blockid = l2.blockid
    LEFT JOIN Line l3 ON l1.position = l3.position - 1 AND l1.blockid = l3.blockid
    JOIN block p ON l1.blockid = p.id
    JOIN entry e ON p.entryId = e.id
    JOIN book b ON e.bookId = b.id
    JOIN author au ON b.aboutId = au.id
    WHERE a.${snippetField} = '${atob(id as string)}'
    LIMIT ${limit || 4}`;
  const resources = await client.query(query);

  return resources.rows.map(row => {
    const exactText = row.exacttext;
    const highlight = `<span class="highlight">${exactText}</span>`;
    const middle = `${row.value.slice(0, row.startposition)}${highlight}${row.value.slice(row.endposition)}`;
    const prev = row.prev_text || '';
    const next = row.next_text || '';
    const snippet = `${prev} ${middle} ${next}`;
    return {
      headerTitle: row.book_name,
      headerSubtitle: row.temporalcoverage || '',
      content: snippet,
      link: `/dagboeken/${row.author_slug}?page=${row.page_number}`,
      linkText: `Lees dagboek van ${row.author_name.split(' ')[0]}`,
    } as SnippetData;
  });
});
