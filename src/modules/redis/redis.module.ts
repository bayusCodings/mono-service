import { Module, Logger, CacheModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'nestjs-pino'
import { AppConfig, RedisConfiguration } from 'src/config/configuration';
import { logConfiguration } from 'src/config/log-configuration';
import { RedisService } from './redis.service';

@Module({
  imports: [
    LoggerModule.forRoot(logConfiguration),
    ConfigModule.forRoot({
      load: [AppConfig]
    }),
    CacheModule.register({
      store: redisStore,
      host: RedisConfiguration().redisHost,
      port: RedisConfiguration().redisPort
    })
  ],
  providers: [
    Logger,
    RedisService
  ],
  exports: [
    Logger,
    RedisService
  ]
})
export class RedisModule { }
