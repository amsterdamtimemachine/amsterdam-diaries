export default (value: string, ref: AnnotationRef): AnnotationLine => {
  const { name, description, value: reference, type, latitude, longitude, source } = ref;
  const subData = latitude && longitude ? { latitude, longitude } : {};

  return {
    type: 'Annotation',
    id: useSimplifyId(source),
    subType: type,
    name,
    description,
    reference,
    value: value.trim(),
    ...subData,
  };
};
