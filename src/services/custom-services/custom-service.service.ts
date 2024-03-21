// Initializes the `auth` service on path `/auth`
import type { Application } from '../../declarations'
import getCart from './actions/getCart'
import AddToCartService from './actions/addToCart'
import RemoveItem from './actions/removeItemFromCart'
import GetTotal from './actions/getTotal'
import AddToWishlist from './actions/addToWishlist'
import RemoveWishlist from './actions/removeWishlist'
import getWishlist from './actions/getWishlist'
import AddedToWishlist from './actions/AddedToWishlist'
import updateQuantity from './actions/updateQuantity'

export default (app: Application) => {
  app.use('custom/get-cart', new getCart(app))
  app.use('custom/add-to-cart', new AddToCartService(app))
  app.use('custom/remove-from-cart', new RemoveItem(app))
  app.use('custom/get-total', new GetTotal(app))
  app.use('custom/add-to-wishlist', new AddToWishlist(app))
  app.use('custom/remove-from-wishlist', new RemoveWishlist(app))
  app.use('custom/get-wishlist', new getWishlist(app))
  app.use('custom/added-to-wishlist', new AddedToWishlist(app))
  app.use('custom/update-quantity', new updateQuantity(app))
}
