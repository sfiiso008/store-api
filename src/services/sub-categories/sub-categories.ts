// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  subCategoriesDataValidator,
  subCategoriesPatchValidator,
  subCategoriesQueryValidator,
  subCategoriesResolver,
  subCategoriesExternalResolver,
  subCategoriesDataResolver,
  subCategoriesPatchResolver,
  subCategoriesQueryResolver
} from './sub-categories.schema'

import type { Application } from '../../declarations'
import { SubCategoriesService, getOptions } from './sub-categories.class'
import { subCategoriesPath, subCategoriesMethods } from './sub-categories.shared'

export * from './sub-categories.class'
export * from './sub-categories.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const subCategories = (app: Application) => {
  // Register our service on the Feathers application
  app.use(subCategoriesPath, new SubCategoriesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: subCategoriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(subCategoriesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(subCategoriesExternalResolver),
        schemaHooks.resolveResult(subCategoriesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(subCategoriesQueryValidator),
        schemaHooks.resolveQuery(subCategoriesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(subCategoriesDataValidator),
        schemaHooks.resolveData(subCategoriesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(subCategoriesPatchValidator),
        schemaHooks.resolveData(subCategoriesPatchResolver)
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
    [subCategoriesPath]: SubCategoriesService
  }
}
