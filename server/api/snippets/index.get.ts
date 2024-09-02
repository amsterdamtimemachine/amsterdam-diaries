import { getClient } from '#imports';

export default defineEventHandler(async event => {
  const client = getClient();
  const { externalId, limit } = getQuery(event);

  const resources = (
    await client.query(`
    SELECT DISTINCT ON (au.id)
      l1.id,
      l1.position,
      l1.value,
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
      au.slug AS author_slug
    FROM line l1
    JOIN annotation a ON l1.id = a.sourceId
    LEFT JOIN Line l2 ON l1.position = l2.position + 1 AND l1.blockid = l2.blockid
    LEFT JOIN Line l3 ON l1.position = l3.position - 1 AND l1.blockid = l3.blockid
    JOIN block p ON l1.blockid = p.id
    JOIN entry e ON p.entryId = e.id
    JOIN book b ON e.bookId = b.id
    JOIN author au ON b.authorId = au.id
    WHERE a.identifyingid = '${externalId}'
    LIMIT ${limit || 4}`)
  ).rows.map(row => {
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
      link: `/dagboeken/${row.author_slug}`,
      linkText: `Lees dagboek van ${row.author_name.split(' ')[0]}`,
    } as DiaryCard;
  });
  return resources;
});
