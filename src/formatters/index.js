import genDiffJSON from './stylish.js';
import genDiffPlain from './plain.js';
import gen from '../formatfile.js';

const getFormatName = (formatName) => {
  if (formatName == null) {
    return 'stylish';
  }

  return formatName;
};

export default (parseFile1, parseFile2, formatName) => {
  const object = gen(parseFile1, parseFile2);
  switch (getFormatName(formatName)) {
    case 'stylish':
      return genDiffJSON(object);
    case 'plain':
      return genDiffPlain(object);
    case 'json':
      return JSON.stringify(object);
    default:
      throw new Error('Output format is not correct');
  }
};
