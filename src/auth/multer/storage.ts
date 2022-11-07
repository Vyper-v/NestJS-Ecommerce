import { join } from 'path';
import { diskStorage } from 'multer';
import { cwd } from 'process';

export const createStorage = (folder: string) =>
  diskStorage({
    destination: join(cwd(), `public/images/${folder}`),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
