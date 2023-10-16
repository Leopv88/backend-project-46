import { readFile, getFileExtension } from './fileUtilits.js';
import yaml from 'js-yaml';


export default (filepath) => {
  switch (getFileExtension(filepath)) {
    case 'json':
      return JSON.parse(readFile(filepath));
    case 'yaml','yml':
      return yaml.load(readFile(filepath));
    default:
      throw new Error('Неверный формат файла');
  }
};
