import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { Provider } from './entities/provider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

export class AuthModule {}

@Module({
  imports:[
    TypeOrmModule.forFeature([Provider])
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService]
})
export class ProviderModule {}
