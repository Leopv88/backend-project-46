import genDiffJSON from './stylish.js';
import genDiffPlain from './plain.js';

export default (parseFile1, parseFile2, formatName) => {
  switch (formatName) {
    case 'stylish':
      return genDiffJSON(parseFile1, parseFile2);
    case 'plain':
      return genDiffPlain(parseFile1, parseFile2);
    default:
      throw new Error('Output format is not correct');
  }
};
