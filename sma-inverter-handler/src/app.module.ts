import { Module } from '@nestjs/common';
import { MeasurementsModule } from './measurements/measurements.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InvertersModule } from './inverters/inverters.module';
import { ProductionModule } from './production/production.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.local',
        '.env',
      ],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_CONNECTION_STRING'),
        dbName: configService.get<string>('MONGO_DB_NAME'),
      }),
    }),
    MeasurementsModule,
    InvertersModule,
    ProductionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
