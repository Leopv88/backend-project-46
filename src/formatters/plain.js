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

const data = {
  first: 'Property',
  added: 'was added with value:',
  deleted: 'was removed',
  changed: 'was updated. From',
};

export default (tree) => {
  const iter = (object, path) => {
    const result = object
      .map((key) => {
        const fullKey = `${path}${key.key}`;
        if (key.action === 'deleted') {
          return `${data.first} '${fullKey}' ${data.deleted}`;
        }

        if (key.action === 'added') {
          return `${data.first} '${fullKey}' ${data.added} ${getString(key.newValue)}`;
        }

        if (key.children) {
          return iter(key.children, `${fullKey}.`);
        }
        if (key.action === 'changed') {
          return `${data.first} '${fullKey}' ${data.changed} ${getString(key.oldValue)} to ${getString(key.newValue)}`;
        }
        return null;
      });

    return [...result]
      .filter((item) => item != null)
      .join('\n');
  };

  return iter(tree, '');
};
