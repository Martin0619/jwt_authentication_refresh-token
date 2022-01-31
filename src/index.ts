import 'reflect-metadata'
import { IServer } from './@types'
import tsyringeContainer from './ioc/container'
import DI_TYPES from './ioc/type'

const server = tsyringeContainer.resolve<IServer>(DI_TYPES.EXPRESS_SERVER)

server.start()

process.on('SIGINT', server.stop)
process.on('SIGTERM', server.stop)
