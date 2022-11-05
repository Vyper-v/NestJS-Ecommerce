import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserEntity {
  @Expose({ name: 'id' })
  _id: string;
  @Expose()
  email: string;
  @Expose()
  role: string;
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
