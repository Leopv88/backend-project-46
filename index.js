import genDiff from './src/formatfile.js';
import parse from './src/parse.js';


export default (filepath1, filepath2) => {
    return genDiff(parse(filepath1),parse(filepath2));
};