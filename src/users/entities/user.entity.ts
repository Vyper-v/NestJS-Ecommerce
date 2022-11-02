import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  @Expose({ name: 'id' })
  _id: string;
  @Exclude()
  password: string;
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
