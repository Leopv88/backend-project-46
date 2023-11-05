import _ from 'lodash';

const gen = (parseFile1, parseFile2) => _.sortBy(_.union(_.keys(parseFile1), _.keys(parseFile2)))
  .map((key) => {
    const oldValue = parseFile1[key];
    const newValue = parseFile2[key];

    if (!_.has(parseFile2, key)) {
      return {
        action: 'deleted',
        key,
        oldValue,
      };
    }
    if (!_.has(parseFile1, key)) {
      return {
        action: 'added',
        key,
        newValue,
      };
    }
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        action: 'nested',
        key,
        children: gen(oldValue, newValue),
      };
    }
    if (oldValue !== newValue) {
      return {
        action: 'changed',
        key,
        oldValue,
        newValue,
      };
    }
    return {
      action: 'unchanged',
      oldValue,
      key,
    };
  });

export default gen;
