export const useAuthorStore = defineStore('Author', () => {
  /**
   * State
   */
  const authors = ref<Author[]>([]);

  /**
   * Private methods
   */
  const findAuthorBySlug = (slug: string) => {
    return authors.value.find(author => author.slug === slug);
  };

  /**
   * Methods
   */
  const fetchAuthors = async (slug?: string) => {
    const result: any = await $fetch(`/api/authors${slug ? `?slug=${slug}` : ''}`);
    authors.value = result.authors;
  };

  const fetchPage = async (slug: string, pageNumber: number): Promise<Page | undefined> => {
    const author = findAuthorBySlug(slug);
    if (!author) {
      return;
    }

    // If there aren't any pages, load in al references
    if (!author.pages?.length) {
      const result = await $fetch(`/api/diaries/${author.id}`);
      author.pages = ((result?.diaries || []) as Book[]).map((diary: Book) => diary.pages).flat();
      author.totalPages = author.pages.length;
    }

    // Use the pageNumber to find the page
    const page = author.pages![pageNumber - 1];
    if (!page) {
      return;
    }

    if (!page.sections?.length) {
      const result: any = await $fetch(`/api/entries/${page.id}`);
      page.sections = result.sections;
    }
    return page;
  };

  const fetchNextPage = async (slug: string, lastId?: string): Promise<Page | undefined> => {
    const author = findAuthorBySlug(slug);
    if (!author) {
      return;
    }

    // If there aren't any pages, load in al references
    if (!author.pages?.length) {
      const result = await $fetch(`/api/diaries/${author.id}`);
      author.pages = ((result?.diaries || []) as Book[])
        .map((diary: Book) => diary.pages)
        .flat()
        .sort((a: Page, b: Page) => a.dateCreated.localeCompare(b.dateCreated));
      author.totalPages = author.pages.length;
    }

    // Use the lastId to find the next page
    const index = author.pages!.findIndex(page => page.id === lastId);
    const page = author.pages![index + 1];

    // If no other page was found, return nothing
    if (!page) {
      return;
    }

    if (!page.sections?.length) {
      const result: any = await $fetch(`/api/entries/${page.id}`);
      page.sections = result.sections;
    }
    return page;
  };

  return {
    authors,
    findAuthorBySlug,
    fetchAuthors,
    fetchPage,
    fetchNextPage,
  };
});
