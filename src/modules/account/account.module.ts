import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AccountModel } from './account.model'
import { AccountRepository } from './account.repository'
import { AccountService } from './account.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountModel.name, schema: AccountModel.schema }
    ])
  ],
  controllers: [],
  providers: [AccountService, AccountRepository],
  exports: [AccountService]
})
export class AccountModule { }
