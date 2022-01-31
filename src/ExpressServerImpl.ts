import compression from 'compression'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import { Server } from 'http'
import morgan from 'morgan'
import { AddressInfo } from 'net'
import path from 'path'
import { useExpressServer } from 'routing-controllers'
import { inject, injectable } from 'tsyringe'
import { IAppEnvironment, ILogger, IServer } from './@types'
import DI_TYPES from './ioc/type'

@injectable()
export default class ExpressServerImpl implements IServer {
  public server: Server
  public app: Application

  constructor(
    @inject(DI_TYPES.APP_ENV) private readonly _env: IAppEnvironment,
    @inject(DI_TYPES.WINSTON_LOGGER) private readonly _logger: ILogger
  ) {
    this._configureExpressPipeline()
    this._configureServer()
  }

  start = (): Promise<void> =>
    new Promise<void>((resolve) => {
      this.server = this.app.listen(this._env.port, () => {
        const { port } = this.server.address() as AddressInfo
        this._logger.info(`Application running at http://localhost:${port}/api`)
        return resolve()
      })
    })

  stop = (): Promise<void> =>
    new Promise<void>((resolve) => {
      this.server.close()
      return resolve()
    })

  private _configureServer = () => {
    useExpressServer(this.app, {
      controllers: [path.join(__dirname, 'controllers/**/*.controller.*')],
      middlewares: [path.join(__dirname, 'middlewares/**/*.middleware.*')],
    })
  }

  private _configureExpressPipeline = () => {
    this.app = express()
    this.app
      .use(cors())
      .use(helmet())
      .use(compression())
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(
        morgan('tiny', {
          skip: () => this._env.env !== 'development',
          stream: { write: (value) => this._logger.http(value) },
        })
      )
  }
}
