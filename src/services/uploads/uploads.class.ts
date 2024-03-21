import { Params, ServiceMethods } from '@feathersjs/feathers'
// @local
import { Application } from '../../declarations'

// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IData {}

export class Uploads implements Partial<ServiceMethods<IData>> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: IData, params?: Params): Promise<IData> {
    return data
  }
}
