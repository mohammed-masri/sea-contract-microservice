import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ContractModule } from './modules/contract.module';
import { ContractSectionModule } from './modules/contract-section.module';
import { ParticipantModule } from './modules/participant.module';
import { ContractSectionParticipantModule } from './modules/contract-section-participant.module';
import { ContractSectionHistoryModule } from './modules/contract-section-history.module';
import { ServerConfigModule } from './modules/server-config.module';
import { ContractTemplateModule } from './modules/contract-template.module';
import { ContractSectionTemplateModule } from './modules/contract-section-template.module';
import { ContractSectionCommentModule } from './modules/contract-section-comment.module';
import { ContractControllerModule } from './controllers/contract/contract-controller.module';
import { SeederControllerModule } from './controllers/seeder/seeder-controller.module';
import { SeederModule } from './modules/seeder.module';
import { AccountModule } from './modules/account.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServerConfigModule,
    ContractModule,
    ParticipantModule,
    ContractSectionModule,
    ContractSectionParticipantModule,
    ContractSectionHistoryModule,
    ContractTemplateModule,
    ContractSectionTemplateModule,
    ContractSectionCommentModule,
    ContractControllerModule,
    SeederControllerModule,
    SeederModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
