// @app
import { Application } from '../../../declarations'
import { IItem, WishList } from './types'

class AddToCartService {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create({ payload, userId }: { payload: { items: IItem; userId: string }; userId: string }) {
    let wishlist: WishList

    const { productId, price, itemPicture, itemName } = payload.items

    let wishlistQuery = await this.app.service('wishlist').find({
      query: {
        userId
      }
    })

    if (wishlistQuery.total === 0) {
      wishlist = await this.app.service('wishlist').create({
        userId,
        items: [
          {
            productId,
            price,
            itemPicture,
            itemName
          }
        ]
      })
    } else {
      // Cart exists, check if the item is already present
      const existingCart: WishList = wishlistQuery.data[0]
      const existingItemIndex = existingCart.items.findIndex((item) => item.productId === productId)

      if (existingItemIndex !== -1) {
        // Item already exists, update its quantity and price
        existingCart.items[existingItemIndex].price += price
      } else {
        // Item doesn't exist, add it to the cart
        const newItem = {
          productId,
          price,
          itemPicture,
          itemName
        }
        existingCart.items.push(newItem) // Add the new item directly to the array
      }

      // Patch the cart with the updated items
      wishlist = await this.app.service('wishlist').patch(existingCart._id as string, existingCart)
    }

    return wishlist
  }
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'custom/add-to-wishlist': AddToCartService
  }
}

export default AddToCartService
