// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Cart, CartData, CartPatch, CartQuery } from './cart.schema'

export type { Cart, CartData, CartPatch, CartQuery }

export interface CartParams extends MongoDBAdapterParams<CartQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CartService<ServiceParams extends Params = CartParams> extends MongoDBService<
  Cart,
  CartData,
  CartParams,
  CartPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('cart'))
  }
}
