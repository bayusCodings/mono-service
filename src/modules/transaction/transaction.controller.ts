import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { IOkResponse } from "src/interfaces";
import { TransactionDto } from "./transaction.dto";
import { TransactionDocument } from "./transaction.model";
import { TransactionService } from "./transaction.service";


@Controller('transaction')
@ApiTags('transaction')
@ApiBearerAuth()
export class TransactionController {
  constructor (private readonly transactionService: TransactionService) { }

  @Post('/send-fund')
  @HttpCode(200)
  @ApiOkResponse({description: 'Transfer fund'})
  public async transfer(@Body() body: TransactionDto): Promise<IOkResponse> {
    return this.transactionService.transferFunds(body)
  }

  @Get('/history')
  @HttpCode(200)
  @ApiOkResponse({description: 'Transaction history'})
  public async history(@Query('account') account: string): Promise<TransactionDocument[]> {
    return this.transactionService.history(account)
  }
}