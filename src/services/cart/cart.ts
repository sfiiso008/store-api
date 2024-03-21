// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  cartDataValidator,
  cartPatchValidator,
  cartQueryValidator,
  cartResolver,
  cartExternalResolver,
  cartDataResolver,
  cartPatchResolver,
  cartQueryResolver
} from './cart.schema'

import type { Application } from '../../declarations'
import { CartService, getOptions } from './cart.class'
import { cartPath, cartMethods } from './cart.shared'

export * from './cart.class'
export * from './cart.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const cart = (app: Application) => {
  // Register our service on the Feathers application
  app.use(cartPath, new CartService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: cartMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(cartPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(cartExternalResolver),
        schemaHooks.resolveResult(cartResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(cartQueryValidator), schemaHooks.resolveQuery(cartQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(cartDataValidator), schemaHooks.resolveData(cartDataResolver)],
      patch: [schemaHooks.validateData(cartPatchValidator), schemaHooks.resolveData(cartPatchResolver)],
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
    [cartPath]: CartService
  }
}
