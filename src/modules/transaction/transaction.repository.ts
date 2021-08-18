import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Account } from '../account/account.model';
import { Transaction, TransactionDocument, TransactionModel } from './transaction.model';

@Injectable()
export class TransactionRepository {
  private logger = new Logger(TransactionRepository.name)
  constructor (
    @InjectModel(TransactionModel.name) readonly model: Model<TransactionDocument>
  ) {}

  save (transaction: Partial<Transaction>): Promise<TransactionDocument> {
    try {
      return this.model.create(transaction)
    } catch(error) {
      this.logger.error(`An error occured during transaction creation ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  fetchAccountTransactionHistory (account: Account): Promise<TransactionDocument[]> {
    try {
      return this.model.find({ $or:[{sender: account}, {recipient: account}] }).exec()
    } catch(error) {
      this.logger.error(`An error occured during transaction fetch ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  startSession(): Promise<ClientSession> {
    return this.model.startSession();
  }
}
