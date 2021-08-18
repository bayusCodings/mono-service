import { ExecutionContext } from "@nestjs/common"

export const user = { id: "1234567890" }

export const MockLogger = {
  debug: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn()
}

export const MockAuthGuard = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()
    req.user = { ...user }

    return true
  })
}