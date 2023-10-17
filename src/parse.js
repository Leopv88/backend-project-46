import yaml from 'js-yaml';
import { readFile, getFileExtension } from './fileUtilits.js';

export default (filepath) => {
  switch (getFileExtension(filepath)) {
    case 'json':
      return JSON.parse(readFile(filepath));
    case 'yaml':
    case 'yml':
      return yaml.load(readFile(filepath));
    default:
      throw new Error(`Format file ${filepath} is not correct`);
  }
};
