// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Wishlist, WishlistData, WishlistPatch, WishlistQuery, WishlistService } from './wishlist.class'

export type { Wishlist, WishlistData, WishlistPatch, WishlistQuery }

export type WishlistClientService = Pick<
  WishlistService<Params<WishlistQuery>>,
  (typeof wishlistMethods)[number]
>

export const wishlistPath = 'wishlist'

export const wishlistMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const wishlistClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(wishlistPath, connection.service(wishlistPath), {
    methods: wishlistMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [wishlistPath]: WishlistClientService
  }
}
