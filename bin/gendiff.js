#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('  Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .argument('<filepath1>', 'first file path')
  .argument('<filepath2>', 'second file path')
  .action((filepath1, filepath2, options) => {
    const type = options.type ? options.type : 'stylish';
    const result = (genDiff(filepath1, filepath2, type));
    console.log(result);
  });

program.parse();
