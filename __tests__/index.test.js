// @ts-check
import { readFile } from '../src/fileUtilits.js';
import genDiff from '../index.js';
import parse from '../src/parse.js';

const content = readFile('expected_file.json')

test('parse', () => {
    expect(genDiff(parse('file1.json'), parse('file2.json'))).toEqual(content);
  });
