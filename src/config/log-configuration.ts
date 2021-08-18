import { Params } from 'nestjs-pino'

let autoLogging: any = {
  ignorePaths: ['/health/liveness', '/health/readiness'],
  getPath: (req: any) => {
    return req.originalUrl
  }
}

if (process.env.NODE_ENV === 'dev') {
  autoLogging = false
}

const logConfiguration: Params = {
  pinoHttp: {
    autoLogging,
    redact: [
      'req.headers.authorization'
    ],
    base: null,
    messageKey: 'message',
    timestamp: false,
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    ...(process.env.NODE_ENV === 'dev') && {
      prettyPrint: {
        levelFirst: true,
        colorize: true,
        ignore: 'req'
      }
    }
  }
}

export { logConfiguration }
