// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CartService } from './cart.class'

// Main data model schema
export const cartSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    userId: Type.String(),
    items: Type.Array(
      Type.Object({
        quantity: Type.Integer(),
        productId: Type.Integer(),
        price: Type.Number(),
        itemPicture: Type.String(),
        itemName: Type.String()
      })
    )
  },
  { $id: 'Cart', additionalProperties: false }
)

export type Cart = Static<typeof cartSchema>
export const cartValidator = getValidator(cartSchema, dataValidator)
export const cartResolver = resolve<Cart, HookContext<CartService>>({})

export const cartExternalResolver = resolve<Cart, HookContext<CartService>>({})

// Schema for creating new entries
export const cartDataSchema = Type.Pick(cartSchema, ['items', 'userId'], {
  $id: 'CartData'
})

export type CartData = Static<typeof cartDataSchema>
export const cartDataValidator = getValidator(cartDataSchema, dataValidator)
export const cartDataResolver = resolve<Cart, HookContext<CartService>>({})

// Schema for updating existing entries
export const cartPatchSchema = Type.Partial(cartSchema, {
  $id: 'CartPatch'
})
export type CartPatch = Static<typeof cartPatchSchema>
export const cartPatchValidator = getValidator(cartPatchSchema, dataValidator)
export const cartPatchResolver = resolve<Cart, HookContext<CartService>>({})

// Schema for allowed query properties
export const cartQueryProperties = Type.Pick(cartSchema, ['items', 'userId'])
export const cartQuerySchema = Type.Intersect(
  [
    querySyntax(cartQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CartQuery = Static<typeof cartQuerySchema>
export const cartQueryValidator = getValidator(cartQuerySchema, queryValidator)
export const cartQueryResolver = resolve<CartQuery, HookContext<CartService>>({})
