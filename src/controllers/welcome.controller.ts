import { Controller, Get } from 'routing-controllers'
import { inject, injectable } from 'tsyringe'
import { ApiResponse, IAppEnvironment } from '~api/@types'
import DI_TYPES from '~api/ioc/type'

@injectable()
@Controller()
export class WelcomeController {
  constructor(@inject(DI_TYPES.APP_ENV) private readonly _env: IAppEnvironment) {}

  @Get('/welcome')
  welcome(): ApiResponse<string> {
    return {
      status: 'SUCCESS',
      data: 'Welcome!',
    }
  }
}
