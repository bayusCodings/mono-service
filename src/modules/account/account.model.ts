import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User, UserModel } from '../user/user.model';

@Schema({ timestamps: true })
export class Account {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name })
  user: User

  @Prop()
  account: string

  @Prop()
  balance: number
}

export type AccountDocument = Account & Document;
export const AccountModel = { name: 'Account', schema: SchemaFactory.createForClass(Account) }
