import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from './config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { AuthModule } from './auth/auth.module';
import { roles } from './app.roles';
import { UserModule } from './user/user.module';
import { ProviderModule } from './provider/provider.module';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { SaleModule } from './sale/sale.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public/'),
      serveStaticOptions: {
        index: false,
      }
    }),
    MailerModule.forRoot({
      transport: {
        host: "localhost",
        port: 1025,
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(DATABASE_HOST),
        port: parseInt(config.get<string>(DATABASE_PORT), 10),
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname + './**/**/*entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file'
      })
    }),
    AuthModule,
    AccessControlModule.forRoles(roles),
    UserModule,
    ProviderModule,
    ItemModule,
    InventoryModule,
    OrderModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
