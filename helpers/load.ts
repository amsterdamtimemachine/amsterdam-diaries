import fs from 'node:fs';
import path from 'path';

const loadDiaryFile = (writer: string, filename: string) => {
  const filePath = path.join(process.cwd(), 'assets', 'diaries', writer, filename);
  return fs.readFileSync(filePath, 'utf-8');
};

export { loadDiaryFile };
