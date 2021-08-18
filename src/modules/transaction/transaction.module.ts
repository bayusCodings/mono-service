import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AccountModule } from '../account/account.module'
import { TransactionController } from './transaction.controller'
import { TransactionModel } from './transaction.model'
import { TransactionRepository } from './transaction.repository'
import { TransactionService } from './transaction.service'

@Module({
  imports: [
    AccountModule,
    MongooseModule.forFeature([
      { name: TransactionModel.name, schema: TransactionModel.schema }
    ])
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService]
})
export class TransactionModule { }
