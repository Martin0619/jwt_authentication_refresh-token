import { injectable } from 'tsyringe'
import { IAppEnvironment } from '~api/@types'

@injectable()
export default class AppEnvironmentsLoaderImpl implements IAppEnvironment {
  env = <string>process.env['NODE_ENV']
  port = parseInt(<string>process.env['API_PORT'], 10)
  logging_level = <string>process.env['API_LOGGING_LEVEL']
  api_base_route = <string>(process.env['API_BASE_ROUTE'] ?? 'api')
}
