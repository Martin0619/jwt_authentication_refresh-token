import { IocAdapter } from 'routing-controllers'
import { container, Lifecycle } from 'tsyringe'
import { IAppEnvironment, ILogger } from '~api/@types'
import BootstrapImpl from '~api/BootstrapImpl'
import AppEnvironmentsLoaderImpl from '~api/config/app.environment'
import ExpressServerImpl from '~api/ExpressServerImpl'
import WinstonLogger from '~api/libs/winston.logger'
import TsyringeAdapter from './adapter.ioc'
import DI_TYPES from './type'

const tsyringeContainer = container
  .register<IAppEnvironment>(DI_TYPES.APP_ENV, AppEnvironmentsLoaderImpl, {
    lifecycle: Lifecycle.Singleton,
  })
  .register(DI_TYPES.EXPRESS_SERVER, ExpressServerImpl, {
    lifecycle: Lifecycle.Singleton,
  })
  .register(DI_TYPES.BOOTSTRAP, BootstrapImpl, { lifecycle: Lifecycle.Singleton })
  .register<IocAdapter>(DI_TYPES.TSYRINGE_ADAPTER, TsyringeAdapter, {
    lifecycle: Lifecycle.Singleton,
  })
  .register<ILogger>(DI_TYPES.WINSTON_LOGGER, WinstonLogger, {
    lifecycle: Lifecycle.Singleton,
  })

export default tsyringeContainer
