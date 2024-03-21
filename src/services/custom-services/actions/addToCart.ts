// @app
import { Application } from '../../../declarations'
import { Cart, ICartItem } from './types'

class AddToCartService {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create({ payload, userId }: { payload: { items: ICartItem; userId: string }; userId: string }) {
    let cart: Cart

    const { productId, quantity, price, itemPicture, itemName } = payload.items

    // Check if a cart exists for the given userId
    let cartQuery = await this.app.service('cart').find({
      query: {
        userId
      }
    })

    if (cartQuery.total === 0) {
      // Cart doesn't exist, create a new cart
      cart = await this.app.service('cart').create({
        userId,
        items: [
          {
            productId,
            quantity,
            price,
            itemPicture,
            itemName
          }
        ]
      })
    } else {
      // Cart exists, check if the item is already present
      const existingCart: Cart = cartQuery.data[0]
      const existingItemIndex = existingCart.items.findIndex((item) => item.productId === productId)

      if (existingItemIndex !== -1) {
        // Item already exists, update its quantity and price
        existingCart.items[existingItemIndex].quantity += quantity
        existingCart.items[existingItemIndex].price += price
      } else {
        // Item doesn't exist, add it to the cart
        const newItem = {
          productId,
          quantity,
          price,
          itemPicture,
          itemName
        }
        existingCart.items.push(newItem) // Add the new item directly to the array
      }

      // Patch the cart with the updated items
      cart = await this.app.service('cart').patch(existingCart._id as string, existingCart)
    }

    return cart
  }
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'custom/add-to-cart': AddToCartService
  }
}

export default AddToCartService
