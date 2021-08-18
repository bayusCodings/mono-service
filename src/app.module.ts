import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HealthController } from './health/health.controller'
import { APP_GUARD } from '@nestjs/core'
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware'
import { AuthModule } from './modules/auth/auth.module'
import { JwtAuthGuard } from './modules/auth/auth.strategy'
import { UserModule } from './modules/user/user.module'
import { MONGO_URI } from './config/mongo-config'
import { RedisModule } from './modules/redis/redis.module'
import { AccountModule } from './modules/account/account.module'
import { TransactionModule } from './modules/transaction/transaction.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AppGateway } from './app.gateway'

@Module({
  imports: [
    ThrottlerModule.forRoot({ttl: 60, limit: 10}), // Rate Limiting
    AuthModule,
    RedisModule,
    MongooseModule.forRoot(MONGO_URI),
    UserModule,
    AccountModule,
    TransactionModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    AppGateway
  ],
  controllers: [HealthController]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
