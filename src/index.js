import genDiff from './formatters/index.js';
import parse from './parse.js';

export default (filepath1, filepath2, formatName) => genDiff(
  parse(filepath1),
  parse(filepath2),
  formatName,
);
