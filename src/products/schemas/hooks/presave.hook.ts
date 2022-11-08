import { renameImage } from 'src/utilities/renameImage';

export async function presave(next) {
  if (['image'].some((x) => !this.isModified(x))) {
    return next();
  }

  try {
    this.image = await renameImage(this.image, 'products', this._id.toString());
    next();
  } catch (error) {
    next(error);
  }
}
