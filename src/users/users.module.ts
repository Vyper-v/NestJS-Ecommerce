import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { renameImage } from 'src/utilities/renameImage';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            if (['password', 'image'].some((x) => !this.isModified(x))) {
              return next();
            }

            try {
              const hashedPassword = await hash(this.password, 10);
              this.password = hashedPassword;
              this.image = await renameImage(
                this.image,
                'users',
                this._id.toString(),
              );
              next();
            } catch (error) {
              next(error);
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
