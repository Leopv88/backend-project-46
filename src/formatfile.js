import _ from 'lodash';

const treeActionNochange = (key, value1, type) => {
  const tree = {};
  tree.key = key;
  tree.action = 'nochange';
  tree.value1 = value1;
  tree.type = type;
  return tree;
};
const treeActionChange = (key, value1, value2) => {
  const tree = {};

  tree.key = key;
  tree.action = 'change';
  tree.value1 = value1;
  tree.value2 = value2;
  return tree;
};

const treeActionDelete = (key, value1) => {
  const tree = {};

  tree.key = key;
  tree.action = 'delete';
  tree.value1 = value1;
  return tree;
};

const treeActionAdd = (key, value2) => {
  const tree = {};
  tree.key = key;
  tree.action = 'add';
  tree.value2 = value2;
  return tree;
};

export default (parseFile1, parseFile2) => {
  const iter = (parseObj1, parseObj2) => {
    const result = _.sortBy(_.union(_.keys(parseObj1), _.keys(parseObj2)))
      .map((key) => {
        const value1 = parseObj1[key];
        const value2 = parseObj2[key];

        if (!_.has(parseObj2, key)) {
          return treeActionDelete(key, value1);
        } if (!_.has(parseObj1, key)) {
          return treeActionAdd(key, value2);
        } if (_.isObject(value1) && _.isObject(value2)) {
          return treeActionNochange(key, iter(value1, value2), 'object');
        } if (value1 !== value2) {
          return treeActionChange(key, value1, value2);
        }
        return treeActionNochange(key, value1, 'string');
      });

    return [...result];
  };

  return iter(parseFile1, parseFile2);
};
