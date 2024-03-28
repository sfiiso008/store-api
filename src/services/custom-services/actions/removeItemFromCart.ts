import { BadRequest } from '@feathersjs/errors'
// @app
import { Application } from '../../../declarations'
import { Cart } from './types'

class RemoveItem {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(payload: { userId: string; productId: string }): Promise<Cart> {
    const { userId, productId } = payload

    // Fetch the cart for the given userId
    const cartQuery = await this.app.service('cart').find({
      query: {
        userId
      }
    })

    if (cartQuery.total === 0) {
      // Cart doesn't exist or is empty, return empty cart
      return { _id: '', userId, items: [] }
    }

    const cart: Cart = cartQuery.data[0]

    // Find the index of the item to remove
    let itemIndex

    itemIndex = cart.items.findIndex((item) => item.productId === productId)

    if (itemIndex === -1) {
      // Item not found in cart, return cart as is
      return cart
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1)

    // Patch the cart with the updated items
    return await this.app.service('cart').patch(cart._id as string, cart)
  }
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'custom/remove-from-cart': RemoveItem
  }
}

export default RemoveItem
