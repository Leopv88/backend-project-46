import genDiff from './src/formatfile.js';
import parse from './src/parse.js';

export default (filepath1, filepath2) => genDiff(parse(filepath1), parse(filepath2));
