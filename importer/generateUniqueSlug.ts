export default function (str: string, existingSlugs: string[]): string {
  const slug = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  let newSlug = slug;
  for (let count = 1; existingSlugs.includes(newSlug); count++) {
    newSlug = `${slug}-${count}`;
  }
  return newSlug;
}
