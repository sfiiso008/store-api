import { Application } from '../../../declarations'
import { WishList } from './types'

class AddedToWishlist {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(payload: { userId: string; productId: number }) {
    const { userId, productId } = payload

    const wishListQuery = await this.app.service('wishlist').find({
      query: {
        userId
      }
    })

    if (wishListQuery.total === 0) {
      return false
    }

    const existingCart: WishList = wishListQuery.data[0]

    const existingItemIndex = existingCart.items.find((item) => item.productId === productId)

    return existingItemIndex ? true : false
  }
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'custom/added-to-wishlist': AddedToWishlist
  }
}

export default AddedToWishlist
