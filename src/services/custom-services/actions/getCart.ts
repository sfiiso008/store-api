import { BadRequest } from '@feathersjs/errors'
// @app
import { Application } from '../../../declarations'

class GetCart {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async get(userId: string) {
    try {
      const cart = await this.app.service('cart').find({
        query: {
          userId
        }
      })

      return cart.data[0]
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequest(err)
      }
    }
  }
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'custom/get-cart': GetCart
  }
}

export default GetCart
