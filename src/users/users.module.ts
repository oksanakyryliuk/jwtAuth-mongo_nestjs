import { Module } from '@nestjs/common';
import { UserSchema } from './shemas/user.schema';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';

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
