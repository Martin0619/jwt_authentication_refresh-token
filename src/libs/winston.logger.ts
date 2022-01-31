import { inject, injectable } from 'tsyringe'
import winston from 'winston'
import { Consumer, IAppEnvironment, ILogger } from '~api/@types'
import DI_TYPES from '~api/ioc/type'

@injectable()
export default class WinstonLogger implements ILogger {
  private _logger: winston.Logger

  constructor(@inject(DI_TYPES.APP_ENV) private _env: IAppEnvironment) {
    this._logger = this._configureWinstonLogger()
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue',
      http: 'cyan',
    })
  }

  private _configureWinstonLogger = () =>
    winston.createLogger({
      levels: { error: 0, warn: 1, info: 2, http: 3, debug: 4 },
      level: this._env.logging_level,
      transports: new winston.transports.Console(),
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MMM DD, YYYY HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
          ({ level, message, timestamp }) => `🔔 ${level}::${timestamp}::${message}`
        )
      ),
    })

  error: Consumer<string> = (value) => this._logger.error(value)

  warn: Consumer<string> = (value) => this._logger.warn(value)

  info: Consumer<string> = (value) => this._logger.info(value)

  debug: Consumer<string> = (value) => this._logger.debug(value)

  http: Consumer<string> = (value) => this._logger.http(value)
}
