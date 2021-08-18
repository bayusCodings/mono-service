import request from 'supertest'
import { Test } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { UserRepository } from './user.repository'
import { JwtAuthGuard } from 'src/modules/auth/auth.strategy'
import { UserModule } from './user.module'
import { APP_GUARD } from '@nestjs/core'
import { user } from 'src/tools/testData/user'
import { MockUserRepository } from 'src/tools/testHelpers/tests.helper'
import { MockLogger, MockAuthGuard } from 'src/tools/testHelpers/common';

describe('Properties', () => {
  let app: INestApplication;
  let httpRequestServer: request.SuperTest<request.Test>;

  beforeEach(async () => {
    jest.clearAllMocks()

    const testModuleBuilder = Test.createTestingModule({
      imports: [UserModule],
      providers: [{
        provide: APP_GUARD,
        useClass: JwtAuthGuard
      }]
    });

    testModuleBuilder.overrideGuard(APP_GUARD)
      .useValue(MockAuthGuard)
      .overrideProvider(UserRepository)
      .useValue(MockUserRepository)
      .overrideProvider(Logger)
      .useValue(MockLogger);

    app = await testModuleBuilder.compile().then(testModule => testModule.createNestApplication());
    app.useGlobalPipes(new ValidationPipe())
    await app.init()

    httpRequestServer = request(app.getHttpServer())
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('POST /user', () => {
    it('Should throw validation error', async () => {
      const userCreationDto = user
      userCreationDto.name = null

      return httpRequestServer
        .post('/user')
        .set('Accept', 'application/json')
        .send(userCreationDto)
        .expect(400)
    })


    // it('Should not create if user already exist', async () => {
    //   MockUserRepository.findByEmail.mockResolvedValue(user);
    //   const userCreationDto = user

    //   return httpRequestServer
    //     .post('/user')
    //     .set('Accept', 'application/json')
    //     .send(userCreationDto)
    //     .expect(412)
    //     .expect(res => {
    //       expect(res.body.message).toBe('User account already exist')
    //   })
    // })
  })

  afterEach(async () => {
    await app.close()
  })
})
