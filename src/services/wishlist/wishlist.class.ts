// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Wishlist, WishlistData, WishlistPatch, WishlistQuery } from './wishlist.schema'

export type { Wishlist, WishlistData, WishlistPatch, WishlistQuery }

export interface WishlistParams extends MongoDBAdapterParams<WishlistQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class WishlistService<ServiceParams extends Params = WishlistParams> extends MongoDBService<
  Wishlist,
  WishlistData,
  WishlistParams,
  WishlistPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('wishlist'))
  }
}
