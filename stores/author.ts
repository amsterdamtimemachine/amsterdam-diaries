export const useAuthorStore = defineStore('Author', () => {
  const authors = ref<Author[]>([]);

  const fetchAuthors = async () => {
    const result: any = await $fetch('/api/authors');
    authors.value = result.authors;
  };

  return {
    authors,
    fetchAuthors,
  };
});
