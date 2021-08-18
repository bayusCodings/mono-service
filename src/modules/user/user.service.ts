import { 
  Injectable, 
  UnauthorizedException,
  PreconditionFailedException,
  NotFoundException,
  NotAcceptableException 
} from '@nestjs/common'
import { IJwtUserData, IResponse } from 'src/interfaces';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../account/account.service';
import { CreateUserDto, LoginDto } from './user.dto';
import { IUserdetails, ITokenResponse } from './user.interface';
import { UserRepository } from './user.repository';
import { Account, AccountDocument } from '../account/account.model';

@Injectable()
export class UserService {
  constructor (
    private readonly userRepoository: UserRepository,
    private readonly authService: AuthService,
    private readonly accountService: AccountService
  ) {}

  async createUser(request: CreateUserDto): Promise<ITokenResponse> {
    const user = await this.userRepoository.findByEmail(request.email)
    if (user) throw new PreconditionFailedException('User account already exist')

    request.password = this.authService.getHash(request.password)
    request.email = request.email.toLowerCase()

    const createdUser = await this.userRepoository.save(request)
    await this.accountService.addAccount(createdUser.toObject())

    return { token: this.authService.createToken({ id: createdUser._id }) }
  }

  async login(request: LoginDto): Promise<ITokenResponse> {
    const returnedUser = await this.userRepoository.findByEmail(request.email.toLowerCase())
    if (!returnedUser) throw new UnauthorizedException('User not found')

    const pass = this.authService.compareHash(request.password, returnedUser.password)
    if (!pass) throw new UnauthorizedException('Incorrect password')

    return { token: this.authService.createToken({ id: returnedUser._id }) }
  }

  async generateNewAccountNumber(ctx: IJwtUserData): Promise<IResponse<Account>> {
    const user = await this.userRepoository.findById(ctx.id)
    if (!user) throw new NotFoundException('User not found')

    const totalCount = await this.accountService.totalUserAccount(user.toObject())

    if(totalCount == 4) {
      throw new NotAcceptableException('You cannot have more than 4 accounts')
    }

    const account = await this.accountService.addAccount(user.toObject())
    return { message: "Successfully created a new account number", data: account }
  }

  async fetchUserAccounts(ctx: IJwtUserData): Promise<IResponse<AccountDocument[]>> {
    const user = await this.userRepoository.findById(ctx.id)
    if (!user) throw new UnauthorizedException('User not found')

    const accounts = await this.accountService.fetchAllByUser(user)
    return {message: 'Fetched all user accounts successfully', data: accounts}
  }

  async fetchUserByAccount(account: string): Promise<IUserdetails> {
    const accountDetails = await this.accountService.fetchByAccount(account)
    return {name: accountDetails.user.name}
  }
}
