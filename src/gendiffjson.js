import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (filepath1, filepath2) => {
    const absolutFilePath1 = path.resolve(process.cwd(), filepath1);
    const absolutFilePath2 = path.resolve(process.cwd(), filepath2);
    const parseFile1 = JSON.parse(fs.readFileSync(absolutFilePath1));
    const parseFile2 = JSON.parse(fs.readFileSync(absolutFilePath2));
    const result = _.sortBy(_.union(_.keys(parseFile1), _.keys(parseFile2)))
    .map((key) => {
        const data1 = parseFile1[key];
        const data2 = parseFile2[key];
        const addData = '+ ' + key;
        const deleteData = '- ' + key;
        const noChangeData = '  ' + key;
        const newResult = {};

       if(!_.has(parseFile2, key)) {
            newResult[deleteData] = data1;
        };

        if(!_.has(parseFile1, key)) {
            newResult[addData] = data2;
        };

        if(data1 !== data2 && (_.has(parseFile2, key)) && (_.has(parseFile1, key))) {
            newResult[deleteData] = data1;
            newResult[addData] = data2;
        };

        if(data1 == data2) {
            newResult[noChangeData] = data1;            
        };

        return newResult;
    });

    return result;
};