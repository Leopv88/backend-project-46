const getString = (value) => {
  switch (typeof (value)) {
    case 'object':
      if (value == null) {
        return value;
      }
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

export default (tree) => {
  const first = 'Property';
  const addData = 'was added with value:';
  const deleteData = 'was removed';
  const change = 'was updated. From';

  const iter = (object, path) => {
    const result = object
      .map((key) => {
        const { value1 } = key;
        const { value2 } = key;
        const fullKey = `${path}${key.key}`;
        if (key.action === 'delete') {
          return `${first} '${fullKey}' ${deleteData}`;
        }

        if (key.action === 'add') {
          return `${first} '${fullKey}' ${addData} ${getString(value2)}`;
        }

        if (value1 !== value2) {
          if (key.type === 'object') {
            return iter(value1, `${fullKey}.`);
          }
          if (key.action === 'change') {
            return `${first} '${fullKey}' ${change} ${getString(value1)} to ${getString(value2)}`;
          }
        }
        return null;
      });

    return [...result]
      .filter((item) => item != null)
      .join('\n');
  };

  return iter(tree, '');
};
