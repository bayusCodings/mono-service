import { Injectable } from "@nestjs/common"
import { User } from "../user/user.model";
import { AccountDocument } from "./account.model"
import { AccountRepository } from "./account.repository"

@Injectable()
export class AccountService {
  constructor (
    private readonly accountRepoository: AccountRepository,
  ) {}

  async addAccount(request: User): Promise<AccountDocument> {
    const digit = Math.floor(Math.random() * 10000000000).toString();
    const bank = {user: request, account: digit, balance: 100000}

    return this.accountRepoository.save(bank)
  }

  async fetchByUser(request: User): Promise<AccountDocument> {
    return this.accountRepoository.findByUser(request)
  }

  async fetchAllByUser(request: User): Promise<AccountDocument[]> {
    return this.accountRepoository.findAllByUser(request)
  }

  async totalUserAccount(request: User): Promise<number> {
    return this.accountRepoository.countUserAccount(request)
  }

  async fetchByAccount(account: string): Promise<AccountDocument> {
    return this.accountRepoository.findByAccount(account)
  }
}