import { registerAs } from '@nestjs/config'
import { GeneralAppConfig } from './types/app.config'
import { RedisConfig } from './types/redis.config'

const AppConfig = registerAs(
  'appConfig',
  (): GeneralAppConfig => ({
    environment: process.env.NODE_ENV || 'dev'
  })
)

const RedisConfiguration = registerAs(
  'redisConfig',
  (): RedisConfig => ({
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisTTL: process.env.REDIS_TTL || '90',
    redisPort: process.env.REDIS_PORT || '6379',
    redisDb: parseInt(process.env.REDIS_DB) || 0
  })
)

export {
  RedisConfiguration,
  AppConfig
}
