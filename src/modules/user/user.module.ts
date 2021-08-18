import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModel } from './user.model'
import { AuthModule } from '../auth/auth.module'
import { UserRepository } from './user.repository'
import { AccountModule } from '../account/account.module'

@Module({
  imports: [
    AuthModule,
    AccountModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModel.schema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule { }
