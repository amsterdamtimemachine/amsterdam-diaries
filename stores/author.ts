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
      return [];
    }
    const result: any = await $fetch(`/api/diaries/${currentAuthor.value.id}`);
    return result.diaries;
  };

  // TODO: Should probably not be in store
  const fetchDiaryEntrySections = async (entryId: string) => {
    const result: any = await $fetch(`/api/entries/${entryId}`);
    return result.sections;
  };

  return {
    authors,
    currentAuthor,
    fetchAuthors,
    fetchCurrentAuthorDiaries,
    fetchDiaryEntrySections,
  };
});
