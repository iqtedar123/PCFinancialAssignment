/*
Following a similar approach to https://medium.com/the-crowdlinker-chronicle/creating-writing-downloading-files-in-nestjs-ee3e26f2f726
*/

import * as fs from 'fs';
import { promisify } from 'util';

/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 *
 * @returns {Promise<Buffer>}
 */
export const getFile = async (path: string): Promise<string | Buffer> => {
  const readFile = promisify(fs.readFile);

  return await readFile(path, { encoding: 'utf-8' });
};

/**
 * Create a file at the provided path. Create dir if it doesn't exist.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createOrUpdateFile = async (
  path: string,
  fileName: string,
  data?: string,
): Promise<void> => {
  const filePath = `${path}/${fileName}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  const writeFile = promisify(fs.writeFile);
  if (data) {
    return await writeFile(filePath, data, 'utf8');
  }

  // Create an empty file
  return await fs.closeSync(fs.openSync(filePath, 'a'));
};
