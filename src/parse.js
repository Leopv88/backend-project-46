import { readFile, getFileExtension } from './fileUtilits.js';

export default (filepath) => {
  switch (getFileExtension(filepath)) {
    case 'json':
      return JSON.parse(readFile(filepath));
    default:
      throw new Error('Неверный формат файла');
  }
};
