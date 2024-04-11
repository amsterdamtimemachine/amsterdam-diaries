const loadDiaryFile = async (writer: string, filename: string): Promise<any> => {
  const result = await useStorage('assets:server').getItem(`diaries/${writer}/${filename}`, {});

  if (result instanceof Uint8Array) {
    return JSON.parse(Buffer.from(result).toString('utf8'));
  }
  return result;
};

export { loadDiaryFile };
