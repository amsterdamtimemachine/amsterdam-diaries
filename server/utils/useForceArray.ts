export default (input?: any) => {
  return input ? (Array.isArray(input) ? input : [input]) : [];
};
