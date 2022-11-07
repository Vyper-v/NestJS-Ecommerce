import * as fs from 'fs/promises';
import { join, extname } from 'path';
import { cwd } from 'process';

export async function renameImage(
  currentFileName: string,
  folderName: string,
  newName: string,
) {
  const basePath = join(cwd(), 'public/images');
  const filePath = join(basePath, folderName, currentFileName);
  const newFileName = `${newName}${extname(currentFileName)}`;
  const newFilePath = join(basePath, folderName, newFileName);
  await fs.rename(filePath, newFilePath);

  return newFileName;
}
