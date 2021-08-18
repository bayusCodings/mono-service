import { Body, Controller, Get, HttpCode, Query, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { IJwtUserData, IResponse } from 'src/interfaces'
import { CurrentUser } from 'src/middleware/user.context'
import { Account, AccountDocument } from '../account/account.model'
import { PublicEndpoint } from '../auth/auth.strategy'
import { CreateUserDto, LoginDto } from './user.dto'
import { ITokenResponse, IUserdetails } from './user.interface'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor (private readonly userService: UserService) { }

  @Post('/')
  @HttpCode(201)
  @PublicEndpoint()
  @ApiCreatedResponse({description: 'Create user'})
  public async createUserAccount(@Body() body: CreateUserDto): Promise<ITokenResponse> {
    return this.userService.createUser(body)
  }

  @Post('/login')
  @HttpCode(200)
  @PublicEndpoint()
  @ApiOkResponse({description: 'Log user in'})
  public async login(@Body() body: LoginDto): Promise<ITokenResponse> {
    return this.userService.login(body)
  }

  @Put('/account')
  @HttpCode(200)
  @ApiOkResponse({description: 'Add account'})
  public async addAccountNumber(@CurrentUser() ctx: IJwtUserData): Promise<IResponse<Account>> {
    return this.userService.generateNewAccountNumber(ctx)
  }

  @Get('/account/me')
  @HttpCode(200)
  @ApiOkResponse({description: 'Fetch user accounts'})
  public async fetchUserAccounts(@CurrentUser() ctx: IJwtUserData): Promise<IResponse<AccountDocument[]>> {
    return this.userService.fetchUserAccounts(ctx)
  }

  @Get('/search')
  @HttpCode(200)
  @PublicEndpoint()
  @ApiOkResponse({description: 'Search by account'})
  public async searchByAccountNumber(@Query('account') account: string): Promise<IUserdetails> {
    return this.userService.fetchUserByAccount(account)
  }
}
