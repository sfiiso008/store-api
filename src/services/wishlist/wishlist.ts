// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  wishlistDataValidator,
  wishlistPatchValidator,
  wishlistQueryValidator,
  wishlistResolver,
  wishlistExternalResolver,
  wishlistDataResolver,
  wishlistPatchResolver,
  wishlistQueryResolver
} from './wishlist.schema'

import type { Application } from '../../declarations'
import { WishlistService, getOptions } from './wishlist.class'
import { wishlistPath, wishlistMethods } from './wishlist.shared'

export * from './wishlist.class'
export * from './wishlist.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const wishlist = (app: Application) => {
  // Register our service on the Feathers application
  app.use(wishlistPath, new WishlistService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: wishlistMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(wishlistPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(wishlistExternalResolver),
        schemaHooks.resolveResult(wishlistResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(wishlistQueryValidator),
        schemaHooks.resolveQuery(wishlistQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(wishlistDataValidator),
        schemaHooks.resolveData(wishlistDataResolver)
      ],
      patch: [
        schemaHooks.validateData(wishlistPatchValidator),
        schemaHooks.resolveData(wishlistPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [wishlistPath]: WishlistService
  }
}
