import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class TransactionDto {
  @ApiProperty()
  @IsDefined()
  sender: string;
  
  @ApiProperty()
  @IsDefined()
  recipient: string;
  
  @ApiProperty()
  @IsDefined()
  amount: number;
}