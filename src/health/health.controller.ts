import { Controller, Get } from '@nestjs/common'
import { PublicEndpoint } from 'src/modules/auth/auth.strategy'

@Controller('health')
@PublicEndpoint()
export class HealthController {
  constructor () {}

  @Get('/liveness')
  readiness () {
    return 'OK'
  }
}
