import { Application } from 'express'
import { Server } from 'http'

export interface IAppEnvironment {
  port: number
  env: string
  logging_level: stirng
  api_base_route: string
}

export interface IServer<T = Application> extends IStartable, IStoppable {
  app: T
  server: Server
}

export interface IStartable {
  start(): Promise<void>
}

export interface IStoppable {
  stop(): Promise<void>
}

export interface Consumer<T> {
  (value: T): void
}

export interface ILogger<T = string> {
  error: Consumer<T>
  warn: Consumer<T>
  info: Consumer<T>
  http: Consumer<T>
  debug: Consumer<T>
}

export type ApiResponse<T = any> =
  | {
      status: 'SUCCESS'
      data: T
    }
  | {
      status: 'FAILURE'
      message: string | string[]
    }
