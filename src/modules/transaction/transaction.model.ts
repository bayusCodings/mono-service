import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Account, AccountModel } from '../account/account.model';
import { TransactionType } from './transaction.enum';

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: AccountModel.name })
  sender: Account

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: AccountModel.name })
  recipient: Account

  @Prop()
  type: TransactionType

  @Prop()
  amount: number
}

export type TransactionDocument = Transaction & Document;
export const TransactionModel = { name: 'Transaction', schema: SchemaFactory.createForClass(Transaction) }
