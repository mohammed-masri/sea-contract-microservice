import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Common } from 'sea-backend-helpers';
import { AccountService } from 'src/models/account/account.service';

@Injectable()
export class CheckAccountGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Common.DTO.AuthorizedRequest & Request = context
      .switchToHttp()
      .getRequest();

    const { id } = request.context;

    return this.validateAccount(id, request);
  }

  private async validateAccount(
    accountId: string,
    request: Common.DTO.AuthorizedRequest & Request,
  ): Promise<boolean> {
    try {
      const response = await this.accountService.fetchAccountDetails(accountId);
      request.context.account = response.data;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(error.response.data.message);
      return false;
    }
  }
}
