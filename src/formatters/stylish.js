import _ from 'lodash';

const stringify = (value, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = spacesCount + depth * 4;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `  ${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default (parseFile1, parseFile2) => {
  const addData = '+';
  const deleteData = '-';
  const noChangeData = ' ';

  const iter = (parseObj1, parseObj2, spaceCount) => {
    const currentIndent = ' '.repeat(spaceCount);
    const bracketIndent = ' '.repeat(spaceCount - 2);

    const result = _.sortBy(_.union(_.keys(parseObj1), _.keys(parseObj2)))
      .map((key) => {
        const value1 = parseObj1[key];
        const value2 = parseObj2[key];

        if (!_.has(parseObj2, key)) {
          return `${currentIndent}${deleteData} ${key}: ${stringify(value1, spaceCount)}`;
        }

        if (!_.has(parseObj1, key)) {
          return `${currentIndent}${addData} ${key}: ${stringify(value2, spaceCount)}`;
        }

        if (_.isObject(value1) && _.isObject(value2)) {
          return `${currentIndent}${noChangeData} ${key}: ${iter(value1, value2, spaceCount + 4)}`;
        }

        if (value1 !== value2) {
          return [`${currentIndent}${deleteData} ${key}: ${stringify(value1, spaceCount)}\n${currentIndent}${addData} ${key}: ${value2}`];
        }

        return `${currentIndent}${noChangeData} ${key}: ${value2}`;
      });

    return [
      '{',
      ...result,
      `${bracketIndent}}`]
      .join('\n');
  };

  return iter(parseFile1, parseFile2, 2);
};
