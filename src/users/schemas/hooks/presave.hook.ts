import { hash } from 'bcrypt';
// import { renameImage } from 'src/utilities/renameImage';

export async function presave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
    // this.image = await renameImage(this.image, 'users', this._id.toString());
    next();
  } catch (error) {
    next(error);
  }
}
