// @ts-check
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { getDataFormat } from '../src/fileUtilits.js';
import genDiff from '../src/index.js';
import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedFileStylish = readFixture('expected_file_stylish.txt');
const expectedFilePlain = readFixture('expected_file_plain.txt');
const expectedFileJSON = readFixture('expected_file_json.txt');

const data = [['json', 'stylish', expectedFileStylish],
  ['yml', 'stylish', expectedFileStylish],
  ['yaml', 'stylish', expectedFileStylish],
  ['yaml', 'plain', expectedFilePlain],
  ['yaml', 'json', expectedFileJSON],
  ['yaml', undefined, expectedFileStylish]];

test.each(data)('genDiff', (dataFormat, formatter, result) => {
  expect(genDiff(getFixturePath(`file1.${dataFormat}`), getFixturePath(`file2.${dataFormat}`), formatter)).toEqual(result);
});

test('formatFile', () => {
  expect(getDataFormat('expected_file.txt')).toEqual('txt');
  expect(() => {
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'newType');
  }).toThrow('Output format is not correct');
});

test('parse', () => {
  expect(() => {
    parse('expected_file.txt');
  }).toThrow('Format file expected_file.txt is not correct');
});
