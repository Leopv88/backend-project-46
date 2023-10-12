import { readFile } from './fileUtilits.js';
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