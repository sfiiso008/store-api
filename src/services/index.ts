import { subCategories } from './sub-categories/sub-categories'
import { products } from './products/products'
import { categories } from './categories/categories'
import { wishlist } from './wishlist/wishlist'
import { cart } from './cart/cart'
import { user } from './users/users'
import customService from './custom-services/custom-service.service'
import uploads from './uploads/upload.service'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(subCategories)
  app.configure(products)
  app.configure(categories)
  app.configure(wishlist)
  app.configure(cart)
  app.configure(user)
  app.configure(customService)
  app.configure(uploads)
}
