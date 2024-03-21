import { Application } from '../../../declarations'
import { Cart } from './types'

class GetTotalPrice {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  async get(userId: string) {
    const cartQuery = await this.app.service('cart').find({
      query: {
        userId
      }
    })

    if (cartQuery.total === 0) {
      // Cart doesn't exist or is empty, return 0
      return 0
    }

    // Calculate total price by iterating over items in the cart
    const cart: Cart = cartQuery.data[0]
    let totalPrice = 0
    let totalNumberOfItems = 0

    for (const item of cart.items) {
      totalPrice += item.price * item.quantity
      totalNumberOfItems += item.quantity
    }

    return { totalPrice, totalNumberOfItems }
  }
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'custom/get-total': GetTotalPrice
  }
}

export default GetTotalPrice
