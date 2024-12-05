import { Injectable } from '@nestjs/common';
import { ServerConfigService } from '../server-config/server-config.service';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AccountService {
  instance: AxiosInstance;
  constructor(private readonly serverConfigService: ServerConfigService) {
    const PLATFORM_MICROSERVICE_BASE_URL = this.serverConfigService.get<string>(
      'PLATFORM_MICROSERVICE_BASE_URL',
    );
    const PLATFORM_MICROSERVICE_SECRET = this.serverConfigService.get<string>(
      'PLATFORM_MICROSERVICE_SECRET',
    );
    this.instance = axios.create({
      baseURL: PLATFORM_MICROSERVICE_BASE_URL,
      headers: {
        Authorization: `Bearer ${PLATFORM_MICROSERVICE_SECRET}`,
      },
    });
  }

  async fetchAccountDetails(id: string) {
    return await this.instance.get(`/api/external/accounts/${id}`);
  }
}
