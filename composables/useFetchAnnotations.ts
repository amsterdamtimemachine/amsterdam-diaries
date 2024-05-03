export default async (entity: 'context' | 'concept', id: string) => {
  const { annotations }: { annotations: EntityContext[] } = await $fetch(`/api/${entity}/${id}`);
  return annotations;
};
