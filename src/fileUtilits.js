import { createDiffieHellmanGroup } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const getFileExtension = (filename) => filename.split('.').at(-1);

export const readFile = (filepath) => {
  const dirname = process.cwd();
  const fullPath = path.resolve(dirname , filepath);
  return fs.readFileSync(fullPath, 'utf-8');
};
