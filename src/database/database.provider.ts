import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { CONSTANTS } from 'sea-backend-helpers';
import { ContractSectionComment } from 'src/models/contract-section-comment/contract-section-comment.model';
import { ContractSectionHistory } from 'src/models/contract-section-history/contract-section-history.model';
import { ContractSectionParticipant } from 'src/models/contract-section-participant/contract-section-participant.model';
import { ContractSectionTemplate } from 'src/models/contract-section-template/contract-section-template.model';
import { ContractSection } from 'src/models/contract-section/contract-section.model';
import { ContractTemplate } from 'src/models/contract-template/contract-template.model';
import { Contract } from 'src/models/contract/contract.model';
import { Participant } from 'src/models/participant/participant.model';
import { ServerConfigService } from 'src/models/server-config/server-config.service';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (serverConfigService: ServerConfigService) => {
      const ConnectionConfig: SequelizeOptions = {
        host: serverConfigService.get<string>('DATABASE_HOST'),
        port: +serverConfigService.get<number>('DATABASE_PORT'),
        username: serverConfigService.get<string>('DATABASE_USERNAME'),
        password: serverConfigService.get<string>('DATABASE_PASSWORD'),
        database: serverConfigService.get<string>('DATABASE_NAME'),
        logging: serverConfigService.get<string>('DATABASE_LOGGING') === 'true',
      };

      const serverEnv = serverConfigService.getServerEnvironment();
      if (serverEnv !== CONSTANTS.Environments.Production) {
        ConnectionConfig.sync = { alter: true };
      }

      const sequelize = new Sequelize({
        dialect: 'mysql',
        ...ConnectionConfig,
      });
      sequelize.addModels([
        Contract,
        ContractSection,
        Participant,
        ContractSectionParticipant,
        ContractSectionHistory,
        ContractTemplate,
        ContractSectionTemplate,
        ContractSectionComment,
      ]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ServerConfigService],
  },
];
