import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common"
import { IOkResponse } from "src/interfaces";
import { AccountService } from "../account/account.service";
import { TransactionDto } from "./transaction.dto";
import { TransactionDocument } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";
import { TransactionType } from './transaction.enum'

@Injectable()
export class TransactionService {
  private logger = new Logger(TransactionService.name)
  constructor (
    private readonly transactionRepository: TransactionRepository,
    private readonly accountService: AccountService,
  ) {}

  async history(account: string): Promise<TransactionDocument[]> {
    const returnedAccount = await this.accountService.fetchByAccount(account)
    if (!returnedAccount) throw new NotFoundException(`Account number ${account} does not exist`)

    return this.transactionRepository.fetchAccountTransactionHistory(returnedAccount)
  }

  async transferFunds(request: TransactionDto): Promise<IOkResponse> {
    const {senderAccount, recipientAccount} = await this.fetchSourceAndDestinationAccount(request.sender, request.recipient)
    if (senderAccount.balance < request.amount) throw new BadRequestException(`Insufficient funds`)

    const session = await this.transactionRepository.startSession();

    const transactionResults = await session.withTransaction(async () => {
      const senderBalance = senderAccount.balance - request.amount
      const recipientBalance = recipientAccount.balance + request.amount

      senderAccount.balance = senderBalance
      recipientAccount.balance = recipientBalance
  
      const debitSender = await senderAccount.save({session})
      if(!debitSender) throw new BadRequestException('Could not debit sender account')

      const creditRecipient = await recipientAccount.save({session})
      if(!creditRecipient) await session.abortTransaction();

      await this.transactionRepository.save({
        sender: senderAccount,
        recipient: recipientAccount, 
        amount: request.amount, 
        type: TransactionType.TRANSFER
      })
    },
    { 
      readPreference: 'primary',
      readConcern: {level: 'local'},
      writeConcern: { w: 'majority'}
    })

    session.endSession()
    
    if (transactionResults) {
      this.logger.log('Transfer successful')
      return { ok: true, message: "Transaction successful"}
    }

    this.logger.error('Transaction rolled back')
    throw new BadRequestException('Transfer could not be completed')
  }

  private async fetchSourceAndDestinationAccount(sender: string, recipient: string) {
    const [senderAccount, recipientAccount] = await Promise.all([
      this.accountService.fetchByAccount(sender), 
      this.accountService.fetchByAccount(recipient)
    ])

    if (!senderAccount) throw new NotFoundException(`Account number ${sender} not found`)
    if (!recipientAccount) throw new NotFoundException(`Account number ${recipient} not found`)

    return {senderAccount, recipientAccount}
  }
}