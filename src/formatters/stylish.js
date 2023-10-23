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

export default (tree) => {
  const addData = '+';
  const deleteData = '-';
  const noChangeData = ' ';

  const iter = (object, spaceCount) => {
    const currentIndent = ' '.repeat(spaceCount);
    const bracketIndent = ' '.repeat(spaceCount - 2);

    const result = object.map((key) => {
      if (key.action === 'delete') {
        return `${currentIndent}${deleteData} ${key.key}: ${stringify(key.value1, spaceCount)}`;
      }

      if (key.action === 'add') {
        return `${currentIndent}${addData} ${key.key}: ${stringify(key.value2, spaceCount)}`;
      }

      if (key.type === 'object') {
        return `${currentIndent}${noChangeData} ${key.key}: ${iter(key.value1, spaceCount + 4)}`;
      }

      if (key.action === 'change') {
        return [`${currentIndent}${deleteData} ${key.key}: ${stringify(key.value1, spaceCount)}\n${currentIndent}${addData} ${key.key}: ${key.value2}`];
      }

      return `${currentIndent}${noChangeData} ${key.key}: ${key.value1}`;
    });

    return [
      '{',
      ...result,
      `${bracketIndent}}`]
      .join('\n');
  };

  return iter(tree, 2);
};
