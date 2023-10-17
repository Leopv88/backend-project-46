// @ts-check
import { readFile, getFileExtension } from '../src/fileUtilits.js';
import genDiff from '../index.js';
import parse from '../src/parse.js';

const content = readFile('expected_file.txt');
const type = 'stylish';

test('genDiff', () => {
  expect(genDiff('file1.json', 'file2.json', type)).toEqual(content);
  expect(genDiff('filepath1.yml', 'filepath2.yml', type)).toEqual(content);
});

test('formatFile', () => {
  expect(getFileExtension('file1.json')).toEqual('json');
  expect(() => {
    genDiff('file1.json', 'file2.json', 'newType');
  }).toThrow('Output format is not correct');
});

test('parse', () => {
  expect(() => {
    parse('file1.txt');
  }).toThrow('Format file file1.txt is not correct');
});
