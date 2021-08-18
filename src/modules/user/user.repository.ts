import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserModel } from './user.model';

@Injectable()
export class UserRepository {
  private logger = new Logger(UserRepository.name)
  constructor (
    @InjectModel(UserModel.name) readonly model: Model<UserDocument>
  ) {}

  save (user: Partial<User>): Promise<UserDocument> {
    try {
      return this.model.create(user)
    } catch(error) {
      this.logger.error(`An error occured during user creation ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  findById(_id: string): Promise<UserDocument> {
    try {
      return this.model.findOne({_id}).exec();
    } catch(error) {
      this.logger.error(`An error occured during user fetch by id ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }

  findByEmail(email: string): Promise<UserDocument> {
    try {
      return this.model.findOne({email}).exec();
    } catch(error) {
      this.logger.error(`An error occured during user fetch by email ${error.message}`, error.stack)
      throw new InternalServerErrorException("An error occured, please try again")
    }
  }
}
