// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { WishlistService } from './wishlist.class'

// Main data model schema
export const wishlistSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    userId: Type.String(),
    items: Type.Array(
      Type.Object({
        productId: Type.String(),
        price: Type.Number(),
        itemPicture: Type.String(),
        itemName: Type.String()
      })
    )
  },
  { $id: 'Wishlist', additionalProperties: false }
)
export type Wishlist = Static<typeof wishlistSchema>
export const wishlistValidator = getValidator(wishlistSchema, dataValidator)
export const wishlistResolver = resolve<Wishlist, HookContext<WishlistService>>({})

export const wishlistExternalResolver = resolve<Wishlist, HookContext<WishlistService>>({})

// Schema for creating new entries
export const wishlistDataSchema = Type.Pick(wishlistSchema, ['userId', 'items'], {
  $id: 'WishlistData'
})
export type WishlistData = Static<typeof wishlistDataSchema>
export const wishlistDataValidator = getValidator(wishlistDataSchema, dataValidator)
export const wishlistDataResolver = resolve<Wishlist, HookContext<WishlistService>>({})

// Schema for updating existing entries
export const wishlistPatchSchema = Type.Partial(wishlistSchema, {
  $id: 'WishlistPatch'
})
export type WishlistPatch = Static<typeof wishlistPatchSchema>
export const wishlistPatchValidator = getValidator(wishlistPatchSchema, dataValidator)
export const wishlistPatchResolver = resolve<Wishlist, HookContext<WishlistService>>({})

// Schema for allowed query properties
export const wishlistQueryProperties = Type.Pick(wishlistSchema, ['_id', 'userId', 'items'])
export const wishlistQuerySchema = Type.Intersect(
  [
    querySyntax(wishlistQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type WishlistQuery = Static<typeof wishlistQuerySchema>
export const wishlistQueryValidator = getValidator(wishlistQuerySchema, queryValidator)
export const wishlistQueryResolver = resolve<WishlistQuery, HookContext<WishlistService>>({})
