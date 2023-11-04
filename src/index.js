import genDiff from './formatters/index.js';
import parse from './parse.js';
import { readFile, getDataFormat } from './fileUtilits.js';

export default (filepath1, filepath2, formatName) => genDiff(
  parse(readFile(filepath1), getDataFormat(filepath1)),
  parse(readFile(filepath2), getDataFormat(filepath2)),
  formatName,
);
