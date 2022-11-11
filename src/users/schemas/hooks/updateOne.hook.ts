import { renameImage } from 'src/utilities/renameImage';

export async function updateOne(next) {
  try {
    this.image = await renameImage(this.image, 'users', this._id.toString());
    next();
  } catch (error) {
    next(error);
  }
}
