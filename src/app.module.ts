import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
