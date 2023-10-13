// @ts-check
import { readFile, getFileExtension } from '../src/fileUtilits.js';
import genDiff from '../index.js';
import parse from '../src/parse.js';

const content = readFile('expected_file.json');

test('genDiff', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(content);
});

test('formatFile', () => {
  expect(getFileExtension('file1.json')).toEqual('json');
});

test('parse', () => {
  expect(() => {
    parse('file1.txt');
  }).toThrow('Неверный формат файла');
});
