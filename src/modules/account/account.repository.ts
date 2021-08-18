import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.model';
import { Account, AccountDocument, AccountModel } from './account.model';

@Injectable()
export class AccountRepository {
  private logger = new Logger(AccountRepository.name)
  constructor (
    @InjectModel(AccountModel.name) readonly model: Model<AccountDocument>
  ) {}

  save (bank: Partial<Account>): Promise<AccountDocument> {
    try {
      return this.model.create(bank)
    } catch(error) {
      this.logger.error(`An error occured during bank account creation ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  findByUser(user: User): Promise<AccountDocument> {
    try {
      return this.model.findOne({user}).exec();
    } catch(error) {
      this.logger.error(`An error occured during user bank fetch ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  findAllByUser(user: User): Promise<AccountDocument[]> {
    try {
      return this.model.find({user}).exec();
    } catch(error) {
      this.logger.error(`An error occured during user bank fetch ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  countUserAccount(user: User): Promise<number> {
    try {
      return this.model.find({user}).count().exec();
    } catch(error) {
      this.logger.error(`An error occured during user bank fetch ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  findByAccount(account: string): Promise<AccountDocument> {
    try {
      return this.model.findOne({account}).populate('user', 'name').exec()
    } catch(error) {
      this.logger.error(`An error occured during bank fetch by account ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }
}
