// @ts-check
import { readFile, getFileExtension } from '../src/fileUtilits.js';
import genDiff from '../index.js';

const content = readFile('expected_file.json')

test('genDiff', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(content);
  });

test('formatFile', () => {
    expect(getFileExtension('file1.json')).toEqual('json');
  });