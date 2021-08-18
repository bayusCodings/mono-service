import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  password: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsDefined()
  password: string;
}