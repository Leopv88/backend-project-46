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

const data = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

export default (tree) => {
  const iter = (object, spaceCount) => {
    const currentIndent = ' '.repeat(spaceCount);
    const bracketIndent = ' '.repeat(spaceCount - 2);

    const result = object.map((key) => {
      if (key.action === 'deleted') {
        return `${currentIndent}${data.deleted} ${key.key}: ${stringify(key.oldValue, spaceCount)}`;
      }

      if (key.action === 'added') {
        return `${currentIndent}${data.added} ${key.key}: ${stringify(key.newValue, spaceCount)}`;
      }

      if (key.children) {
        return `${currentIndent}${data.unchanged} ${key.key}: ${iter(key.children, spaceCount + 4)}`;
      }

      if (key.action === 'changed') {
        return [`${currentIndent}${data.deleted} ${key.key}: ${stringify(key.oldValue, spaceCount)}\n${currentIndent}${data.added} ${key.key}: ${stringify(key.newValue, spaceCount)}`];
      }

      return `${currentIndent}${data.unchanged} ${key.key}: ${stringify(key.oldValue, spaceCount)}`;
    });

    return [
      '{',
      ...result,
      `${bracketIndent}}`]
      .join('\n');
  };

  return iter(tree, 2);
};
