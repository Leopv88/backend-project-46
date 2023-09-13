import fs from 'fs';
import path from 'path';

const getFileExtension = (string) => string.split('.').at(-1);

export default (filepath) => {
    const absolutFilePath = path.resolve(process.cwd(), filepath);
    switch (getFileExtension(absolutFilePath)) {
        case 'json':
          return JSON.parse(fs.readFileSync(absolutFilePath));
        default:
          console.log('Неверный формат файла');
    };
};