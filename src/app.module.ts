import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigService, ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
   
    ConfigModule.forRoot({
      envFilePath: ".development.env",
      isGlobal: true
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),

  ],
})
export class AppModule {}
