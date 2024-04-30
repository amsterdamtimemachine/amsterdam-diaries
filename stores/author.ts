export const useAuthorStore = defineStore('Author', () => {
  const authors = ref<Author[]>([]);
  const route = useRoute();

  /**
   * Computed
   */
  const currentAuthor = computed<Author | undefined>(() => {
    return authors.value.find(author => author.slug === route.params.authorName);
  });

  /**
   * Methods
   */

  const fetchAuthors = async () => {
    const result: any = await $fetch('/api/authors');
    authors.value = result.authors;
  };

  const fetchCurrentAuthorDiaries = async () => {
    if (!currentAuthor.value) {
      return;
    }
    if (currentAuthor.value.diaries?.length) {
      return;
    }
    const result: any = await $fetch(`/api/diaries/${currentAuthor.value.id}`);
    currentAuthor.value.diaries = result.diaries;
  };

  const fetchDiaryPage = (entryId: string): Page | undefined => {
    let page: Page | undefined;
    currentAuthor.value?.diaries.forEach(diary => {
      diary.pages.forEach(p => {
        if (p.id === entryId) {
          page = p;
        }
      });
    });
    return page;
  };

  const fetchDiaryEntrySections = async (entryId: string) => {
    const page = fetchDiaryPage(entryId);
    if (page?.sections?.length) {
      return;
    }

    const result: any = await $fetch(`/api/entries/${entryId}`);
    page!.sections = result.sections;
  };

  return {
    authors,
    currentAuthor,
    fetchAuthors,
    fetchCurrentAuthorDiaries,
    fetchDiaryEntrySections,
  };
});
