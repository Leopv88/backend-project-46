import _ from 'lodash';

export default (parseFile1, parseFile2) => {
  const iter = (parseObj1, parseObj2) => {
    const result = _.sortBy(_.union(_.keys(parseObj1), _.keys(parseObj2)))
      .map((key) => {
        const tree = {};

        const value1 = parseObj1[key];
        const value2 = parseObj2[key];

        if (!_.has(parseObj2, key)) {
          tree.key = key;
          tree.action = 'delete';
          tree.value1 = value1;
        } else if (!_.has(parseObj1, key)) {
          tree.key = key;
          tree.action = 'add';
          tree.value2 = value2;
        } else if (_.isObject(value1) && _.isObject(value2)) {
          tree.key = key;
          tree.action = 'nochange';
          tree.type = 'object';
          tree.value1 = iter(value1, value2);
        } else if (value1 !== value2) {
          tree.key = key;
          tree.action = 'change';
          tree.value1 = value1;
          tree.value2 = value2;
        } else {
          tree.key = key;
          tree.action = 'nochange';
          tree.value1 = value1;
        }

        return tree;
      });

    return [...result];
  };

  return iter(parseFile1, parseFile2);
};
