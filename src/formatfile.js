import _ from 'lodash';

export default (parseFile1, parseFile2) => {
  const result = _.sortBy(_.union(_.keys(parseFile1), _.keys(parseFile2)))
    .map((key) => {
      const data1 = parseFile1[key];
      const data2 = parseFile2[key];
      const addData = `+ ${key}`;
      const deleteData = `- ${key}`;
      const noChangeData = `  ${key}`;
      let newResult = '';

      if (!_.has(parseFile2, key)) {
        newResult += `${deleteData}: ${data1}`;
      }

      if (!_.has(parseFile1, key)) {
        newResult += `${addData}: ${data2}`;
      }

      if (data1 !== data2 && (_.has(parseFile2, key)) && (_.has(parseFile1, key))) {
        newResult += `${deleteData}: ${data1}\n`;
        newResult += `   ${addData}: ${data2}`;
      }

      if (data1 === data2) {
        newResult += `${noChangeData}: ${data2}`;
      }

      return `   ${newResult}`;
    });

  return `{\n${result.join('\n')}\n}`;
};
