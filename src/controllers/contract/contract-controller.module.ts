import { Module } from '@nestjs/common';

import { ContractController } from './contract.controller';

import { ContractModuleDependencies } from 'src/modules/contract.module';
import { JwtService } from '@nestjs/jwt';
import { ServerConfigService } from 'src/models/server-config/server-config.service';

@Module({
  controllers: [ContractController],
  providers: [
    ...ContractModuleDependencies.providers,
    JwtService,
    ServerConfigService,
  ],
})
export class ContractControllerModule {}
