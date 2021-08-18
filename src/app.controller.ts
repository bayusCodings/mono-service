import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { PublicEndpoint } from 'src/modules/auth/auth.strategy'

@Controller('')
@PublicEndpoint()
export class AppController {
  constructor () {}

  @Get('errors')
  errorPage (@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'resources/errors.txt'))
  }

  @Get('interactions')
  interctionPage (@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'resources/interactions.txt'))
  }
}
