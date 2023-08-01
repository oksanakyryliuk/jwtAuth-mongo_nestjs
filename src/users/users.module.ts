import { Module } from '@nestjs/common';
import { UserSchema } from './shemas/user.schema';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        DatabaseModule,
    ],
    providers: [
        UsersService,
        ...usersProviders,
    ],
    controllers: [UsersController],
    exports: [UsersService, 'USER_MODEL'],
})
export class UsersModule { }
