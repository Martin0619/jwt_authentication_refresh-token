import { Action, ClassConstructor, IocAdapter } from 'routing-controllers'
import { injectable } from 'tsyringe'
import tsyringeContainer from './container'

@injectable()
export default class TsyringeAdapter implements IocAdapter {
  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    const childContainer = tsyringeContainer.createChildContainer()
    return childContainer.resolve<T>(someClass)
  }
}
