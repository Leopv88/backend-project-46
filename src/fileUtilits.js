import fs from 'fs';
import path from 'path';

export const getFileExtension = (filename) => filename.split('.').at(-1);

export const readFile = (filepath) => {
  const dirname = process.cwd();
  const fullPath = path.resolve(dirname, filepath);
  console.log(fullPath);
  return fs.readFileSync(fullPath, 'utf-8');
};
