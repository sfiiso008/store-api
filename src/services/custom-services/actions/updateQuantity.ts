import { BadRequest } from '@feathersjs/errors'
// @app
import { Application } from '../../../declarations'

class GetCart {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(payload: { userId: string; productId: string; newQuantity: number }) {
    const { userId, productId, newQuantity } = payload
    try {
      const cart = await this.app.service('cart').find({
        query: {
          userId
        }
      })

      const updatedCarts = await Promise.all(
        cart.data.map(async (cart: any) => {
          const index = cart.items.findIndex((item: any) => item.productId === productId)
          if (index !== -1) {
            cart.items[index].quantity = newQuantity

            return await this.app.service('cart').patch(cart._id, { items: cart.items })
          }
          return cart
        })
      )

      return updatedCarts
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
    'custom/update-quantity': GetCart
  }
}

export default GetCart
