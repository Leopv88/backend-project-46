import _ from 'lodash';

const gen = (parseFile1, parseFile2) => _.sortBy(_.union(_.keys(parseFile1), _.keys(parseFile2)))
  .map((key) => {
    const value1 = parseFile1[key];
    const value2 = parseFile2[key];

    if (!_.has(parseFile2, key)) {
      return {
        action: 'delete',
        key,
        value1,
      };
    } if (!_.has(parseFile1, key)) {
      return {
        action: 'add',
        key,
        value2,
      };
    } if (_.isObject(value1) && _.isObject(value2)) {
      return {
        action: 'nochange',
        key,
        children: gen(value1, value2),
      };
    } if (value1 !== value2) {
      return {
        action: 'change',
        key,
        value1,
        value2,
      };
    }
    return {
      action: 'nochange',
      value1,
      key,
    };
  });

export default gen;
