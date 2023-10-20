import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const getFileExtension = (filename) => filename.split('.').at(-1);

export const readFile = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fixturePath = path.join(__dirname, '..', '__fixtures__', filepath);
  return fs.readFileSync(fixturePath, 'utf-8');
};
