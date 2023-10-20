// @ts-check
import { readFile, getFileExtension } from '../src/fileUtilits.js';
import genDiff from '../src/index.js';
import parse from '../src/parse.js';

const expectedFileStylish = readFile('expected_file_stylish.txt');
const expectedFilePlain = readFile('expected_file_plain.txt');

test('genDiff', () => {
  expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(expectedFileStylish);
  expect(genDiff('filepath1.yml', 'filepath2.yml', 'stylish')).toEqual(expectedFileStylish);
  expect(genDiff('filepath1.yaml', 'filepath2.yaml', 'stylish')).toEqual(expectedFileStylish);
  expect(genDiff('filepath1.yaml', 'filepath2.yaml', 'plain')).toEqual(expectedFilePlain);
});

test('formatFile', () => {
  expect(getFileExtension('expected_file.txt')).toEqual('txt');
  expect(() => {
    genDiff('file1.json', 'file2.json', 'newType');
  }).toThrow('Output format is not correct');
});

test('parse', () => {
  expect(() => {
    parse('expected_file.txt');
  }).toThrow('Format file expected_file.txt is not correct');
});
