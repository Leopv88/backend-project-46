import _ from 'lodash';

const getString = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (typeof (value) === 'boolean' || value == null) {
    return value;
  }
  return '[complex value]';
};

export default (parseFile1, parseFile2) => {
  const first = 'Property';
  const addData = 'was added with value:';
  const deleteData = 'was removed';
  const change = 'was updated. From';

  const iter = (parseObj1, parseObj2, path) => {
    const result = _.sortBy(_.union(_.keys(parseObj1), _.keys(parseObj2)))
      .map((key) => {
        const value1 = parseObj1[key];
        const value2 = parseObj2[key];
        const fullKey = `${path}${key}`;
        if (!_.has(parseObj2, key)) {
          return `${first} '${fullKey}' ${deleteData}`;
        }

        if (!_.has(parseObj1, key)) {
          return `${first} '${fullKey}' ${addData} ${getString(value2)}`;
        }

        if (value1 !== value2) {
          if (_.isObject(value1) && _.isObject(value2)) {
            return iter(value1, value2, `${fullKey}.`);
          }
          return `${first} '${fullKey}' ${change} ${getString(value1)} to ${getString(value2)}`;
        }

        return null;
      });

    return [...result]
      .filter((item) => item != null)
      .join('\n');
  };

  return iter(parseFile1, parseFile2, '');
};
