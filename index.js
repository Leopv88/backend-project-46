import genDiff from './src/formatfile.js';
import parse from './src/parse.js';

export default (filepath1, filepath2, type) => genDiff(parse(filepath1), parse(filepath2), type);
