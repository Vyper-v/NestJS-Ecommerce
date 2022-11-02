import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { cwd } from 'process';

export const UserStorage = diskStorage({
  destination: join(cwd(), 'public/assets/users'),
  filename: (req, file, cb) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return cb(null, `${randomName}${extname(file.originalname)}`);
  },
});
