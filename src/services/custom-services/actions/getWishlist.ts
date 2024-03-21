import { BadRequest } from '@feathersjs/errors'
// @app
import { Application } from '../../../declarations'

class GetWishlist {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async get(userId: string) {
    try {
      const cart = await this.app.service('wishlist').find({
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
    'custom/get-wishlist': GetWishlist
  }
}

export default GetWishlist
