import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            if (!this.isModified('password')) {
              return next();
            }
            try {
              const hashedPassword = await hash(this.password, 10);
              this.password = hashedPassword;
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
