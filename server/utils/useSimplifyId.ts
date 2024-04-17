export default (uri: string) => {
  return uri.split('/').pop()!;
};
