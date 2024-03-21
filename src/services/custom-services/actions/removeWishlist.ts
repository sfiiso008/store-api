import { BadRequest } from '@feathersjs/errors'
// @app
import { Application } from '../../../declarations'
import { WishList } from './types'

class RemoveItem {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(payload: { userId: string; productId: number }): Promise<WishList> {
    const { userId, productId } = payload

    // Fetch the cart for the given userId
    const wishlistQuery = await this.app.service('wishlist').find({
      query: {
        userId
      }
    })

    if (wishlistQuery.total === 0) {
      // Cart doesn't exist or is empty, return empty cart
      return { _id: '', userId, items: [] }
    }

    const wishlist: WishList = wishlistQuery.data[0]

    // Find the index of the item to remove
    let itemIndex

    itemIndex = wishlist.items.findIndex((item) => item.productId === productId)

    if (itemIndex === -1) {
      // Item not found in cart, return cart as is
      return wishlist
    }

    // Remove the item from the cart
    wishlist.items.splice(itemIndex, 1)

    // Patch the cart with the updated items
    return await this.app.service('wishlist').patch(wishlist._id as string, wishlist)
  }
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'custom/remove-from-wishlist': RemoveItem
  }
}

export default RemoveItem
