import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getFileExtension = (string) => string.split('.').at(-1);

export default (filepath) => {
  // const absolutFilePath = path.resolve(process.cwd(), filepath);
  switch (getFileExtension(filepath)) {
    case 'json':
      return JSON.parse(readFile(filepath));
    default:
      throw new Error('Неверный формат файла');
  }
};
