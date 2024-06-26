// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { subCategoriesClient } from './services/sub-categories/sub-categories.shared'
export type {
  SubCategories,
  SubCategoriesData,
  SubCategoriesQuery,
  SubCategoriesPatch
} from './services/sub-categories/sub-categories.shared'

import { productsClient } from './services/products/products.shared'
export type {
  Products,
  ProductsData,
  ProductsQuery,
  ProductsPatch
} from './services/products/products.shared'

import { categoriesClient } from './services/categories/categories.shared'
export type {
  Categories,
  CategoriesData,
  CategoriesQuery,
  CategoriesPatch
} from './services/categories/categories.shared'

import { wishlistClient } from './services/wishlist/wishlist.shared'
export type {
  Wishlist,
  WishlistData,
  WishlistQuery,
  WishlistPatch
} from './services/wishlist/wishlist.shared'

import { cartClient } from './services/cart/cart.shared'
export type { Cart, CartData, CartQuery, CartPatch } from './services/cart/cart.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the feathers-chat app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(cartClient)
  client.configure(wishlistClient)
  client.configure(categoriesClient)
  client.configure(productsClient)
  client.configure(subCategoriesClient)
  return client
}
