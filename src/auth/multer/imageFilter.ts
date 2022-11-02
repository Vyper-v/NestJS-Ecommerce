export function imageFilter(req, file, cb) {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
}
